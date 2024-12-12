import sqlite3
from sqlite3 import Error
import traceback  # Importing the traceback module
from flask import Flask, request, jsonify
from flask_login import current_user

# Initialize the Flask app
app = Flask(__name__)

# Database connection and closing functions
def databaseConnection():
    database = r"peers.sqlite3"
    connection = None
    try:
        connection = sqlite3.connect(database)
        return connection
    except Error as e:
        print(e)
        return None

def closeConnection(connection):
    try:
        connection.close()
    except Error as e:
        print(e)


@app.route("/profile", methods=["GET", "POST"])
def profile():
    try: 
            if request.method == "POST":
    
                rater_id = current_user.id  #NOT SURE IF THIS WILL GET USE ID <--------------------

            
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


                conn = databaseConnection()
                if conn is None:
                    return jsonify({"success": False, "message": "Database connection failed."}), 500
                
                cursor = conn.cursor()
                #inserts review
                query = '''
                    INSERT INTO rating (
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
                    
                rated_user_id = request.args.get('r_ratedUserID') #get the user id from front end
                
                conn = databaseConnection()
                
                cursor = conn.cursor()
                
                #gets stats profile stats

                query = '''
                    SELECT r_teamWork, r_hygeine, r_personality, r_temperament, r_dependability, r_creativity, r_leadership, r_workEthic
                    FROM rating
                    WHERE r_ratedUserID = ?
                '''
                
                cursor.execute(query, (rated_user_id,))

                
                stats = cursor.fetchall()  
                closeConnection(conn)
                
                return jsonify({"success": True, "data": stats}), 200

    
    except Exception as e:
       
        traceback.print_exc()  
        return jsonify({"success": False, "message": f"An error occurred: {str(e)}"}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
