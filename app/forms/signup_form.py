from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, \
                    TextAreaField, SelectMultipleField
from flask_wtf.file import FileField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


genders = ["Woman", "Cis Woman", "Trans Woman", "Man",
           "Cis Man", "Trans Man", "Agender", "Androgynous",
           "Bigender", "GenderFluid", "GenderQueer",
           "Gender Nonconforming", "Hijra", "Intersex",
           "Non-binary", "Other", "Pangender", "Transfeminine",
           "Transmasculine", "Transsexual", "Two Spirit"]


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    first_name = StringField('first name', validators=[DataRequired()])
    last_name = StringField('last name', validators=[DataRequired()])
    age = IntegerField('age', validators=[DataRequired()])
    zip_code = IntegerField("zipCode", validators=[DataRequired()])
    bio = TextAreaField('bio', validators=[DataRequired()])
    gender_id = StringField('gender',  validators=[DataRequired()])
    profile_photo_file = FileField('profile photo')
