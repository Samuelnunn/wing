from .db import db
import datetime

genderPreferences = db.Table(
    "gender_preferences",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"),
              primary_key=True
              ),
    db.Column("gender_id", db.Integer, db.ForeignKey("genders.id"),
              primary_key=True
              )
)
