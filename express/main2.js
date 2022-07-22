// express
// 서버 구성을 할 수 있게 만들어주는 클래스와 라이브러리

// 설치 명령어
// npm i express

const fs = require("fs");
// express을 가져와서 변수에 담아줌
const express = require("express");

// ejs
// nods.js express에서 많이 사용하고 이쓴 템플릿 엔진
const ejs = require("ejs");

const mysql = require("mysql2");

// body-parser  요청과 응답사이에 공통적인 기능 해주는 미들웨어
// 데이터를 body라는 객체 안에 담아 요청 응답을 받을 수 있게 해줌

const bodyParser = require("body-parser");

const temp = mysql.createConnection({
  user: "root",
  password: "9928",
  database: "test5",
});

temp.query("SELECT * FROM products", (err, res) => {
  if (err) {
    const sql =
      "CREATE TABLE products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))";
    temp.query(sql);
  } else {
    console.log(res);
  }
});

// fs는 파일 읽기 쓰기를 쉽게 도와주는 모듈

// express 함수를 실행해서 반환 값을 app에 담아줌

const app = express();
const PORT = 4000;

// app.get();
// app.post();

// app.get('요청 url')
app.get("/", (req, res) => {
  // http에선 end로 보내고 끝냄
  // express에선 send로 보내고 끝냄

  // fs모듈이 readfile 파일을 읽어오늘 함수

  fs.readFile("src/list.html", "utf-8", (err, data) => {
    temp.query("SELECT * FROM products", (err, result) => {
      res.send(
        ejs.render(data, {
          data: result,
        })
      );
    });
  });
});

app.get("/insert", (req, res) => {
  fs.readFile("src/insert.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.post("/insert", (req, res) => {
  const data = req.body;
  const sql = "INSERT INTO products (name,number,series)VALUES(?,?,?)";
  temp.query(sql, [data.name, data.number, data.series], () => {
    // url 경로를 redirect함수의 매개변수로 경로로 이동
    res.redirect("/");
  });
  //  res.send(console.log(data));
});

/* app.get("/insert", (req, res) => {
    fs.readFile();
  }); */

app.listen(PORT, () => {
  console.log("server start");
});
