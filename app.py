# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from app.dao import database
import json

app = Flask(__name__)
cors = CORS(app, resources={
    r"/api/*": {"origin": "*"}
})

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/get_youtube_list')
def post():
    try:
        res = database.getYoutubeList()
    except Exception as e:
        res = e
    result = list()
    for i in range(len(res)):
        result.append({
            "link": res[i][0]
        })

    return json.dumps(result,ensure_ascii=False)
@app.route('/api/enhance/dialog/input/search',methods=['POST'])
def search_equip():
    data = request.get_json()

    try:
        res = database.getSearchEnhanceList(data)
    except Exception as e:
        res = e
    return json.dumps(res,ensure_ascii=False)

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port=6050)
