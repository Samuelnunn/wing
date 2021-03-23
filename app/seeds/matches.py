from app.models import db, User, matches
# from app.models.user import matches


def seed_matches():
    users = User.query.first()
    matched = users.matches.append(3)
    # users2 = User.query.second()
    # myNewMatch = myMatch(
    #     matcher_id = 1, matched_id=2
    # )
    
    
    
    # print('!!!!!!!!!!!!!!!!!!!!!!', User.users_that_matched(users))
    # print('!!!!!!!!!************************', users.matchers.append(1))
        
    # entry = users.matchers = 1, 2
    # entry2 = users.matchers.matched_id = 2
    # print(entry, "!!!!!!!!!!!!!!!")
    # db.session.add(entry)
    # db.session.add(entry2)
    db.session.add(matched)
    db.session.commit()

def undo_matches():
    db.session.execute('TRUNCATE matches CASCADE;')
    db.session.execute("ALTER SEQUENCE matches_id_seq RESTART WITH 1")
    db.session.commit()