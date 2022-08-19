// index.js가 model안에 model js파일들을 모아서 사용하는 곳
const Sql = require('sequelize');
const config = require('../config/config');
const User = require('./users');
const Post = require('./posts');


console.log(config);

// 시퀄라이즈 객체 생성 옵션을 적용한 객체 만들어 놓는다.
const sequelize = new  Sql(
    config.dev.database,
    config.dev.username,
    config.dev.password,
    config.dev
);

// 내보내기 위해 빈객체 만든것
const db = {};
db.sequelize = sequelize;
db.User = User;
db.Post = Post;

// 요게 없으면 테이블이 생성되지 않음
User.init(sequelize);
Post.init(sequelize);

// 관계형 맺어주는 함수 사용
User.associate(db);
Post.associate(db);

module.exports = db;