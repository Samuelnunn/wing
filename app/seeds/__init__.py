from flask.cli import AppGroup
from .users import seed_users, undo_users
from .genders import seed_genders, undo_genders
from .gender_preferences import seed_gender_preferences, undo_seed_gender_preferences
from .messages import seed_messages, undo_messages
# from .matches import seed_matches, undo_matches

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_genders()
    seed_gender_preferences()
    # seed_matches()
    seed_messages()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_genders()
    # undo_matches()
    undo_users()
    undo_seed_gender_preferences()
    undo_messages()
