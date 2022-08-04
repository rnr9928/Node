// 채팅방 만들기
// 방개념

// 사용할 것들
// express, socket.io, fs , nodemon

// express, socket.io, nodemon 먼저 설치

const express = require("express");
const socketio = require("socket.io");
const fs=require("fs");

// 서버가 될 객체만 만들어지고 (서버의 몸뚱아리)
const app = express();

const server = app.listen(3000,()=>{
    console.log(3000,'번에 접속완료');
});

// socketio 생성 및 실행
const io = socketio(server);

app.get('/',(req,res)=>{
    fs.readFile('page.html','utf-8',(err,data)=>{
        console.log(err);
        res.send(data);
    });
});

io.on('connection',(socket)=>{
    console.log(socket);
    console.log('유저 접속');
    socket.on('joinRoom',(room,name)=>{
        // 방으로 접속
        socket.join(room);
        // 현재 그 방에 있는 클라이언트에게 요청
        io.to(room).emit('joinRoom',room,name);
    });

    socket.on('leaveRoom',(room,name)=>{
        socket.leave(room);
        io.to(room).emit("leaveRoom",room,name);
    });

    socket.on('chat',(room, name, msg)=>{
        io.to(room).emit('chat',name,msg);
    });
});

// 접속된 모든 클라이언트에게 메세지 전송
// io.emit('이벤트명',보내줄 데이터)

// 메세지를 전송한 클라이언트에게만  메시지 전송
// socket.emit('이벤트명',보내줄 데이터)

// 메시지를 전송하는데 자기 제외 방송
// socket.broadcast.emit('')

// 특정 클라이언트에게만 귓속말
// io.to(아이디).emit('이벤트명', 보내줄데이터)

// 클라이언트 접속과 종료  들어왔을때 나갔을때
// io.on("connection"(접속 했을때)/"disconnection")