var loadObj={
	formList:$('.form_list ul'),
	formStatus:["待支付","已支付","已接单","退款中","退款完成","取消","已完成"],
	stateGroup:[[0,1,2,3,4,5,6],[0],[1,2],[6],[3,4,5]],
	menuNode:$('.formmenu li'),
	loadAllFun:function(){
		var _this=this
		$.ajax({
	            type:'get',
	            url:pathObj.setJsonFun('../../static/weicity/json/form.json','orderForm.form'),
	            dataType:'json',
	            success:function(json){
	            	if(debug==true)
	            	console.log('初始化数据',json);
	            	_this.json=json;
	            	for(var id in json){
	            		var html='<li class="clearFix" id="'+id+'"><img src="'+imgAddress+json[id].hotelId+'/'+json[id].hotelBodyId+'/'+json[id ].roomImgUrl+'"><figure class="clearFix"><figcaption>'+json[id].hotelName+'</figcaption><span>'+json[id].hotelInfoName+'</span><div class="left"><em>入住'+json[id].liveTime+'</em><em>离开'+json[id].leaveTime+'</em></div><em class="left">'+json[id].liveDays+'晚</em><em class="left">'+json[id].roomNumber+'间</em></figure><div class="form_message" style=""><strong>¥'+json[id].payFee+'</strong><em>'+_this.formStatus[json[id].orderStatus]+'</em>'
	            		if(json[id].orderStatus=='0'){
	            			html+='<b class="want_pay">我要<br>支付</b>';
	            		}
	            		html+='</div></li>';
	            		_this.formList.append(html);
	            	}
	            },
	            error:function(xmlhttp,status,error){
	                alert("请稍后重试!");
	            }
        	});
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
				var html='<li class="clearFix" id="'+i+'"><img src="'+_this.json[i].roomImgUrl+'"><figure class="clearFix"><figcaption>'+_this.json[i].hotelName+'</figcaption><span>'+_this.json[i].hotelInfoName+'</span><div class="left"><em>入住'+_this.json[i].liveTime+'</em><em>离开'+_this.json[i].leaveTime+'</em></div><em class="left">'+_this.json[i].liveDays+'晚</em><em class="left">'+_this.json[i].roomNumber+'间</em></figure><div class="form_message" style=""><strong>¥'+_this.json[i].payFee+'</strong><em>'+_this.formStatus[_this.json[i].orderStatus]+'</em>';
				if(_this.json[i].orderStatus=='0'){
        			html+='<b class="want_pay">我要<br>支付</b>';
        		}
        		html+='</div></li>';
	            _this.formList.append(html);
			}
		}
		//console.log(index,typeArr);
	},
	topayFun:function(thisNode){
		var _this=this;
		var data={orderHotelId:$(thisNode).closest('li').attr('id')};
		if(debug==true)
		console.log('提交的数据',data);
		$.ajax({
			type:'get',
			url:pathObj.setJsonFun('../../static/weicity/json/status.json','toPay.form'),
			data:data,
			dataType:'json',
			success:function(result){
				if(debug==true)
				console.log('返回的结果',result);
				if(result.status==1){
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
addHtmlObj.bottomMenuHtml('.menu_destination');