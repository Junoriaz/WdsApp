var loadObj={
	listMain:$('.mainroom_list ul'),
	loadFun:function(){
		var _this=this;
		var data={hotelId:hrefObj.hrefJson.hotelId};
		postObj.data=data;
		$.ajax({
			type:'get',
			url:pathObj.setJsonFun('/static/weicity/json/body_list.json','hallList.form'),
			data:data,
			dataType:'json',
			success:function(json){
				for(var i in json){
					var html='<li class="clearFix"><img class="left" src="'+imgAddress+'hotel/'+hrefObj.hrefJson.hotelId+'/'+i+'/'+json[i].roomImgUrl+'" onerror="imgError(this)"><a href="'+pathObj.setJsonFun('hotel_putform.html','infoHotelDetail.form')+'?title='+json[i].title+'&hotelId='+hrefObj.hrefJson.hotelId+'&hotelBodyId='+i+'" class="left clearFix"><figure class="clearFix left"><figcaption class="to_pop_up" id="'+i+'">'+json[i].title+'</figcaption><small>¥<strong>'+json[i].infoPrice+'</strong>起</small></figure><i class="more_arrow"></i></a></li>';
					_this.listMain.append(html);
				}
			}
		});
	},
	init:function(){
		var _this=this;
		_this.loadFun();
	}
};
addHtmlObj.bottomMenuHtml();
loadObj.init();
swiperObj.recommendFun();