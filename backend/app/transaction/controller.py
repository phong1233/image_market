from flask import Blueprint, request
from app.helpers.decorators import return_json
from app.transaction.service import Service as TransactionService

transaction_service = TransactionService()

transaction_routes = Blueprint('transaction_routes', __name__)

@transaction_routes.route('/', methods=['GET'])
@return_json
def get_all_transactions():
    return transaction_service.get_all_transactions()

@transaction_routes.route('/', methods=['POST'])
@return_json
def create_new_transactions():
    data = request.get_json()
    return transaction_service.create_new_transaction(data['name'])
