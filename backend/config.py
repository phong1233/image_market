import os

defaults = {
    'database': {
        'uri': os.getenv('MONGO_URI', None),
        'name': os.getenv('MONGO_NAME', 'image-market-cluster'),
        'mongo-default': {
            'host': os.getenv('MONGO_HOST', 'localhost'),
            'port': int(os.getenv('MONGO_PORT', '27017')),
            'username': os.getenv('MONGO_USER', ''),
            'password': os.getenv('MONGO_PASS', '')
        }
    }
}

config = defaults
