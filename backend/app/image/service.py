from app.image.model import Image
from app.helpers.response import response_code_and_message

class Service:
    def persist_image_to_mongo(self, image):
        try:
            image.save()
            return True
        except RuntimeError:
            return False

    def create_new_image(self, name, description, price, image):
        existing = Image.get_image_from_name(name=name)
        if existing:
            return response_code_and_message(409, 'Image already exist')

        new_image = Image(
            name=name,
            description=description,
            price=price,
            discount=0,
            image=image
        )

        if self.persist_image_to_mongo(new_image):
            return response_code_and_message(200, 'Image has been created')
        return response_code_and_message(500)

    def edit_image(self, name, description, price, image, discount):
        existing = Image.get_image_as_mongo_document(name=name)
        if not existing:
            return response_code_and_message(409, 'Image does not exist')

        existing.delete()

        new_image = Image(
            name=name,
            description=description,
            price=price,
            discount=discount,
            image=image
        )

        if self.persist_image_to_mongo(new_image):
            return response_code_and_message(200, 'Image has been edited')
        return response_code_and_message(500)

    def delete_image(self, name):
        existing = Image.get_image_as_mongo_document(name=name)
        if not existing:
            return response_code_and_message(409, 'Image does not exist')

        existing.delete()
        return response_code_and_message(200, 'Image has been deleted')

    def get_all_images(self):
        return Image.get_all_images()
    
    def get_image_from_name(self, name):
        return Image.get_image_from_name(name)
