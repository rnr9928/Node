// npm 설치 관련
// formatting, linting 설정
// node 프로젝트를 여러명이나 개인이 작업하다 보면 예상하지 못한 오류가 생겼을때 찾아내기 힘듬
// 런타임 코드를 이용자에게 전달하기 전에 문제를 잡아준다
// prettier
// formatting 을 해주는 prettier 패키지 명령어

// npm install --save-dev prettier

// 설치하면 package.json내용 추가
// p ackage.json의 중요한 역할중에 하나는 메타 데이터를 표현
// 현재 프로젝트가 사용하는 의존성 내용을 나열하는 것에도 목적이 있다.

// 노드 모듈 폴더는 git에 따로 올리지 않고
// package.json만 올리고
// npm i 로 설치후 작업

// package-lock.json에 기록되어 있는 내용은실제로 설치된 패키지들이 어떤 것이지 알려준다
// 같이 업로드 해주는것이 좋다

// node_modules
// .bin 폴더 제외하고 다른 폴더들은 현재 프로젝트가 의존하고 있는 패키지들
// .bin폴더는 컴퓨터가 이해 할 수 있는 바이너리 파일

// formatting을 해보자
// 프로젝트 단위로 설정을 해줌

// .vscode폴더를 만들고 안에 settings.json을 만들어주자
// 이곳에 설정한 이유는 우리가 사용하는 vscode 설정 프로젝트 단위로 설정 적용
// 작업을 시작하면 병합시 충돌을 덜어준다.

// Linting
// ESLint 설치 명령어

// lock.json에 뭔가 많이 생김 의존성들(서브 디펜던시)
// 의존성의 뜻은 코드에서 두 모듈 간의 연결
// 두 클래스의 관계성
// 그냥 쓸려고 패키지 다운 받음

// eslint도 설정파일 필요
// .eslintrc.js
