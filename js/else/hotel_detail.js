// $('.fancybox-iframe', window.parent.document).height(parent.GetParentWindowHight());
var reserveObj={
				buttonNode:$('.hotel_detail .bottom .reserve'),
				backNode:$('#affirm .back_orange'),
				affirmPage:$('#affirm'),
				detailPage:$('.hotel_detail'),
				detailUrl:null,
				init:function(){
					var _this=this;
					_this.buttonNode.click(function(){
						// console.log(2);
						// _this.detailPage.height(200);
						_this.detailPage.hide();
						setTimeout(function(){
							_this.affirmPage.show();
						},100);
					});
					_this.backNode.click(function(){
						// _this.detailPage.height('unset');
						_this.affirmPage.hide();
						_this.detailPage.show();
					});
				}
			};
reserveObj.init();
window.onload=function(){
	var iframeObj={
		iframeFun:function(){
			var iframeHeight=parent.GetParentWindowHight()-16;
			$('body').height(iframeHeight);
		}
	};
	// iframeObj.iframeFun();
};
var loadObj={			//加载
		mainNode:$('.hotel_detail_main'),
		toreserveButton:$('.to_reserve'),
		// facilityName:{"wifi":"无线wifi","lineweb":"有线网络","television":"电视","aircondition":"空调","shower":"淋浴","bathtub":"浴缸","blower":"吹风机","computer":"电脑","elekettle":"电水壶","park":"停车场","heater":"暖气","waterheater":"全天热水","elevator":"电梯"},
		// ruleWord:{"reservePrice":"预付房费","premium":"附加房费","depostit":"押金","retreatRule":"退房规则","elsePay":"额外支付","inTime":"入住时间","outTime":"退房时间","receptionTime":"接待时间","receptionOthers":"外宾","limitDays":"最少入住天数","maxDays":"最多入住天数","invoice":"是否可开发票"},
		init:function(){
			var _this=this;
			hrefObj.getParameterFun('hotelBodyId');
			// console.log(hrefObj.parameterId);
			$.ajax({
	            type:'get',
	            url:'detail.form',     	//address+'hotel/getBody.action?hotelBodyId=O8J4T1K1V3KV16V25QRT',
	            data:{hotelBodyId:hrefObj.parameterId},
	            dataType:'json',
	            success:function(json){
	            	console.log(json);
	            	var html='<div class="swiper-container room_pic"> <div class="swiper-wrapper">';
	            	for(var i=0;i<json.data.roomImgUrl.length;i++){
	            		html+='<div class="swiper-slide"><img src="'+json.data.roomImgUrl[i]+'"></div>';
	            	}
	            	html+='</div><div class="swiper-pagination"></div><em>¥'+json.data.roomPrice+'<b>起</b></em></div>';
                    html+='<figure class="title"><figcaption>'+json.data.title+'</figcaption>';
                    if(json.data.subtitle!='nu'){
                    	html+='<span>'+json.data.subtitle+'</span>';
                    }
                    html+='<div><em>长租优惠</em><em>信用免押金</em><em>实拍</em></div></figure>';
                    html+='<figure style="overflow:hidden;"><ul class="hotel_condition clearFix">';
                    for(var i in json.data.roomArgument){

                    	html+='<li><b>'+i+'</b><span>'+json.data.roomArgument[i]+'</span></li>';
                    }
                    html+='</ul></figure>';
                    html+='<figure id="bed_message" class="bed_message" style="display: none;"><figcaption>床数&床型</figcaption><ul><li>双人床 (中，宽1.8m左右)<span>1张</span></li><li>双人床 (小，宽1.5m左右)<span>1张</span></li></ul><em><i>*</i>不可加床</em><div class="else"><p>房东很贴心，还免费提供了以下床型，供您参考:</p><b>1张单人沙发床</b><i class="light_icon"></i></div><div class="close"><i class="close_icon"></i></div></figure>';
                   if(json.data.description!='nu'){
                   		 html+='<figure class="about"><figcaption class="parttitle">关于此房源</figcaption><p>'+json.data.description+'</p><i>更多交通·周边描述</i></figure>';
                   }
                     html+='<div class="grade"><div class="star_score"><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><span class="score">4.9</span></div><span class="comment">评价(8)</span></div>';
                    if(json.data.isBasement==0){
                    	var isBasement='否';
                    }
                    else{
                    	var isBasement='是';
                    }
                    html+='<figure class="notice hidesome_node"><figcaption class="parttitle">入住须知</figcaption><div class="hide_div"><ul><li>可租房态<i>查看哪天有房</i></li>';
                    for(var i in json.data.liveRule){
                    	if(json.data.liveRule[i]!='nu'){
                    		html+='<li>'+changeToChineseObj.ruleWord[i]+'<span>'+json.data.liveRule[i]+'</span></li>';
                    	}
                    }
                    html+='</ul></div><i class="more_message up" style="display: none;">收起<i class="arrow_up"></i></i><i class="more_message down">展开全部信息<i class="arrow_down"></i></i></figure>';
                    html+='<figure class="facility hidesome_node"><figcaption class="parttitle">配套设施</figcaption><div class="hide_div"><ul class="clearFix">';
                    var facilityLength=parseInt(json.data.facility.length);
                    var facilityHtml='';
                    for(var num=0;num<facilityLength;num++){
                    	var facility=json.data.facility[num];
                    	if(facilityLength>5&&num==4){
                    		// facilityHtml+='<li class="more_facility"><i>'+(facilityLength-4)+'+</i>更多</li>';
                    	}
                    	facilityHtml+='<li><i class="'+facility+'"></i>'+changeToChineseObj.facilityName[facility]+'</li>';
                    }
                    html+=facilityHtml+'</ul></div></figure>';
					_this.mainNode.prepend(html);
					facilityObj.init();
					var bedmessageObj={						//床型弹窗
							buttonNode:$('.hotel_condition .payattention_icon'),
							closeNode:$('#bed_message .close'),
							maskNode:$('.masking'),
							mainNode:$('#bed_message'),
							showFun:function(){
								var _this=this;
								_this.mainNode.show();
								_this.mainNode.css('opacity',1);
							},
							hideFun:function(e){
								var _this=this;
								var event=e||window.event;
								var target=event.target||event.srcElement;
								if($(target).hasClass('close')||$(target).parent('.close').length==1){
								_this.mainNode.css('opacity',0);
								setTimeout(function(){
									_this.mainNode.hide();
								},500);
								}
							},
							init:function(){
								var _this=this;
								_this.buttonNode.click(function(){
									_this.showFun();
								});
								_this.mainNode.click(function(e){
									_this.hideFun(e);
								});
							}
						};
					bedmessageObj.init();
					// noticeObj.init();
					gradeObj.init();
					showmoreObj.init();              
					$(document).ready(function(){
						var mySwiper1 = new Swiper ('.room_pic', {
						    pagination: '.swiper-pagination',
						    paginationType : 'fraction',
						  });
						var mySwiper2 = new Swiper ('#near_house', {
						    slidesPerView : 1.5,
						    centeredSlides : true,
						  });
					});
	            },
	            error:function(xmlhttp,status,error){
	                alert("请稍后重试!");
	            }
        	});
		_this.toreserveButton.attr('href','hotel_putform.html?hotelBodyId='+hrefObj.parameterId);
		}
	};
