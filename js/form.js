//var loadFlag=false;
// setTimeout(function(){
// 	if(loadFlag==false){
// 		alert('连接超时，请稍后再试');
// 		history.go(-1);
// 	}
// },4000);
var loadObj={
	formList:$('.form_list ul'),
	formStatus:["待支付","待接单","已接单","退款中","退款完成","已取消","已完成"],
	stateGroup:[[0,1,2,3,4,5,6],[0],[1,2],[6],[3,4,5]],
	menuNode:$('.formmenu li'),
	cTime:{},
	payMinutes:10,
	loadAllFun:function(){
		var _this=this;
		// $.get(pathObj.setJsonFun('/static/weicity/json/time.json','/hotel/unconfine/getNowTime.form'),function(time){
		// 	_this.serverTime=time.serverNowTime;
		// 	if(debug==true)
		// 	console.log('服务器时间',_this.serverTime);
		// 	_this.serverTime=_this.serverTime.replace(/\-/g, "\/");
			$.ajax({
	            type:'get',
	            url:pathObj.setJsonFun('/static/weicity/json/form.json','orderForm.form'),
	            dataType:'json',
	            success:function(json){
	            	_this.json=json;
	            	for(var id in json){
	            		var html='<li class="clearFix" id="'+id+'"><img src="'+imgAddress+'hotel/'+json[id].hotelId+'/'+json[id].hotelBodyId+'/'+json[id].roomImgUrl+'" onerror="imgError(this)"><figure class="clearFix"><figcaption>'+json[id].hotelName+'</figcaption><span>'+json[id].hotelInfoName+'</span><div class="left"><em>入住'+json[id].liveTime+'</em><em>离开'+json[id].leaveTime+'</em></div><em class="left">'+json[id].liveDays+'晚</em><em class="left">'+json[id].roomNumber+'间</em></figure><div class="form_message" style=""><strong>¥'+json[id].payFee+'</strong><em>'+_this.formStatus[json[id].orderStatus]+'</em>'
	            		if(json[id].orderStatus=='0'){
	            			//html+='<b class="want_pay">我要<br>支付</b><small></small>';
	            			var ctime=json[id].ctime;
	            			_this.setTimeFun(ctime,id);
	            		}
	            		html+='</div></li>';
	            		_this.formList.append(html);
	            	}
            		if($('.form_list .samll_list li').length==0){
            			_this.formList.append('<li style="text-align:center">暂无订单</li>');
            		}
	            	_this.judgeFun();
	            	//loadFlag=true;
	            }
        	});
		// });
	},
	setTimeFun:function(ctime,id){
		var _this=this;
		//var rule=/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/;
		//ctime=ctime.match(rule)[0];
		ctime=ctime.replace(/\-/g, "\/");
		_this.cTime[id]=ctime;
	},
	judgeFun:function(){
		var _this=this;
		var payTimeAll=_this.payMinutes*60*1000;
		for(var i in _this.cTime){
			var ctime=Date.parse(_this.cTime[i]);
			var serverTime=Date.parse(new Date());
			var difVal=serverTime-ctime;
			if(difVal<payTimeAll){
				_this.timer(i);
			}
			else{
				$('#'+i).find('.form_message em').text('已取消');
				postObj.data={orderHotelId:i,orderStatus:'5'};
				$.get(pathObj.setJsonFun('/static/weicity/json/status.json','/shopHotelOrder/confine/updateOrder.form'),postObj.data);
			}
		}
	},
	timer:function(orderId){
		var _this=this;
		var payTimeAll=_this.payMinutes*60*1000;
		var payhtml='<b class="want_pay">我要<br>支付</b><small></small>';
		if($('#'+orderId).find('.form_message .want_pay').length==0)
		$('#'+orderId).find('.form_message').append(payhtml);
		var timer=setInterval(function(){
			var ctime=Date.parse(_this.cTime[orderId]);
			var serverTime=Date.parse(new Date());
			var difVal=serverTime-ctime;
			if(difVal>=payTimeAll){
				if($('#'+orderId).find('.form_message .want_pay')){
					$('#'+orderId).find('.form_message .want_pay').remove();
					$('#'+orderId).find('.form_message small').remove();
					_this.json[orderId].orderStatus="5";
					$('#'+orderId).find('.form_message em').text('已取消');
					postObj.data={orderHotelId:orderId,orderStatus:'5'};
					$.get(pathObj.setJsonFun('/static/weicity/json/status.json','/shopHotelOrder/confine/updateOrder.form'),postObj.data);
					clearInterval(timer);
				}
			}
			var seconds=(payTimeAll-difVal)/1000;
			var minutes=seconds/60;
			seconds=seconds-Math.floor(minutes)*60;
			var timeText=Math.floor(minutes)+":"+Math.floor(seconds);
			$('#'+orderId).find('.form_message small').text(timeText);
		},300);
	},
	changeListFun:function(thisNode){
		var _this=this;
		_this.formList.empty();
		var index=$(thisNode).index();
		$(thisNode).addClass('current').siblings().removeClass('current');
		var typeArr=_this.stateGroup[index];
		for(var i in _this.json){
			var orderStatus=parseInt(_this.json[i].orderStatus);
			if(typeArr.indexOf(orderStatus)!=-1){
				var html='<li class="clearFix" id="'+i+'"><img src="'+imgAddress+'hotel/'+_this.json[i].hotelId+'/'+_this.json[i].hotelBodyId+'/'+_this.json[i].roomImgUrl+'" onerror="imgError(this)"><figure class="clearFix"><figcaption>'+_this.json[i].hotelName+'</figcaption><span>'+_this.json[i].hotelInfoName+'</span><div class="left"><em>入住'+_this.json[i].liveTime+'</em><em>离开'+_this.json[i].leaveTime+'</em></div><em class="left">'+_this.json[i].liveDays+'晚</em><em class="left">'+_this.json[i].roomNumber+'间</em></figure><div class="form_message" style=""><strong>¥'+_this.json[i].payFee+'</strong><em>'+_this.formStatus[_this.json[i].orderStatus]+'</em>';
				 if(_this.json[i].orderStatus=='0'){
				 	var ctime=_this.json[i].ctime;
	            	_this.setTimeFun(ctime,i);
        			//html+='<b class="want_pay">我要<br>支付</b><small></small>';
        		}
        		html+='</div></li>';
	            _this.formList.append(html);
	            _this.judgeFun();
			}
		}
		if($('.form_list .samll_list li').length==0){
			_this.formList.append('<li style="text-align:center">暂无订单</li>');
		}
		//console.log(index,typeArr);
	},
	topayFun:function(thisNode){
		var _this=this;
		var data={orderHotelId:$(thisNode).closest('li').attr('id')};
		postObj.data=data;
		$.ajax({
			type:'get',
			url:pathObj.setJsonFun('/static/weicity/json/status.json','toPay.form'),
			data:data,
			dataType:'json',
			success:function(result){
				if(result.status==1){
					document.cookie="payHistoryPage=-1;path=/";
					window.location.href=result.data.authUrl;
				}
				else{
					alert('支付失败');
				}
			},
			error:function(xmlhttp,status,error){
				//console.log(status,error);
				alert("请稍后重试!");
			}
		});
	},
	init:function(){
		var _this=this;
		_this.loadAllFun();
		$(document).on('click','.want_pay',function(){
			_this.topayFun(this);
		});
		_this.menuNode.click(function(){
			_this.changeListFun(this);
		});
	}
};
loadObj.init();
var websocketObj={
	startFun:function(){
		var _this=this;
		var client = new WebSocket('ws://192.168.0.66:2000/', 'echo-protocol');  
        client.onerror = function() {  
            console.log('Connection Error');  
        };  
        client.onopen = function() {  
            console.log('WebSocket Client Connected');
        };  
        client.onclose = function() {
            console.log('echo-protocol Client Closed');  
        };  
        client.onmessage = function(e) {  
            if (typeof e.data === 'string'){  
            	_this.serverTime=e.data;
                //console.log("Received: '" + e.data + "'");  
            }  
        }; 
	},
	init:function(){
		var _this=this;
		_this.startFun();
	}
};
window.onload=function(){
	// websocketObj.init();
};
addHtmlObj.bottomMenuHtml('.menu_destination');