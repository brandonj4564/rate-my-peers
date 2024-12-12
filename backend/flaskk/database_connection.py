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


@app.route("/profile", methods=["GET", "POST"]) # need to add check to see if user is logged in before try to post<----------------------------------------
def profile():
    try: 
            if request.method == "POST":
                
                
                
                required_fields = [#we could remove this if the front end deals with the checking if all data has been entered
                'r_ratedUserID', 'r_teamWork', 'r_hygeine', 'r_personality', 'r_temperament', 
                'r_dependability', 'r_creativity', 'r_leadership', 'r_workEthic', 'r_comment'
                ]
            
                for field in required_fields:
                    if field not in request.form:
                        return jsonify({"success": False, "message": f"Missing required field: {field}"}), 400

                
    
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
                    
                rated_user_id = request.args.get('r_ratedUserID') #get the user id from front end
                
                conn = databaseConnection()
                
                cursor = conn.cursor()
                
                #gets stats profile stats

                query = '''
                    SELECT AVG(r_teamWork), AVG(r_hygeine), AVG(r_personality), AVG(r_temperament), AVG(r_dependability), AVG(r_creativity), AVG(r_leadership), AVG(r_workEthic)
                    FROM rating_table
                    WHERE r_ratedUserID = ?
                '''
                
                cursor.execute(query, (rated_user_id,))

                
                stats = cursor.fetchone()  #AVG SCORE FOR THE USER IN EACH CATEGORY
                
                #--not extracting rater id as we prob dont want to display this (anonymous)
                query_post = '''
                           
                SELECT r_teamWork, r_hygeine, r_personality, r_temperament, r_dependability, r_creativity, r_leadership, r_workEthic,  r_comment
                FROM rating_table
                WHERE r_ratedUserID = ?

                '''
                cursor.execute(query_post, (rated_user_id,))
                
                posts = cursor.fetchall()# touples for posts
                
                
                profile_query = '''
                    SELECT u_name,u_skoolName, u_yearAttend, u_major,u_degree 
                    FROM user_table
                    WHERE u_userID = ?

                '''
                
                cursor.execute(profile_query, (rated_user_id,))
                
                profile_info = cursor.fetchone()# profile info to display below the over score 
                
                user_data = { #user stats has avg of every category for brandsons use in stat radar and also for caluclating the over score number on the left side of screen
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
                    "profile_info": { #profile info 
                        "u_name" : profile_info[0],
                        "u_skoolName" : profile_info[1],
                        "u_yearAttend" : profile_info[2],
                        "u_major" : profile_info[3],
                        "u_degree" : profile_info[4]
                    },
                    "user_posts": [ #puting posts into a disctionary to show on screen. wont show name unless i get outvoted xD
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
                
                return jsonify({"success": True, "data": user_data}), 200 #sending it to front end

    
    except Exception as e:
       
        traceback.print_exc()  
        return jsonify({"success": False, "message": f"An error occurred: {str(e)}"}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
