// 로그인 만들어보자

// express , dotenv , fs, jsonwebtoken , express-session , mysql2 , bcrypt

const express = require('express');
const dot = require('dotenv').config();
const jwt = require('jsonwebtoken');
const session = require('express-session');
const mysql = require('mysql2');
const fs = require('fs');
const process = require('process');
const bcrypt = require('bcrypt');

// 처음부터 단방향으로 암호화시켜주는 해시함수
// bcrypt는 값이 4등분으로 나눠짐
// Akgiruthm: $2a$ 는 bcrypt
// const factor : 키 스트레칭한 횟수 2^10
// salt : 128비트의 솔트 22자  base64로 인코딩
// hash: 솔트 기법과 키 스트레칭을 한 해시값

const pw = '123123';
bcrypt.hash(pw,10,(err,data)=>{
  //  console.log(data);
});


// mysql 로컬 데이터 베이스 연결
const client = mysql.createConnection({
    user: 'root',
    password: '9928',
    database: 'test7',  // 연결할 데이터베이스 이름
    multipleStatements: true, // 다중 쿼리문을 사용할 수 있도록 하는 옵션
});

// 서버 객체 생성
const app = express();
// req.body 객체를 사용
// express 설정으로 body 객체를 사용하게 설정할 수 있다.
app.use(express.urlencoded({extended:false}));
app.use(session({
    // 세션 발급할때 사용되는 키
    secret : process.env.SESSION_KEY,
    resave : false, // 세션을 저장하고 불러올 때 세션을 다시 저장할지 여부
    saveUninitialized : true, // 세션에 저장할 때 초기화 여부를 설정
 })
);

app.get('/',(req,res)=>{
    fs.readFile('view/login.html','utf-8',(err,data)=>{
        
        res.send(data);
    });
});

app.get('/join',(req,res)=>{
    fs.readFile('view/join.html','utf-8',(err,data)=>{
        res.send(data);
    });
});

// id는 AUTO_INCREMENT PRIMARY KEY 컬럼 값을 추가하지 않아도 자동으로 증가하는 숫자
// user_id 이름으로 컬럼을 만들고 VARCHAR(255) 255자 까지 허용
 const sql = 'create table users (id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), password VARCHAR(255), refresh VARCHAR(255))';
// client.query(sql); // client 객체안의 query 함수로 쿼리문 실행

app.post('/join',(req,res)=>{
   const {userId,password} = req.body; // body 객체에 있는 키값으로 변수에 할당
   // 쿼리문 INSERT INTO users = user테이블에 추가한다
   // VALUES(?,?) 값의 벨류는 옵션으로 전달
   bcrypt.hash(password,10,(err,data)=>{
   const sql = "INSERT INTO users (user_id,password)VALUES(?,?)";
   // VALUES(?,?) 순서대로 [userId, password] 값 전달
   client.query(sql,[userId, data],()=>{
    // redirect 함수로 매개변수 url 해당 경로로 페이지 이동
     res.redirect("/"); 
    });
   });
});

app.post('/login',(req,res)=>{
    const {userId,password} = req.body;
    
    // SELECT * FROM users =users 테이블을 찾고
    // WHERE user_id=? = users 테이블에서 user_id 값으로 검색
    bcrypt.hash(password, 10,(err,data)=>{
        console.log(data);
    })
    const sql = "SELECT * FROM users WHERE user_id=?"
    client.query(sql,[userId],(err,result)=>{
        if(err)
        {
            res.send('계정없음');
        }else{ 
            if(result[0]){ 
            bcrypt.compare(password, result[0]?.password,(err, same) => {
                if(same){
                    const accessToken = jwt.sign({
                          // payload 값 전달할 값
                          userId : result[0].user_id,
                          mail : 'asdasd@naver.com',
                          name: 'asdzxc',
                      },
                      // ACCESS_TOKEN 비밀키
                      process.env.ACCESS_TOKEN,
                      {
                          // 유효기간 5초
                          expiresIn : '5s',
                      }
                      );
                      const refreshToken = jwt.sign({
                          // 유저의 아이디만
                          userId: result[0].user_id,
                      },
                      process.env.REFRESH_TOKEN,
                      {
                          expiresIn : '1m',
                      }
                      );
                      // user 테이블의 refresh 값 수정
                      const sql = "UPDATE users SET refresh=? WHERE user_id=?";
                      client.query(sql,[refreshToken, userId]);
      
                      //세션에 accessToken 값을 access_token키값에 벨류로 할당
                      req.session.access_token = accessToken; 
                       //세션에 refreshToken 값을 refresh_token키값에 벨류로 할당
                      req.session.refresh_token = refreshToken;
                      res.send({ access : accessToken, refresh : refreshToken});
                    } else{
            res.send('비번 틀림');
          }
                
            });
         
        } else{
            res.send('계정없음');
        }
    }
    });
});

// 미들웨어란
// 로그인을 하면  로그인이 유지되어 있는 페이지에 접속
// 로그인이 유지 되고 있는 동안에만 동작해야하는 페이즈들이 있는데 로그인 유지를 확인하고 요청을 보내야 한다
// 미들웨어란 간단하게 클라이언트에게 요청이 오고 그 요청을 보내기 위해 응답하는 중간(미들)에 목적에 맞게 처리해주는
// 중간단계 통과하는 미들웨어 함수이다. 요청의 응답에 도달하기 위해서 미들웨어를 통과해야지 응답까지 도달할 수 있다.
// req(요청)객체 , res(응답)객체, next() 함수를 이용해서 통과 요청을 넘길 수 있다.
// 요청을 처리하기 전에 중간에 기능을 동작시켜주는 애


// 매개 변수는 요청객체 , 응답객체 , next 함수
const middleware = async (req, res, next) => {
    // 세션값을 가져온다.
    // const access_token = await req.session.access_token;
    // const refresh_token = await req.session.refresh_token;
    const { access_token, refresh_token } = await req.session;
    // access_token 값을 먼져 검증 한다 유효 기간이 끝나지 않았는지 안썩었는지
    jwt.verify(access_token, process.env.ACCESS_TOKEN, (err, acc_decoded) => {
      if (err) {
        // 썩은 토큰 이면
        // 여기서 로그인 페이지로 넘긴다던지
        // 404 500 에러페이지를 만들어서 보여준다던지
        // 본인의 방향성으로 페이지 구성 하시면 됩니다.
        jwt.verify(
          refresh_token,
          process.env.REFRESH_TOKEN,
          (err, ref_decoded) => {
            if (err) {
              res.send("다시 로그인 해주세요");
            } else {
              const sql = "SELECT * FROM users WHERE user_id=?";
              client.query(sql, [ref_decoded.userId], (err, result) => {
                if (err) {
                  res.send("데이터 베이스 연결을 확인해주세요");
                } else {
                  if (result[0]?.refresh == refresh_token) {
                    const accessToken = jwt.sign(
                      {
                        userId: ref_decoded.userId,
                      },
                      process.env.ACCESS_TOKEN,
                      {
                        expiresIn: "5s",
                      }
                    );
                    req.session.access_token = accessToken;
                    // 다음 콜백 실행
                    next();
                  } else {
                    res.send("sdfsdfsdfsd다시 로그인 하세요");
                  }
                }
              });
            }
          }
        );
      } else {
        next();
      }
    });
  };
// middleware 미들웨어 함수에서 next() 함수를 사용하지 못하면
// 다음 콜백함수는 실행되지 않는다
// 문지기한테 막힘
// 

app.get('/check',middleware,(req,res)=>{
    res.send('로그인 되어 있음')
})
app.listen(3000,()=>{
    console.log('서버열림');
});