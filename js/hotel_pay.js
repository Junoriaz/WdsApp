var loadObj={
	formMessageMain:$('.affirm_main figure'),
	payButton:$('.affirm_pay'),
	loadFun:function(){
		var _this=this;
		var data={orderHotelId:hrefObj.hrefJson.orderHotelId};
		postObj.data=data;
		$.ajax({
			type:'get',
			url:pathObj.setJsonFun('/static/weicity/json/hotel_pay.json','orderPayInit.form'),
			data:data,
			dataType:'json',
			success:function(json){
				var html='<figcaption>'+json.hotelName+'<em>——'+json.hotelInfoName+'</em></figcaption><div class="clearFix"><div class="left"><span>入住 '+json.liveTime+'</span><span>离店 '+json.leaveTime+'</span></div><span class="left">共'+json.liveDays+'晚</span></div><b>待支付¥<strong>'+json.payFee+'</strong></b>';
				_this.formMessageMain.append(html);
				_this.payFee=json.payFee;
			}
		});
		
	},
	payFun:function(){
		var _this=this;
		var data={openId:hrefObj.hrefJson.open_id,subOpenId:hrefObj.hrefJson.sub_open_id,payFee:_this.payFee,orderHotelId:hrefObj.hrefJson.orderHotelId};
		postObj.data=data;
		$.ajax({
			type:'get',
			url:pathObj.setJsonFun('/static/weicity/json/status.json','orderPay.form'),
			data:data,
			dataType:'json',
			success:function(json){
				window.location.href=json.url;
			},
			error:function(xmlhttp,status,error){
				alert("发现一个问题，请稍后重试!");
				$('.affirm_pay').attr('state','can_click');
			}
		});
	},
	historyGo:function(){
		var _this=this;
		var historyNum=cookieObj.getCookie('payHistoryPage');
		historyNum=parseInt(historyNum);
		console.log(historyNum);
		history.go(historyNum);
	},
	init:function(){
		var _this=this;
		_this.loadFun();
		_this.payButton.click(function(){
			if($('.affirm_pay').attr('state')=="can_click"){
				$('.affirm_pay').attr('state','cant_click');
				_this.payFun();
			}
			
		});
	}
};
loadObj.init();
addHtmlObj.bottomMenuHtml();