"""new user column

Revision ID: 1375ec669575
Revises: 027c0400e749
Create Date: 2021-03-16 15:23:02.149483

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1375ec669575'
down_revision = '027c0400e749'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('seen_by_user', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'seen_by_user')
    # ### end Alembic commands ###
