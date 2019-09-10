#-*- coding:utf-8 -*-
import jsonify
import pymysql

#SelectInfo 에서 select_key는 0이면 left 1이면 right
#일단은 10을기점으로 테이블을 넘기도록함


#cnt = 행제한
#divide_cnt = 나누는기준
divide_cnt = 500
max_cnt = 499

#db연결 담당 함수
def getConnection():
    return pymysql.connect(host='127.0.0.1',port=3306, user='root', password='sin5chel',
                            db='hard_select',charset='utf8')

def CheckLogin(_id,_pw):
    conn = getConnection()
    cursor = conn.cursor()
    sql = "SELECT * FROM `UserInfo` WHERE `id` = '%s' AND `pw` = '%s';" %(_id,_pw)
    cursor.execute(sql)
    result = cursor.fetchall()
    if len(result)>0:
        return result
    else:
        return 'n'

def TestCreateFeed():
    conn = getConnection()
    cursor = conn.cursor()
    
    data = {
        "user_key" : 5,
        "name" : '녹색',
        "count" : 0,
        "left_count" : 0,
        "right_count" : 0,
        "left_content" : '안녕',
        "right_content" : '하이'
    }
    for i in range(200):
        sql = "INSERT INTO `FeedInfo`(`user_key`,`name`,`count`,`left_count`,`right_count`,`left_content`,`right_content`) VALUES (%d,'%s',%d,%d,%d,'%s','%s')" %(
            data["user_key"],
            data["name"],
            data["count"],
            data["left_count"],
            data["right_count"],
            data["left_content"]+str(i),
            data["right_content"]+str(i)
        )    
        cursor.execute(sql)
        conn.commit()
    conn.close()

def CheckRegister(_id,_pw,_name,_email):
    res = {
        "id" : True,
        "pw" : True,
        "name" : True,
        "email" : True
    }

    #비밀번호는 일단 보류
    res["pw"] = True

    conn = getConnection()
    cursor = conn.cursor()

    sql = "SELECT `id` FROM `UserInfo` WHERE `id` = '%s';" %(_id)
    cursor.execute(sql)
    result = cursor.fetchall()
    if len(result)>0:
        res["id"] = False

    sql = "SELECT `name` FROM `UserInfo` WHERE `name` = '%s';" %(_name)
    cursor.execute(sql)
    result = cursor.fetchall()
    if len(result)>0:
        res["name"] = False

    sql = "SELECT `email` FROM `UserInfo` WHERE `email` = '%s';" %(_email)
    cursor.execute(sql)
    result = cursor.fetchall()
    if len(result)>0:
        res["email"] = False

    if res["id"] == True and res["pw"] == True and res["name"] == True and res["email"] == True :
        sql = "INSERT INTO `UserInfo`(`id`,`pw`,`name`,`email`) VALUES ('%s','%s','%s','%s');" %(_id,_pw,_name,_email)
        cursor.execute(sql)
        sql = "UPDATE `CountInfo` SET `user_count` = `user_count` + 1 WHERE `count_key` = 1"
        cursor.execute(sql)

    conn.commit()
    conn.close()
    return res
    
def CheckFeedSelect(user_key, feed_key):
    conn = getConnection()
    cursor = conn.cursor()

    count = feed_key/divide_cnt

    sql = 'SELECT * FROM `SelectInfo%d` WHERE `user_key` = %d AND `feed_key` = %d;' %(count,user_key,feed_key)
    cursor.execute(sql)
    result = cursor.fetchall()

    if len(result)>0:
        return False
    else:
        return True

#여기할차례
def UpdateFeedSelect(input,user_key,feed_key):
    conn = getConnection()
    cursor = conn.cursor()

    count = feed_key/divide_cnt

    if input == True:
        sql = "INSERT INTO `SelectInfo%d`(`user_key`,`feed_key`,`select_key`) VALUES( %d,%d,0);" %(count,user_key,feed_key)
        cursor.execute(sql)
        sql = "UPDATE `FeedInfo%d` SET `count` = `count` + 1, `left_count` = `left_count` + 1 WHERE `feed_key` = %d;" %(count,feed_key)
        cursor.execute(sql)
    else:
        sql = "INSERT INTO `SelectInfo%d`(`user_key`,`feed_key`,`select_key`) VALUES( %d,%d,1);" %(count,user_key,feed_key)
        cursor.execute(sql)
        sql = "UPDATE `FeedInfo%d` SET `count` = `count` + 1, `right_count` = `right_count` + 1 WHERE `feed_key` = %d;" %(count,feed_key)
        cursor.execute(sql)
    sql = "UPDATE `CountInfo` SET `select_count` = `select_count` + 1 WHERE `count_key` = 1"
    cursor.execute(sql)

    conn.commit()
    conn.close()
    return 'success'


