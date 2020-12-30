from app.transaction.model import Transaction
from app.helpers.response import response_code_and_message
from app.image.service import Service as ImageService

class Service:
    def __init__(self, image_service=None):
        self.image_service = ImageService()

    def persist_transaction_to_mongo(self, transaction):
        try:
            transaction.save()
            return True
        except RuntimeError:
            return False

    def create_new_transaction(self, name):
        existing = self.image_service.get_image_from_name(name=name)
        if not existing:
            return response_code_and_message(409, 'Unable to find image')

        total_price = existing['price'] * (1 - existing['discount'])
        new_transaction = Transaction(
            name=name,
            price=existing['price'],
            discount=existing['discount'],
            total=total_price
        )

        if self.persist_transaction_to_mongo(new_transaction):
            return response_code_and_message(200, ('Transaction successfuly, total is: {total}$'.format(total=str(round(total_price, 2)))))
        return response_code_and_message(500)

    def get_all_transactions(self):
        return Transaction.get_all_transactions()
