window.onload=function(){
	var geturlObj={
		titleNode:$('.hotel_detail_main figure.title'),
		aboutNode:$('.hotel_detail_main figure.about'),
		goodsList:$('.plan_detail ul'),
		goodslist:function(){
			var _this=this;
			$.ajax({
	            type:'get',
	            url:address+'hotel/find.action?productsId=FVCIF1K1H39416Z9FL2Q',
	            dataType:'json',
	            success:function(json){
		            	console.log(json.data);
		            	for(var i=0;i<json.data.length;i++){
		            			//住宿
			            		var html='<li><a href="'+json.data[i].vrUrl+'"><img class="main_pic" src="'+address+json.data[i].defaultImgUrl+'"><i class="collect"></i><span>¥<strong>999</strong>/晚</span>';
			            		html+='<figure><figcaption>'+json.data[i].hotelName+'<i class="to_change_goods">住别的</i><i class="delect_goods">删除</i></figcaption><em>整套出租/2张床/宜住4人-4.7分</em><br><i class="real_photo"></i><i class="real_check"></i></figure></a></li>';
								_this.goodsList.append(html);
		            		if(json.data[i].goodsType==2){
		            			//餐饮
								var html='<li><a href="'+json.data[i].vrUrl+'"><img class="main_pic" src="'+address+json.data[i].defaultImgUrl+'"><i class="collect"></i><span>¥<strong>999</strong>/人均</span>';
			            		html+='<figure><figcaption>'+json.data[i].goodsTitle+'<i class="to_change_goods">吃别的</i><i class="delect_goods">删除</i></figcaption><em>西餐/双人套餐-5.0分</em><br><i class="real_photo"></i><i class="real_check"></i></figure></a></li>';
								_this.goodsList.append(html);
		            		}
		            		else if(json.data[i].goodsType==3){
		            			//娱乐
								var html='<li><a href="'+json.data[i].vrUrl+'"><img class="main_pic" src="'+address+json.data[i].defaultImgUrl+'"><i class="collect"></i><span>¥<strong>999</strong>/人</span>';
			            		html+='<figure><figcaption>'+json.data[i].goodsTitle+'<i class="to_change_goods">玩别的</i><i class="delect_goods">删除</i></figcaption><em>介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍-5.0分</em><br><i class="real_photo"></i><i class="real_check"></i></figure></a></li>';
								_this.goodsList.append(html);
		            		}
						}
	                },
	            error:function(xmlhttp,status,error){
	                alert("请稍后重试!");
	            }
        	});				
		},
		init:function(){
			var _this=this;
			var href=window.location.href;
			_this.productId=href.slice(href.indexOf('productId=')+10);
			$.ajax({
	            type:'get',
	            url:address+'product/get.action?productsId=NCJXL1K1E36V0UW0G9G6',
	            dataType:'json',
	            success:function(json){
		            	console.log(json);
		            	var html='<iframe src="'+json.data.vrUrl+'" width="100%" class="all"></iframe>';
		            	// http://360.vrol.cn/jczs
						$('body').prepend(html);
		            	html='<figcaption>'+json.data.productsName+'</figcaption><span>'+json.data.productsInfo+'</span><div>';
		            	for(var j in json.data.productIcon){
		            		html+='<em>'+json.data.productIcon[j]+'</em>';
		            	}
						html+='</div>';
					
						_this.titleNode.append(html);
						html='<figcaption class="parttitle">行程介绍</figcaption><p>'+json.data.productsDesc+'</p>';
						_this.aboutNode.append(html);
	                },

	            error:function(xmlhttp,status,error){
	                alert("请稍后重试!");
	            }
        	});	
        	_this.goodslist();
		}
	};
	geturlObj.init();
	var mySwiper2 = new Swiper ('#near_house', {
						    slidesPerView : 1.5,
						    centeredSlides : true,
						  });
};