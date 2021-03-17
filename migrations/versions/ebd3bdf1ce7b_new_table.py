"""new table

Revision ID: ebd3bdf1ce7b
Revises: 1375ec669575
Create Date: 2021-03-16 15:46:07.515208

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ebd3bdf1ce7b'
down_revision = '1375ec669575'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('seen_by_users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('seen_by_user_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_column('users', 'seen_by_user')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('seen_by_user', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_table('seen_by_users')
    # ### end Alembic commands ###
