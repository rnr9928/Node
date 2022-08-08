//  쿠키랑 세션
//  데이터나 인증을 유지하기 위해

// ex. 웹페이지 팝업  오늘은 보지 않기, 7일간 보지않기 등
// 자동로그인

// 특징
// 총 300개까지 저장 , 하나의 도메인당 20개 쿠키  , 한개당 4kb 저장 가능

// data객체로 유효기간 

let createCookie = function(name, value , time){
    let date = new Date();
    date.setTime(date.getTime() + time * 24 * 60 * 60 * 1000); 
    // time 값이 1이면 1일 하루 , 현재시간에 time을 더하면 생성한 시가분터 1일이 지난시간

    // 만료일(expires)
    // 쿠키 삭제 -> 이전 만료일을 지정해주면 삭제됨 (쿠키 자체 삭제기능이 없음)

    document.cookie = name + '=' + value + ';expires' + date.toUTCString() + ";path=/"  // 쿠키 만들기
};

// 쿠키 값 가져오는 함수
let getCookie = function(name){
    let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    console.log('cookie'+ value);
    return value ? value[2] : null;

}

let isActiveCookie = function(key){  // 쿠키 여부 확인
    return getCookie(key) != null ? true : false;
};

let isDeleteCookie= function(key){
    document.cookie = key + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
};

// 세션
// 사용자에서 들어오는 요구를 하나의 상태로 보고
// 상태를 유지시키는 기술  브라우저를 종료할 때 까지 유지


sessionStorage.setItem('myItem','저장할 데이터');
sessionStorage.getItem('myItem');

// 세션이 몇개 들었는지 구하는 법
sessionStorage.length;

sessionStorage.key(0); // 세션의 키 값을 인덱스로 가져오기
sessionStorage.clear();
