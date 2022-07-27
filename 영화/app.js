// 사용할 모듈
// socketio , express , fs

const socketio = require('socket.io');
const express = require('express');
const fs  = require('fs');



let seats = [
        [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1],
        [1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
      ];
      

      const app = express();
      const PORT = 3000;
      const server = app.listen(PORT, () => {
        console.log(PORT,"번 포트 실행");
      });

      const io = socketio(server);

      app.get("/", (req,res)=>{
        fs.readFile('page.html',(err,data)=>{
            res.send(data.toString());
        });
      });

      app.get('/seats',(req,res)=>{
        res.send(seats);
      });

      io.sockets.on('connection',(socket)=>{
        socket.on('reserve',(data)=>{
            seats[data.y][data.x]= 2;
            io.sockets.emit('reserve', data);
        });
      });