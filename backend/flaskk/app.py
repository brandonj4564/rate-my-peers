# reference:
# https://www.geeksforgeeks.org/how-to-add-authentication-to-your-app-with-flask-login/
# https://www.forestadmin.com/blog/flask-tastic-admin-panel-a-step-by-step-guide-to-building-your-own-2/

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user
import sqlite3
from sqlite3 import Error
import traceback
import uuid

app = Flask(__name__)
CORS(app)

app.config["SECRET_KEY"] = "thisISaSecrETkeY"

DATABASE = "peers.sqlite3"

login_manager = LoginManager()
login_manager.init_app(app)

# Utility function to connect to the SQLite database
def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # Make rows behave like dictionaries
    return conn

def closeConnection(connection):
    try:
        connection.close()
    except Error as e:
        print(e)

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
    student = conn.execute("SELECT * FROM user WHERE u_userID = ?", (user_id,)).fetchone()
    conn.close()
    if student:
        return Student(
            student["u_userID"], student["u_name"], student["u_skoolName"], student["u_yearAttend"],
            student["u_major"], student["u_email"], student["u_password"]
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
        email_in_use = cursor.execute("SELECT * FROM user WHERE u_email = ?", (data.get("email"),)).fetchone()
        if email_in_use:
            return jsonify({"success": False, "message": "Email is already in use!"}), 400

        password = generate_password_hash(data.get("password"))

        # create a unique ID
        userID = str(uuid.uuid4())

        cursor.execute('''
            INSERT INTO user (u_userID, u_name, u_skoolName, u_yearAttend, u_major, u_degree, u_email, u_password)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (userID, data.get("name"), data.get("school"), data.get("year"),
              data.get("major"), data.get("degree"), data.get("email"), password))
        conn.commit()
        conn.close()
        return jsonify({"success": True, "message": "Registered successfully"}), 201

    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "message": "An error occurred during registration."}), 500

@app.route("/login", methods=["POST"])
def login():
    try:
        # Ensure the Content-Type is 'application/json'
        if not request.is_json:
            return jsonify({"success": False, "message": "Content-Type must be application/json"}), 415

        data = request.get_json()
        if not data:
            return jsonify({"success": False, "message": "No data received."}), 400

        conn = get_db_connection()
        student = conn.execute("SELECT * FROM user WHERE u_email = ?", (data.get("email"),)).fetchone()
        conn.close()

        if student:
            student_obj = Student(
                student["u_userID"], student["u_name"], student["u_skoolName"], student["u_yearAttend"],
                student["u_major"], student["u_email"], student["u_password"]
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
        users = conn.execute("SELECT u_userID, u_name, u_skoolName, u_yearAttend, u_major, u_email FROM user").fetchall()
        conn.close()

        user_list = [dict(user) for user in users]
        return jsonify(user_list)

    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "message": f"An error occurred: {str(e)}"}), 500
    
@app.route("/profile", methods=["GET", "POST"])  # need to add check to see if user is logged in before try to post<----------------------------------------
def profile():
    try: 
        if request.method == "POST":
            required_fields = [  # we could remove this if the front end deals with the checking if all data has been entered
                'r_ratedUserID', 'r_teamWork', 'r_hygeine', 'r_personality', 'r_temperament', 
                'r_dependability', 'r_creativity', 'r_leadership', 'r_workEthic', 'r_comment'
            ]
        
            for field in required_fields:
                if field not in request.form:
                    return jsonify({"success": False, "message": f"Missing required field: {field}"}), 400

            rater_id = current_user.id  # NOT SURE IF THIS WILL GET USE ID <--------------------

            rated_user = request.form['r_ratedUserID']  
            team_work = request.form['r_teamWork']
            hygiene = request.form['r_hygeine']
            personality = request.form['r_personality']
            temperament = request.form['r_temperament']
            dependability = request.form['r_dependability']
            creativity = request.form['r_creativity']
            leadership = request.form['r_leadership']
            work_ethic = request.form['r_workEthic']
            comment = request.form['r_comment']

            conn = get_db_connection()  # Use the consistent database connection method
            if conn is None:
                return jsonify({"success": False, "message": "Database connection failed."}), 500

            cursor = conn.cursor()
            # inserts review
            query = '''
                INSERT INTO rating_table (
                    r_ratedUserID, r_raterUserID, r_teamWork, r_hygeine, r_personality, r_temperament,  
                    r_dependability, r_creativity, r_leadership, r_workEthic, r_comment
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            '''
        
            cursor.execute(query, (
                rated_user, rater_id, team_work, hygiene, personality, temperament, dependability, 
                creativity, leadership, work_ethic, comment
            ))

            conn.commit()
            closeConnection(conn)

            return jsonify({"success": True, "message": "Review submitted successfully."}), 200
        
        elif request.method == "GET":
            rated_user_id = request.args.get('r_ratedUserID')  # get the user id from front end

            conn = get_db_connection()
            cursor = conn.cursor()

            # gets stats profile stats
            query = '''
                SELECT AVG(r_teamWork), AVG(r_hygeine), AVG(r_personality), AVG(r_temperament), AVG(r_dependability), AVG(r_creativity), AVG(r_leadership), AVG(r_workEthic)
                FROM rating_table
                WHERE r_ratedUserID = ?
            '''
            cursor.execute(query, (rated_user_id,))

            stats = cursor.fetchone()  # AVG SCORE FOR THE USER IN EACH CATEGORY

            # -- not extracting rater id as we prob don't want to display this (anonymous)
            query_post = '''
                SELECT r_teamWork, r_hygeine, r_personality, r_temperament, r_dependability, r_creativity, r_leadership, r_workEthic,  r_comment
                FROM rating_table
                WHERE r_ratedUserID = ?
            '''
            cursor.execute(query_post, (rated_user_id,))

            posts = cursor.fetchall()  # tuples for posts

            profile_query = '''
                SELECT u_name, u_skoolName, u_yearAttend, u_major, u_degree 
                FROM user_table
                WHERE u_userID = ?
            '''
            cursor.execute(profile_query, (rated_user_id,))

            profile_info = cursor.fetchone()  # profile info to display below the over score 

            user_data = {  # user stats has avg of every category for brandson's use in stat radar and also for calculating the over score number on the left side of screen
                "user_stats": {
                    "team_work": stats[0],
                    "hygiene": stats[1],
                    "personality": stats[2],
                    "temperament": stats[3],
                    "dependability": stats[4],
                    "creativity": stats[5],
                    "leadership": stats[6],
                    "work_ethic": stats[7]
                },
                "profile_info": {  # profile info 
                    "u_name": profile_info[0],
                    "u_skoolName": profile_info[1],
                    "u_yearAttend": profile_info[2],
                    "u_major": profile_info[3],
                    "u_degree": profile_info[4]
                },
                "user_posts": [  # putting posts into a dictionary to show on screen. won't show name unless i get outvoted xD
                    {
                        'team_work': row[0],
                        'hygiene': row[1],
                        'personality': row[2],
                        'temperament': row[3],
                        'dependability': row[4],
                        'creativity': row[5],
                        'leadership': row[6],
                        'work_ethic': row[7],
                        'comment': row[8]
                    } for row in posts
                ]
            }

            closeConnection(conn)

            return jsonify({"success": True, "data": user_data}), 200  # sending it to front end

    except Exception as e:
        traceback.print_exc()  
        return jsonify({"success": False, "message": f"An error occurred: {str(e)}"}), 500

@app.route("/schools", methods=["GET"])
def schools():
    # Connect to the database
    conn = sqlite3.connect("peers.sqlite3")
    cursor = conn.cursor()

    try:
        # Query to get all school names from the user table
        cursor.execute("SELECT DISTINCT u_skoolName FROM user")
        result = cursor.fetchall()
        
        # Extract schools from the result and flatten the list
        schools_list = [row[0] for row in result]

        return jsonify(schools_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

if __name__ == "__main__":
    app.run(debug=True)
