const app = require("express")();
const session = require('express-session');
const FileStore = require('session-file-store')(session);

// 설치
// express-session
// session-file-store


app.use(
    session({
        // 세션을 발급할 때 사용 되는 키 소스코드 노출 안되게
        secret:'zcdadscz',
        // 세션을 저장하고 불러올 때 다시 저장할지 여부
        resave : false,
        // 세션에 저장할 때 초기화 여부
        saveUninitialized : true,
        // 저장소를 만들지 여부
       store: new FileStore(),
 })
);

app.get('/',(req,res)=>{
    if(!req.session.key){
        req.session.key = 'asdafasfasf';
    }
    res.send(`key:${req.session.key}`);
})

app.get("/shop", (req,res)=>{
    res.send(`난 숍${req.session.key}`);
});

app.listen(3000,()=>{
    console.log('접속완료');
});

