# -- coding: utf-8 --
import json    # json 형식으로 리턴 해주기위해 사용
import pymysql # python mysql 연결 드라이버
import logging
from settings import DB_CONNECT # DB 셋팅을 가져온다
print DB_CONNECT
def getConnection():
    return pymysql.connect(
                            host=DB_CONNECT['host'],
                            port=DB_CONNECT['port'],
                            user=DB_CONNECT['user'],
                            password=DB_CONNECT['passwd'],
                            db=DB_CONNECT['db'],
                            charset=DB_CONNECT['charset']
                          )

def getYoutubeList():
    conn = getConnection()
    cursor = conn.cursor()

    sql = (
      'SELECT link FROM UserInfo LIMIT 10'
    )

    try:
        cursor.execute(sql)
        result = cursor.fetchall()
    except Exception as e:
        logging.error(e)
        result = e
    finally:
        conn.close()

    return result
