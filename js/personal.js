var loginpageObj={				//登录页面
	loginmes:$('.login_main_message input'),
	username:$('.login_main_message .username'),
	password:$('.login_main_message .password'),
	notNullNode:$('.login_main_message .not_null'),
	inputWord:$('.login_main_message .login_input input'),
	formNode:$('.loginpage_main form,.register'),
	loginbutton:$('.submit'),
	canseeNode:$('.see_or_not'),
	getVerify:$('.get_verify'),
	status:null,
	message:null,
	data:null,
	judgeFun:function(e){		//判断是否可提交
		var _this=this;
		var event=e||window.event;
		var target=event.target||event.srcElement;
		var username=$(target).parents('form').find('.username').val();
		var notNullNode=$(target).parents('form').find('.not_null');
		var Null=false;
		for(var i=0;i<notNullNode.length;i++){
			// console.log(notNullNode.eq(i).val());
			if(notNullNode.eq(i).val()==''){
				Null=true;
			}
		}
		var password=$(target).parents('form').find('.password').val();
		var reg = /^\d+$/;
		// console.log(username,password);
		if(username.length==11&&Null==false&&reg.test(username)&&(password==undefined||(password.length>=6&&password.length<=16))){
			$(target).parents('form').find('.submit').css('background','#ff9d00').attr('flag',true);
		}
		else{
			_this.loginbutton.css('background','#d8d8d8').attr('flag',false);
			// _this.loginbutton.attr('flag',1);
		}
	},
	canseeFun:function(e){		//密码可见性
		var _this=this;
		var event=e||window.event;
		var target=event.target||event.srcElement;
		$(target).toggleClass('cansee').toggleClass('cantsee');
		if($(target).hasClass('cansee'))
			$(target).parent().find('input').attr('type','text');
		else
			$(target).parent().find('input').attr('type','password');
	},
	valuehideFun:function(e){	//说明文字隐藏
		var _this=this;
		var event=e||window.event;
		var target=event.target||event.srcElement;
		if($(target).val()==''){
			$(target).css('background','rgba(255,255,255,1)')
		}
	},
	valueshowFun:function(e){	//说明文字显示
		var _this=this;
		var event=e||window.event;
		var target=event.target||event.srcElement;
		if($(target).val()==''){
			$(target).css('background','rgba(255,255,255,0)')
		}
	},
	// verifuFun:function(e){		//发送验证码
	// 	var _this=this;
	// 	var event=e||window.event;
	// 	var target=event.target||event.srcElement;
	// 	var mobile=$(target).parents('form').find('.username').val();
	// 	var form=$(target).parents('form');
	// 	if(form.hasClass('register')){
	// 		$.ajax({
 //                url : "check.form" ,//请求url地址
 //                type : "POST",
 //                dataType : "json",
 //                data: {phone:mobile},//请求参数
 //                success : function(result) {
 //                	console.log(result);
 //                	if(result.status==0){
	//                 	$.ajax({
	// 		                url : "getCode.form" ,
	// 		                type : "POST",
	// 		                dataType : "json",
	// 		                data: {phone:mobile,msg:1},
	// 		                success : function(result) {
	// 		                    alert(result.message);
	// 		                },
	// 		                error:function(){
	// 		                	alert('获取验证码错误');
	// 		                }
	// 		            });
 //                	}
 //                	else if(result.status==-1){
	// 					alert('手机号格式错误！');
	// 				}
	// 				else if(result.status==1){
	// 					alert('手机号未注册！');
	// 				}
 //                },
	//                 error:function (e) {
	//                     alert("手机验证出错");
	//                 }
	//             });
	// 	}
	// 	else{
	// 		$.ajax({
 //                url :"check.form" ,
 //                type : "POST",
 //                dataType : "json",
 //                data: {phone:mobile},
 //                success : function(result) {
 //                	console.log(result);
 //                	if(result.status==0){
	//                 	$.ajax({
	// 		                url : "getCode.form" ,
	// 		                type : "POST",
	// 		                dataType : "json",
	// 		                data: {phone:mobile,msg:2},
	// 		                success : function(result) {
	// 		                    alert(result.message);
	// 		                },
	// 		                error:function(){
	// 		                	alert('获取验证码错误');
	// 		                }
	// 		            });
 //               		}
 //               		else if(result.status==-1){
	// 					alert('手机号格式错误！');
	// 				}
	// 				else if(result.status==1){
	// 					alert('手机号未注册！');
	// 				}
 //                },
	//                 error:function (e) {
	//                     alert("手机验证出错");
	//                 }
	//             });
	// 	}
	// },
	submitFun:function(e){		//提交表单
		var _this=this;
		var event=e||window.event;
		var target=event.target||event.srcElement;
		if($(target).find('.submit').attr('flag')=='true'){
			if($(target).hasClass('register')){
				// var options={
				// 	url:'check.form',
				// 	type : "POST",
				// 	success:function(result){
				// 		console.log(result);
				// 		// if()
				// 		var options={
				// 			url:'register.form',
				// 			type : "POST",
				// 			success:function(result){
				// 				console.log(result);
				// 				alert(result.message);
				// 			},
				// 			error:function(){
				// 				alert('register出错');
				// 			}
				// 		};
				// 		$(target).ajaxSubmit(options);
				// 	},
				// 	error:function(){
				// 		alert('手机验证出错');
				// 	}
				// };
				// 	$(target).ajaxSubmit(options);
				// 	e.preventDefault();
			}
			else if($(target).hasClass('login')||$(target).hasClass('phone_login')){
				var options={
					url:'check.form',
					type : "POST",
					success:function(result){
						console.log(result);
						if(result.status==0){
							var options={
								url:'login.form',
								success:function(result){
									alert(result.message+"login.form");
								},
								error:function(){
									alert('登陆失败');
								}
							};
							$(target).ajaxSubmit(options);
							$(target).resetForm();
						}
						else if(result.status==-1){
							alert('手机号格式错误！');
						}
						else if(result.status==1){
							alert('手机号未注册！');
						}
					},
					error:function(){
						alert('手机验证出错');
					}
				};
					$(target).ajaxSubmit(options);
			}
		}
		e.preventDefault();
	},
	init:function(){
		var _this=this;
		_this.loginmes.keyup(function(e){
			_this.judgeFun(e);
		});
		// _this.canseeNode.click(function(e){
		// 	_this.canseeFun(e);
		// });
		// _this.inputWord.focus(function(e){
		// 	_this.valuehideFun(e);
		// });
		// _this.inputWord.focusout(function(e){
		// 	_this.valueshowFun(e);
		// });
		// _this.getVerify.click(function(e){
		// 	_this.verifuFun(e);
		// });	
		// _this.formNode.submit(function(e){
		// 	_this.submitFun(e);
		// });
	}
};
loginpageObj.init();
var loadObj={
	init:function(){
		var _this=this;
		$.get(pathObj.setJsonFun('/static/weicity/json/status.json','/member/unconfine/logined.form'),function(json){
			if(json.loginState=="true"){
				var rule=/^1[34578]\d{9}$/;
				var re = new RegExp(rule);
				if(re.test(json.phone)){
					$('.login_message span').html('用户<br><em class="tologinpage">'+json.phone+'</em>');
					$('.login_message').attr('loginStatus','1');
				}
				else{
					$('.login_message span').html('游客<br><em class="tologinpage">'+json.phone+'</em>');
					$('.login_message').attr('loginStatus','0');
				}
				$('.login_message b').hide();
				$('.login_message span').css('display','inline-block');
				
				// $('.change_message [name=nickName]').val(json.nickName);
				// $('.change_message [name=phone]').val(json.phone);

			}
			else{
				$('.login_message').attr('loginStatus','0');
			}
		},'json');
		$('.login_message').click(function(){
			if($(this).attr('loginStatus')=="0"){
				window.location.href=pathObj.setJsonFun('login.html','/member/unconfine/loginto.form');
			}
			// else if($(this).attr('loginStatus')=="1"){
			// 	bottomPageObj.showPageFun(this);
			// }
		});
	}
};
var messageObj={
	init:function(){
		
	}
};
loadObj.init();
addHtmlObj.bottomMenuHtml('.menu_mine');

