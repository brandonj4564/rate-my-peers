import database_connection as conn

friendship_table = '''
    CREATE TABLE IF NOT EXISTS friendship(
        f_friendshipID VARCHAR(255) NOT NULL,
        f_userID VARCHAR(255) NOT NULL,
        f_friendID VARCHAR(255) NOT NULL,

        PRIMARY KEY (f_friendshipID),
        FOREIGN KEY (f_userID) REFERENCES user(u_userID) ON DELETE CASCADE,
        FOREIGN KEY (f_friendID) REFERENCES user(u_userID) ON DELETE CASCADE
)'''

dropfriendshiptable = '''
    DROP TABLE IF EXISTS friendship
'''

user_table = '''
    CREATE TABLE IF NOT EXISTS user(
        u_userID VARCHAR(255) NOT NULL,
        u_name VARCHAR(255) NOT NULL,
        u_skoolName VARCHAR(255) NOT NULL,
        u_yearAttend INT NOT NULL,
        u_major VARCHAR(255) NOT NULL,
        u_degree VARCHAR(255) NOT NULL,
        u_email VARCHAR(255) NOT NULL,
        u_password VARCHAR(255) NOT NULL,

        PRIMARY KEY (u_userID)
    )
'''
dropusertable = '''
    DROP TABLE IF EXISTS user
'''

rating_table = '''
    CREATE TABLE IF NOT EXISTS rating(
        r_ratingID VARCHAR(255) NOT NULL,
        
        r_ratedUserID VARCHAR(255) NOT NULL,
        r_raterUserID VARCHAR(255) NOT NULL,
        r_teamWork INT DEFAULT 0,
        r_hygeine INT DEFAULT 0,
        r_personality INT DEFAULT 0,
        r_temperament INT DEFAULT 0,
        r_dependability INT DEFAULT 0, 
        r_creativity INT DEFAULT 0,
        r_leadership INT DEFAULT 0,
        r_workEthic INT DEFAULT 0,
        r_comment VARCHAR(255) NOT NULL,

        PRIMARY KEY (r_ratingID),
        FOREIGN KEY (r_ratedUserID) REFERENCES user(u_userID) ON DELETE CASCADE,
        FOREIGN KEY (r_raterUserID) REFERENCES user(u_userID) ON DELETE CASCADE
)'''

dropratingtable = '''
    DROP TABLE IF EXISTS rating
'''

createtables = [user_table, friendship_table, rating_table]
droptables = [dropusertable, dropfriendshiptable, dropratingtable]

def createAllTables(connection):
    cursor = connection.cursor()
    for query in createtables:
        cursor.execute(query)

def dropAllTables(connection):
    cursor = connection.cursor()
    for query in droptables:
        cursor.execute(query)

def databaseReset():
    connection = conn.databaseConnection()
    with connection:
        dropAllTables(connection)
        createAllTables(connection)
    conn.closeConnection(connection)

if __name__ == '__main__':
    databaseReset()
