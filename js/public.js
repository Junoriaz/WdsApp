// var debug=true;
// var imgAddress='http://192.168.0.49//image/';
//var imgAddress='http://a.vrol.cn//image//';
var imgError=function(thisNode){
	thisNode.src='/static/weicity/img/no_pic.jpg';
};
var loadPageFlag=false;

var menuObj={
	changeFun:function(thisNode){
		var _this=this;
		$(thisNode).addClass('current').siblings().removeClass('current');
		var index=$(thisNode).index();
		_this.underline(index);
	},
	underline:function(index){
		var _this=this;
		var lineNode=$('.menu .under_line');
		var lineWidth=lineNode.width();
		lineNode.css('left',lineWidth*index);
	},
	init:function(){
		var _this=this;
		var menuNum=$('.menu li').length-1;
		var menuNode=$('.menu li').not('.menu li:last-child');
		menuNode.css('width',(100/menuNum)+'%');
		$('.menu .under_line').css('width',(100/menuNum)+'%');
		menuNode.on('click',function(){
			_this.changeFun(this);
		});
	}
};
var noPassageObj={					//无内容列表
	addNoPassageFun:function(appendNode){
		var html1='这里暂时还没有内容<br/>';
		var html2=["愿你在每一个薄暮晨光的早上，都能被阳光亲吻。","愿你在每一条川流不息的道路上，都能捕捉到沿途的精彩。","愿你在每一个夜深人静的晚上，都有一片好的思绪。","愿你在每一片开阔浩瀚的海面上，都有碧海蓝天收入眼底。"]
		var Num=Math.floor(Math.random()*html2.length);
		var html='<p class="none_passage">'+html1+html2[Num]+'</p>';
			appendNode.append(html);
		
	}
};
var gradeObj={						//评分星星
	starFun:function(){
		var _this=this;
		_this.scoreNode=$('.score');
		for(var i=0;i<_this.scoreNode.length;i++){
			var unit=Math.floor(_this.scoreNode.eq(i).html());
			var starNode=_this.scoreNode.eq(i).parent('.star_score').find('.star');
			for(var j=0;j<unit;j++){
				starNode.eq(j).addClass('bright');
			}

			var float=(_this.scoreNode.eq(i).html()-unit)*10;
			if(float>=5){
				starNode.eq(j).addClass('half_bright');
			}
		}
	},
	init:function(){
		var _this=this;
		_this.starFun();
	}
};
var datepickerObj={					//日期选择器
	nowDate:new Date().getDate(),
    nowMonth:new Date().getMonth()+1,
    lastMonth:new Date().getMonth()+4,
    nowMonthText:new Date().getMonth()+1+'月',
    lastMonthText:new Date().getMonth()+4+'月',
    loadDateFun:function(date,pickerNum){
    	var _this=this;
    	console.log(date);
    	var year=date.getFullYear();
		var month=date.getMonth()+1;
		var day=date.getDate();
		month=_this.add0Fun(month);
		day=_this.add0Fun(day);
		var html=year+'-'+month+'-'+day;
		console.log(month);
		if(pickerNum==1){
			$('#datepicker1').val(html);
			_this.date1=date;
		}
		else if(pickerNum==2){
			$('#datepicker2').val(html);
			_this.date2=date;
		}
    },
    add0Fun:function(thisNum){
		var _this=this;
		thisNum=thisNum.toString();
		if(thisNum.length==1){
			thisNum="0"+thisNum;
		}
		return thisNum;
	},
	picker1Fun:function(){
		var _this=this;
		_this.datepickerNum=1;
        _this.datePicker.open();
        var dateNode=$('.datepicker__day-item');
        _this.dateCantChoose();
        _this.monthChoose();
        $('#_j_month_next').on('click',function(){
            _this.monthChoose();
            _this.dateCantChoose();
        });
        $('#_j_month_prev').on('click',function(){
            _this.monthChoose();
            _this.dateCantChoose();
        });
	},
	picker2Fun:function(){
		var _this=this;
		_this.datepickerNum=2;
        _this.datePicker.open();
        var dateNode=$('.datepicker__day-item');
        _this.dateCantChoose();
        _this.monthChoose();
        $('#_j_month_next').on('click',function(){
            _this.monthChoose();
            _this.dateCantChoose();
        });
        $('#_j_month_prev').on('click',function(){
            _this.monthChoose();
            _this.dateCantChoose();
        });
	},
	monthChoose:function(){
		var _this=this;
		var thisMonthText=$('#_j_month_text').text();
        if(thisMonthText==_this.nowMonthText){
            $('#_j_month_prev').css('display','none');
            $('#_j_month_next').css('display','inline-block');
        }
        else if(thisMonthText==_this.lastMonthText){
            $('#_j_month_prev').css('display','inline-block');
            $('#_j_month_next').css('display','none');
        }
        else{
            $('#_j_month_prev').css('display','inline-block');
            $('#_j_month_next').css('display','inline-block');
        }
	},
	dateCantChoose:function(){
		var _this=this;
		var thisMonthText=$('#_j_month_text').text();
        var dateNode=$('.datepicker__day-item');
        if(thisMonthText==_this.nowMonthText){
            for(var i=0;i<dateNode.length;i++){
                var dateNum=parseInt(dateNode.eq(i).text());
                if(dateNum<_this.nowDate){
                    dateNode.eq(i).addClass('datepicker__day-item_gray');
                }
            }
        }
        // else if(thisMonthText==_this.lastMonthText){
        //     for(var i=0;i<dateNode.length;i++){
        //         var dateNum=parseInt(dateNode.eq(i).text());
        //         if(dateNum>_this.nowDate){
        //             dateNode.eq(i).addClass('datepicker__day-item_gray');
        //         }
        //     }
        // }
	},
	init:function(){
		var _this=this;
		_this.d1=new Date();
		_this.d2=new Date();
		_this.d2.setDate(new Date().getDate()+1);
		_this.dateNode1 = document.getElementById('datepicker1');
		_this.dateNode2 = document.getElementById('datepicker2');
		_this.loadDateFun(_this.d1,1);
		_this.loadDateFun(_this.d2,2);
		_this.datePicker = new DatePicker({
	        confirmCbk: function(data) {
	        	console.log(data);
	        	var month=datepickerObj.add0Fun(data.month);
				var day=datepickerObj.add0Fun(data.day);
				if(_this.datepickerNum==1){
					if(month=="00"){
						_this.dateNode1.value = (data.year-1) + '-' + 12 + '-' + day;
					}
					else{
						_this.dateNode1.value = data.year + '-' + month + '-' + day;
					}
		            _this.date1.setFullYear(data.year,data.month-1,data.day);
		            if(_this.date2.getTime()<=_this.date1.getTime()){
			        	_this.date2.setFullYear(data.year,data.month-1,data.day+1);
			        	_this.loadDateFun(_this.date2,2);
			        }
				}
				else if(_this.datepickerNum==2){
					if(month=="00"){
						_this.dateNode2.value = (data.year-1) + '-' + 12 + '-' + day;
					}
					else{
						_this.dateNode2.value = data.year + '-' + month + '-' + day;
					}
					//_this.dateNode2.value = data.year + '-' + month + '-' + day;
	           		_this.date2.setFullYear(data.year,data.month-1,data.day);
	           		if(_this.date2.getTime()<=_this.date1.getTime()){
	           			var nowDate=new Date();
	           			if(data.year==nowDate.getFullYear()&&data.month-1==nowDate.getMonth()&&data.day==nowDate.getDate()){
	           				_this.date1=new Date();
	           			}
	           			else{
	           				_this.date1.setFullYear(data.year,data.month-1,data.day-1);
	           			}
	           			_this.loadDateFun(_this.date1,1);
			        }
				}
				var timeDef=_this.date2.getTime()-_this.date1.getTime();
				var livedays=timeDef/1000/60/60/24;
				livedays=Math.round(livedays);
				$('[postname=liveDays]').text(livedays);
				dailyDataObj.getDataFun();
	        }
	    });
	    _this.dateNode1.onclick=function(){
	    	_this.picker1Fun();
	    };
	    _this.dateNode2.onclick=function(){
	    	_this.picker2Fun();
	    };
	}
};
var inputObj={						//input对象
	inputNode:$('input[type=text],input[type=password]'),
	changeWordFun:function(thisnode){	//隐藏提示文字
		var _this=this;
		$(thisnode).keydown(function(){
			setTimeout(function(){
				if($(thisnode).val()!=''){
					$(thisnode).css('background','rgba(255,255,255,1)');
				}
				else{
					$(thisnode).css('background','rgba(255,255,255,0)');
				}
			},50);
		});
	},
	visibleFun:function(thisnode){		//提示文字显示
		var _this=this;
		if($(thisnode).val()==''){
			$(thisnode).css('background','rgba(255,255,255,0)');
		}
	},
	canseeFun:function(e){				//密码可见性
		var _this=this;
		var event=e||window.event;
		var target=event.target||event.srcElement;
		$(target).toggleClass('cansee').toggleClass('cantsee');
		if($(target).hasClass('cansee'))
			$(target).parent().find('input').attr('type','text');
		else
			$(target).parent().find('input').attr('type','password');
	},
	init:function(){
		var _this=this;
		_this.inputNode.focus(function(){
			_this.changeWordFun(this);
		});
		_this.inputNode.blur(function(){
			_this.visibleFun(this);
		});
	}
};
var showmoreObj={					//显示更多
	addClasshideFun:function(){
		var _this=this;
		for(var i=10;i<_this.liNode.length;i++){
			_this.liNode.eq(i).addClass('hide');
		}
	},
	showFun:function(thisNode){
		var _this=this;
		var realHeight=$(thisNode).parents('.hidesome_node').find('ul').height();
		var startHeight=$(thisNode).parents('.hidesome_node').find('.hide_div').height();
		var hideNode=$(thisNode).parents('.hidesome_node').find('.hide_div');
		hideNode.css('height',realHeight+5+'px');
		$(thisNode).hide();
		$(thisNode).siblings('.up').show();
		$(thisNode).siblings('.up').click(function(){
			_this.hideFun(startHeight,this);
		});
	},
	hideFun:function(startheight,thisNode){
		var _this=this;
		var hideNode=$(thisNode).parents('.hidesome_node').find('.hide_div');
		hideNode.height(startheight);
		$(thisNode).siblings('.down').show();
		$(thisNode).hide();
	},
	init:function(){
		var _this=this;
		_this.liNode=$('.hidesome_node li');
		_this.upButtonNode=$('.hidesome_node .up');
		_this.downButtonNode=$('.hidesome_node .down');
		_this.downButtonNode.click(function(){
			_this.showFun(this);
		});
	}
};
var jumpObj={						//跳转
	backNode:$('.back'),
	backPreFun:function(){
		history.go(-1);
	},
	init:function(){
		var _this=this;
	}
};
var mapObj={						//地图对象
	positionFlag:false,
	cityFlag:false,
	getPositionFun:function(){		//浏览器定位获取坐标
		var _this=this;
		_this.userlocal.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			_this.map.addOverlay(mk);
			_this.map.panTo(r.point);
			// alert('您的位置：'+r.point.lng+','+r.point.lat);
			_this.personLng=r.point.lng;
			_this.personLat=r.point.lat;
			_this.getJsonFun();
		}
		else {
			alert('failed'+this.getStatus());
		}        
	},{enableHighAccuracy: true})
	},
	getcityFun:function(){			//ip城市定位
		var _this=this;
		_this.userlocal.getCurrentPosition(function(resule){
			_this.cityName= resule.address.city;
			_this.cityName=_this.cityName.slice(0,_this.cityName.indexOf('市'));
			$('.index_location strong').html(_this.cityName);
			_this.cityFlag=true;
		});
	},
	getJsonFun:function(){
		var _this=this;
		 $.ajax({
			    async: false,
			    type: "GET",
			    dataType: 'jsonp',
			    jsonp: 'callback',
			    jsonpCallback: 'renderReverse',
			    url:"http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location="+_this.personLat+","+_this.personLng+"&output=json&pois=1&ak=srocW7CMkQdkbazSA5kjcxDgFYO1YfMS",
			    success: function(json) {
			      //console.log(json);
			      _this.cityCode=json.result.addressComponent.adcode;
			      _this.positionFlag=true;
			      // _this.cityCode=json.result.addressComponent.adcode;
			      //if(debug==true)
			      //console.log(_this.personLng+","+_this.personLat);
			    }
		  });
	},
	init:function(){
		var _this=this;
		_this.map = new BMap.Map("locationcity");  
		_this.userlocal = new BMap.Geolocation();    
		var point = new BMap.Point(117.39, 39.93);  
		_this.map.centerAndZoom(point,15);
		var convertor = new BMap.Convertor();
		_this.getcityFun();
		_this.getPositionFun();
	}
};
var nameObj={						//表单name对象
	getNameFun:function(form){
		var _this=this;
		var postNode=form.find("[postname]");
		_this.postObj='{'
		for(var i=0;i<postNode.length;i++){
			var dataType=postNode.eq(i).attr('datatype');
			var name=postNode.eq(i).attr('postname');
			_this.value=postNode.eq(i).is('input')?postNode.eq(i).val():postNode.eq(i).text();
			if(dataType=='date'){
				_this.changeDateFun(_this.value);
			}
			var postName="\""+name+"\":\""+_this.value+"\",";
			_this.postObj+=postName;
		}
		_this.postObj=_this.postObj.slice(0,-1);
		_this.postObj+='}';
		_this.postObj=JSON.parse(_this.postObj);
		if(debug==true)
		console.log('根据postname获取的数据',_this.postObj);
		return _this.postObj;
	},
	changeDateFun:function(postvalue){
		var _this=this;
		if(postvalue.search('周')!=-1){
			_this.value=postvalue.slice(0,postvalue.indexOf(' '));
		}
	},
	init:function(){
		var _this=this;
	}
};
var pullloadObj={					//下拉加载
	listNode:$('.pull_list'),
	winH:$(window).height(),
	moreFlag:false,
	getFun:function(e){
		var _this=this;
		if(searchObj.canLoad==false){
			console.log('clear');
			document.removeEventListener("touchstart",pullloadObj.getFun);
		}
		else{
			console.log('start');
			var target=event.targetTouches[0];
			_this.startY=target.pageY;
		}
		// if(searchObj.canLoad==false){
			
			// document.removeEventListener("touchstart",pullloadObj.getFun);
		// }
		// _this.moreHeight=parseFloat($('.morelist').css('bottom'));
		// console.log(_this.startY,_this.moreHeight);
	},
	moveFun:function(e){
		var _this=this;
		var target=event.targetTouches[0];
		if(searchObj.canLoad==false){
			document.removeEventListener("touchmove",pullloadObj.moveFun);
		}
		else{
			var winH=$(window).height();
			console.log('moveFun');
			var scrollTop=$('html').scrollTop()+$('body').scrollTop();
			var touchY=target.pageY;
			// _this.moveY=touchY-_this.startY;
			var webHeight=$(document).height();
			if(scrollTop+winH+10>=webHeight){
				_this.moreFlag=true;
				// _this.listNode.css("marginBottom",-_this.moveY/3);
			}
		}
		// console.log(scrollTop,_this.winH,webHeight,"--");
		/*if(searchObj.canLoad==false){
			console.log('moveFun11111');
			document.removeEventListener("touchmove",pullloadObj.moveFun);
		}*/
		
		// console.log(scrollTop,_this.winH,webHeight,_this.moreFlag,win);
	},
	endFun:function(e){
		var _this=this;
		var event=window.event||e;
		if(searchObj.canLoad==false){
			document.removeEventListener("touchend",pullloadObj.endFun);
		}
		else{
			console.log('end');
			if(_this.moreFlag==true){
				searchObj.searchFun(searchObj.submitEvent,loadObj);
			}
			_this.moreFlag=false;
		}
		/*if(searchObj.canLoad==false){
			document.removeEventListener("touchend",pullloadObj.endFun);
		}*/
	},
	init:function(){
		var _this=this;
		if(searchObj.canLoad==true){
			document.addEventListener("touchstart",pullloadObj.getFun);
			document.addEventListener("touchmove",pullloadObj.moveFun);		
			document.addEventListener("touchend",pullloadObj.endFun);
		}
	}
};
var changeToChineseObj={			//中英转换
	facilityName:{"wifi":"无线wifi","lineweb":"有线网络","television":"电视","aircondition":"空调","shower":"淋浴","bathtub":"浴缸","blower":"吹风机","computer":"电脑","elekettle":"电水壶","park":"停车场","heater":"暖气","waterheater":"全天热水","elevator":"电梯"},
	ruleWord:{"reservePrice":"预付房费","premium":"附加房费","depostit":"押金","retreatRule":"退房规则","elsePay":"额外支付","inTime":"入住时间","outTime":"退房时间","receptionTime":"接待时间","receptionOthers":"外宾","limitDays":"最少入住天数","maxDays":"最多入住天数","invoice":"是否可开发票"},
};
var hrefObj={						//href解析
	getParameterFun:function(){
		var _this=this;
		var href=window.location.href;
		href=href.slice(href.indexOf('?')+1);
		var paraArr=href.split('&');
		_this.paraJson={};
		if(window.location.href.indexOf('?')!=-1){
			for(var i in paraArr){
				var name=paraArr[i].slice(0,paraArr[i].indexOf('='));
				var value=paraArr[i].slice(paraArr[i].indexOf('=')+1);
				value=decodeURI(value)
				_this.paraJson[name]=value;
			}
		}
		if(debug==true)
		_this.hrefJson=_this.paraJson;
		if(debug==true)
		console.log('href数据hrefObj.hrefJson',_this.hrefJson);
		//return _this.paraJson;
	},
	alertError:function(){
		var _this=this;
		for(var i in _this.hrefJson){
			if(i=='error'){
				alert(_this.hrefJson[i]);
			}
		}
	}
};
hrefObj.getParameterFun();
var priceObj={						//价格计算
	singlePriceFun:function(thisNode){		//单价叠加
		var _this=this;
		var mulriple=$(thisNode).val();
		var singlePrice=$('[singlePrice]').attr('singlePrice');
		var price=singlePrice*mulriple;
		//console.log('倍数='+mulriple,'单价='+singlePrice,'总价='+price);
		return price;
	},
	init:function(){
		var _this=this;

		// _this.priceRadio=$('input[type=radio][datatype=sealgoods]');
		// _this.priceRadio.focus(function(){
		// 	_this.singlePriceFun(this);
		// });
	}
};	
var popupObj={						//弹出框
	showFun:function(thisNode){				//窗口弹出
		var _this=this;
		var popID=$(thisNode).parent().attr('id');
		$('.pop_up').attr('idson',popID);
		if($('.pop_up').attr('state')){
			var popState=$(thisNode).parent().attr('state');
			$('.pop_up').attr('state',popState);
		}
		sealMessageObj.getMessageFun();
		$('.pop_up').show();
		$('.masking').show();
	},
	hideFun:function(){
		var _this=this;
		$('.pop_up').hide();
		$('.masking').hide();
		if($('.pop_up').attr('remove')=='true'){
			$('.pop_up').empty();
		}
	},
	init:function(){
		var _this=this;
		_this.jumpButton=$('.to_pop_up');
		_this.jumpButton.click(function(){
			_this.showFun(this);
		});
		$('.masking').click(function(){
			_this.hideFun();
		});
	}
};
var loadPageObj={					//加载页面	
	initDeg:0,
	pageHideFun:function(){				//隐藏加载页
		var _this=this;
		$('.loadPage .word').css({'width':'4.06rem','height':'1.98rem'});
		$('.loadPage .icon').css({'width':'2.44rem','height':'1.98rem'});
		$('.loadPage').animate({'opacity':0},1000,function(){
			$('.loadPage').css('display','none');
			//window.location.href=pathObj.setJsonFun('/static/weicity/index.html','/hotel/unconfine/index.form');
		});
		$('body').height($(window).height()).css('overflow','unset');
	},
	iconTransFun:function(){
		var _this=this;
		_this.initDeg+=360;
		$('.loadPage .icon').css('transform','rotateY('+_this.initDeg+'deg)');
		setTimeout(function(){
			if(loadPageFlag==false){
				_this.iconTransFun();
			}
			else{
				_this.pageHideFun();
			}
		},2500);
	},
	init:function(){
		var _this=this;
		$('.loadPage').show();
		$('body').height($(window).height()).css('overflow','hidden');
		$('.loadPage .icon').animate({'opacity':1},1000,function(){
			_this.iconTransFun();
		});
		$('.loadPage .word').animate({'opacity':1},1000);
		// var timer=setInterval(function(){
		// 		if(loadPageFlag==true){
		// 			clearInterval(timer);
		// 		}
		// 		_this.initDeg+=360;
		// 		$('.loadPage .icon').css('transform','rotateY('+_this.initDeg+'deg)');
		// 	},2500);

		
	}
};
var pathObj={						//静态动态路径切换
	setJsonFun:function(staticPath,dynamicPath){
		var _this=this;
		var port=window.location.port
		if(port=='9999'){
			return staticPath;
		}
		else{
			return dynamicPath;
		}
	},
	init:function(){
		var _this=this;
	}
};
var bottomPageObj={					//底部页面
	pageNum:0,
	showPageFun:function(thisNode){
		var _this=this;
		$('.fix_top .back').attr('onclick','bottomPageObj.hidePageFun()');
		var bottomPage=$(thisNode).attr('bottomPage');
		bottomPage=$('.bottom_page.'+bottomPage);
		bottomPage.css({'top':0,'bottom':0});
		_this.pageNum++;
		bottomPage.addClass('page'+_this.pageNum);
	},
	hidePageFun:function(){
		var _this=this;
		console.log(_this.pageNum);
		if(_this.pageNum>0){
			$('.page'+_this.pageNum).css('top','100%');
		}
		_this.pageNum--;
		if(_this.pageNum==0){
			$('.back').attr('onClick','history.go(-1)');
		}
		
	},
	init:function(){
		var _this=this;
		$('.to_bottompage').click(function(){
			_this.showPageFun(this);
		});
	}
};
var allFormObj={					//表单对象
	postFun:function(formNode,conditionPath,postBeforeFun,successFun){			//表单提交
		var _this=this;
		var event=window.event||e;
		var target=event.target||event.srcElement;
		var data=$(formNode).serializeArray();
		// if(postBeforeFun!=undefined&&postBeforeFun!=null){
		// 	data=postBeforeFun(data);
		// }
		postObj.data=data;
		var options={
			type:pathObj.setJsonFun('GET','POST'),
			url:pathObj.setJsonFun('/static/weicity/json/status.json',conditionPath),
			data:data,
			dataType:'json',
			resetForm: true,
			beforeSubmit: function(formData, jqForm, options){
				// if(debug==true)
				// console.log('最后提交的数据',formData,data,conditionPath);
				return true; 
			},
			success:function(result){
				// if(debug==true)
				// console.log('提交返回的数据',result);
				if(successFun!=null&&successFun!=undefined){
					successFun(result);
				}
				if(result.status!=1){
					formNode.find('input[type=submit]').attr('state','can_click');
				}
			},
			error:function(){
				alert('提交出错');
			}
		};
		$.ajax(options);
	},
	init:function(){

	}
};
var addHtmlObj={					//加载公共的html
	bottomMenuHtml:function(thisNode){
		var _this=this;
		$.ajax({
			type:'get',
			url:'/static/weicity/bottom_menu.html',
			dataType:'html',
			success:function(html){
				$('.bottom_menu').append(html);
				if(thisNode!=null&&thisNode!=undefined){
					$(thisNode).addClass('current');
					$(thisNode).find('a').attr('href','javascript:return false');
				}
			},
			error:function(xmlhttp,status,error){
				alert("页面加载出错!");
			}
		});
	}
};
var cookieObj={				//cookie对象
	setCookie:function(name,value,expiredays){
		var _this=this;
		var exdate=new Date()
		exdate.setDate(exdate.getDate()+expiredays)
		document.cookie=name+ "=" +encodeURI(value,"utf-8")+((expiredays==null)?"":";expires="+exdate.toGMTString())+";path=/";
	},
	getCookie:function(name){
		var _this=this;
		var cookieStr=document.cookie;
		//if(debug==true)
		//console.log('cookie值',cookieStr);
		var namerule=new RegExp(name+"(\=)([^\n\;]*)");
		if(cookieStr.match(namerule)==null){
			return null;
		}
		else{
			var val=cookieStr.match(namerule)[2];
			return decodeURI(val);
		}
	},
	delCookie:function(name){
		var _this=this;
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var val=_this.getCookie(name);
		if(val!=null){
			document.cookie=name+"="+val+";expires="+exp.toGMTString()+";path=/";
		}
	},
	init:function(){

	}
};
var postObj={						//ajax对象
	addData:function(name,value){
		var _this=this;
		postObj.data.push({name:name,value:value});
	},
	getData:function(formNode){
		var _this=this;
		postObj.data=$(formNode).serializeArray();
	},
	post:function(formNode){
		var _this=this;
		var conditionPath=$(formNode).attr('conditionPath');
		_this.getData(formNode);
		postObj.data=$(formNode).serializeArray();
		var dataFun=$(formNode).attr('dataFun');
		var successFun=$(formNode).attr('successFun');
		console.log(dataFun,successFun);
		if(dataFun!=null&&dataFun!=undefined&&dataFun!=''){
			eval(dataFun+'(postObj.data)');
		}
		if($(formNode).find('input[type=submit]').attr('state')=='can_click'){
			$(formNode).find('input[type=submit]').attr('state','cant_click');
				$.ajax({
					type:pathObj.setJsonFun('get','post'),
					url:pathObj.setJsonFun('/static/weicity/json/status.json',conditionPath),
					dataType:'json',
					data:postObj.data,
					beforeSend:function(xhr, settings){
						// console.log(postObj.data);
						// return false;
						return true;
					},
					success:function(result){
						$(formNode)[0].reset();
						if(result.status==1){
							if(successFun!=null&&successFun!=undefined&&successFun!='')
							eval(successFun+'(result)');
						}
						
					},
					error:function(){
						$(formNode)[0].reset();
		     			alert('发现一个问题,请稍后重试');
					}
				});
		}
	},
	changeButton:function(thisNode){
		var _this=this;
		var button=$(thisNode).find('input[type=submit]');
		button.attr('state','cant_click');
	},
	init:function(){
		var _this=this;
		$(document).on('submit','form',function(e){
			postObj.post(this);
			e.preventDefault();
		});
		$(document).on('ajaxSend',function( xhr, options){
			if(debug==true&&postObj.data!=undefined)
		    console.log('客户端提交的数据',postObj.data);
		});
		$(document).on('ajaxError',function(xhr, options, error){
			// if(debug==true)
		 //     alert('发现一个错误');
		 	// console.log(xhr, options, error);
		});
		$(document).on('ajaxSuccess',function(xhr, options, data){
			if(debug==true){
				// console.log(xhr, options, data);
				if(data.dataType=='json'){
					var json = eval('(' + options.responseText + ')'); 
					 console.log('服务端返回的数据',json);
					 console.log('调用的接口地址',data.url);
				}
			}
			if(data.dataType=='json'){
				var json = eval('(' + options.responseText + ')'); 
				if(json.status==0&&!$('body').hasClass('init')&&!$('body').hasClass('index')){
					alert('发现一个问题,请稍后重试');
				}
				else if(json.status==2){
					alert(json.msg);
				}
			}
		});
	}
};
postObj.init();
priceObj.init();




