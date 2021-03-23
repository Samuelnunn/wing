from app.models import db, User, GenderPreference


def seed_gender_preferences():
    users = User.query.all()
    for u in users:
        entry = GenderPreference(
            user_id=u.id, gender_id=2
        )
        db.session.add(entry)
    db.session.commit()
# gender_id will need to be watched

def undo_seed_gender_preferences():
    db.session.execute('TRUNCATE gender_preferences CASCADE;')
    db.session.execute("ALTER SEQUENCE gender_preferences_id_seq RESTART WITH 1")
    db.session.commit()