#Feed추가기능완료
def InsertFeed(user_key,name,left_content,right_content):
    conn = getConnection()
    cursor = conn.cursor()
    sql = "UPDATE `CountInfo` SET `feed_count` = `feed_count` + 1 WHERE `count_key` = 1"
    cursor.execute(sql)
    conn.commit()

    conn = getConnection()
    cursor = conn.cursor()

    count = GetCountInfo()
    key = CreateFeedTable(count["feed"])
    CreateCommentTable(count["feed"])
    CreateSelectTable(count["feed"])

    sql = "INSERT INTO `FeedInfo%d`(`user_key`,`name`,`count`,`left_count`,`right_count`,`left_content`,`right_content`) VALUES(%d,'%s',%d,%d,%d,'%s','%s')"%(key,user_key,name,0,0,0,left_content,right_content)
    cursor.execute(sql)
    conn.commit()
    
    conn.close()





def InsertComment(feed_key,name,content):

    key = feed_key/divide_cnt

    conn = getConnection()
    cursor = conn.cursor()
    sql = "UPDATE `FeedInfo%d` SET `comment` = `comment` + 1 WHERE `feed_key` = %d;" %(key,feed_key)
    cursor.execute(sql)
    sql = "UPDATE `CountInfo` SET `comment_count` = `comment_count` + 1 WHERE `count_key` = 1"
    cursor.execute(sql)
    conn.commit()

    sql = "INSERT INTO `CommentInfo%d` (`feed_key`,`name`,`content`) VALUES(%d,'%s','%s')" %(key,feed_key,name,content)
    cursor.execute(sql)
    conn.commit()

    conn.close()
    return True

# conn = database.getConnection()
#     cursor = conn.cursor()
#     sql = 'SELECT * FROM `FeedInfo` ORDER BY `feed_key` DESC LIMIT 20'
#     cursor.execute(sql)
#     result = cursor.fetchall()
#     res = list()
#     for i in range(len(result)):
#         res.append({
#             "feed_key" : result[i][1],
#             "name" : result[i][2],
#             "count" : result[i][3],
#             "left_count" : result[i][4],
#             "right_count" : result[i][5],
#             "left_content": result[i][6],
#             "right_content" : result[i][7],
#             "comment_count": result[i][8]
#         })

def ShowMyFeed(my_key):
    conn = getConnection()
    cursor = conn.cursor()
    count = GetCountInfo()
    key = count["feed"] / divide_cnt
    if key == 0:
        sql = 'SELECT * FROM `FeedInfo0` WHERE `user_key` = %d ORDER BY `feed_key` DESC LIMIT 20' %(my_key)
    else:
        sql = '(SELECT * FROM `FeedInfo0` WHERE `user_key` = %d)' %(my_key)
        for i in range(key+1):
            if i == 0:
                continue
            sql += 'UNION (SELECT * FROM `FeedInfo%d` WHERE `user_key` = %d)'%(i,my_key)
        sql += 'ORDER BY `feed_key`DESC LIMIT 20'
    cursor.execute(sql)
    result = cursor.fetchall()
    return result

def ShowScrollMyFeed(my_key,current_key):
    conn = getConnection()
    cursor = conn.cursor()
    key = current_key / divide_cnt
    if key == 0:
        sql = 'SELECT * FROM `FeedInfo0` WHERE `user_key` = %d AND `feed_key` < %d ORDER BY `feed_key` DESC LIMIT 20' %(my_key,current_key)
    else:
        sql = '(SELECT * FROM `FeedInfo0` WHERE `user_key` = %d AND `feed_key` < %d )' %(my_key,current_key)
        for i in range(key+1):
            if i == 0:
                continue
            sql += 'UNION (SELECT * FROM `FeedInfo%d` WHERE `user_key` = %d AND `feed_key` < %d )'%(i,my_key,current_key)
        sql += 'ORDER BY `feed_key` DESC LIMIT 15'
    cursor.execute(sql)
    result = cursor.fetchall()
    return result


def ShowBestFeed():
    conn = getConnection()
    cursor = conn.cursor()
    count = GetCountInfo()
    key = count["feed"] / divide_cnt
    if key == 0:
        sql = 'SELECT * FROM `FeedInfo0` ORDER BY `count` DESC LIMIT 100'
    else:
        sql = '(SELECT * FROM `FeedInfo%d`) UNION (SELECT * FROM `FeedInfo%d`) ORDER BY `count` DESC LIMIT 100'%(key-1, key)
    cursor.execute(sql)
    result = cursor.fetchall()
    return result

