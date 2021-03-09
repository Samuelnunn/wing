from .db import db
from .gender_preferences import GenderPreference
import datetime


class Gender(db.Model):
    __tablename__ = "genders"

    id = db.Column(db.Integer, primary_key=True)
    gender_name = db.Column(db.String(40), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                          default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                          default=datetime.datetime.utcnow)
    # user = db.relationship("User", lazy="dynamic",               
    #                        back_populates="genders",
    #                        secondary="gender_preferences")
    user = db.relationship("GenderPreference", back_populates='gender')
    

    def to_dict(self):
        return {
            "id": self.id,
            "genderName": self.gender_name,
        }
