#-*- coding:utf-8 -*-
from flask import Flask, request, jsonify, render_template
from dao_test import database
from operator import itemgetter
import pymysql
import json

divide_cnt = 500
max_cnt = 499

app = Flask(__name__)

@app.route('/main/test', methods=['POST'])
def post_test():
    data = request.get_json()
    print(data)
    res = {
        "res" : '성공'
    }
    return json.dumps(res,ensure_ascii=False)

@app.route('/main')
def main():
    database.TestCreateFeed()
    #data = database.CreateFeedTable(49)
    return 'Main Page'

@app.route('/test')
def tester():
    test_str = database.CheckLogin('hello','pw')
    print('test라우트에서 받아옴')
    print(test_str)
    return 'good'

############회원가입Fragment#########
#회원가입 버튼을 눌렀을경우
#아이디,비밀번호,닉네임,이메일 중복검사
@app.route('/login/register', methods=['POST'])
def register():
    data = request.get_json()
    res = database.CheckRegister(data["id"],data["pw"],data["name"],data["email"])
    return json.dumps(res,ensure_ascii=False)

###########################
############로그인Fragment############
#로그인을 눌렀을 경우
#아이디 검사후 비밀번호 일치하는지 확인 맞으면 true반환
@app.route('/login/check', methods=['POST'])
def login():
    data = request.get_json()
    db_data = database.CheckLogin(data["id"],data["pw"])
    if db_data == 'n':
        res = {"type" : True}
        res["type"] = False
        res["user_key"] = 0
        res["id"] = ''
        res["pw"] = ''
        res["name"] = ''
        res["email"] = ''
    else:
        res = {"type" : True, "user_key":"","id":"","pw":"","name":"","email":""}
        res["type"] = True
        res["user_key"] = db_data[0][0]
        res["id"] = db_data[0][1]
        res["pw"] = db_data[0][2]
        res["name"] = db_data[0][3]
        res["email"] = db_data[0][4]
    return json.dumps(res,ensure_ascii=False)


#############FeedFragment############
###########################
##
#피드Fragment onCreate상태일 때
#최신꺼기준으로 내림차순정렬해서 20개보여줌
#마지막에 보여준 feed_key값도보내기
@app.route('/feed/main/getfirst', methods=['GET'])
def main_get_feed():
    result = database.ShowFirstFeed()
    res = list()
    for i in range(len(result)):
        res.append({
            "feed_key" : result[i][1],
            "name" : result[i][2],
            "count" : result[i][3],
            "left_count" : result[i][4],
            "right_count" : result[i][5],
            "left_content": result[i][6],
            "right_content" : result[i][7],
            "comment_count": result[i][8]
        })
    return json.dumps(res,ensure_ascii=False)
###########################
##
#사용자가 밑으로 당겼을경우
#마지막에 보여준 feed_key값보다 낮은걸로 내림차순정렬해서 15개보여줌
@app.route('/feed/main/get/<int:key>', methods=['GET'])
def main_get_feed_scroll(key):
    result = database.ShowNextFeed(key)
    res = list()
    for i in range(len(result)):
        res.append({
            "feed_key" : result[i][1],
            "name" : result[i][2],
            "count" : result[i][3],
            "left_count" : result[i][4],
            "right_count" : result[i][5],
            "left_content": result[i][6],
            "right_content" : result[i][7],
            "comment_count": result[i][8]
        })
    return json.dumps(res,ensure_ascii=False)
    


############################
#좋아요를 눌렀을경우
#해당 피드 like_count,count증가
#SelectInfo에 추가
@app.route('/feed/push/leftselect', methods=['POST'])
def main_get_feed_like():
    data = request.get_json()
    #선택했는지 확인
    res = dict()
    if database.CheckFeedSelect(data["user_key"],data["feed_key"]):
        #추가해야할경우
        database.UpdateFeedSelect(True,data["user_key"],data["feed_key"])
        res["result"] = True
    else:
        #추가하지말아야할 경우
        res["result"] = False
    return json.dumps(res,ensure_ascii=False)

#############################
#싫어요를 눌렀을경우
#해당 피드 unlike_count,count증가
#SelectInfo에 추가
@app.route('/feed/push/rightselect', methods=['POST'])
def main_get_feed_unlike():
    data = request.get_json()
    #선택했는지 확인
    res = dict()
    if database.CheckFeedSelect(data["user_key"],data["feed_key"]):
        #추가해야할경우
        database.UpdateFeedSelect(False,data["user_key"],data["feed_key"])
        res["result"] = True
    else:
        #추가하지말아야할 경우
        res["result"] = False
    return json.dumps(res,ensure_ascii=False)

############질문작성Fragment##############
###########################
##
#작성했을경우
#FeedInfo에추가
@app.route('/feed/edit', methods=['POST'])
def main_feed_edit():
    data = request.get_json()
    database.InsertFeed(data["user_key"],data["name"],data["left_content"],data["right_content"])
    res = dict()
    res["result"] = True
    return json.dumps(res,ensure_ascii=False)

############베스트Fragment##############
###########################
##
#피드Fragment onCreate상태일 때
#count 수 기준으로 내림차순정렬해서 100개보여줌
#마지막에 보여준 count값도보내기
@app.route('/feed/best/getfirst', methods=['GET'])
def main_get_feed_best():
    result = database.ShowBestFeed()
    res = list()
    for i in range(len(result)):
        res.append({
            "feed_key" : result[i][1],
            "name" : result[i][2],
            "count" : result[i][3],
            "left_count" : result[i][4],
            "right_count" : result[i][5],
            "left_content": result[i][6],
            "right_content" : result[i][7],
            "comment_count": result[i][8]
        })
    return json.dumps(res,ensure_ascii=False)


