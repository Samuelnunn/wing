# from app.models import db, User
# from app.models.user import matches


# def seed_matches():
#     users = User.query.all()
#     print(matches, "!!!!!!!!!!!!!!!!!!")
#     for u in users[::2]:
#         # print('!!!!!!!!!!!!!!!!!!!!!!', User.users_that_matched(u))
#         # print('!!!!!!!!!************************', u.matchers.append(1), users[::2])
        
#         entry = User(
#             matchers=primaryjoin=u.id
#         )
#         db.session.add(entry)
#     db.session.commit()

# def undo_matches():
#     db.session.execute('TRUNCATE matches CASCADE;')
#     db.session.execute("ALTER SEQUENCE matches_id_seq RESTART WITH 1")
#     db.session.commit()