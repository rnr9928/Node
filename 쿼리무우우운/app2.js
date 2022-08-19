// 사용할 모듈  express ,ejs , path , nodemon
// path는  기본 경로를 다룰 수 있게 도와주는 모듈

const express = require('express');
const ejs = require('ejs');
const path = require('path');
// 폴더 경로 잡으면 index 탐색 찾은 index파일을 기본을 가져옴
const {sequelize, User, Post} = require('./model');


const app = express();

// app.set()로 express에 값을 저장
// path.join() : 매개변수로 받은 문자열들을 주소처럼 합쳐준다.
// ex) path.join('a','b') => a/b
app.set("views", path.join(__dirname, "view")); // __dirname : 현재 파일까지의 경로
// views폴더까지의 경로가 기본값. 랜더링할 파일을 모아둔 폴더

// path.join함수는 매개변수를 받은 문자열들을 주소처럼 합쳐줌
// app.set('views',path.join(__dirname,'view'));

// 랜더링하는 기본엔진을 ejs 처럼 사용한다고 알려주는 것
// engine ('파일의 타입', ) 뷰 엔진이 그릴떼
// app.get('/',(req,res)=>{
//     res.send(ejs.render(data,{e}));
// });
app.engine('html',ejs.renderFile);
// console.log(app);

app.set('view engine', 'html');

app.use(express.urlencoded({extended: false}));

// sync 함수는 DB 동기화 하는 테이블 생성
sequelize
.sync({force : false})
.then(()=>{
    console.log('DB연결 성공');
})
.catch((err)=>{
    console.log(err);
});

app.get('/',(req,res)=>{
    res.render('create');
});

app.post('/create',(req,res)=>{
    // create 함수ㅡㄹ 사용하면 해당 테이블에 컬럼을 추가할 수 있다.
    const {name, age, msg} =req.body;
    const create = User.create({
        name : name,
        age : age,
        msg : msg,
    });
    // 위의 객체를 전달해서 컬럼을 추가할 수 있다
    // 지바스크립트 구문으로 SQL 동작을 시킬 수 있다
    // 쿼리문 짤 필요가 없어진다.
});

app.get('/user' , (req,res)=>{
    // 여기서는 추가된 유저들을 봐야하니까
    // 조회를 하는데 전체를 조회해야한다
    // findAll 전체를 찾는다
    // findAll은 매개변수로 검색할 옵션
    User.findAll({})
    .then((e)=>{
        res.render('page', {data: e});
    })
    .catch(()=>{
        res.render('err');
    });
});

app.post('/create_post',(req,res)=>{
    const { name, text} = req.body;
    console.log(name,text);
    // User테이블이랑 Post랑 연결되있는데
    // User id 기본키로 되있고 Post는 user_id
    // 테이블에서 하나의 컬럼값 가져온다.
    User.findOne({
        where: { name: name },
    }).then((e) =>{
        Post.create({
            msg : text,
            // foreignkey user_id 유저의 아이디와 연결한다고 정의를 해놓기때문에
            // user.js 와 posts.js에 만든 모델에 만들어 놈놈놈
            user_id : e.id,
        });
    });
});

app.listen(3000, ()=>{
    console.log('오픈');
});
