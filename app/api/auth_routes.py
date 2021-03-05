from flask import Blueprint, jsonify, session, request
from werkzeug.utils import secure_filename
from app.models import User, Gender, genderPreferences, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from ..helpers import *
from ..config import Config
from ..helpers import upload_file_to_s3

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    print("--------------------------", request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        print('**************** validate_on_submit', user)
        login_user(user)
        print('**************** user2', user)

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():  
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    file = request.files.get("profile_photo_file")
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        s3_photo_url = 'https://wing.s3.us-east-2.amazonaws.com/Week4_HarleyDavyDoodle.jpg'
        file = form.data['profile_photo_file']
        if file:
            file.filename = secure_filename(file.filename)
            s3_photo_url = upload_file_to_s3(file, Config.S3_BUCKET)
        user = User(
                username=form.data['username'],
                email=form.data['email'],
                first_name=form.data['first_name'],
                last_name=form.data['last_name'],
                age=form.data['age'],
                zip_code=form.data['zip_code'],
                bio=form.data['bio'],
                gender_id=form.data['gender_id'],
                password=form.data['password'],
                profile_photo_url=s3_photo_url,
            )
        gender_preferences = Gender(
                gender_name=form.data['gender_preference']
            ) 
        print('Here I am!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', user)
        db.session.add(user)
        db.session.add(gender_preferences)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
