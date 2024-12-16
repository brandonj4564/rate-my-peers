import sqlite3
from werkzeug.security import generate_password_hash
import uuid


def insert_sample_data():
    conn = sqlite3.connect("peers.sqlite3")
    cursor = conn.cursor()

    try:
        # Hash the passwords
        users = [
            (str(uuid.uuid4()), 'John Doe', 'UC Merced', '3rd Year', 'Computer Science', 'Bachelor', 'JohnDoe@example.com', generate_password_hash('hello')),
            (str(uuid.uuid4()), 'Jane Smith', 'UC Merced', '2nd Year', 'Mechanical Engineering', 'Bachelor', 'JaneDoe@example.com', generate_password_hash('cats')),
            (str(uuid.uuid4()), 'Alice Johnson', 'UC Berkeley', '4th Year', 'Physics', 'Bachelor', 'AliceJ@example.com', generate_password_hash('alice123')),
            (str(uuid.uuid4()), 'Bob Brown', 'Stanford University', '3rd Year', 'Electrical Engineering', 'Bachelor', 'BobB@example.com', generate_password_hash('bobpass')),
            (str(uuid.uuid4()), 'Charlie White', 'MIT', '2nd Year', 'Computer Engineering', 'Bachelor', 'CharlieW@example.com', generate_password_hash('charliepass')),
            (str(uuid.uuid4()), 'Diana Green', 'Harvard University', '1st Year', 'Psychology', 'Bachelor', 'DianaG@example.com', generate_password_hash('diana789')),
            (str(uuid.uuid4()), 'Ethan Black', 'Yale University', '4th Year', 'Economics', 'Bachelor', 'EthanB@example.com', generate_password_hash('ethanpass')),
            (str(uuid.uuid4()), 'Fiona Blue', 'Princeton University', '3rd Year', 'Mathematics', 'Bachelor', 'FionaB@example.com', generate_password_hash('fiona456')),
            (str(uuid.uuid4()), 'George Red', 'Columbia University', '2nd Year', 'Architecture', 'Bachelor', 'GeorgeR@example.com', generate_password_hash('georgepass')),
            (str(uuid.uuid4()), 'Hannah Yellow', 'Caltech', '1st Year', 'Chemistry', 'Bachelor', 'HannahY@example.com', generate_password_hash('hannahpass'))
        ]

        # Insert sample users with hashed passwords
        cursor.executemany('''
            INSERT INTO user (u_userID, u_name, u_skoolName, u_yearAttend, u_major, u_degree, u_email, u_password)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', users)

        # Insert sample friendships
        friendships = [
            (str(uuid.uuid4()), users[0][0], users[1][0]),
            (str(uuid.uuid4()), users[1][0], users[0][0]),
            (str(uuid.uuid4()), users[2][0], users[3][0]),
            (str(uuid.uuid4()), users[3][0], users[2][0]),
            (str(uuid.uuid4()), users[4][0], users[5][0]),
            (str(uuid.uuid4()), users[5][0], users[4][0]),
            (str(uuid.uuid4()), users[6][0], users[7][0]),
            (str(uuid.uuid4()), users[7][0], users[6][0]),
            (str(uuid.uuid4()), users[8][0], users[9][0]),
            (str(uuid.uuid4()), users[9][0], users[8][0])
        ]

        cursor.executemany('''
            INSERT INTO friendship (f_friendshipID, f_userID, f_friendID)
            VALUES (?, ?, ?)
        ''', friendships)

        # Insert sample ratings
        ratings = [
            (str(uuid.uuid4()), users[0][0], users[1][0], 4, 5, 4, 3, 5, 4, 5, 4, 'Great teamwork and leadership.'),
            (str(uuid.uuid4()), users[1][0], users[0][0], 3, 4, 3, 4, 4, 3, 4, 5, 'Very dependable and creative.'),
            (str(uuid.uuid4()), users[2][0], users[3][0], 5, 4, 4, 5, 5, 4, 5, 5, 'Excellent problem-solving skills.'),
            (str(uuid.uuid4()), users[3][0], users[2][0], 4, 5, 4, 4, 4, 4, 4, 4, 'Great attention to detail.'),
            (str(uuid.uuid4()), users[4][0], users[5][0], 5, 4, 5, 5, 5, 5, 5, 5, 'Outstanding leadership and creativity.'),
            (str(uuid.uuid4()), users[5][0], users[4][0], 4, 4, 4, 4, 4, 4, 4, 4, 'Very reliable and hardworking.'),
            (str(uuid.uuid4()), users[6][0], users[7][0], 3, 5, 3, 4, 3, 4, 4, 4, 'Good team player.'),
            (str(uuid.uuid4()), users[7][0], users[6][0], 4, 4, 4, 3, 4, 4, 5, 5, 'Excellent communication skills.'),
            (str(uuid.uuid4()), users[8][0], users[9][0], 5, 5, 5, 5, 5, 5, 5, 5, 'Top-notch work ethic.'),
            (str(uuid.uuid4()), users[9][0], users[8][0], 4, 4, 3, 4, 4, 4, 4, 4, 'Dependable and professional.')
        ]

        cursor.executemany('''
            INSERT INTO rating (r_ratingID, r_ratedUserID, r_raterUserID, r_teamWork, r_hygeine, r_personality, r_temperament, 
                                r_dependability, r_creativity, r_leadership, r_workEthic, r_comment)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', ratings)

        conn.commit()
        print("Sample data inserted successfully.")

    except sqlite3.Error as e:
        print(f"An error occurred: {e}")

    finally:
        conn.close()

if __name__ == "__main__":
    insert_sample_data()
