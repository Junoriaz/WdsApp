loadPageObj.init();
var loadObj={
	init:function(){
		var _this=this;
		$.ajax({
			type:pathObj.setJsonFun('get','post'),
			url:pathObj.setJsonFun('/static/weicity/json/initpara.json','/shopHotel/unconfine/initPara.form'),
			data:postObj.data,
			dataType:'json',
			success:function(json){
				if(json.status==1){		//0是空，1是有
					$('.index_location strong').html(json.cityName);
					loadPageFlag=true;
					// window.location.href=pathObj.setJsonFun('/static/weicity/index.html','/hotel/unconfine/index.form');
					// _this.loadPageFun();
				}
				else{
					mapObj.init();
					var timer=setInterval(function(){
						if(mapObj.cityFlag==true&&mapObj.positionFlag==true){
							postObj.data={longitude:mapObj.personLng,latitude:mapObj.personLat,code:mapObj.cityCode,cityName:mapObj.cityName};
							// window.location.href=pathObj.setJsonFun('/static/weicity/index.html','/hotel/unconfine/index.form');
							loadObj.init();
							clearInterval(timer);
						}
					},50);
				}
			},		
			error:function(xmlhttp,status,error){
				alert("请稍后重试!");
			}
		});
	}
};
loadObj.init();