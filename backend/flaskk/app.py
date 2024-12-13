# reference:
# https://www.geeksforgeeks.org/how-to-add-authentication-to-your-app-with-flask-login/
# https://www.forestadmin.com/blog/flask-tastic-admin-panel-a-step-by-step-guide-to-building-your-own-2/

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user
import sqlite3
import traceback

app = Flask(__name__)
CORS(app)

app.config["SECRET_KEY"] = "thisISaSecrETkeY"

DATABASE = "peers.sqlite"

login_manager = LoginManager()
login_manager.init_app(app)

# Utility function to connect to the SQLite database
def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # Make rows behave like dictionaries
    return conn

# User class for Flask-Login
class Student(UserMixin):
    def __init__(self, id, name, school, year, major, email, password):
        self.id = id
        self.name = name
        self.school = school
        self.year = year
        self.major = major
        self.email = email
        self.password = password

    def hash_password(self, entered_password):
        self.password = generate_password_hash(entered_password)

    def check_password(self, entered_password):
        return check_password_hash(self.password, entered_password)

# User loader for Flask-Login
@login_manager.user_loader
def user_loader(user_id):
    conn = get_db_connection()
    student = conn.execute("SELECT * FROM user WHERE id = ?", (user_id,)).fetchone()
    conn.close()
    if student:
        return Student(
            student["id"], student["name"], student["school"], student["year"],
            student["major"], student["email"], student["password"]
        )
    return None

@app.route("/")
def home():
    return jsonify({"success": True, "message": "Success"}), 201

@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        conn = get_db_connection()
        cursor = conn.cursor()

        # Check if the email is already in use
        email_in_use = cursor.execute("SELECT * FROM user WHERE email = ?", (data.get("email"),)).fetchone()
        if email_in_use:
            return jsonify({"success": False, "message": "Email is already in use!"}), 400

        password = generate_password_hash(data.get("password"))
        cursor.execute('''
            INSERT INTO user (name, school, year, major, email, password)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (data.get("name"), data.get("school"), data.get("year"),
              data.get("major"), data.get("email"), password))
        conn.commit()
        conn.close()
        return jsonify({"success": True, "message": "Registered successfully"}), 201

    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "message": "An error occurred during registration."}), 500

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"success": False, "message": "No data received."}), 400

        conn = get_db_connection()
        student = conn.execute("SELECT * FROM user WHERE email = ?", (data.get("email"),)).fetchone()
        conn.close()

        if student:
            student_obj = Student(
                student["id"], student["name"], student["school"], student["year"],
                student["major"], student["email"], student["password"]
            )
            if student_obj.check_password(data.get("password")):
                login_user(student_obj)
                return jsonify({"success": True, "message": "Login successful."}), 200
            else:
                return jsonify({"success": False, "message": "Incorrect password."}), 400
        else:
            return jsonify({"success": False, "message": "User does not exist."}), 400

    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "message": f"An error occurred: {str(e)}"}), 500

@app.route("/logout")
def logout():
    try:
        logout_user()
        return jsonify({"success": True, "message": "Logout successful."}), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "message": f"An error occurred: {str(e)}"}), 500

@app.route("/users")
def users():
    try:
        conn = get_db_connection()
        users = conn.execute("SELECT id, name, school, year, major, email FROM user").fetchall()
        conn.close()

        user_list = [dict(user) for user in users]
        return jsonify(user_list)

    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "message": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
