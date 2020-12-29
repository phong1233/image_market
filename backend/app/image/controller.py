from flask import Blueprint, request
from app.helpers.decorators import return_json
from app.image.service import Service as ImageService

image_service = ImageService()

image_routes = Blueprint('image_routes', __name__)

@image_routes.route('/', methods=['GET'])
@return_json
def get_all_images():
    return image_service.get_all_images()

@image_routes.route('/', methods=['POST'])
@return_json
def create_new_image():
    data = request.get_json()
    return image_service.create_new_image(data['name'], data['description'], data['price'], data['image'])

@image_routes.route('/edit', methods=['POST'])
@return_json
def edit_image():
    data = request.get_json()
    return image_service.edit_image(data['name'], data['description'], data['price'], data['image'], data['discount'])

@image_routes.route('/', methods=['DELETE'])
@return_json
def delete_image():
    data = request.get_json()
    return image_service.delete_image(data['name'])