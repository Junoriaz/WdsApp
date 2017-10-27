var pullDownMenuObj={
	pullDownNode:$('.choose_menu li'),
	liHeight:$('pull_dowm_menu li').eq(0).height(),
	maskingNode:$('.masking'),
	// pageNode:$('.hotel_querypage'),
	arrowNode:$('.choose_arrow'),
	hotelScreenMain:$('.screen_main ul'),
	topNode:$('.hotel_querypage_top'),
	menuNode:$('.choose_menu'),
	hotelPage:$('.hotel_querypage'),
	slideFlag:true,
	slideFun:function(e){
		var _this=this;
		var event=window.event||e;
		var target=event.target||event.srcElement;
		if(_this.slideFlag==true){
			_this.slideFlag=false;
			var PreClass=target.className;
			var NewClass=PreClass+'_main';
			var preNode=$(target).parents('.fix_top').find('.'+NewClass);
			// var amount=preNode.children().length;
			// var liHeight=preNode.children('.current').height();
			var Height=preNode.children().height();
			var arrowNode=$(target).children();
			// console.log(liHeight);
			_this.maskingNode.show();
			_this.maskingNode.css('opacity',.5);
			preNode.siblings('.pull_dowm_menu').height(0);
			$(target).siblings('li').children().css('transform','rotate('+0+'deg)');
			arrowNode.css('transform','rotate('+180+'deg)');
			// _this.main.css('height','100px');
			setTimeout(function(){
				preNode.css('height',Height);
				_this.slideFlag=true;
				// _this.slideFlag=false;
			},500);
		}
		// if(_this.slideFlag==false){
			
		// }
	},
	slideupFun:function(e){
		var _this=this;
		var event=window.event||e;
		var target=event.target||event.srcElement;
		// console.log($(target).parents('.pull_dowm_menu').length,$(target).parents('.choose_menu').length);
		// var target=event.targetTouches[0];
		// console.log($(target));
		if($(target).parents('.pull_dowm_menu').length==0&&($(target).parents('.choose_menu').length==0)){
			$('.pull_dowm_menu').height(0);
			_this.arrowNode.css('transform','rotate('+0+'deg)');
			_this.maskingNode.css('opacity',0);
			$('body').height($(target).parents('.rightPage').height());
			setTimeout(function(){
				_this.maskingNode.hide();
			},500);
		}
	},
	heightChangeFun:function(e){
		var _this=this;
		var event=window.event||e;
		var target=event.target||event.srcElement;
		// console.log($(window).height(),_this.topNode.height(),_this.menuNode.height());
		var topNode=$(target).parents('body').find('.top');
		var menuNode=$(target).parents('body').find('.choose_menu');
		console.log(topNode,menuNode);
		_this.hotelScreenMain.height($(window).height()-topNode.height()-menuNode.height());
		$('body').height($(window).height());
		// _this.maskingNode.height(_this.hotelScreenMain.height());
	},
	init:function(){
		var _this=this;
		_this.pullDownNode.click(function(e){
			_this.heightChangeFun(e);
			_this.slideFun(e);
		});
		// $(document).click(function(e){
		// 	_this.slideupFun(e);
		// });
		if($('.hotelpage').length!=0){
			document.querySelector('.hotelpage').addEventListener("touchend",function(e){
				_this.slideupFun(e);
			});
		}
		if($('.mappage').length!=0){
			document.querySelector('.mappage').addEventListener("touchend",function(e){
				_this.slideupFun(e);
			});
		}
	}
};
sortObj={
	sortliNode:$('.sort_main li'),
	sortFun:function(){
		var _this=this;
		var event=window.event||e;
		var target=event.target||event.srcElement;
		var sortAttr=target.className.slice(target.className.search('sort_')+5);
		// console.log(sortAttr);
		
	},
	init:function(){
		var _this=this;
		_this.sortliNode.click(function(){
			_this.sortFun();
		});
	}
};
var chooseObj={
	singleNode:$('.single_choice li'),
	singleNode2:$('.single_choice dd'),
	multipleNode:$('.multiple_choice li'),
	multipleNode2:$('.multiple_choice dd'),
	clearNode:$('.screen_main .clear'),
	clearAllNode:$('.screen_main .reset'),
	screenLi:$('.screen_main .list_main li'),
	singleChoiceFun:function(e){
		var _this=this;
		var event=window.event||e;
		var target=event.target||event.srcElement;
		$(target).addClass('current').siblings('.current').removeClass('current');
		if(target.tagName=='I'){
			$(target).parent().addClass('current').siblings('.current').removeClass('current');
		}
		// console.log(target.tagName);
	},
	multipleChoiceFun:function(e){
		var _this=this;
		var event=window.event||e;
		var target=event.target||event.srcElement;
		if(target.tagName=='I'){
			var Node=$(target).parent();
		}
		else{
			var Node=$(target);
		}
		if(Node.hasClass('current')==false)
			Node.addClass('current');
		else
			Node.removeClass('current');
		// console.log($(target).parent('.current'));
	},
	clearFun:function(e){
		var _this=this;
		var event=window.event||e;
		var target=event.target||event.srcElement;
		$(target).siblings().removeClass('current');
	},
	clearAllFun:function(){
		var _this=this;
		_this.screenLi.removeClass('current');
	},
	init:function(){
		var _this=this;
		_this.singleNode.click(function(e){
			_this.singleChoiceFun(e);
		});
		_this.singleNode2.click(function(e){
			_this.singleChoiceFun(e);
		});
		_this.multipleNode.click(function(e){
			_this.multipleChoiceFun(e);
		});
		_this.multipleNode2.click(function(e){
			_this.multipleChoiceFun(e);
		});
		_this.clearNode.click(function(e){
			_this.clearFun(e);
		});
		_this.clearAllNode.click(function(){
			_this.clearAllFun();
		});
	}
};
pullDownMenuObj.init();
sortObj.init();
chooseObj.init();