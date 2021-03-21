from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from werkzeug.utils import secure_filename
from app.models import Gender, GenderPreference, User, db
from app.forms import GenderPreferenceForm

preference_routes = Blueprint('preference', __name__)

@preference_routes.route('/genders/', methods=['GET'])
def gender_list():
    all_genders_in_db = Gender.query.all()
    gender_names = []
    for genders in all_genders_in_db:
        gender_names.append(genders.gender_name)
    return jsonify(gender_names)
    
@preference_routes.route('/genders/<int:id_param>', methods=['PUT'])
def gender_perferences(id_param):
    user = User.query.filter(User.id == current_user.id).first()
    user_preference = GenderPreference.query.filter(user.id == GenderPreference.user_id).first()
    confirmation = user_preference.gender_id = id_param
    db.session.commit()
    return 'Gender updated!'
    