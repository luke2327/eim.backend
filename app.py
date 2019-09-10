from flask import Flask
from app.dao import database
import json

app = Flask(__name__)


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


if __name__ == '__main__':
    app.run(host = '0.0.0.0', port=6050)
