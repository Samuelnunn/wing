from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, GenderPreference, Gender, SeenByUser


match_routes = Blueprint('matches', __name__)

def match_to_dict(match):
    return {
        "id": match.id,
        "first_name": match.first_name,
        "last_name": match.last_name,
        "age": match.age,
        "zip_code": match.zip_code,
        "gender_id": match.gender_id,
        "bio": match.bio,
        "profile_photo_url": match.profile_photo_url,
    }

def list_compare(list1, list2):
    non_matching_users = []
    for i in list1:
        if i not in list2:
            non_matching_users.append(i)
    return non_matching_users

@match_routes.route("/", methods=["GET"])
# @login_required
def match():
    user = User.query.get(current_user.id).id
    users_gender_preference_id = GenderPreference.query.filter(user == GenderPreference.user_id).all()
    users_already_matched = User.query.filter(User.id == current_user.id).first()
    my_current_user = User.query.get(current_user.id)
    matching_users = my_current_user.both_users_matched().all()
    gender_id_join = []
    for gender_ids in users_gender_preference_id:
        gender_id_join.append(Gender.query.filter(gender_ids.id == Gender.id).all())
    gender_names = []
    for gender_name in gender_id_join:
        gender_names.append(gender_name[0].gender_name)
    possible_matches = []
    for possible_match in gender_names:
        possible_matches.append(User.query.filter(User.gender_id != possible_match).all())
    users_to_return = []
    for matches in possible_matches:
        for data in matches:
            if user != data.id:
                users_to_return.append(data)
    
    return jsonify([output_user.to_dict() for output_user in users_to_return])
    

@match_routes.route("/matched/<int:id_param>", methods=["POST"])
# @login_required
def match_user(id_param):
    user = User.query.filter(User.id == current_user.id).first()
    user_to_match = User.query.filter(User.id == id_param).first()
    user_to_match.matches.append(user)
    db.session.add(user)
    db.session.commit()
    matches_to_return = []
    for match in user.matches:
        matches_to_return.append(match_to_dict(match))
    return jsonify(matches_to_return)

@match_routes.route("/unmatch/<int:id_param>", methods=["DELETE"])
# @login_required
def unmatch_user(id_param):
    user = User.query.filter(User.id == current_user.id).first()
    user_to_unmatch = User.query.filter(User.id == id_param).first()
    user_to_unmatch.matches.remove(user)
    db.session.add(user)
    db.session.add(user_to_unmatch)
    db.session.commit()
    matches_to_return = []
    for match in user.matches:
        matches_to_return.append(match_to_dict(match))
    return jsonify(matches_to_return)


@match_routes.route("/matched/", methods=["GET"])
# @login_required
def users_match():
    user = User.query.get(current_user.id)
    matching_users = user.users_that_matched().all()
    both_matched = user.both_users_matched().all()
    id_compare_to_match = []
    matches_to_return = []
    for matching in both_matched:
        for match in matching_users:
            if(match == matching):
                matches_to_return.append(match_to_dict(match))
    return jsonify(matches_to_return)

@match_routes.route("/want/", methods=["GET"])
# @login_required
def users_match_to_current_user():
    user = User.query.get(current_user.id)
    matching_users = user.users_that_matched().all()
    matches_to_return = []
    for match in matching_users:
            matches_to_return.append(match_to_dict(match))
    return jsonify(matches_to_return)

@match_routes.route("/seen/<int:id_param>", methods=["POST"])
# @login_required
def seen_by_current_user(id_param):
    # def seen_info(self):
    #     return {
    #         "seenUser": self.seen_by_user_id,
    #         "currentUser": self.user_id
    #     }
    # user = User.query.get(current_user.id)
    # user_has_been_seen = User.query.filter(User.id == id_param).first()
    # seen_by = SeenByUser(
    #     seen_by_user_id=current_user.id,
    #     user_id=user_has_been_seen.id
    # )
    user_to_be_seen = User.query.get(id_param)
    current_user.seen_users.append(user_to_be_seen)
    db.session.add(current_user)
    db.session.commit()
    return current_user.to_dict()

@match_routes.route("/seen/", methods=["GET"])
# @login_required
def users_seen_by_current_user():
    # def seen_info(seen):
    #     return {
    #         "seenUser": seen.user_that_has_been_seen_id,
    #         "currentUser": seen.seen_by_id
    #     }
    # user = User.query.get(current_user.id).id/


    user_has_been_seen = current_user.users_that_have_been_seen().all()
    users_to_return = []
    for users in user_has_been_seen:
            users_to_return.append(users.id)
            print(users)
    return jsonify({'seenUsersIds': users_to_return})




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
