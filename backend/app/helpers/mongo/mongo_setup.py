from mongoengine import connect
from config import config

mongo_config = config['database']

db_connection = connect(
    mongo_config['name'],
    'default',
    **mongo_config['mongo-default']
)
