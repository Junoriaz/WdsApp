var loadObj={
	planlist:$('.index_plan_list ul'),
	livelist:$('.index_live_list ul'),
	eatlist:$('.index_eat_list ul'),
	playlist:$('.index_play_list ul'),
	pataData:{},
	loadFlag:true,
	loadParaFun:function(){
		var _this=this;
		$.ajax({
			type:pathObj.setJsonFun('get','post'),
			url:pathObj.setJsonFun('/static/weicity/json/initpara.json','/shopHotel/unconfine/initPara.form'),
			data:{longitude:'120.208289',latitude:'30.167597',code:'330100',cityName:'杭州'},
			dataType:'json',
			success:function(json){
				if(json.status==1){		//0是空，1是有
					$('.index_location strong').html(json.cityName);
					_this.loadPageFun();
					loadPageFlag=true;
					cookieObj.setCookie('visited','true');
				}
				// else{
					//mapObj.init();
					//var timer=setInterval(function(){
						//if(mapObj.cityFlag==true&&mapObj.positionFlag==true){
							// postObj.data={longitude:'120.208289',latitude:'30.167597',code:'330100',cityName:'杭州'};
							// _this.loadParaFun();
							//clearInterval(timer);
						//}
					//},50);
				// }
			}
		});
	},
	planFun:function(){
		var _this=this;
		$.ajax({
            type:'get',
            url:pathObj.setJsonFun('/static/weicity/json/plan.json','/shopTrip/unconfine/list.form'),
            dataType:'json',
            success:function(json){
            	if(json.data.length<4){
            		var length=json.data.length;
            	}
            	else{
            		var length=4;
            	}
             	for(var i=0;i<length;i++){
             		var href=pathObj.setJsonFun('/static/weicity/json/trip_detail.json','/shopTrip/unconfine/tripDetail.form')+'?Id='+json.data[i].tripId;
                    var html='<li><a href="'+href+'"><div class="index_recommend_pic"><img src="'+imgAddress+'trip/'+json.data[i].tripId+'/'+json.data[i].imgaddr+'" onerror="imgError(this)"></div>';
                    html+='<strong>'+json.data[i].tripName+'</strong><span class="info">'+json.data[i].content1+'</span>';
                    // console.log(json.data[i].playIcon.length);
                    	// for(var j in json.data[i].playIcon){
                    	// 	html+='<i>'+json.data[i].playIcon[j]+'</i>';
                    	// }
                    html+='</a></li>';
                    _this.planlist.append(html);
                }
            }
    	});				
	},
	liveFun:function(){
		var _this=this;
		$.ajax({
            type:'get',
            url:pathObj.setJsonFun('/static/weicity/json/live.json','/shopHotel/unconfine/list.form'),
            data:{},
            dataType:'json',
            success:function(json){
            	if(json.recommend.length<4){
            		var length=json.recommend.length;
            	}
            	else{
            		var length=4;
            	}
             	for(var i=0;i<length;i++){
             		console.log(json);
                    var html='<li><a href="'+json.recommend[i].vrUrl+'?Id='+json.recommend[i].hotelId+'"><div class="index_recommend_pic"><img src="'+imgAddress+'hotel/'+json.recommend[i].hotelId+'/'+json.recommend[i].defaultImgThumbUrl+'" onerror="imgError(this)"></div>'; 
                    	html+='<strong>'+json.recommend[i].hotelName+'</strong>';
                    	if(json.recommend[i].livePrice!=undefined&&json.recommend[i].livePrice!=null){
                    		html+='<span class="info">¥<b>'+json.recommend[i].livePrice+'</b>起</span>';
                    	}
                    	html+='</a></li>'; ///4.7分
						_this.livelist.append(html);
                }
                if(json.status==1){
                	loadPageFlag=true;
                }
            }
    	});			
	},
	eatFun:function(){
		var _this=this;
		$.ajax({
            type:'get',
            url:pathObj.setJsonFun('/static/weicity/json/eat.json','/shopCatering/unconfine/list.form'),
            dataType:'json',
            success:function(json){
            	if(json.data.length<4){
            		var length=json.data.length;
            	}
            	else{
            		var length=4;
            	}
             for(var i=0;i<length;i++){
             		var href=json.data[i].cateringVr+'?Id='+json.data[i].cateringId;
                    var html='<li><a href="'+href+'"><div class="index_recommend_pic"><img src="'+imgAddress+'catering/'+json.data[i].cateringId+'/'+json.data[i].cateringImg+'" onerror="imgError(this)"></div><strong>'+json.data[i].cateringName+'</strong><span class="info">'+json.data[i].cateringInfo+'</span>';
                    // html+='<span>人均:'+json.data[i].eatPrice+'元</span>';
                    html+='</a></li>';
					_this.eatlist.append(html);
               }
            }
    	});	
	},		
	playFun:function(){
		var _this=this;
		$.ajax({
            type:'get',
            url:pathObj.setJsonFun('/static/weicity/json/play.json','/shopPlay/unconfine/list.form'),
            dataType:'json',
            success:function(json){
            	if(json.data.length<4){
            		var length=json.data.length;
            	}
            	else{
            		var length=4;
            	}
             	for(var i=0;i<length;i++){
             		var href=pathObj.setJsonFun('/static/weicity/json/play_detail.json','/shopPlay/unconfine/playDetail.form')+'?Id='+json.data[i].playId;
                    var html='<li><a href="'+href+'"><div class="index_recommend_pic"><img src="'+imgAddress+'play/'+json.data[i].playId+'/'+json.data[i].imgaddr+'" onerror="imgError(this)"></div>';
                    html+='<strong>'+json.data[i].playName+'</strong><span class="info">'+json.data[i].content+'</span>';
                    // console.log(json.data[i].playIcon.length);
                    	// for(var j in json.data[i].playIcon){
                    	// 	html+='<i>'+json.data[i].playIcon[j]+'</i>';
                    	// }
                    html+='</a></li>';
                    _this.playlist.append(html);
                   }
                }
    	});	
	},
	loadPageFun:function(){
		var _this=this;
		_this.liveFun();
		_this.planFun();
		_this.eatFun();
		_this.playFun();
	},	
	init:function(){
		var _this=this;
		var openId=hrefObj.hrefJson.open_id;
		if(openId!=null&&openId!=undefined){
			$.get(pathObj.setJsonFun('/static/weicity/json/status.json','/member/unconfine/wxLogin.form'),{openId:openId},'json');
		}
		var visited=cookieObj.getCookie('visited');
		if(visited==null){
			loadPageObj.init();
		}
		else{
			$('.loadPage').hide();
		}
		_this.loadParaFun();
	}
};
loadObj.init();
var swiperObj={
	init:function(){
		var mySwiper = new Swiper ('.swiper-container', {
			loop:true,
		    autoplay: 3000,
		    pagination: '.swiper-pagination',
  		});
	}
};
window.onload = function(){
	 swiperObj.init();
	 addHtmlObj.bottomMenuHtml('.menu_index');
};
hrefObj.alertError();
// var hotelPageObj={
// 	mapNode:$('.map_main'),
// 	topNode:$('.hotel_querypage_top'),
// 	menuNode:$('.choose_menu'),
// 	tomapNode:$('.map'),
// 	init:function(){
// 		var _this=this;
// 		_this.tomapNode.click(function(){
// 			_this.mapNode.height($(window).height()-_this.topNode.height()-_this.menuNode.height());
// 		});
// 	}
// };
// hotelPageObj.init();



 
	
