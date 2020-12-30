import datetime
import mongoengine
from app.helpers.mongo.mongo_helper import mongo_to_dict

class Transaction(mongoengine.DynamicDocument):
    name = mongoengine.StringField(required=True)
    price = mongoengine.FloatField(required=True)
    discount = mongoengine.FloatField(required=True)
    total = mongoengine.FloatField(required=True)
    lastUpdate = mongoengine.DateTimeField(default=datetime.datetime.utcnow())
    meta = {
        'auto_create_index': False,
        'index_background': True,
        'indexes': [
            'name'
        ],
        'collection': 'transactions'
    }

    def save(self, *args, **kwargs):
        self.lastUpdate = datetime.datetime.utcnow()
        return super(Transaction, self).save(*args, **kwargs)

    @staticmethod
    def get_all_transactions():
        existing = Transaction.objects()
        all_transactions = []
        for transaction in existing:
            all_transactions.append(transaction.to_dict())
        return all_transactions

    @staticmethod
    def get_all_transactions_as_mongo_documents(name):
        existing = Transaction.objects(name=name).first()
        return existing

    def to_dict(self):
        return mongo_to_dict(self, [])