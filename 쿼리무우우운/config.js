const dot = require('dotenv').config();

// DB 접속에 필요한 설정값 객체
const config = {
    dev : {
        username : 'root',
        password : process.env.DATABASE_PASSWORD,
        database : 'test',
        host : '127.0.0.1', 
        dialect : 'mysql',
    }
}

module.exports = config;