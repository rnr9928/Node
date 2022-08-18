const Sequelize = require('sequelize');
// sequelize 모듈을 확장한 user 클래스

class User extends Sequelize.Model {
    // init 함수에서 테이블을 설정해준다.
    static init(sequelize) {
        // super.init함수의 첫번째 매개변수는 테이블 컬럼에 대한 설정
        // 두 번째는 테이블 자체의 설정
    return super.init({
        name : {
            type : Sequelize.STRING(50),
            allowNull : false,
            unique : true,
            // 고유키
            // 값 중복x
            // 중복되면 안되는 값들을 쓸 때 사용
            // 반드시 입력할 필요x

            // primarykey
            // 기본키
            // 값이 중복되지 않고 반드시 입력해야하는 값
        },
        age : {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        meg :{
            type : Sequelize.TEXT,
            allowNull: true,
        },
    },
    // 여기부터 테이블 설정
    {
        // sequelize : init함수의 매개변수를 연결시켜주는 옵션
        sequelize,
        // timestapms : true 하면 createAt 과 updatedAt 컬럼들 추가
        timestamps : true,

        // underscored : 시쿼라이즈는 테이블명과 컬럼명을 카멜표기법으로 표시해주는데
        // 스네이크 표기법으로 바꿔주는 옵션 (aaaAa -> aaa_aa) 으로
        underscored : false,
        // modelName: 모델의 이름을 설정 
        modelName : 'User',
        // tableName : 실제로 DB에 등록되는 이름 보통 모델의 소문자로
        // 복수형으로 만듦
        tableName : 'users',

        // paranoid : true로 설정하면 deletdeAt이라는 컬럼도 추가됨
        // 삭제하면 컬럼이 지워 지는것이 아니라 삭제한 시간이 표기
        paranoid : false,

        // charset,collate  한글 입력 가능
        charset : 'utf8',
        collate : 'utf8_general_ci',
    }
    );
}
// 다른 모델과 관계를 적어줌
// mysql JOIN 이라는 기능으로 여러 테이블 간의 관계를 만들어준다
// 시퀼라이즈는 JOIN 기능도 알아서 구현한다

static associate(db){}
}

module.exports = User;