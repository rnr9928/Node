const Sql = require('sequelize');

// User 클레스에서 시퀼라이즈 안에 모듈 객체의 기능을 상속시켜주기위해서
// User 클래스에서 Sql.Model 기능으 준다
class User extends Sql.Model {
    static init(sequelize){
        // 상속받은 함수 쓸려면 super 사용
        // init 함수의 첫번째 매개변수가 테이블의 구성
    
        return super.init(
            {
                name: {
                    // 시퀼라이즈 모델 안에 있는 데이터 타입을 사용해야한다
                    // 그래서 가져온 시퀼라이즈 모듈 안에 있는 STRING 객체 사용
                    type : Sql.STRING(20),
                    // 이 값이 무조건 있어야하는지 이 컬럼값이 없으면 안된다고 표시하는것
                    // false면 없으면 안됨
                    // true면 없어도 돼요
                    allowNull: false,
                    unique: true,
                    // 고유키로 사용할 것 인지
                    // 여기서는 컬럼에 name 값이 겹치지 않도록 사용



                    // primaryKey : true,
                },

                age : {
                    type  : Sql.INTEGER,
                    allowNull : false,
                },
                msg : {
                    // 문자로 받을거니까 TEXT
                    type : Sql.TEXT,
                    allowNull : true
                },
                createde_at : {
                    type : Sql.DATE,
                    allowNull : false,

                    // 기본 값 설정
                    // NOW 지금 현재 시간
                    defaultValue : Sql.NOW,
                }
            },
            {
                sequelize,
                timestamps : true, // 업데이트된 시간도 표시 

                underscored : false,

                modelName : "User",
                tableName:  "users",
                paranoid : false,

                charset : "utf8",
                collate: 'utf8_general_ci',
            }
        );
        // 1:N (foreignkey)
       
    }
    static associate(db) {
        // 시퀼라이즈에서 1:N 관계 hasMany 함수로 정의를 한다
        //  hasMany 함수를 이용해서 테이블의 관계를 정의해준다
        // 첫번째 매개변수로 연결할 테이블
        // sourceKey User테이블안에 무슨 키를 foreignKey와 연결할지
        // hasMany() 첫번째로 넘겨준 테이블이 foreignKey 연결되고 foreignKey 이름은 user_id다.
            db.User.hasMany(db.Post, {foreignKey : "user_id" , sourceKey: 'id'});
    }
}

module.exports = User;