// sequelize 사용

// 폴더명까지만 경로 작성  index.js를 기본으로 찾아옴
const {sequelize, User} = require('./model');
const {sync} = require("./model/users");
const { Op } =  require('sequelize'); // 연산자 사용하기 위해 가져온다.

// 처음에 연결할 때 테이블들의 값을 초기화 할 것인지
// true면 기존 테이블들을 초기화 flase면 초기화 하지 않는다.
sequelize
.sync({force : false})
.then(()=>{
    console.log('연결');
})
.catch((err)=>{
    console.log(err);
});

// INSERT INTO 테이블

// 생성 쿼리문 create
User.create({
    name : 'ㅎㅇ2',
    age : 25,
    meg : 'hihihhihihihihihihihhiihihihihihihihih',

});

// 조회 쿼리문


// attributes : 원하는 컬럼만 가져온다
// where : 검색 조건 설정
// order : 생성순서 정렬 DESC(내림차순) , ASC(오름차순) order : [['age,'DESC]]
// limit : 조회할 갯수
// offset : 스킵할 갯수
// Op.gt (greater than, 초과),
// Op.gte (greater than or equal to, 이상),
// Op.lt (less than, 미만),
// Op.lte (less than or equal to, 이하),
// Op.ne (not equal, 같지 않음),
// Op.or (or, 또는),
// Op.in (in, 배열 요소 중 하나),
// Op.notIn (not in, 배열 요소와 모두 다름) 등이 있다.
async function select(){
   const user = await User.findAll({
    where:{
        age: { [Op.gte]:23},
        [Op.or]: [{ age: { [Op.gte]:23}},{name:'안녀엉'}],
    },
    order : [['age',"ASC"]],
//    lemit:1,
});
const temp = user.map((i)=> i.dataValues);
   console.log(temp);
}

 select();


// 수정 쿼리문
// User.update({
//     meg :  '수정할 내용',
// },

// // 아이디가 1번인 애 찾아서
// {where: { id: 1}}
// );


// 삭제 쿼리문
User.destroy({
    where: { id:1},
});

// 관계 쿼리문 join 
