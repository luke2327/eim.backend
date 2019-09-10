from flask_restful import Resource
import os, sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))))

from dao import database;

class GetYoutubeList(Resource):
    def __init__(self):
        print 'Hello!'
    def post(self):
        try:
            res = database.getYoutubeList()
        except Exception as e:
            res = e
        
        try:
            print type(res)
            if res is None:
                print 'is none!!'
        except Exception as e:
            print e
        # return { 'response': res }