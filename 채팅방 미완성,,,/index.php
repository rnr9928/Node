<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
crossorigin="anonymous"></script>

<script>


	let MY_USER_ID = "";
	let MY_NAME = "";
	let websocket = null;

	function connect() {
		if(!$.trim($("#myname").val())){
			alert("NONONO");
			$("#myname").focus();
			return false;
		}

		let my_user_name = $.trim($("#myname").val());

		websocket =  new WebSocket("ws://localhost:3020");
		websocket.onmessage = function(e) {  
			let message = JSON.parse(e.data);

			switch (message.code) {
				case "my_user_id" :
				MY_USER_ID = message.msg;
				sendMyName(my_user_name);
			//	alert("user_id send:" + MY_USER_ID);
				break;
				case "chat_message" :
					$("#divMsg").append(`<div>
					${message.sender_name}: ${message.msg}
					</div>`);
					break;
				case "all_users" :
				let ALL_WS = JSON.parse(message.msg);

				$("#divAllUser").html("");
				ALL_WS.forEach(function(el, index){
					$("#divAllUser").append(`
						<div>
						${el.user_name}
						</div>
					`);
				});
					break;
			}
			}

			function sendMyName(sending_user_name) {
				MY_NAME = sending_user_name;
				let data = {"code":"connect_name","name":sending_user_name,"user_id":MY_USER_ID}; 
				 websocket.send(JSON.stringify(data));


				 $("#divPannel").html(`<input type=text id="txtMessage" value="" placeholder="input" 
				 style= "font-size:18px; width:320px" onkeypress="javascript:if(event.keyCode==13)
				 {sendMessage();return false;};return true;">
				 <button style="font-size:18px; background-color:black; color:white"
				 onclick="sendMessage();">SEND</button`);
			}

		}

		function sendMessage(){
			let message = $("#txtMessage").val();

			let data = {"code":"send_message","name":MY_NAME,"user_id":MY_USER_ID,"msg":message}; 
				 websocket.send(JSON.stringify(data));
		}
</script>
</head>
<body>
	<div style="width:820px; height:620px; background-color:gray; 
	padding-top: 10px; margin:0px auto; margin-top:40px">
	<div style="width:800px; height:560px; background-color:white; margin-left:10px; margin-right:10px">
	<div style="width:100%; height:100%">
	<div style="float:left; width:80%; background-color:white" id="divMsg">
	&nbsp;
	</div>
	<div style="float:left; width:20%; height:100%; box-shadow: 0 0 0 1px #d0e0f7 inset;">
	<div style="width:100%; height:30px; line-height:30px; background-color:#033279; color:white; text-align:center">
	 User
	</div>
	<div style="width:100%; line-height:22px; font-size:15px; text-align:center" id="divAllUser">
	</div>
	</div>
	</div>
	</div>

	<div style="width:100%; height:50px; text-align:center; padding-top:15px" id="divPannel">
	<input type=text id="myname" value="" placeholder="NickName" style="font-size:18px; width:120px"
	onkeypress="javascript:if(event.keyCode==13){connect(); return false;};return true;">
	<button style = "font-size:18px; background-color:black; color:white" onclick="connect();">in</button>
	</div>
</body>
</html>