# ###########################
# #사용자가 밑으로 당겼을경우
# #마지막에 보여준 count값보다 낮은걸로 내림차순정렬해서 15개보여줌
# #마지막에 보여준 count값도보내기
# @app.route('/feed/best/get/<int:key>', methods=['GET'])
# def main_get_feed_scroll_best(key):
#     return 'not'


#############좋아요와 싫어요는 구현이 되어있다#############


############내정보Fragment##############
###########################
##
#피드Fragment onCreate상태일 때
#우선 사용자 key값만 필터
#최신꺼기준으로 내림차순정렬해서 30개보여줌
#마지막에 보여준 feed_key값도보내기
@app.route('/feed/myinfo/<int:key>', methods=['GET'])
def main_get_feed_myinfo(key):
    # conn = database.getConnection()
    # cursor = conn.cursor()
    # sql = 'SELECT * FROM `FeedInfo` WHERE `user_key`= %d ORDER BY `feed_key` DESC LIMIT 20' %(key)
    # cursor.execute(sql)
    # result = cursor.fetchall()
    result = database.ShowMyFeed(key)
    res = list()
    for i in range(len(result)):
        res.append({
            "feed_key" : result[i][1],
            "name" : result[i][2],
            "count" : result[i][3],
            "left_count" : result[i][4],
            "right_count" : result[i][5],
            "left_content": result[i][6],
            "right_content" : result[i][7],
            "comment_count": result[i][8]
        })
    return json.dumps(res,ensure_ascii=False)


###########################
#사용자가 밑으로 당겼을경우
#마지막에 보여준 feed_key값보다 낮은걸로 내림차순정렬해서 15개보여줌
#마지막 feed_key값 보내기
@app.route('/feed/myinfo/get', methods=['POST'])
def main_get_feed_scroll_myinfo():
    data = request.get_json()
    result = database.ShowScrollMyFeed(data["user_key"],data["feed_key"])
    # conn = database.getConnection()
    # cursor = conn.cursor()
    # #data["user_key"],data["feed_key"]
    # sql = 'SELECT * FROM `FeedInfo` WHERE `user_key`= %d AND `feed_key` < %d ORDER BY `feed_key` DESC LIMIT 15' %(data["user_key"],data["feed_key"])
    # cursor.execute(sql)
    # result = cursor.fetchall()
    res = list()
    for i in range(len(result)):
        res.append({
            "feed_key" : result[i][1],
            "name" : result[i][2],
            "count" : result[i][3],
            "left_count" : result[i][4],
            "right_count" : result[i][5],
            "left_content": result[i][6],
            "right_content" : result[i][7],
            "comment_count": result[i][8]
        })
    return json.dumps(res,ensure_ascii=False)


############내가선택한게시글Activity############
############################
#onCreate일때
#서브쿼리이용해서 SelectInfo테이블에 있는 키값들 빼와서 가져와서 다보내주고
#내림차순정렬해서 15개보여줌
@app.route('/feed/myselect/getfirst/<int:_key>', methods=['GET'])
def main_get_feed_myselect(_key):
    data = request.get_json()
    conn = database.getConnection()
    cursor = conn.cursor()
    sql = 'SELECT * FROM `FeedInfo` WHERE `feed_key` IN (SELECT `feed_key` FROM `SelectInfo` WHERE `user_key` = %d) ORDER BY `feed_key` DESC LIMIT 100' %(_key)
    cursor.execute(sql)
    result = cursor.fetchall()
    sql = 'SELECT * FROM `SelectInfo` WHERE `user_key` = %d ORDER BY `feed_key` DESC LIMIT 100' %(_key)
    cursor.execute(sql)
    sort_key = cursor.fetchall()
    res = list()
    for i in range(len(result)):
        res.append({
            "feed_key" : result[i][1],
            "name" : result[i][2],
            "count" : result[i][3],
            "left_count" : result[i][4],
            "right_count" : result[i][5],
            "left_content": result[i][6],
            "right_content" : result[i][7],
            "comment_count": result[i][8],
            "sort_key": sort_key[i][0]
        })
    res = sorted(res,key=itemgetter('sort_key'),reverse=True)
    return json.dumps(res,ensure_ascii=False)

###########################
#사용자가 밑으로 당겼을경우
#마지막에 보여준 feed_key값보다 낮은걸로 내림차순정렬해서 15개보여줌
@app.route('/feed/myselect/get/<int:key>', methods=['GET'])
def main_get_feed_scroll_myselect(key):
    return key


###########################
#CommentActivity
#입력했을때
@app.route('/feed/comment/input', methods=['POST'])
def main_post_feed_comment():
    data = request.get_json()
    req = dict()
    req["feed_key"] = data["feed_key"]
    req["name"] = data["name"]
    req["comment"] = data["comment"]
    res = dict()
    if(database.InsertComment(req["feed_key"],req["name"],req["comment"])):
        res["result"] = True
    else:
        res["result"] = False
    return json.dumps(res,ensure_ascii=False)

#보여주기
@app.route('/feed/comment/get/<int:key>', methods=['GET'])
def main_get_feed_comment(key):
    conn = database.getConnection()
    cursor = conn.cursor()
    table_key = key/divide_cnt
    sql = 'SELECT * FROM `CommentInfo%d` WHERE `feed_key` = %d'%(table_key,key)
    cursor.execute(sql)
    result = cursor.fetchall()
    res = list()
    for i in range(len(result)):
        res.append({
            "comment_key":result[i][0],
            "name":result[i][2],
            "content":result[i][3]
        })
    return json.dumps(res,ensure_ascii=False)


if __name__ == '__main__':
    app.run(host = '0.0.0.0',port=5080)