def ShowFirstFeed():
    conn = getConnection()
    cursor = conn.cursor()
    count = GetCountInfo()
    key = count["feed"] / divide_cnt
    if key == 0:
        sql = 'SELECT * FROM `FeedInfo0` ORDER BY `feed_key` DESC LIMIT 20'
    else:
        sql = '(SELECT * FROM `FeedInfo%d`) UNION (SELECT * FROM `FeedInfo%d`) ORDER BY `feed_key` DESC LIMIT 20'%(key-1, key)
    cursor.execute(sql)
    result = cursor.fetchall()
    return result

def ShowNextFeed(current_key):
    conn = getConnection()
    cursor = conn.cursor()
    key = current_key / divide_cnt
    if key == 0:
        sql = 'SELECT * FROM `FeedInfo0` WHERE `feed_key` < %d ORDER BY `feed_key` DESC LIMIT 20'%(current_key)
    else:
        sql = '(SELECT * FROM `FeedInfo%d`) UNION (SELECT * FROM `FeedInfo%d` WHERE `feed_key` < %d) ORDER BY `feed_key` DESC LIMIT 15'%(key-1, key, current_key)
    cursor.execute(sql)
    result = cursor.fetchall()
    return result

def GetCountInfo():
    conn = getConnection()
    cursor = conn.cursor()
    sql = "SELECT * FROM `CountInfo`"
    cursor.execute(sql)
    data = cursor.fetchall()
    result = dict()

    result["feed"] = data[0][1]
    result["select"] = data[0][2]
    result["comment"] = data[0][3]
    result["user"] = data[0][4]
    return result

#max_cnt = 행제한
#divide_cnt = 나누는기준


def CreateFeedTable(input):
    conn = getConnection()
    cursor = conn.cursor()
    count = input/divide_cnt
    if input % divide_cnt == max_cnt:
        sql = "CREATE TABLE `FeedInfo%d` (\
`user_key` bigint(20) DEFAULT NULL,\
 `feed_key` bigint(20) NOT NULL AUTO_INCREMENT,\
 `name` varchar(12) NOT NULL,\
 `count` int(11) DEFAULT '0',\
 `left_count` int(11) DEFAULT '0',\
 `right_count` int(11) DEFAULT '0',\
 `left_content` text,\
 `right_content` text NOT NULL,\
 `comment` int(11) NOT NULL DEFAULT '0',\
 PRIMARY KEY (`feed_key`),\
 KEY `feed_key` (`feed_key`)\
) ENGINE=InnoDB AUTO_INCREMENT=%d DEFAULT CHARSET=utf8" %(count+1,input+1)
        cursor.execute(sql)
    return count

def CreateCommentTable(input):
    conn = getConnection()
    cursor = conn.cursor()
    count = input/divide_cnt
    if input % divide_cnt == max_cnt:
        sql = "CREATE TABLE `CommentInfo%d` (\
 `comment_key` bigint(20) NOT NULL AUTO_INCREMENT,\
 `feed_key` bigint(20) NOT NULL,\
 `name` varchar(12) NOT NULL,\
 `content` text,\
 PRIMARY KEY (`comment_key`),\
 FOREIGN KEY (`feed_key`) REFERENCES `FeedInfo%d`(`feed_key`) ON DELETE CASCADE\
) ENGINE=InnoDB AUTO_INCREMENT=%d DEFAULT CHARSET=utf8" %(count+1,count+1,input+1)
        cursor.execute(sql)
    return count

def CreateSelectTable(input):
    conn = getConnection()
    cursor = conn.cursor()
    count = input/divide_cnt
    if input % divide_cnt == max_cnt:
        sql = "CREATE TABLE `SelectInfo%d` (\
 `_key` bigint(20) NOT NULL AUTO_INCREMENT,\
 `user_key` bigint(20) DEFAULT NULL,\
 `feed_key` bigint(20) DEFAULT NULL,\
 `select_key` int(11) DEFAULT '1',\
 PRIMARY KEY (`_key`),\
 FOREIGN KEY (`feed_key`) REFERENCES `FeedInfo%d`(`feed_key`) ON DELETE CASCADE\
) ENGINE=InnoDB AUTO_INCREMENT=%d DEFAULT CHARSET=utf8" %(count+1,count+1,input+1)
        cursor.execute(sql)
    return count

