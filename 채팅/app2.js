// express 모듈 사용

const express = require('express');
const fs = require('fs');
const socketio = require('socket.io');

const app = express();


const PORT = 3000;

const server = app.listen(PORT,()=>{
    console.log(PORT,'hihihihi');
});

const io = socketio(server);
app.get('/',(req,res)=>{
    fs.readFile('page2.html',(err,data) =>{
        res.end(data);
    });
});

io.sockets.on('connection',(socket)=>{
    // 웹소켓에 연결되어있는 massage 이벤트를 실행시켜준다
    socket.on("message",(data)=> {
       io.sockets.emit('message',data);
    });
}); // 클라이언트 접속
