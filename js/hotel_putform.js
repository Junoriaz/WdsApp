var loadObj={				//加载
	formMessageMain:$('.room_formmessage figure'),
	priceNode:$('.price strong'),
	roomNumNode:$('[name=roomNumber]'),
	formMain:$('form'),
	loadFun:function(){		//初始加载
		var _this=this;
		var data={hotelId:hrefObj.hrefJson.hotelId,hotelInfoId:hrefObj.hrefJson.hotelInfoId};
		postObj.data=data;
		$.ajax({
			type:'get',
			url:pathObj.setJsonFun('/static/weicity/json/hotel_putform.json','/hotel/unconfine/getHotelName.form'),
			data:data,
			dataType:'json',
			success:function(json){
				if(json.isDefault=='1'){
					window.location.href=pathObj.setJsonFun('index.html','/hotel/unconfine/index.form');
				}
				else{
					var hotelName=json.hotelName;
					var html='<figcaption singlePrice="'+hrefObj.hrefJson.totelPrice+'">'+hotelName+'<em>——'+hrefObj.hrefJson.sealTitle+'</em></figcaption><div class="clearFix"><div class="left"><span>入住 '+hrefObj.hrefJson.liveTime+'</span><span>离店 '+hrefObj.hrefJson.leaveTime+'</span></div><span class="left">共'+hrefObj.hrefJson.liveDays+'晚</span></div>';
					_this.formMessageMain.append(html);
					_this.priceNode.text(hrefObj.hrefJson.totelPrice);
					var peopleNum=hrefObj.hrefJson.peopleNum;
					var goodsNumber=hrefObj.hrefJson.goodsNumber;
					for(var i=1;i<=parseInt(peopleNum);i++){
						var optionhtml='<option>'+i+'</option>';
						$('[name=personNumber]').append(optionhtml);
					}
					for(var i=1;i<=parseInt(goodsNumber);i++){
						var optionhtml='<option>'+i+'</option>';
						$('[name=roomNumber]').append(optionhtml);
					}
					var date={startTime:hrefObj.hrefJson.liveTime,endTime:hrefObj.hrefJson.leaveTime,hotelInfoId:hrefObj.hrefJson.hotelInfoId};
					postObj.data=data;
					$.get(pathObj.setJsonFun('/static/weicity/json/room_putform.json','/hotel/unconfine/dateStrsList.form'),date,function(json){
						for(var i=0;i<json.priceData.length-1;i++){
							var priceHtml='<li singlePrice="'+json.priceData[i].infoPrice+'"><span>'+json.priceData[i].date+' (<small class="roomNum">1</small>间)</span><span>¥<small class="single_price">'+json.priceData[i].infoPrice+'</small></span></li>';
							$('.pay_detail ul').append(priceHtml);
						}
					},'json');
				}
			}
		});
	},
	postFun:function(formNode){
		var _this=this;
		// $(formNode).find('input[type=submit]').attr('state','cant_click');
		//var event=window.event||e;
		//var target=event.target||event.srcElement;
		// postObj.post(formNode);
		// var href=decodeURI(document.location.href);
		// var data=nameObj.getNameFun(_this.formMain);
		// href=href+"&payFee="+data.payFee;
		// data['hotelInfoId']=hrefObj.hrefJson.hotelInfoId;
		// data['liveTime']=hrefObj.hrefJson.liveTime;
		// data['leaveTime']=hrefObj.hrefJson.leaveTime;
		// data['liveDays']=hrefObj.hrefJson.liveDays;
		// postObj.data=data;
		// $.get(pathObj.setJsonFun('/static/weicity/json/status.json','addOrder.form'),data,function(result){
			// if(result.status==1){
			// 	alert('订单提交成功,请稍后...');
			// 	document.cookie="payHistoryPage=-2;path=/";
			// 	if(result.data!=undefined){
			// 		window.location.href=result.data.authUrl;
			// 	}
			// }
			// else{
			// 	$('input[type=submit]').attr('state','can_click');
			// }
		// },'json');
	},
	postData:function(data){
		var href=decodeURI(document.location.href);
		var payFee=$('[postname=payFee]').text();
		var orderPrice=$('[postname=orderPrice]').text();
		// var data=nameObj.getNameFun(_this.formMain);
		href=href+"&payFee="+payFee;
		postObj.addData('hotelInfoId',hrefObj.hrefJson.hotelInfoId);
		postObj.addData('liveTime',hrefObj.hrefJson.liveTime);
		postObj.addData('leaveTime',hrefObj.hrefJson.leaveTime);
		postObj.addData('liveDays',hrefObj.hrefJson.liveDays);
		postObj.addData('payFee',payFee);
		postObj.addData('orderPrice',orderPrice);
	},
	postSuccess:function(result){
		if(result.status==1){
			$('.put_success').show();
			document.cookie="payHistoryPage=-2;path=/";
			if(result.data!=undefined){
				window.location.href=result.data.authUrl;
			}
		}
		else{
			$('input[type=submit]').attr('state','can_click');
		}
	},
	calPriceFun:function(thisNode){
		var _this=this;
		_this.priceNode.text(priceObj.singlePriceFun(thisNode));
	},
	changeDetailFun:function(thisNode){
		var _this=this;
		var roomNum=$(thisNode).val();
		$('.pay_detail ul .roomNum').text(roomNum);
		var priceNode=$('.pay_detail ul li[singlePrice]');
		for(var i=0;i<priceNode.length;i++){
			var singlePrice=priceNode.eq(i).attr('singlePrice');
			var price=parseInt(singlePrice)*parseInt(roomNum);
			priceNode.eq(i).find('.single_price').text(price);
			console.log(singlePrice,price);
		}
	},
	showDetailFun:function(){
		var _this=this;
		$('.masking').css('display','block');
		$('.masking').animate({'opacity':'.3'},1000);
		var detailHeight=$('.pay_detail').height();
		var bottomHeight=$('.bottom').height();
		$('.pay_detail').css('marginTop',-detailHeight-bottomHeight);
	},
	hideDetailFun:function(){
		var _this=this;
		$('.masking').animate({'opacity':'0'},1000,function(){
			$('.masking').css('display','none');
		});
		$('.pay_detail').css('marginTop','-0.9rem');
	},
	init:function(){
		var _this=this;
		loadObj.loadFun();
		_this.roomNumNode.change(function(){
			_this.calPriceFun(this);
			_this.changeDetailFun(this);
		});
		// _this.formMain.submit(function(e){
		// 	if($(this).find('input[type=submit]').attr('state')=='can_click'){
		// 		$('input[type=submit]').attr('state','cant_click');
		// 		_this.postFun(this);
		// 	}
		// 	e.preventDefault();
		// });
		$('.topay_detail').click(function(){
			_this.showDetailFun();
		});
		$('.masking').click(function(){
			_this.hideDetailFun();
		});
	}
};
loadObj.init();