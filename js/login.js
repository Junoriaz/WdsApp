
bottomPageObj.init();
menuObj.init();
// inputObj.init();
var formObj={
	checkNumFun:function(thisNode){
		var _this=this;
		if($(thisNode).attr('state')=='can_click'){
			var mobile=$(thisNode).closest('form').find('[name=phone]').val();
			var formNode=$(thisNode).parents('form');
			// if(formNode.hasClass('phone_login')){
			// 	var msg=2;
			// }
			// else if(formNode.hasClass('register')){
			// 	var msg=1;
			// }
			var data={phone:mobile};
			postObj.data=data;
			$.ajax({
	            url : pathObj.setJsonFun("/static/weicity/json/status.json","getCode.form") ,
	            type : pathObj.setJsonFun("GET","POST"),
	            dataType : "json",
	            data:data,
	            success : function(result) {
	            	if(result.status=='1'){
	            		alert('验证码已发送');
	            		_this.CodetimerFun(thisNode);
	            	}
	            	else{
	            		alert('验证码发送失败');
	            	}
	            }
	        });
		}
	},
	CodetimerFun:function(thisNode){
		var _this=this;
		$(thisNode).attr('state','cant_click')
		$(thisNode).html('<b>60</b>s');
		var timeNode=$(thisNode).find('b');
		var time=60;
		var timer=setInterval(function(){
			if(time==0){
				$(thisNode).html('获取验证码');
				$(thisNode).attr('state','can_click')
				clearInterval(timer);
			}
			time--;
			timeNode.text(time);
		},1000);
	},
	loginFun:function(formNode){
		var _this=this;
		postObj.post(formNode);
	},
	success:function(result){
		window.location.href=pathObj.setJsonFun('index.html','/hotel/unconfine/index.form');
	},
	registerSuccess:function(){
		$('.quick_registerpage').css({'top':'100%','bottom':'100%'});
	},
	registerFun:function(formNode){
		var _this=this;
		postObj.post(formNode);
		// postObj.post(formNode,'register.form',null,function(result){
		// 	if(result.status==1){
		// 		window.location.href=pathObj.setJsonFun('index.html','/hotel/unconfine/index.form');
		// 	}
		// });
	},
	changePass:function(formNode){
		var _thsi=this;
		postObj.post(formNode);
		// postObj.post(formNode,'',null,function(result){
		// 	if(result.status==1){
		// 		alert('修改密码成功！');
		// 		$('.back').click();
		// 	}
		// });
	},
	passSuccess:function(result){
		alert('修改密码成功！');
		$('.back').click();
	},
	init:function(){
		var _this=this;
		$('form.login').submit(function(e){
			_this.loginFun(this);
			e.preventDefault()
		});
		$('form.phone_login').submit(function(e){
			_this.loginFun(this);
			e.preventDefault()
		});
		$('form.register').submit(function(e){
			 _this.registerFun(this);
			e.preventDefault()
		});
		$('.forget_pass form').submit(function(e){
			_this.changePass(this);
			e.preventDefault()
		});
	}
};
var loadObj={
	changeList:function(thisNode){
		var _this=this;
		var index=$(thisNode).index();
		$('.list_main').eq(index).addClass('currentPage').siblings().removeClass('currentPage');
		console.log(index);
	},
	init:function(){
		var _this=this;
		$('.menu').on('click','li',function(){
			_this.changeList(this);
		});
		$('[bottompage=register_deal]').click(function(){
			$('.register_deal').load('/static/weicity/text/register_deal.html')
		});
		$('[bottompage=privacy_deal]').click(function(){
			$('.privacy_deal').load('/static/weicity/text/privacy_deal.html')
		});
	}
}
addHtmlObj.bottomMenuHtml();
formObj.init();
loadObj.init();














// var registerObj={			//注册
// 	loginForm:$('form.login'),
// 	registerForm:$('form.register'),
// 	phoneloginForm:$('form.phone_login'),
// 	getVerify:$('.get_verify'),
// 	verifuFun:function(thisNode){		//发送验证码
// 		var _this=this;
// 		var mobile=$(thisNode).parents('form').find('.username').val();
// 		var form=$(thisNode).parents('form');
// 		if(form.hasClass('register')){
// 			var msg=1;
// 		}
// 		else{
// 			var msg=2;
// 		}
// 		$.ajax({
//             url : pathObj.setJsonFun("/weicity/json/status.json","check.from") ,
//             type : "POST",
//             dataType : "json",
//             data: {phone:mobile},
//             success : function(result) {
//             	console.log(result);
//             	if(result.status==0){
//                 	$.ajax({
// 		                url : "getCode.form" ,
// 		                type : "POST",
// 		                dataType : "json",
// 		                data: {phone:mobile,msg:msg},
// 		                success : function(result) {
// 		                    alert(result.message);
// 		                },
// 		                error:function(){
// 		                	alert('获取验证码错误');
// 		                }
// 		            });
//             	}
//             	else if(result.status==-1){
// 					alert('手机号格式错误！');
// 				}
// 				else if(result.status==1){
// 					alert('手机号未注册！');
// 				}
//             },
//             error:function (e) {
//                 alert("手机验证出错");
//             }
//         });
// 	},
// 	registerFun:function(e){
// 		var _this=this;
// 		var event=e||window.event;
// 		var target=event.target||event.srcElement;
// 		var options={
// 			url:'check.form',
// 			type : "POST",
// 			success:function(result){
// 				console.log(result);
// 				var options={
// 					url:'register.form',
// 					type : "POST",
// 					success:function(result){
// 						console.log(result);
// 						alert(result.message);
// 					},
// 					error:function(){
// 						alert('register出错');
// 					}
// 				};
// 				$(target).ajaxSubmit(options);
// 			},
// 			error:function(){
// 				alert('手机验证出错');
// 			}
// 		};
// 		$(target).ajaxSubmit(options);
// 		e.preventDefault();
// 	},
// 	loginFun:function(e){
// 		var _this=this;
// 		var event=e||window.event;
// 		var target=event.target||event.srcElement;
// 		var options={
// 			url:'check.form',
// 			type : "POST",
// 			success:function(result){
// 				console.log(result);
// 				if(result.status==0){
// 					var options={
// 						url:'login.form',
// 						success:function(result){
// 							alert(result.message+"login.form");
// 						},
// 						error:function(){
// 							alert('登陆失败');
// 						}
// 					};
// 					$(target).ajaxSubmit(options);
// 					$(target).resetForm();
// 				}
// 				else if(result.status==-1){
// 					alert('手机号格式错误！');
// 				}
// 				else if(result.status==1){
// 					alert('手机号未注册！');
// 				}
// 			},
// 			error:function(){
// 				alert('手机验证出错');
// 			}
// 		};
// 		$(target).ajaxSubmit(options);
// 		e.preventDefault();
// 	},
// 	init:function(){
// 		var _this=this;
// 		// _this.getVerify.click(function(){
// 		// 	_this.verifuFun(this);
// 		// });	
// 		// _this.registerForm.submit(function(e){
// 		// 	_this.registerFun(e);
// 		// });
// 		// _this.loginForm.submit(function(e){
// 		// 	_this.loginFun(e);
// 		// });
// 	}
// };
// registerObj.init();