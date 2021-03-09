from .db import db
import datetime


class GenderPreference(db.Model):
    __tablename__ = "gender_preferences"
    db.Model.metadata,
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"),
              nullable=False
            )
    gender_id = db.Column(db.Integer, db.ForeignKey("genders.id"),
              nullable=False
            )
    
    user = db.relationship("User", back_populates="genders")
    gender = db.relationship("Gender", back_populates="user")

