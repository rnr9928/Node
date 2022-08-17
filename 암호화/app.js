// crypto
// 암호화

// 단방향 양방향 방식
// 단방향은 복호화해사 원래의 값을 알 수 있다.
// 양방향은 복호화해서 원래의 값을 알 수 없다.

// 복호화는 암호문을 편문으로 변환하는 과정
// 부호화(인코딩)된 데이터를 부호화 되기 전 형태로 바꿔서 사람이 읽을 수 있는 형태로 되돌려 놓는 것

// 단방향 암호화가 요즘 사이트들이 비밀번호 찾기하면 비번을 직접알려주지 않고 변경하라함
// 굳이 복호화를 할 이유가 없기 때문

// 단방향의 비교 검증방법
// 데이터 베이스에 저장된 암호화
// 로긘할때 입력받은 비번을 단방향으로 암호화를 통해
// 비교를 하면 기존의 비번은 저장되지 않고 암호화된 문자열로만 비교시킨다

// 단방향 암호화는 해쉬 알고맂므을 사용해서 문자열을 고정된 길이의 
// 문자열로 암호화 시킴

// crypto 모듈 가져오기

const { rejects } = require('assert');
const crypto = require('crypto');
const { resolve } = require('path');
const pw = '4654564564'; // 임의의 비번

// 단순 해싱으로 비밀번호 해싱
let hashAlgor = crypto.createHash('sha512'); // sha512 사용할 해시 알고리즘

// md5 sha1 sha256 sha512 등이 있다 
// sha512  알고리즘은 국가안보국이 설계한 암호해쉬함수

// 선택된 알고리즘으로 해싱한다.
let hashing = hashAlgor.update(pw); // 매개변수로 암호화 시킬 문자열

// 해싱된 객체를 base64로 문자열로 반환
let hasString = hashing.digest('base64');

// console.log(hasString);

// 지금 이렇게만 해쉬 알고리즘으로 암호화하면 같은 값이 들어가면
// 암호화된 문자열도 계속 같기 때문에 암호화의 효과가 좀 안좋다

// 복호화를 방해하기 위해 단방향 암호화 salt 기법 사용

// salt 값은 항상 비번에 매번 추가 시켜서 사용해야 하니까 잠 숨겨놓자

// 크립트의 랜덤바이트 생성 함수 랜덤한 바이트를 생성 시킬 수 있다.

// crypto.randomBytes(32,function(err,byte){ // 랜덤 바이트를 만드는 함수
//     if(err){
//         console.log(err); 

//     }else{
//         console.log(byte);
//     }
// });

// 크립트의 randomBytes 함수로 salt값을 만들어서
// DB에 저장한 후
// 모든 패스워드가 고유의 salt값을 가지고 할 수도있다.

// 키 스트레칭은 salt와 패스워드를 해시 함수에 넣는 과정을 반보시켜
// 해킹하기 힘듬  , 계산량을 늘려 값 출력을 임의적으로 느리게 만듦

// pbkdf , scrypto , bcrypto

// pbkdf
// 해시함수의 컨테이너 역활을 하고
// 해시함수에 salt를 적용해서 해시함수의 반복횟수를 지정해서
// 암호화 할 수 았고 IOS 표준에 적합하며 NIST에 승인된 알고리즘

// scrypto
// 메모리와 CPU 잡아먹음 (역효과 , 부하)
// 자원을 많이 씀
// OpenSSL :1: 이상의 제공하는 시스템에서만 사용

// bcrypto
// 보안에 집착하기로 유명한 OpenBSD에서 사용
// .NFT 및 자바를 포함한 많은 폴랫폼 언어에서도 사용 할 수 있다.
// 반복횟수를 늘려 연산속도를 늦출 수 있어서 연산능력이 증가해도
// 공격에 대비를 할 수 있다.

// pbkdf

// crypto.randomBytes(32, function(err,byte){
//     crypto.pbkdf2(
//         pw,  // 해싱하려고 한 문자열
//         byte.toString('base64'), // 문자열로 변환하는데 인코딩 방식은 base64
//         123123, // 반복횟수 지정. 반복 횟수가 많아질수록 복호화하기 어려워짐 시간도 많이 걸림
//         64, // 길이 설정
//         'sha512' , // 암호화 알고리즘 설정
//         function(err, hashed){
//             console.log(hashed);
//         }
//         );
// });

// salt 값을 만들어주는 함수
const createSalt = () =>{
    // 암호화 처리하는데 시간이 걸리기 때문에
    // Promise를 사용해서 비동기 처리를 함
 return   new Promise((resolve, reject)=>{
        crypto.randomBytes(64,(err,byte)=>{
            if(err)
            {
                reject(err);
            }else{
                resolve(byte.toString('base64'));
            }
        });
    });
};

// 비번을 해싱 해주는 함수
const pwHashed = (userId, password) =>{
  return  new Promise((resolve, reject)=>{
        const sql = "SELECT *FROM users WHERE user_id=?"
        client.query(sql,[userId], async(err,result)=>{ // 쿼리문 실행 유저 아이디 찾고
            if(result[0]?.salt){
                // 결과 값이 있으면
                // 여기서 결과값은 해당 유저의 객체고 그 안에 salt 값을 가져온다
                const salt = await result[0].salt;
                // pbkdf2 암호화를 하는데 해싱 알고리즘은 sha512
                // 길이 64 반복횟수 351351
                crypto.pbkdf2(password, salt , 351351 , 64 , 'sha512',(err,key)=>{
                    if(key.toString('base64') === result[0].password){
                          resolve(key.toString('base64'));
                    }else{
                        reject("err");
                    }
                })
            }else{
                reject('err');
            }
        });
    });
};

const createPwHashed = (password) =>{
 return   new Promise(async(resolve, reject)=>{
        const salt = await createSalt();  
        crypto.pbkdf2(password, salt, 351351,64,'sha512',(err,key)=>{
            if(err){
                reject('err');
            }else{
                // 비번 마다 고유의 salt 값을 가지고 있게 하기 위해서
                // 암호화한 비번과 salt 값을 둘다 DB에 저장
                resolve({password : key.toString('base64'),salt})
            }
        });
    });
};

// 암호화된 로그인을 만들어보자
// 모듈은 express , fs , mysql2

const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({extended:false}));

const client = mysql.createConnection({
    user: 'root',
    password: '9928',
    database: 'test8',  
    multipleStatements: true, 
});

// const sql = `CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,
//      user_id VARCHAR(255), password VARCHAR(255), salt VARCHAR(255))`
// client.query(sql)

app.get('/',(req,res)=>{
    fs.readFile('view/join.html','utf-8',(err,data)=>{
        res.send(data);
    });
});

app.get('/login',(req,res)=>{
    fs.readFile('view/login.html','utf-8',(err,data)=>{
        res.send(data);
    });
});

app.post('/join',async(req,res)=>{
    const {password , salt} = await createPwHashed(req.body.user_pw);
    const sql = "INSERT INTO users (user_id,password,salt)VALUES(?,?,?)"
    client.query(sql,[req.body.user_id,password,salt],()=>{
        res.redirect('/login');
    });
});

app.post('/login',(req,res) =>{
    const {user_id,user_pw} =req.body;
    pwHashed(user_id,user_pw).then((result)=>{
        res.send(result + '로긘됨');
    }).catch((err)=>{
        res.send(err);
    })
})
app.listen(3000,()=>{
    console.log('서버오픈');
});
