// jwt , express , router 
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const dot = require('dotenv');
const fs = require('fs');
dot.config();

const secretkey = process.env.SECRETKEY;

router.post('/login', (req,res)=>{
    const name = "guk"
 let token = jwt.sign({
        type : "JWT",
        name : name,
    },
    secretkey,
    {
        // 토큰 유효시간
        expiresIn:"5m",
        // 토큰 발급한 사람
        issuer:'guk'
    }
    );
    req.session.token = token;
    let temp = {
        msg : '토큰 발급됨',
        token,
    };
    fs.readFile('view/page2.html','utf-8',(err,data)=>{
  res.send(data);
    });
  
});

// 설정한 라우터 내보내기
module.exports = router;