from app.models import db, Gender

genders = [
    "Woman", "Man", "Agender",
    "GenderQueer", "Intersex",
    "Non-binary", "Other","Trans", 
    "Two Spirit"
    ]

def seed_genders():
    for i in range(len(genders)):
        entry = Gender(
            gender_name=genders[i]
        )
        db.session.add(entry)
    db.session.commit()

def undo_genders():
    db.session.execute('TRUNCATE genders CASCADE;')
    db.session.execute("ALTER SEQUENCE genders_id_seq RESTART WITH 1")
    db.session.commit()