hrefObj.getParameterFun();
var loadObj={
	tripId:hrefObj.hrefJson.Id,
	load:function(){
		var _this=this;
		// $('.triplist_main').load('/static/weicity/strategy/1.html')
		postObj.data={tripId:_this.tripId};
		$.get(pathObj.setJsonFun('/static/weicity/json/trip_detail.json','/shopTrip/unconfine/details.form'),postObj.data,function(json){
			var html='<img src="'+imgAddress+'trip/'+_this.tripId+'/'+json.data.imgaddr+'" onerror="imgError(this)"><figure><figcaption>'+json.data.tripName+'</figcaption><p>'+json.data.content1+'</p></figure>';
			$('.main_meg').append(html);
			for(var i=0;i<json.days.length;i++){
				var dayData=json.days[i];
				for(var d in dayData.hotelDatas){
					var hotelData=dayData.hotelDatas[d];
					var vrAddr=hotelData.hcpVr+'?Id='+hotelData.hcpId;
					var html='<li><a href="'+vrAddr+'"><div class="name"><i class="list_icon"></i> <span class="china_name">'+hotelData.hcpName+'</span> <i class="more_arrow"></i></div><div class="spotsImg_box"> <img src="'+imgAddress+'hotel/'+hotelData.hcpId+'/'+hotelData.hcpImg+'" onerror="imgError(this)"> <div class="recod_reason"> 推荐理由：<span class="recod_l">'+json.data.content2+'</span> </div><div class="recod_reason"> 酒店简介：<span class="recod_l">'+hotelData.hcpInfo+'</span> </div> </div></a></li>';
					$('.triplist_main').append(html);
				}
				for(var d in dayData.cateringDatas){
					var cateringData=dayData.cateringDatas[d];
					var vrAddr=cateringData.hcpVr+'?Id='+cateringData.hcpId;
					var html='<li><a href="'+vrAddr+'"><div class="name"><i class="list_icon"></i> <span class="china_name">'+cateringData.hcpName+'</span> <i class="more_arrow"></i></div><div class="spotsImg_box"> <img src="'+imgAddress+'catering/'+cateringData.hcpId+'/'+cateringData.hcpImg+'" onerror="imgError(this)"> <div class="recod_reason"> 推荐理由：<span class="recod_l">'+json.data.content3+'</span> </div><div class="recod_reason"> 餐厅简介：<span class="recod_l">'+cateringData.hcpInfo+'</span> </div> </div></a></li>';
					$('.triplist_main').append(html);
				}
				for(var d in dayData.playDatas){
					var playData=dayData.playDatas[d];
					var vrAddr=pathObj.setJsonFun('/static/weicity/play_detail.html','/shopPlay/unconfine/playDetail.form')+'?Id='+playData.hcpId;
					var html='<li><a href="'+vrAddr+'"><div class="name"><i class="list_icon"></i> <span class="china_name">'+playData.hcpName+'</span><i class="more_arrow"></i></div><div class="spotsImg_box"> <img src="'+imgAddress+'play/'+playData.hcpId+'/'+playData.hcpImg+'" onerror="imgError(this)"> <div class="recod_reason"> 推荐理由：<span class="recod_l">'+json.data.content4+'</span> </div><div class="recod_reason"> 玩乐简介：<span class="recod_l">'+playData.hcpInfo+'</span> </div> </div></a></li>';
					$('.triplist_main').append(html);
				}
			}
		},'json');
	},
	init:function(){
		var _this=this;
		_this.load();
	}
};
loadObj.init();
addHtmlObj.bottomMenuHtml();
swiperObj.recommendFun();