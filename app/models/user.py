from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime
from .gender_preferences import GenderPreference

matches = db.Table(
    'matches',
    db.Model.metadata,
    db.Column("matcher_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("matched_id", db.Integer, db.ForeignKey("users.id"))
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    bio = db.Column(db.String(140), nullable=False)
    gender_id = db.Column(db.String(40), nullable=False)
    hashed_password = db.Column(db.String, nullable=False)
    profile_photo_url = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime,
                          default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime,
                          default=datetime.datetime.utcnow)

    genders = db.relationship("GenderPreference", back_populates="user")
    sent_messages = db.relationship("Message", foreign_keys="Message.message_sender_id", 
                                    back_populates="sender")
    recieved_messages = db.relationship("Message", foreign_keys="Message.recipient_id", 
                                    back_populates="recipient")
    photos = db.relationship("Photo", back_populates="user",
                             cascade="all, delete-orphan")
    matchers = db.relationship(
        "User",
        secondary=matches,
        primaryjoin=(matches.c.matcher_id == id),
        secondaryjoin=(matches.c.matched_id == id),
        backref=db.backref("matches", lazy="dynamic"),
        lazy="dynamic"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "age": self.age,
            "bio": self.bio,
            "genderId": self.gender_id,
            "profilePhotoUrl": self.profile_photo_url
        }
