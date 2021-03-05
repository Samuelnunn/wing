from flask_wtf import FlaskForm
from wtforms import StringField, SelectMultipleField
from wtforms.validators import DataRequired


class GenderPreferenceForm(FlaskForm):
     gender_perference = StringField('gender preferences', validators=[DataRequired()])