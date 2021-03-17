from app.models import db, Gender

genders = [
    "Woman", "Cis Woman", "Trans Woman", "Man",
    "Cis Man", "Trans Man", "Agender", "Androgynous",
    "Bigender", "GenderFluid", "GenderQueer",
    "Gender Nonconforming", "Hijra", "Intersex",
    "Non-binary", "Other", "Pangender", "Transfeminine",
    "Transmasculine", "Transsexual", "Two Spirit"
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