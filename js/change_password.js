var putObj={
	postFun:function(formNode){
		var _this=this;
		postObj.post(formNode,'/shopHotel/unconfine/initPara.form',null,function(result){
			if(result.status==1){
				alert('修改密码成功！');
			}
		});
	},
	init:function(){
		var _this=this;
		$('form').on('submit',function(e){
			_this.postFun(this);
			$('input[type=submit]').attr('state','cant_click');
			e.preventDefault();
		});
	}
};
putObj.init();