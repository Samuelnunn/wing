from .db import db
import datetime


class Message(db.Model):
    __tablename__ = "messages"
    id = db.Column(db.Integer, primary_key=True)
    read = db.Column(db.Boolean, nullable=False)
    content = db.Column(db.String(140), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey("users.id"),
                            nullable=False)
    message_sender_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                          default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                          default=datetime.datetime.utcnow)
    recipient = db.relationship("User",
                             foreign_keys=[recipient_id],
                             back_populates="sent_messages")
    sender = db.relationship("User",
                             foreign_keys=[message_sender_id],
                             back_populates="recieved_messages")

    def to_dict(self):
        return {
            "id": self.id,
            "read": self.read,
            "content": self.content,
            "recipientId": self.recipient_id,
            "messageSenderId": self.message_sender_id,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
