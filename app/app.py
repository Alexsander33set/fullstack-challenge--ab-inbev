from flask import Flask

from routes.client import client
from routes.api import api

from config import PORT

app = Flask(__name__)

app.register_blueprint(blueprint=client, url_prefix='/')
app.register_blueprint(api)

if __name__ == "__main__":
    #* Recommend to use a production WSGI server like Gunicorn
    app.run(debug=True, port=PORT)