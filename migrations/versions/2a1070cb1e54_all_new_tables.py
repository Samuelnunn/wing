"""all new tables

Revision ID: 2a1070cb1e54
Revises: 45c0837ce824
Create Date: 2021-03-16 23:01:35.925174

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '2a1070cb1e54'
down_revision = '45c0837ce824'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('matches', 'matched_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('matches', 'matcher_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.drop_column('matches', 'updated_at')
    op.drop_column('matches', 'created_at')
    op.drop_column('matches', 'id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('matches', sa.Column('id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('matches', sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False))
    op.add_column('matches', sa.Column('updated_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False))
    op.alter_column('matches', 'matcher_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('matches', 'matched_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###