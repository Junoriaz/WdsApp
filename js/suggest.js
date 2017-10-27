var putObj={
	postFun:function(thisNode){
		var _this=this;
		postObj.data=$(thisNode).serialize();
		$.get(pathObj.setJsonFun('/static/weicity/json/status.json','/shopHotel/unconfine/initPara.form'),postObj.data,function(result){
			if(result.status==1){
				$('.success_word').css({'opacity':1,'marginTop':0});
			}
			$('input[type=submit]').attr('state','cant_click');
		},'json');
		$(document).on('ajaxError',function(){
			$('input[type=submit]').attr('state','can_click');
		});
	},
	init:function(){
		var _this=this;
		$('form').on('submit',function(e){
			$('input[type=submit]').attr('state','cant_click');
			_this.postFun(this);
			e.preventDefault();
		});
	}
};
putObj.init();