var loadPage={
	changeFormStateFun:function(){
		var _this=this;
		$.ajax({
			type:pathObj.setJsonFun('get','post'),
			url:pathObj.setJsonFun('/static/weicity/json/status.json','/shopHotelOrder/confine/updateOrder.form'),
			data:{orderStatus:"1",orderHotelId:hrefObj.hrefJson.orderHotelId},
			dataType:'json',
			success:function(json){
				if(debug==true)
				console.log('返回的结果',json);
			},
			error:function(xmlhttp,status,error){
				//console.log(status,error);
				alert("请稍后重试!");
			}
		});
	},
	init:function(){
		var _this=this;
		_this.changeFormStateFun();
	}
};
window.onload=function(){
	loadPage.init();
}
addHtmlObj.bottomMenuHtml();