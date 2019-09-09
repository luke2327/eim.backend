from flask_restful import Resource

class GetYoutubeList(Resource):
    def __init__(self):
        print 'Hello!'
    def post(self):
        return {'status': 'success'}