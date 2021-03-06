"""all new tables

Revision ID: 93774cff74f4
Revises: 2a1070cb1e54
Create Date: 2021-03-17 18:22:48.770471

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '93774cff74f4'
down_revision = '2a1070cb1e54'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('seen_users',
    sa.Column('seen_by_id', sa.Integer(), nullable=True),
    sa.Column('user_that_has_been_seen_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['seen_by_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_that_has_been_seen_id'], ['users.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('seen_users')
    # ### end Alembic commands ###
