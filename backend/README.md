# Image market backend

Image market is an image repository used to buy and sell images

This application is intended the [Shopify Challenge for Web Developer interns](https://docs.google.com/document/d/1ZKRywXQLZWOqVOHC4JkF3LqdpO3Llpfk_CkZPR8bjak/edit)

## Technologies

* Python
* Flask
* MongoDB

## Setup

Instructions to build locally:

1. Install [Python](https://www.python.org/)

2. Install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)

2. Clone this repository:
```
git clone https://github.com/phong1233/image_market.git
cd image_market
cd backend
```

3. Install dependencies:
```
make install
```

3. Start mongodb:
```
sudo mongod
```

4. Run the development server:
```
make start
```