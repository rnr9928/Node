const express = require('express');

// express 라우터 설정
const router = express.Router();
const fs = require('fs');

router.get('/',(req,res)=>{
    fs.readFile('view/page.html','utf-8',(err,data)=>{
        console.log(err);
        res.send(data);
    });
});

// 설정한 라우터 내보내기
// module.exports 로 내보내면 require함수를 이용해서 모듈처럼 받아올 수 있다.
module.exports = router;