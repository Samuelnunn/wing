from .db import db
import datetime


class Photo(db.Model):
    __tablename__ = "photos"

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    photo_key = db.Column(db.String, nullable=False)
    createdAt = db.Column(db.DateTime,
                          default=datetime.datetime.utcnow)
    updatedAt = db.Column(db.DateTime,
                          default=datetime.datetime.utcnow)
    user = db.relationship("User", back_populates="photos")
