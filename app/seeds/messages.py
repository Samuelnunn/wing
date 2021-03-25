import json
from app.models import db, Message

# Adds a demo user, you can add other users here if you want


def seed_messages():
    new_messages = []
    with open('./app/seeds/messages.json') as f:
        data = json.load(f)
        for messages in data:
            new_message = Message(**messages)
            new_messages.append(new_message)

    db.session.add_all(new_messages)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_messages():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.execute("ALTER SEQUENCE messages_id_seq RESTART WITH 1")
    db.session.commit()
