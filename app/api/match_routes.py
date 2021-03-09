from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, GenderPreference, Gender


match_routes = Blueprint('matches', __name__)


def match_to_dict(match):
    return {
        "id": match.id,
        "first_name": match.first_name,
        "last_name": match.last_name,
        "age": match.age,
        "zip_code": match.zip_code,
        "gender_id": match.gender_id,
        "profile_photo_url": match.profile_photo_url,
    }

@match_routes.route("/", methods=["GET"])
# @login_required
def match():
    user = User.query.get(current_user.id).id
    users_gender_preference_id = GenderPreference.query.filter(user == GenderPreference.user_id).all()
    gender_id_join = []
    for gender_ids in users_gender_preference_id:
        gender_id_join.append(Gender.query.filter(gender_ids.id == Gender.id).all())
    gender_names = []
    for gender_name in gender_id_join:
        gender_names.append(gender_name[0].gender_name)
    possible_matches = []
    for possible_match in gender_names:
        possible_matches.append(User.query.filter(User.gender_id == possible_match).all())
    users_to_return = []
    for information in possible_matches:
        for nestedinfo in information:
            users_to_return.append(match_to_dict(nestedinfo))
    print('!!!!!!!!!!!!!!!!!!!!', users_to_return)
    return jsonify(users_to_return)
    
# #     user_to_match = User.query.filter(User.id == current_user).first()
# #     user.matchers.append(user_to_match)
# #     user_to_match.matches.append(user)
# #     db.session.add(user)
# #     db.session.add(user_to_match)
# #     db.session.commit()
# #     match_to_return = []
# #     for match in user.matchers:
# #         match_to_return.append(match_to_dict(match))
# #     return jsonify(match_to_return)


# @match_routes.route("/matched/<int:id_param>", methods=["POST"])
# @login_required
# def match(id_param):
#     user = User.query.filter(User.id == current_user.id).first()
#     print(user, current_user)
#     user_to_match = User.query.filter(User.id == current_user).first()
#     user.matchers.append(user_to_match)
#     user_to_match.matches.append(user)
#     db.session.add(user)
#     db.session.add(user_to_match)
#     db.session.commit()
#     match_to_return = []
#     for match in user.matchers:
#         match_to_return.append(match_to_dict(match))
#     return jsonify(match_to_return)


# @match_routes.route("/unmatch/<int:id_param>", methods=["POST"])
# @login_required
# def unmatch(id_param):
#     user = User.query.filter(User.id == current_user.id).first()
#     user_to_unmatch = User.query.filter(User.id == id_param).first()
#     user.matchers.remove(user_to_unmatch)
#     user_to_unmatch.matches.remove(user)
#     db.session.add(user)
#     db.session.add(user_to_unmatch)
#     db.session.commit()
#     match_to_return = []
#     for match in user.matchers:
#         match_to_return.append(match_to_dict(match))
#     return jsonify(match_to_return)
