from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Message
from app.forms import MessageForm


message_routes = Blueprint('messages', __name__)


@message_routes.route('/', methods=["GET"])
def get_messages():
    user = User.query.filter(User.id == current_user.id).first()
    messages = Message.query.filter(user.id == Message.recipient_id).all()
    formated_messages = []
    def message_info(messages):
        return {
            "messageSenderId": message.to_dict(),
        }
    for message in messages:
        formated_messages.append(message.to_dict())
    formated_and_sorted = []
    sorted_messages = sorted(formated_messages, key = lambda i: i['id'], reverse=True)
    for message in sorted_messages:
        if message['messageSenderId'] not in formated_and_sorted:
            formated_and_sorted.append(message['messageSenderId'])
            formated_and_sorted.append(message)
    remove_int = [message for message in formated_and_sorted if not isinstance(message, int)]
    return{"messages": remove_int}

@message_routes.route('/messagefeed/<int:id_param>', methods=["GET"])
def get_messagefeed(id_param):
    user = User.query.filter(User.id == current_user.id).first()
    messages_from_match = Message.query.filter(id_param == Message.message_sender_id).all()
    message_from_user = Message.query.filter(Message.recipient_id == id_param)
 
    formated_messages = []
    
    for message in messages_from_match:
        formated_messages.append(message.to_dict())
    for message in message_from_user:
        if message.message_sender_id == current_user.id:
            formated_messages.append(message.to_dict())
    sorted_messages = sorted(formated_messages, key = lambda i: i['id'])
    return{"messages": sorted_messages}

@message_routes.route('/messagefeed/<int:id_param>', methods=["PUT"])
def unread_to_read(id_param):
    user = User.query.filter(User.id == current_user.id).first()
    messages_from_match = Message.query.filter(id_param == Message.message_sender_id).all()
    for messages in messages_from_match:
        messages.read = True
    db.session.commit()
    return "Messages read."


@message_routes.route('/message', methods=["GET"])
def get_one_messages():
    user = User.query.filter(User.id == current_user.id).first()
    messages = Message.query.filter(user.id == Message.recipient_id).first()
    def message_info(messages):
        return {
            "messageSenderId": messages.to_dict(),
        }
    return{"messages": messages.to_dict()}


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
        message = Message(
            read=False,
            content=message_data,
            recipient_id=user_to_message.id,
            message_sender_id=user.id,
        )
        db.session.add(message)
        db.session.commit()
        return message_info(message)
    return "Bad Data"
     

