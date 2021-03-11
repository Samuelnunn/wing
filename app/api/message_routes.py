from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Message
from app.forms import MessageForm


message_routes = Blueprint('messages', __name__)

def message_to_dict(message):
    return {
        "id": message.id,
        "read": message.read,
        "content": message.content,
        "recipient_id": message.recipient_id,
        "message_sender_id": message.message_sender_id,
        "created_at": message.created_at
    }

@message_routes.route('/<int:id_param>', methods=["POST"])
# @login_required
def message_user(id_param):
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user = User.query.filter(User.id == current_user.id).first()
    user_to_message = User.query.filter(User.id == id_param).first()

    def message_info(self):
        return {
            "id": self.id,
            "read": self.read,
            "content": self.content,
            "recipient_id": self.recipient_id,
            "message_sender_id": self.message_sender_id,
            "created_at": self.created_at
        }

    if form.validate_on_submit():
        message_data = request.form.get('content')
        print(message_data, '***********************')
        message = Message(
            read=False,
            content=message_data,
            recipient_id=user_to_message.id,
            message_sender_id=user.id,
        )
        print(message.content, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        db.session.add(message)
        db.session.commit()
        return message_info(message)
    return "Bad Data"
     

