from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Match


def match_to_dict(follow):
    return {
        "id": follow.id,
    }


match_routes = Blueprint('matches', __name__)


@match_routes.route("/match/<int:id_param>", methods=["POST"])
@login_required
def match(id_param):
    user = User.query.filter(User.id == current_user.id).first()
    user_to_match = User.query.filter(User.id == current_user).first()
    user.matchers.append(user_to_match)
    user_to_match.matches.append(user)
    db.session.add(user)
    db.session.add(user_to_match)
    db.session.commit()
    match_to_return = []
    for match in user.matchers:
        match_to_return.append(match_to_dict(match))
    return jsonify(match_to_return)


@match_routes.route("/unmatch/<int:id_param>", methods=["POST"])
@login_required
def unmatch(id_param):
    user = User.query.filter(User.id == current_user.id).first()
    user_to_unmatch = User.query.filter(User.id == id_param).first()
    user.matchers.remove(user_to_unmatch)
    user_to_unmatch.matches.remove(user)
    db.session.add(user)
    db.session.add(user_to_unmatch)
    db.session.commit()
    match_to_return = []
    for match in user.matchers:
        match_to_return.append(match_to_dict(match))
    return jsonify(match_to_return)
