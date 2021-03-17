# from .db import db
# import datetime


# class Match(db.Model):
#     __tablename__ = "matches"

#     id = db.Column(db.Integer, primary_key=True)
#     matcher_id = db.Column(
#         db.Integer, db.ForeignKey("users.id"), nullable=False)
#     matched_id = db.Column(
#         db.Integer, db.ForeignKey("users.id"), nullable=False)
#     created_at = db.Column(db.DateTime, nullable=False,
#                           default=datetime.datetime.utcnow)
#     updated_at = db.Column(db.DateTime, nullable=False,
#                           default=datetime.datetime.utcnow)

#     matcher = db.relationship("User", foreign_keys=[matcher_id], back_populates="matcher_user")
#     matched = db.relationship("User", foreign_keys=[matched_id], back_populates="matched_user")

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "matcherId": self.matcher_id,
#             "matchedId": self.matched_id,
#             "createdAt": self.createdAt,
#             "updatedAt": self.updatedAt,
#         }
    
