// 웹소켓과 클라이언트 양방향 통신 도와주는 소켓 io

// socket.io
// 실시간 웹을 위한 JS 라이브러리
// 웹 클라이언트와 서버간의 실시간 양방향 통신
// node.js 모듈

// socket.io는 웹소켓 프로토콜을 지원해주는 네트워킹 라이브러리
// 비동기 이벤트 방식으로 실시간으로 간단하게 데이터를 요청하고 받을 수 있다.

// socket.io 많이 쓰는 메서드
// on : 이벤트에 매칭해서 소켓 이벤트 연결
// emit: 소켓 이벤트 발생


// npm i express
// npm i socket.io
// npm i nodemon
// npm i fs

const express = require("express");
const fs = require('fs');
const socketio = require('socket.io');

const app = express();

const PORT = 3000;


app.get('/', (req,res) =>{
    fs.readFile('page.html',(err,data)=>{
        res.end(data);
    });

});

const server = app.listen(PORT, () =>{
    console.log(PORT,"ㅁㅇㄴㅇㅁㄴㅇ");
});

// socketio(매개 변수) 매개변수는 express server
const io = socketio(server);
let userid = [];
// socketio 연결
// connection -> 클라이언트가 웹소켓 서버에 접속할 때 발생
// on함수로 connection 이벤트에 매칭해서 소켓연결
io.sockets.on("connection",(socket)=>{
    console.log('유저가 접속함');
    userid.push(socket.id);
    console.log(userid);
    socket.on('hi',(data)=>{
        console.log(data,'웹소켓 hi 이벤트가 실행');
       io.sockets.to(data.id).emit('hi',data.msg);
      // socket.broadcast.emit('hi', '나 제외 모두');
    });
});