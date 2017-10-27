hrefObj.getParameterFun();
var loadObj={
	playId:hrefObj.hrefJson.Id,
	load:function(){
		var _this=this;
		// postObj.data={playId:_this.playId};
		// $.get(pathObj.setJsonFun('/static/weicity/json/play_detail.json','/shopPlay/unconfine/details.form'),postObj.data,function(json){
		// 	var html='<img src="'+imgAddress+'play/'+_this.playId+'/'+json.data.imgaddr+'" onerror="imgError(this)"><figcaption>'+json.data.playName+'</figcaption><p>'+json.data.content+'</p>';
		// 	$('.main_meg').append(html);
		// },'json');
		$('.strategy_main').load('/static/weicity/strategy/'+_this.playId+'.html',function(){
			console.log($('.strategy_main').find('a'));
			for(var i=0;i<$('.strategy_main a').length;i++){
				console.log($('.strategy_main a'));
				$('.strategy_main a').eq(i).attr('href','javascript:return false');
				$('.strategy_main a').eq(i).find('[data-url]').removeAttr('data-url');
			}
			
		});
	},
	init:function(){
		var _this=this;
		_this.load();
	}
};
loadObj.init();
addHtmlObj.bottomMenuHtml();
swiperObj.recommendFun();