// var personalObj={
// 	nameNode:$('.personal_name strong'),
// 	personpicNode:$('.personal_name img'),
// 	dataNode:$('.to_personal_page'),
// 	punchNode:$('.personal_punchcard'),
// 	init:function(){
// 		var _this=this;
// 		$.ajax({
//             type:'get',
//             url:'json/personal_data.json',
//             dataType:'json',
//             success:function(json){
//                 var html='<img src="img/'+json.personalpic+'"/><div class="name">';
//                 	html+='<strong>'+json.name+'</strong>';
//                     html+='<i class="level">Lv'+json.level+'</i><br>';
//                     html+='<span class="attention">关注<b>'+json.attention+'</b></span>';
//                     html+='<span class="fans">粉丝<b>'+json.fans+'</b></span></div>';
//                  _this.dataNode.prepend(html);
//                 html='<span class="honey">蜂蜜<b>'+0+'</b></span>';
//                 html+='<span class="gold">金币<b>'+0+'</b></span>';
//                 _this.punchNode.append(html);
//             },
//             error:function(xmlhttp,status,error){
//                   console.log(status,error);
//                 alert("请稍后重试!");
//             }
//         });
// 	}
// };
// var personalPageMenuObj={
// 	menuNode:$('.personal_page_main .swiper-pagination'),
// 	contentNode:$('.personal_page_main .swiper-slide'),
// 	liNode:$('.personal_page_main .menu li'),
//     touchX:null,
//     moveX:null,
// 	changeFun:function(e){
// 		var _this=this;
// 		var event=window.event||e;
// 		var target=event.target||event.srcElement;
// 		var nowLiNode=$('.personal_page_main .menu .current');
// 		var oldPagination=$('.personal_page_main .swiper-pagination .current');
// 		oldPagination.removeClass('current');
// 		nowLiNode.removeClass('current');
// 			target.className+=' current';
// 			var newPos=$('.personal_page_main .swiper-pagination .current').index();
// 		_this.liNode.eq(newPos).addClass('current');
//		
//			
// 	},
// 	startFun:function(e){
// 		var _this=this;
// 		var target=event.targetTouches[0];
// 		_this.touchX=target.screenX;
// 	},
// 	moveFun:function(e){
// 		var _this=this;
// 		var target=event.targetTouches[0];
// 		_this.moveX=target.screenX;
// 	},
// 	init:function(){
// 		var _this=this;
// 		_this.menuNode.click(function(e){
// 			_this.changeFun(e);
// 		});
// 	}
// };
// var personPageswiperObj={
// 	slideNode:$('.personal_page_main .swiper-slide'),
// 	loadFun:function(){
// 		var bulletNode=$('.personal_page_main .swiper-pagination-bullet');
// 		for(var i=0;i<4;i++){
// 			bulletNode.eq(i).empty();
// 		}
// 		var html='嗡嗡';
// 		bulletNode.eq(0).append(html);
// 		html='游记';
// 		bulletNode.eq(1).append(html);
// 		html='回答';
// 		bulletNode.eq(2).append(html);
// 		html='点评';
// 		bulletNode.eq(3).append(html);
// 	},
// 	init:function(){
// 		var _this=this;
// 		for(var i=0;i<_this.slideNode.length;i++){
// 			nopassgaeNode=$('.personal_page_main .none_passage');
// 			// console.log(nopassgaeNode);
// 			nopassgaeNode.css('paddingTop','30%');
// 		}
// 		// $(document).ready(function(){
// 	var mySwiper = new Swiper ('.swiper-container', {
// 			  	 pagination: '.swiper-pagination',
// 			  	 scrollbar: '.swiper-scrollbar',
// 			     paginationClickable :true,
// 			     scrollbarHide : false,
// 			     // scrollbar: '.swiper-scrollbar',
// 			     onTransitionEnd: function(swiper){
// 					var wengNode=$('.personal_page_main .issue_wengweng');
// 					var noteNode=$('.personal_page_main .issue_note');
// 					if($('.personal_page_main .swiper-pagination-bullet-active').index()==1){
// 						noteNode.show();
// 						wengNode.hide();
// 					}
// 					else if($('.personal_page_main .swiper-pagination-bullet-active').index()==0){
// 						wengNode.show();
// 						noteNode.hide();
// 					}
// 					else{
// 						noteNode.hide();
// 						wengNode.hide();
// 					}
//    				 },
// 			    onInit: function(swiper){
// 					_this.loadFun();
// 			    }
//  	 });   

