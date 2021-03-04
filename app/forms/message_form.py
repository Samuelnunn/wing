from flask_wtf import FlaskForm

from wtforms import StringField
from flask_wtf.file import FileField
from wtforms.validators import DataRequired, ValidationError
from app.models import messages


class MessageForm(FlaskForm):
    message_content = FileField('content',  validators=[DataRequired()]),
