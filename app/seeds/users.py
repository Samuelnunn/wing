import json
from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want


def seed_users():
    new_users = []
    with open('./app/seeds/userdata.json') as f:
        data = json.load(f)
        for user in data:
            new_user = User(**user)
            new_users.append(new_user)
    new_users[0].matches.append(new_users[2])
    new_users[2].matches.append(new_users[0])
    new_users[0].matches.append(new_users[3])
    new_users[3].matches.append(new_users[0])
    new_users[0].matches.append(new_users[4])
    new_users[4].matches.append(new_users[0])
    new_users[0].matches.append(new_users[25])
    new_users[25].matches.append(new_users[0])
    new_users[0].matches.append(new_users[26])
    new_users[26].matches.append(new_users[0])
    new_users[0].matches.append(new_users[27])
    new_users[27].matches.append(new_users[0])
    new_users[0].matches.append(new_users[10])
    new_users[0].matches.append(new_users[6])
    new_users[0].matches.append(new_users[8])
    new_users[0].matches.append(new_users[15])
    new_users[0].seen_by_users.append(new_users[2])
    new_users[2].seen_by_users.append(new_users[0])
    new_users[0].seen_by_users.append(new_users[3])
    new_users[3].seen_by_users.append(new_users[0])
    new_users[0].seen_by_users.append(new_users[4])
    new_users[4].seen_by_users.append(new_users[0])
    new_users[0].seen_by_users.append(new_users[25])
    new_users[25].seen_by_users.append(new_users[0])
    new_users[0].seen_by_users.append(new_users[26])
    new_users[26].seen_by_users.append(new_users[0])
    new_users[0].seen_by_users.append(new_users[27])
    new_users[27].seen_by_users.append(new_users[0])


    db.session.add_all(new_users)
    # db.session.add(first_match1)
    # db.session.add(first_match2)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.execute("ALTER SEQUENCE USERS_id_seq RESTART WITH 1")
    db.session.commit()
