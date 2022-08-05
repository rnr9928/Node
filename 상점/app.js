// 경매소 만들기

// 사용할 모듈
// express , ejs , socketio , fs , nodemon


// 루트경로 페이지 
// shop 페이지

const express = require('express');
const socketio = require('socket.io');
const fs = require('fs');
const ejs = require('ejs');

const app =  express();

// app.use(express.static(__dirname+"/image"));  상점페이지 이동시 이미지나옴

const server = app.listen(3000,()=>{
    console.log(3000,'접속');
});

// 소켓 생성 및 실행
const io = socketio(server);

// 상품의 번호 변수
let counter = 0;

// 생성자 함수
function Product(name, image, price, count){
    this.index = counter++;
    this.name = name;
    this.image = image;
    this.price = price;
    this.count = count;
}

// console.log(new Product('사과','/',2000,20));

// 상품을 가지고 있을 박스
const products = [
    new Product('사과','/',2000,20),
    new Product('포도','/',2000,20),
    new Product('감귤','/',2000,20),
    new Product('딸기','/',2000,20),
    new Product('독사과','/',2000,20)
]

app.get('/',(req,res)=>{
    fs.readFile('page.html','utf-8',(err,data)=>{
        console.log(err);
        res.send(data);
    });
});

app.get('/shop',(req,res)=>{

    const page = fs.readFileSync('shop.html','utf-8'); // 반환값을 받으면 html 파일을 읽어서 인코딩하고 반환
        res.send(
            ejs.render(page,{
                products : products,
            })
        );
    });

    let cart = [];
    // 소켓 이벤트 연결

    io.on('connection',(socket)=>{
        // 상품 구매 취소했을때 돌리는 함수
        function onReturn(index){
            // 물건 갯수 다시 돌린다
            products[index].count++;

            // 물건을 제거
            // 배열 안의 값 제거 delete 배열 [인덱스]
            delete cart[index];
            let count = products[index].count;
            io.emit('count',{
                index,
                count,
            });
        }

        // 이벤트 연결 웹소켓이 가지고 있는 이벤트
        socket.on('cart', (index) =>{
            products[index].count--;

            //빈 객체를 하나 만들어서 해당 배열의 인덱스 자리에 넣음
            cart[index] = {};

            // index 키 추가 하고 벨류를 넣어줌
            cart[index].index = index;
            let count = products[index].count;
     
            io.emit('count',{
                index,
                count,
            });
        });
        socket.on('buy',(index)=>{
            delete cart[index];

            let count = products[index].count;
            io.emit('count',{
                index,
                count,
            });
        });

        socket.on('return',(index)=>{
            onReturn(index);
        });
    });