# reference:
# https://www.geeksforgeeks.org/how-to-add-authentication-to-your-app-with-flask-login/
# https://www.forestadmin.com/blog/flask-tastic-admin-panel-a-step-by-step-guide-to-building-your-own-2/

from flask import Flask, request, redirect, url_for, render_template, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user
import json
import traceback

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///peers.sqlite"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "thisISaSecrETkeY"
db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)

class Student(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(255), nullable = False)
    school = db.Column(db.String(255), nullable = False)
    year = db.Column(db.Integer, nullable = False)
    major = db.Column(db.String(255), nullable = False)
    # degree type?
    email = db.Column(db.String(255), unique = True, nullable = False)
    password = db.Column(db.String(255), nullable = False)

    def hash_password(self, entered_password):
        self.password = generate_password_hash(entered_password)

    def check_password(self, entered_password):
        return check_password_hash(self.password, entered_password)

# class Friendship(db.Model):
#     # user_id (foreign key)
#     # friend_id (foreign key)

class Ratings(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    # rated_user_id (foreign key)
    # rater_user_id (foreign key)
    team_work = db.Column(db.Integer, nullable = False)
    hygiene = db.Column(db.Integer, nullable = False)
    personality = db.Column(db.Integer, nullable = False)
    temperament = db.Column(db.Integer, nullable = False)
    dependability = db.Column(db.Integer, nullable = False)
    creativity = db.Column(db.Integer, nullable = False)
    leadership = db.Column(db.Integer, nullable = False)
    work_ethic = db.Column(db.Integer, nullable = False)
    comment = db.Column(db.String(255), nullable = False)

# Creates a user loader callback that returns the user object given an id
@login_manager.user_loader
def user_loader(user_id):
    return Student.query.get(user_id)

@app.route("/")
def home():
    # return render_template("index.html")
    return jsonify({"success": True, "message": "Success"}), 201

@app.route("/register", methods=["GET", "POST"])
def register():
    try:
        data = request.get_json()
        email_in_use = Student.query.filter_by(
            email=data.get("email")
        ).first()
        if email_in_use:
            flash("Email is already in use!", category="error")
            # return redirect(url_for("register"))
            return jsonify({"success": False, "message": "Email is already in use!"}), 400

        password = data.get("password")
        # hashed_password = generate_password_hash(password)
        student = Student(
            name = data.get("name"),
            school = data.get("school"),
            year = data.get("year"),
            major = data.get("major"),
            email = data.get("email"),
            # password = hashed_password,
        )
        student.hash_password(password)
        db.session.add(student)
        db.session.commit()

        return jsonify({"success": True, "message": "Registered successfully"}), 201
    
    except:
        return jsonify({"success": False, "message": "An error occurred during registration."}), 500


@app.route("/login", methods=["GET", "POST"])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"success": False, "message": "No data received."}), 400
        
        student = Student.query.filter_by(email=data.get("email")).first()
        entered_password = data.get("password")
        # if student and check_password_hash(student.password, entered_password):
        if student and student.check_password(entered_password):
            # Use the login_user method to log in the user
            login_user(student)
            # Redirect the user back to the home
            # flash("Log in successfull")
            return jsonify({"success": True, "message": "Login successful."}), 200
        elif not student:
            # flash("User does not exist", category="error")
            return jsonify({"success": False, "message": "User does not exist."}), 400
        else:
            # flash("Incorrect password", category="error")
            return jsonify({"success": False, "message": "Incorrect password."}), 400
    
    except Exception as e:
        traceback.print_exc()  # Logs the full traceback to the server console
        return jsonify({"success": False, "message": f"An error occurred: {str(e)}"}), 500

@app.route("/logout")
def logout():
    try:
        logout_user()
        return jsonify({"success": True, "message": "Logout successful."}), 200
    
    except Exception as e:
        traceback.print_exc()  # Logs the full traceback to the server console
        return jsonify({"success": False, "message": f"An error occurred: {str(e)}"}), 500
    
@app.route("/users")
def users():
    try:
        users = db.session.query(Student).all()
        user_list = []

        for user in users:
            user_data = {
                "id": user.id,
                "name": user.name,
                "school": user.school,
                "year": user.year,
                "major": user.major,
                "email": user.email,
            }
            user_list.append(user_data)
        return jsonify(user_list)

    except Exception as e:
        traceback.print_exc()  # Logs the full traceback to the server console
        return jsonify({"success": False, "message": f"An error occurred: {str(e)}"}), 500 

if __name__ == "__main__":
    app.run(debug=True)
