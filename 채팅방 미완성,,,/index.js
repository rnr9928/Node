const WebSocket = require('ws');
const ws = new WebSocket.Server({port:3020});

let user_id =0;
let ALL_WS = []; // 전체 유저들 통제 할 수 있도록 각 유저에 대한 websocket, user_id 저장
ws.on('connection', function connect(websocket,req){
    user_id++;
    console.log("hihihi ("+user_id+")");
    ALL_WS.push({
        "ws":websocket,
        "user_id":user_id,
        "user_name":"",
    });
 sendUserId(user_id);
 
 websocket.on("bye", function bye(code,res){
    ALL_WS.forEach(function(el, index){
        if(el.ws == websocket) { // 나간유저
            ALL_WS.splice(index, 1);
        }
    });
    sendAllUser();
 });

 websocket.on("message", function come(message){
    console.log(JSON.parse(message));
    message = JSON.parse(message);
    switch(message.code){
        case "connect_name" :  //사용자 추가
        ALL_WS.forEach(function(el, index){
            if(el.user_id == message.user_id) {
                el.user_name = message.name;
            }
        });
        sendAllUser();
        break;
        case "send_message" :
            ALL_WS.forEach(function(el,index){
                let data= {"code":"chat_message","msg":message.msg,"sender_name": message.name};
                el.ws.send(JSON.stringify(data));
            });
   
            break;
    }
 });

 function sendAllUser(){ // 전체 사용자 정보를 보냄
    let data={"code":"all_users","msg":JSON.stringify(ALL_WS)};

    ALL_WS.forEach(function(el,index){
        el.ws.send(JSON.stringify(data));
    });
 }
        function sendUserId(user_id){
            let data = {"code":"my_user_id","msg":user_id}; // e.data
            websocket.send(JSON.stringify(data));
        }

});