//   }
// };
// var changeDataObj={
// 	saveNode:$('.person_data_change .cantsave'),
// 	saveChangeFun:function(){
// 		var _this=this;
// 		_this.saveNode.removeClass('cantsave');
// 	},
// 	init:function(){
// 	}
// };
// var cityListObj={
// 	liNode:$('.city_list.currentPage .partlist'),
// 	titleNode:$('.city_list.currentPage li h5'),
// 	titleHeight:$('.city_list li h5').height(),
// 	cityChoosePage:$('.city_choose'),
// 	fixHeight:$('.city_choose .fix_top').height(),
// 	menuNode:$('.city_choose .double_menu'),
// 	fixMenuNode:$('.city_choose .fix_list_word'),
// 	backNode:$('.city_choose .cancleback'),
// 	liTop:new Array,
// 	getHeightFun:function(){
// 		var _this=this;
// 		var liNode=$('.city_list.currentPage .partlist');
// 		var scrollTop=$('html').scrollTop()+$('body').scrollTop();
// 		var height=0;
// 		for(var i=0;i<liNode.length;i++){
// 			height+=liNode.eq(i).height();
// 			_this.liTop[i]=height;
// 		}
// 	},
// 	titlefixFun:function(){
// 		var _this=this;
// 		var scrollTop=$('html').scrollTop()+$('body').scrollTop();
// 		var titleNode=$('.city_list.currentPage li h5');
// 		var liHeight=0;
// 		var titleHeight=$('.city_list li h5').height();
// 		for(var i=0;i<_this.liNode.length;i++){
// 			if(i==0){
// 				if(scrollTop<_this.liTop[i]-_this.titleHeight&&scrollTop>0){
// 					titleNode.eq(i).css({'position':'fixed','top':'3.81rem'});
// 					titleNode.eq(1).css({'position':'absolute','top':'0'});
// 				}
// 			}
// 			else{
// 			if(scrollTop<_this.liTop[i]-_this.titleHeight&&scrollTop>_this.liTop[i-1]){
// 				titleNode.eq(i).css({'position':'fixed','top':'3.81rem'});
// 			}
// 		}
// 			if(scrollTop>=_this.liTop[i]-_this.titleHeight){
// 					console.log(_this.fixHeight-(scrollTop-_this.liTop[i]+_this.titleHeight));
// 					titleNode.eq(i).css({'position':'fixed','top':_this.fixHeight-(scrollTop-_this.liTop[i]+_this.titleHeight)});
// 					for(var j=i+1;j<_this.liNode.length;j++){
// 					titleNode.eq(j).css({'position':'absolute','top':'0'});
// 					}
// 			}
// 		}
// 	},
// 	fixmenuFun:function(){
// 		var _this=this;
// 		_this.fixMenuNode.empty();
// 		var titleNode=$('.city_list.currentPage li h5');
// 		var ListNode=$('.city_list.currentPage');
// 		for(var i=0;i<titleNode.length;i++){
// 			if(ListNode.hasClass('one'))
// 		var html='<li><a href="#'+titleNode.eq(i).text()+'">'+titleNode.eq(i).text()+'</a></li>';
// 			else
// 		var html='<li><a href="#'+titleNode.eq(i).text()+'2">'+titleNode.eq(i).text()+'</a></li>';
// 			_this.fixMenuNode.append(html);
// 		}
// 	},
// 	initialize:function(){
// 		var titleNode=$('.city_list.currentPage li h5');
// 		var liNode=$('.city_list.currentPage .partlist');
// 		var liPartNode=$('.city_list.currentPage .partlist li');
// 		for(var i=0;i<liNode.length;i++){
// 		titleNode.eq(i).css({'position':'absolute','top':'0'});
// 		}
// 	},
// 	fixLocationFun:function(){
// 		var _this=this;
// 		var scrollNow=$(window).scrollTop();
// 		$(window).scrollTop(scrollNow-_this.fixHeight);
// 		_this.initialize();
// 	},
// 	init:function(){
// 		var _this=this;
// 		_this.initialize();
// 		_this.menuNode.click(function(){
// 			$(window).scrollTop(0);
// 			_this.initialize();
// 			_this.fixmenuFun();
// 			_this.getHeightFun();
// 		});
// 		_this.fixMenuNode.click(function(){
// 			setTimeout(function(){
// 				_this.fixLocationFun();
// 			},5);
// 		});
// 		_this.backNode.click(function(){
// 			_this.initialize();
// 		});
// 		document.addEventListener("scroll",function(){
// 			if(parseInt(_this.cityChoosePage.css('top'))==0){
// 			_this.titlefixFun();
// 			}
// 		});
//		
// 	}
// };

