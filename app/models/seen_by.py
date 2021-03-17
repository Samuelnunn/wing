from .db import db
import datetime


class SeenByUser(db.Model):
    __tablename__ = "seen_by_users"

    id = db.Column(db.Integer, primary_key=True)
    seen_by_user_id = db.Column(db.Integer, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    createdAt = db.Column(db.DateTime,
                          default=datetime.datetime.utcnow)
    updatedAt = db.Column(db.DateTime,
                          default=datetime.datetime.utcnow)
    user = db.relationship("User", back_populates="seen_by_id")
