# eim.backend

### EIM Backend Project 2019
_Everything in MapleStory_

> 본 리포지토리는 EIM 의 백엔드 리포지토리 입니다.

본 프로젝트는 현재 4개의 리포지토리를 가지고 있습니다.
* [프론트엔드 리포지토리](https://github.com/luke2327/eim.frontend)
* [네이티브 리포지토리](https://github.com/luke2327/eim.native)
* [백엔드 리포지토리](https://github.com/luke2327/eim.backend)
* [크롤링 리포지토리](https://github.com/luke2327/ascalon.crawler)

- - -

## 개발환경 셋팅
에디터는 Pycharm 또는 VisualStudio Code 를 이용합니다.

#### 필수 의존성 모듈 설치
1. pip 를 설치합니다.
2. Flask 를 설치합니다. (`sudo pip install Flask`)
3. virtualenv 를 설치합니다. (`sudo pip install virtualenv`)
4. flask-restful 를 설치합니다. (`sudo pip install flask-restful`)

## 실행 방법
#### 백엔드
- 환경 변수 셋팅
1. 자신의 쉘 확인 : (`echo $SHELL`)
2. 쉘 설정 파일에서 환경 변수 설정 : (`vi ~/.[SHELL]rc`)
3. 환경 변수 설정 : 맨 아래에 추가
```
export FLASK_APP=eim.backend
export FLASK_ENV=development
```


- venv 설정
1. 리포지토리 폴더로 이동 후 venv 생성 (`cd eim.backend && virtualenv venv`)
2. venv 활성화 (`cd venv/bin && .activate`)
3. 해당 venv 에서 모듈들을 설치해주면 된다


- 실행
1. `python api.py`


## 업데이트
#### 백엔드
1. 기초 파일 셋팅

#### 패키지 추가
1. flask-bcrypt
2. flask-restplus
3. flask-restful
4. flask_testing
5. Flask-Migrate
6. Flask-Script
7. pyjwt
