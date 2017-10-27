bottomPageObj.init();
var submitObj={
	init:function(){
		var _this=this;
		$('form').submit(function(e){
			postObj.post(this);
			e.preventDefault();
		});
	}
};
var successObj={
	changePhone1:function(){
		bottomPageObj.showPageFun($('.change_phone input[type=submit]'));
	},
	changePhone2:function(){
		alert('手机号更改成功');
		window.location.reload();
	},
	password:function(){
		alert('修改密码成功');
		window.location.reload();
	}
};
submitObj.init();