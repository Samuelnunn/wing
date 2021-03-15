from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Gender, GenderPreference

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['PUT'])
def gender_preference_edit():  
    user = User.query.get(current_user.id).id
    form = GenderPreferenceForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        gender_preferences = Gender(
                gender_name=form.data['gender_preference']
        ) 

        db.session.add(gender_preferences)
        db.session.commit()
        user_id_for_join = user.id
        gender_id_for_join = gender_preferences.id
        gender_join = GenderPreference(
            user_id=user_id_for_join,
            gender_id=gender_id_for_join
        )
        db.session.add(gender_join)
        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}
