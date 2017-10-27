addHtmlObj.bottomMenuHtml();
menuObj.init();
var loadObj={
	loadFun:function(){
		var _this=this;
		$.get(pathObj.setJsonFun('/static/weicity/json/collect_list.json',''),function(json){
			var html='';
			for(var i in json.data){
			html+='<li collectId="'+json.data[i].collectId+'"><a href="javascript:window.location.href=\''+json.data[i].vrUrl+'?hotelId='+json.data[i].hotelId+'\'"><img src="'+json.data[i].defaultImgThumbUrl+'"><figure><figcaption>'+json.data[i].hotelName+'</figcaption><span>'+json.data[i].address+'</span><span>添加时间: '+json.data[i].ctime+'</span><em>¥'+json.data[i].livePrice+'/起</em></figure></a><i class="delect_icon"></i></li>';
			}
			$('.collect_main ul').append(html);
		},'json');
	},
	delectFun:function(thisNode){
		var _this=this;
		var id=$(thisNode).closest('li').attr('collectId');
		postObj.data={collectId:id};
		$.get(pathObj.setJsonFun('/static/weicity/json/status.json',''),postObj.data,function(result){
			if(result.status==1){
				$(thisNode).closest('li').remove();
			}
		});
	},
	init:function(){
		var _this=this;
		_this.loadFun();
		$(document).on('click','.delect_icon',function(){
			var $this=this;
			confirmFun('确定删除?',function(){
				_this.delectFun($this);
			});
		});
	}
};
loadObj.init();