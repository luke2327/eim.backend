from flask import Flask
from flask_restful import Api
from app.main.youtube_list import GetYoutubeList

app = Flask(__name__)
api = Api(app)

api.add_resource(GetYoutubeList, '/get_youtube_list')

if __name__ == '__main__':
    app.run(debug=True)
