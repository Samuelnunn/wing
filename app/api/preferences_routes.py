from flask import Blueprint, jsonify, session, request
from werkzeug.utils import secure_filename
from app.models import Gender, db
from app.forms import GenderPreferenceForm

preference_routes = Blueprint('preference', __name__)

@preference_routes.route('/genders', methods=['POST'])
def gender_perferences():
    form = GenderPreferenceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        gender_perferences = Gender(
            gender_name=form.data['gender_preference']
        ) 
        db.session.add(gender_perferences)
        db.session.commit()
        return gender_perferences.to_dict()
    