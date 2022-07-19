// npm 설치 관련
// 메타데이터 파일을 가지고 있는 json 초기화 명령어
// 메타데이터는 데이터들을 설명해주는 데이터
// npm init -y         => -y는 yes의 줄임말

/* {
    "name": "test",     //패키지 이름
    "version": "1.0.0",     //버전
    "description": "",      //설명
    "main": "index.js",     //메인파일
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },      //실행 명령어
    "keywords": [],     //검색 키워드
    "author": "",       //프로젝트 작업자 정보
    "license": "ISC"
  }
  */

// scripts
// 프로젝트에서 자주 실행해야하는 명령어를 scripts로 작성해두면 npm 명령어로 편하게 실행 가능
// "scripts" : {"start": "node 20220718/index.js","test": "node 20220718/index2.js"}
// 이렇게 작성하고 실행은 npm start
// start가 아니면 실행 명령어는 run을 붙여서 npm run test

// license
// 모듈의 라이센스를 기록하는데 사용