var facilityObj={		//设备表			
	moreHtml:'<li class="more_facility down"><i>0+</i>更多</li>',
	hideFun:function(){			//初始隐藏
		var _this=this;
		_this.liLength=_this.listLiNode.length;
		_this.moreHtml='<li class="more_facility down"><i>'+(_this.liLength-4)+'+</i>更多</li>';
		if(_this.liLength>5){
			for(var i=4;i<_this.liLength;i++){
				_this.listLiNode.eq(i).css('opacity',0);
			}
			_this.listLiNode.eq(3).after(_this.moreHtml);
			_this.showButton=$('.more_facility');
			_this.showButton.click(function(){
				_this.showFun();
			});
		}
	},
	showFun:function(){			//显示更多
		var _this=this;
		var liNum=4;
		_this.showButton.fadeOut('normal',function(){
			// setTimeout(function(){
				startshow(liNum);
			// },400);
		});
		function startshow(liNum){
			_this.listLiNode.eq(liNum).animate({'opacity':1},'normal',function(){
				if(liNum<_this.liLength){
					liNum++;
					startshow(liNum);
				}
			});
		}
	},
	init:function(){
		var _this=this;
		_this.listLiNode=$('.facility ul li');
		_this.hideFun();
	}
};
loadObj.init();
	









// var putformObj={						//下单
					// 	submitButton:$('.hotel_affirm input[type=submit]'),
					// 	formNode:$('.hotel_affirm form'),
					// 	postFun:function(e){
					// 		var _this=this;
					// 		var event=e||window.event;
					// 		var target=event.target||event.srcElement;
					// 				var options={
					// 					type:'post',
					// 					url:address+'order/create.action',
					// 					data:{'hotelBodyId':'O8J4T1K1V3KV16V25QRT','userId':'RNTMG1K1M34F0X3JM9W7','orderPrice':580,'payFee':580},
					// 					success:function(result){
					// 						var _this=this;
					// 						console.log(_this.data);
					// 						console.log(result);
					// 					},
					// 					error:function(){
					// 						alert('手机验证出错');
					// 					}
					// 				};
					// 					$(target).ajaxSubmit(options);
					// 					e.preventDefault();
					// 	},
					// 	init:function(){
					// 		var _this=this;
					// 		_this.formNode.submit(function(e){
					// 			_this.postFun(e);
					// 		});
					// 	}
					// };
					// putformObj.init();