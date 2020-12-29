import datetime
import mongoengine
from app.helpers.mongo.mongo_helper import mongo_to_dict

class Image(mongoengine.DynamicDocument):
    name = mongoengine.StringField(required=True)
    description = mongoengine.StringField(required=False)
    price = mongoengine.FloatField(required=True)
    discount = mongoengine.FloatField(required=True)
    image = mongoengine.StringField(required=True)
    lastUpdate = mongoengine.DateTimeField(default=datetime.datetime.utcnow())
    meta = {
        'auto_create_index': False,
        'index_background': True,
        'indexes': [
            'name'
        ],
        'collection': 'images'
    }

    def save(self, *args, **kwargs):
        self.lastUpdate = datetime.datetime.utcnow()
        return super(Image, self).save(*args, **kwargs)

    @staticmethod
    def get_all_images():
        existing = Image.objects()
        all_images = []
        for image in existing:
            all_images.append(image.to_dict())
        return all_images

    @staticmethod
    def get_image_from_name(name):
        existing = Image.objects(name=name).first()
        if not existing:
            return existing
        return existing.to_dict()

    @staticmethod
    def get_image_as_mongo_document(name):
        existing = Image.objects(name=name).first()
        return existing

    def to_dict(self):
        return mongo_to_dict(self, [])