var jump=function(path){
	window.location.href=path;
};
var confirmFun=function(confirmWord,Fun){
	var flag=confirm(confirmWord);
	if(flag==true){
		Fun();
	}
	else{
		return ;
	}
};
var swiperObj={             //轮播
    recommendFun:function(){
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
    }
};


// scrollPageObj.init();


/*var dateObj={
	dateChooseNode:$('.datepicker'),
	chooseFun:function(e,thisnode){
		var _this=this;
		var event=e||window.event;
		var target=event.target||event.srcElement;
		 setTimeout(function(){
		 	$('#ui-datepicker-div').css('left',0);
		 },50);
	},
	init:function(){
		var _this=this;
		_this.dateChooseNode.click(function(e){
			_this.chooseFun(e,this);
		});
	}
};*/
/*var myMessageObj={
	mainNode:$('.list_main'),
	dowmloadListMain:$('.my_downloadpage_main .list'),
	init:function(){
		var _this=this;
		for(var i=0;i<_this.mainNode.length;i++){
			if(_this.mainNode.eq(i).html()==''){
			noPassageObj.addNoPassageFun(_this.mainNode.eq(i));
			}
		}
		if(_this.dowmloadListMain.html()==''){
			noPassageObj.addNoPassageFun(_this.dowmloadListMain);
		}
	}
};*/
/*var changeObj={
	toNode:$('.to_personal_page'),
	personalNode:$('.personal'),
	personPageNode:$('.personal_page'),
	personPageActiveNode:$('.mine .personal_page .swiper-container'),
	personPageTopNode:$('.personal_page .person_page_top'),
	personPageMenuNode:$('.mine .personal_page .menu'),
	issueWengNode:$('.personal_page_main .issue_wengweng'),
	issueNoteNode:$('.personal_page_main .issue_note'),
	friendlistPage:$('.personal_friendlist'),
	toFriendListPage:$('.personal_page .person_page_attention'),
	friendUnderlineNode:$('.personal_friendlist .under_line'),
	friendMenuLiNode:$('.personal_friendlist .menu li'),
	friendMain:$('.personal_friendlist_main .list_main'),
	dataChangePage:$('.person_data_change'),
	dataChangeBack:$('.person_data_change .cancleback'),
	dataChangeSaveNode:$('.person_data_change_top span'),
	cityChoosePage:$('.city_choose'),
	toCityChoosePage:$('.person_data_change .person_data_change_main .to_city_choose'),
	cityChooseFixMenu:$('.city_choose .fix_list_word'),
	cityChooseBack:$('.city_choose .cancleback'),
	cityChooseFix:$('.city_choose .fix_top'),
	mineNode:$('.mine'),
	bottomMenu:$('.bottom_menu'),
	indexMenuNode:$('.index_menu'),
	indexPage:$('.indexpage'),
	backNode:$('.back'),
	toRightPage:$('.to_rightpage'),
	loginPage:$('.loginpage'),
	tologinPage:$('.tologinpage'),
	loginBack:$('.loginpage .back'),
	movePage:$('.movePage'),
	fadein:$('.to_fade_in'),
	winHeight:$(window).height(),
	beforePage:null,
	backFlag:false,
	moveFlag:true,
	pageScrollFlag:true,
	moveFun:function(prePage,nextPage){
		var _this=this;
		if(_this.moveFlag==true){
		_this.backFlag=false;
		nextPage.show();
		if(nextPage.hasClass('personal_page')==false)
			_this.heightChangeChooseFun(nextPage);
		else
			_this.heightChangeFun(_this.personPageNode,_this.personPageActiveNode,[_this.personPageTopNode,_this.personPageMenuNode]);
		var nextPageHeight=nextPage.height();
		var endPos=prePage.attr('class').search(' ');
		var preClassName=prePage.attr('class').slice(0,endPos);
		nextPage.find('.back').addClass('backto_'+preClassName);
		_this.pageScrollFlag=false;
		// if(nextPage.hasClass('my_downloadpage')||nextPage.hasClass('my_collectpage')||nextPage.hasClass('my_formpage')||nextPage.hasClass('my_discountpage')||nextPage.hasClass('my_walletpage')||nextPage.hasClass('messagepage')||){
			_this.fixMoveFun(nextPage.find('.fix_fromright'));
		// }
		// console.log(prePage.find('.bottom_menu'));
		if(prePage.find('.bottom_menu').length==1){
			prePage.find('.bottom_menu').hide();
			// .css('marginLeft','-2.24rem');
		}
		prePage.css('marginLeft','-2.24rem');
		nextPage.css('left','0');
		if(nextPage.hasClass('personal_page')){
			_this.issueWengNode.css('left','50%');
			_this.issueNoteNode.css('left','50%');
		}
		if(prePage.hasClass('personal_page')){
			_this.issueWengNode.css('marginLeft','-2.24rem');
			_this.issueNoteNode.css('marginLeft','-2.24rem');
		}
		// var scrollTop=scrollTop=$('html').scrollTop()+$('body').scrollTop();
		// _this.movePage.css('marginTop',scrollTop);
		$('html,body').scrollTop(0);
		setTimeout(function(){
			prePage.hide();
			$('body').css('height',nextPageHeight);
			setTimeout(function(){
				_this.backFlag=true;
				// $('html').scrollTop(0);
				// $('body').scrollTop(0);
				
				// console.log($('html').scrollTop());
			},650);
		},400);
		// setTimeout(function(){
			// _this.movePage.css('marginTop',0);
			// setTimeout(function(){
				// $('body,html').animate({scrollTop:0},500,'ease');
				// console.log($('body').scrollTop());
			// },500);
			// console.log(1);
		// },300);
		}
	},
	backFun:function(prePage,nextPage){
		var _this=this;
		if(_this.backFlag==true){
		nextPage.show();
		
		var nextPageHeight=nextPage.height();
		_this.moveFlag=false;
		// if(prePage==_this.myDownloadPage||_this.myCollectPage||_this.myFormPage||_this.myDiscountPage||_this.myWalletPage||_this.messagePage){
			_this.fixBackFun(prePage.find('.fix_fromright'));
		// }
		// if(nextPage.hasClass('personal_page')==false)
		// 	_this.heightChangeChooseFun(nextPage);
		// else
		// 	_this.heightChangeFun(_this.personPageNode,_this.personPageActiveNode,[_this.personPageTopNode,_this.personPageMenuNode]);
		if(nextPage.hasClass('personal')){
			_this.issueWengNode.css('left','150%');
			_this.issueNoteNode.css('left','150%');
			// _this.bottomMenu.show().css('marginLeft',0);
			// _this.bottomMenu;
		}
		if(nextPage.hasClass('personal')||nextPage.hasClass('indexPage')){
			_this.pageScrollFlag=true;
		}
		if(nextPage.hasClass('personal_page')){
			_this.issueWengNode.css('marginLeft','-0.68rem;');
			_this.issueNoteNode.css('marginLeft','-0.68rem;');
		}
		$('html,body').scrollTop(0);
		$('body').css('height',nextPageHeight);
		nextPage.css('marginLeft','0');
		prePage.css('left','7.5rem');
		setTimeout(function(){
			prePage.hide();
			if(nextPage.find('.bottom_menu').length==1){
			nextPage.find('.bottom_menu').show();
			}
		},500);
		setTimeout(function(){
			_this.moveFlag=true;
		},1000);
		}
	},
	moveonFun:function(prePage,nextPage){
		var _this=this;
		// _this.heightChangeChooseFun(nextPage);
		if(nextPage.height()<$(window).height())
		nextPage.height($(window).height());
		var nextPageHeight=nextPage.height();
		if(_this.moveFlag==true){
		_this.backFlag=false;
		// if(nextPage==_this.cityChoosePage){
		// 	_this.cityChooseFixMenu.css('top','40%');
		// 	_this.cityChooseFix.css('top',0);
		// }
		nextPage.find('.fix_top').css('top',0);
		nextPage.css('top','0');
		setTimeout(function(){
			prePage.hide();
			_this.mineNode.css('height',nextPageHeight);
			setTimeout(function(){
				nextPage.css('position','absolute');
				_this.backFlag=true;
			},300);
		},400);
		}
	},
	backdownFun:function(prePage,nextPage){
		var _this=this;
		if(_this.backFlag==true){
		nextPage.show();
		// if(prePage==_this.cityChoosePage){
		// 	_this.cityChooseFixMenu.css('top','140%');
		// 	_this.cityChooseFix.css('top','100%');
		// }
		prePage.find('.fix_top').css('top','100%');
		var nextPageHeight=nextPage.height();
		_this.moveFlag=false;
		prePage.css('position','fixed');
		_this.mineNode.css('height',nextPageHeight);
		prePage.css('top','100%');
		setTimeout(function(){
			_this.moveFlag=true;
		},500);
		}
	},
	heightChangeFun:function(prePage,changeObj,minusObj){
		var _this=this;
		if(prePage.height()<=_this.winHeight){
			$('body').height($(window).height());
		var height=0;
		for(var i=0;i<minusObj.length;i++){
			height+=minusObj[i].height();
			// console.log(prePage,changeObj,minusObj[i],minusObj[i].height());
		}
		changeObj.height(_this.winHeight-height);
		}
		// console.log(changeObj,$('.strategypage_main').height());
	},
	friendPageFun:function(e){
		var _this=this;
		var event=e||window.event;
		var target=event.target||event.srcElement;
		console.log(target);
		if(target.className=='toattention'){
			_this.friendUnderlineNode.css('left','25%');
			_this.friendMenuLiNode.eq(0).addClass('current').siblings().removeClass('current');
			_this.friendMain.eq(0).show().siblings('.list_main').hide();
		}
		else if(target.className=='tofans'){
			_this.friendUnderlineNode.css('left','75%');
			_this.friendMenuLiNode.eq(1).addClass('current').siblings().removeClass('current');
			_this.friendMain.eq(1).show().siblings('.list_main').hide();
		}
	},
	fixMoveFun:function(moveFix){
		var _this=this;
		moveFix.css('left','0');
	},
	fixBackFun:function(moveFix){
		var _this=this;
		moveFix.css('left','7.5rem');
	},
	pageChooseFun:function(e){
		var _this=this;
		var event=window.event||e;
		var target=event.target||event.srcElement;
		var preNode=$(target);
		if($(target).hasClass('to_rightpage')==false){
			preNode=$(target).parents('.to_rightpage');
		}
		var endPos=preNode.attr('class').search(' ');
		var nextClassName=preNode.attr('class').slice(0,endPos)+'page';
		if(preNode.parents('.rightPage').length!=0){
			_this.moveFun(preNode.parents('.rightPage'),$('.'+nextClassName));
		}
		else{
			_this.moveFun(preNode.parents('.bottompage'),$('.'+nextClassName));
		}
	},
	backPageChooseFun:function(e,nextPage){
		var _this=this;
		var event=window.event||e;
		var target=event.target||event.srcElement;
		var startPos=target.className.search('backto_')+7;
		var beforeClassName=target.className.slice(startPos);
		_this.backFun($(target).parents('.rightPage'),$('.'+beforeClassName));
	},
	heightChangeChooseFun:function(nextPage){
		var _this=this;
		var nextClassName=nextPage.attr('class').slice(0,nextPage.attr('class').search(' '));
		var mainNode=nextPage.find('.'+nextClassName+'_main');
		var fixNode=nextPage.find('.fix_top');
		_this.heightChangeFun(nextPage,mainNode,[fixNode]);
	},
	pageScrollFun:function(){
		var _this=this;
		if(_this.pageScrollFlag==true){
		var scrollTop=scrollTop=$('html').scrollTop()+$('body').scrollTop();
			_this.movePage.css('marginTop',scrollTop);
		}
	},
	fadeInFun:function(e){
		var _this=this;
		var event=e||window.event;
		var target=event.target||event.srcElement;
		var className=$(target).attr('class');
		className=className.slice(0,className.indexOf(' '));
		var prePage=$(target).parents('.fade_in')
		prePage.hide();
		prePage.css('opacity',0);
		var nextPage=$(target).parents('body').find('.'+className+'page');
			// console.log(nextPage,nextPage.css('opacity'));
		nextPage.show();
		nextPage.css({'opacity':1,'zIndex':50});
		// if()
		if(nextPage.hasClass('mappage')){
			$('body,html,.hotellistpage').height($(window).height());
			nextPage.height($(window).height());
		}
		else{
			// nextPage.height('unset');
			$('.hotellistpage').height(nextPage.height());
		}
		setTimeout(function(){
			// $('body').height($(target).parents('body').find('.'+className+'page').height());
			// console.log($(target).parents('body').find('.'+className+'page').height());
		},50);
		
	},
	init:function(){
		var _this=this;
		_this.toNode.click(function(){
			_this.moveFun(_this.personalNode,_this.personPageNode);
		});
		_this.toFriendListPage.click(function(e){
			_this.friendPageFun(e);
		});
		_this.dataChangeBack.click(function(){
			_this.dataChangeSaveNode.eq(1).attr('class','cantsave save');
			personPageswiperObj.loadFun();
		});
		_this.toCityChoosePage.click(function(){
			_this.moveonFun(_this.dataChangePage,_this.cityChoosePage);
		});
		_this.cityChooseBack.click(function(){
			_this.backdownFun(_this.cityChoosePage,_this.dataChangePage);
		});
		_this.tologinPage.click(function(){
			_this.moveonFun(_this.personalNode,_this.loginPage);
		});
		_this.loginBack.click(function(){
			_this.backdownFun(_this.loginPage,_this.personalNode);
		});
		_this.fadein.click(function(e){
			_this.fadeInFun(e);
		});
		_this.toRightPage.click(function(e){
			_this.pageChooseFun(e);
		});
		_this.backNode.click(function(e){
			_this.backPageChooseFun(e);
		});
	}
};*/
// dateObj.init();
// changeObj.init();
// myMessageObj.init();
// var MenuObj={						//菜单对象
// 	menuNode:$('.menu li'),
// 	verticalUnderlinTop:parseFloat($('.vertical_underline').css('top')),
// 	friendMenuNode:$('.personal_friendlist .menu'),
// 	friendUnderlineNode:$('.personal_friendlist .under_line'),
// 	cityUnderlineNode:$('.city_choose .under_line'),
// 	nopassageNode:$('.personal_friendlist .none_passage'),
// 	cityChooseMenuNode:$('.city_choose .double_menu'),
// 	cityListPage:$('.city_choose .city_list'),
// 	myDownloadMenu:$('.my_downloadpage .double_menu'),
// 	myDownloadUnderLine:$('.my_downloadpage .under_line'),
// 	myDownloadList:$('.my_downloadpage .my_downloadpage_list'),
// 	myCollectMenu:$('.my_collectpage .menu'),
// 	myCollectList:$('.my_collectpage_main .list_main'),
// 	myFormDoubleMenu:$('.my_formpage .double_menu'),
// 	myFormDoubleList:$('.my_formpage_main .list_main'),
// 	myFormUnderline:$('.my_formpage .under_line'),
// 	myFormMenu:$('.my_formpage_main .undermenu'),
// 	myTravelnodeMenu:$('.my_travelnotepage .double_menu'),
// 	myTravelnodeUnderline:$('.my_travelnotepage .under_line'),
// 	myTravelnodeList:$('.my_travelnotepage_main .list_main'),
// 	mycommendMenu:$('.my_commendpage .double_menu'),
// 	mycommendUnderline:$('.my_commendpage .under_line'),
// 	mycommendList:$('.my_commendpage_main .list_main'),
// 	myAskandanswerMenu:$('.my_askandanswerpage .menu'),
// 	myAskandanswerUnderline:$('.my_askandanswerpage .under_line'),
// 	myAskandanswerList:$('.my_askandanswerpage_main .list_main'),
// 	myActiveMenu:$('.my_activepage .menu'),
// 	myActiveUnderline:$('.my_activepage .under_line'),
// 	myActiveList:$('.my_activepage_main .list_main'),
// 	messageMenu:$('.messagepage .menu'),
// 	messageUnderline:$('.messagepage .under_line'),
// 	messageList:$('.messagePage_main .list_main'),
// 	changeFun:function(thisNode,underline,changePage,hidesibling,amount){
// 		var _this=this;
// 		if(thisNode.tagName!='UL'){
// 			if(thisNode.tagName!='LI'){
// 				$(thisNode).parent().addClass('current').siblings().removeClass('current');
// 				var number=$(thisNode).parent().index();
// 			}
// 			else{
// 				$(thisNode).addClass('current').siblings().removeClass('current');
// 				var number=$(thisNode).index();
// 			}
// 		if(underline!=null){
// 			if(underline.hasClass('vertical_underline'))
// 				// console.log(parseFloat(underline.css('top')),$(thisNode).height()*number,parseFloat(underline.css('top'))+$(target).height()*number);
// 			// console.log(underline);
// 				underline.css('top',_this.verticalUnderlinTop+$(thisNode).height()*number+'px');
// 			else
// 				underline.css('left',((100/amount)*number)+(100/amount)/2+'%');
// 		}
// 		changePage.eq(number).show().addClass('currentPage').siblings(hidesibling).removeClass('currentPage').hide();
// 		}
// 	},
// 	chooseNodeFun:function(thisNode){
// 		var _this=this;
// 		var unerLineNode=$(thisNode).siblings('.under_line');
// 		var listNode=$(thisNode).parents('.hasMenuPage').find('.list_main');
// 		var number=$(thisNode).siblings().length;
// 		// console.log(unerLineNode,listNode,number);
// 		_this.changeFun(thisNode,unerLineNode,listNode,'.list_main',number);
// 	},
// 	init:function(){
// 		var _this=this;
// 		_this.menuNode.click(function(){
// 			_this.chooseNodeFun(this);
// 		});
// 		_this.cityChooseMenuNode.click(function(e){
// 			_this.changeFun(e,_this.cityUnderlineNode,_this.cityListPage,'.city_list',2);
// 		});
// 		_this.myDownloadMenu.click(function(e){
// 			_this.changeFun(e,_this.myDownloadUnderLine,_this.myDownloadList,'.my_downloadpage_list',2);
// 		});
// 		_this.myFormMenu.click(function(e){
// 			myFormList=$('.my_formpage_main .list_main.currentPage .form_list');
// 			_this.changeFun(e,null,myFormList,'.form_list',5);
// 		});

// 	}
// };