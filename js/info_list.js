var loadJson=null;
var ajaxObj={
	affirmRoommessage:$('.affirm_main'),
    mainroomMain:$('.mainroom_message'),
    formNode:$('.hotel_affirm form'),
    sealList:$('.sealroom_message'),
	loadFun:function(){            //加载列表
		var _this=this;
         //nameObj.getNameFun($('.form_all'));
         //nameObj.postObj['title']=hrefObj.hrefJson.title;
         //nameObj.postObj['hotelId']=hrefObj.hrefJson.hotelId;
         var data=nameObj.getNameFun($('.form_all'));
         data['title']=hrefObj.hrefJson.title;
         data['hotelId']=hrefObj.hrefJson.hotelId;
         postObj.data=data;
		$.ajax({
            type:'get',
            url:pathObj.setJsonFun('/static/weicity/json/seal_room.json','infoDetail.form'),
            data: data,
            dataType:'json',
            success:function(json){
                loadJson=json;
                _this.loadMainroomFun(json);
                //nameObj.getNameFun($('.form_all'));
                //_this.putJson=nameObj.postObj;
                var loadData=nameObj.getNameFun($('.form_all'));
                _this.bodyHref=pathObj.setJsonFun("hotel_putform.html","/shopHotelOrder/confine/putform.form")+ "?title="+loadData.roomTitle+"&hotelId="+hrefObj.hrefJson.hotelId;
                _this.dateHtml="&liveTime="+loadData.liveTime+"&leaveTime="+loadData.leaveTime+"&liveDays="+loadData.liveDays;
                _this.jumpHref=_this.bodyHref+_this.dateHtml;
                _this.loadSealroomFun(json);
                popupObj.init();
                _this.sealroomJson=json.sealRoom;

            }
        });
	},
    loadMainroomFun:function(json){     // 物理房型加载
        var _this=this;
        var mainroomHtml='<div class="swiper-container room_pic"><div class="img_message" onclick="ajaxObj.jupmToScene()"></div> <div class="swiper-wrapper">';
        if(json.roomMessage.roomImgUrl.length==0){
            mainroomHtml+='<div class="swiper-slide"><img src="/static/weicity/img/no_pic.jpg" onerror="imgError(this)"></div>';
        }
        for(var i in json.roomMessage.roomImgUrl){
            mainroomHtml+='<div class="swiper-slide"><img src="'+imgAddress+'hotel/'+hrefObj.hrefJson.hotelId+'/'+json.roomMessage.hotelBodyId+'/'+json.roomMessage.roomImgUrl[i]+'"  onerror="imgError(this)"></div>';
        }
        mainroomHtml+='</div><div class="swiper-pagination"></div></div>'
        _this.mainroomMain.append(mainroomHtml);
        


        var affirmHtml='<div class="room_message clearFix"><figure><figcaption postname="roomTitle">'+json.roomMessage.title+'</figcaption></figure></div>';
        _this.affirmRoommessage.prepend(affirmHtml);
    },
    loadSealroomFun:function(json){         //售卖房型加载
        var _this=this;
        if(json.sealRoom.length==0){
            var nullhtml='<figure class="clearFix"><figcaption>暂无房型在售</figcaption></figure>';
            _this.sealList.append(nullhtml);
        }
        for(var roomNum in json.sealRoom){
            var sealroom=json.sealRoom[roomNum];
            var sealHtml='<figure class="clearFix" id="'+sealroom.hotelInfoId+'" state="'+sealroom.infoState+'" perNum="'+sealroom.peopleNum+'"><figcaption class="to_pop_up" totelPrice="'+sealroom.totelPrice+'">'+sealroom.hotelInfoName+'<i class="more_arrow"></i></figcaption><ul class="small_facility clearFix">';
            sealHtml+='<li><span>可住'+sealroom.peopleNum+'人</span></li>';
            sealHtml+='<li><span style="margin-top:.6rem;"> </span></li>';
            sealHtml+='</ul><div class="price"><em>¥<strong>'+sealroom.infoPrice+'</strong>起</em><a href="javascript:false" disable="true">订</a></div></figure>';
            _this.sealList.append(sealHtml);
            var aNode=_this.sealList.find('a').eq(roomNum);
            var sealtitleNode=_this.sealList.find('figcaption').eq(roomNum);
            var sealTitle=sealtitleNode.text();
            var totelPrice=sealtitleNode.attr('totelPrice');
            var inhref=_this.jumpHref+"&sealTitle="+sealTitle+"&hotelInfoId="+sealroom.hotelInfoId+"&peopleNum="+sealroom.peopleNum+"&totelPrice="+totelPrice+"&goodsNumber="+sealroom.goodsNumber;
            inhref=encodeURI(inhref);
            if(sealroom.infoState=='0'){
                aNode.removeClass().addClass('cant_reserve');
            }
            else{
                aNode.removeClass();
                aNode.attr('href',inhref).removeClass();
            }
        }
    },
    jupmToScene:function(){
        window.location.href='http://192.168.0.41:9999/brxms?hotelId='+hrefObj.hrefJson.hotelId;
    },
	init:function(){
		var _this=this;
        hrefObj.hrefJson;
        var timer1=setInterval(function(){
            if($('.datepicker').eq(0).val()!=''&&$('.datepicker').eq(1).val()!=''){
                _this.loadFun();
                clearInterval(1);
            }
        },50);
        // _this.formNode.submit(function(e){
        //     _this.postFun(e);
        // });
	}
};
var dailyDataObj={
    inputNode:$('.datepicker'),
    getDataFun:function(){      //获取日期绑定的数据
        var _this=this;
        var putData=nameObj.getNameFun($('.form_all'));
        var data={liveTime:putData.liveTime,leaveTime:putData.leaveTime,liveDays:putData.liveDays,hotelBodyId:loadJson.roomMessage.hotelBodyId};
        // if(debug==true){
        // console.log('点击日期提交数据',data);
        // }
        postObj.data=data;
        var options={
            type:'get',
            url:pathObj.setJsonFun('/static/weicity/json/seal_state.json','dateJson.form'),
            data:data,
            dataType:'json',
            success:function(json){
                var _this=this;
                if(debug==true)
                console.log('返回',json);
                 _this.newhref=ajaxObj.sameHref;
                _this.newhref+="&liveTime="+nameObj.postObj.liveTime+"&leaveTime="+nameObj.postObj.leaveTime+"&liveDays="+nameObj.postObj.liveDays;
                var loadData=nameObj.getNameFun($('.form_all'));
                ajaxObj.dateHtml="&liveTime="+loadData.liveTime+"&leaveTime="+loadData.leaveTime+"&liveDays="+loadData.liveDays;
                 ajaxObj.jumpHref=ajaxObj.bodyHref+ajaxObj.dateHtml;
                for(var i in json){
                    var sealNode=$('.sealroom_message').find('#'+i);
                    var sealNodeTitle=$('.sealroom_message #'+i+' figcaption');
                    sealNodeTitle.attr('totelprice',json[i].totelPrice);
                    var roomIndex=$('.sealroom_message #'+i).index();
                    if(json[i].infoState=='0'){
                        sealNode.find('a').removeClass().addClass('cant_reserve');
                        sealNode.find('a').attr('href','javascript:false');
                    }
                    else{
                        var sealTitle=sealNodeTitle.text();
                        var peopleNum=sealNode.attr('perNum');
                        sealNode.find('a').removeClass();
                        sealNode.find('a').attr('href',encodeURI(ajaxObj.jumpHref+"&sealTitle="+sealTitle+"&totelPrice="+json[i].totelPrice+"&hotelInfoId="+i+"&goodsNumber="+json[i].goodsNumber+"&peopleNum="+peopleNum));
                    }
                    sealNode.find('.price strong').text(json[i].infoPrice);
                    console.log(ajaxObj.sealroomJson[roomIndex],json[i]);
                    ajaxObj.sealroomJson[roomIndex]['totelPrice']=json[i].totelPrice;
                    ajaxObj.sealroomJson[roomIndex]['infoPrice']=json[i].infoPrice;
                }
            }
        };
        $.ajax(options);
    },
    init:function(){
        var _this=this;
        _this.radioNode=$('input[type=radio][datatype=sealgoods]');
        _this.radioNode.focus(function(){
            _this.getDataFun();
        });
    }
};

var sealMessageObj={        // 房型详细信息
    getMessageFun:function(){
        var _this=this;
        _this.jsonArr=ajaxObj.sealroomJson;

        var InfoId=$('.pop_up').attr('idson');
        var popState=$('.pop_up').attr('state');
        for(var i in _this.jsonArr){
            var ArrId=_this.jsonArr[i].hotelInfoId;
            if(ArrId==InfoId){
                var infojson=_this.jsonArr[i];
                if(debug==true)
                console.log('当前售卖房型data',infojson);
            }
        }
        var html='<figure><figcaption totelPrice="'+infojson.totelPrice+'" postname="sealTitle">'+infojson.hotelInfoName+'</figcaption><ul class="room_message clearFix">';
        html+='<li><span>可住'+infojson.peopleNum+'人</span></li>';
        html+='</ul></figure>';
        if(infojson.facility.length!=0){
            html+='<figure class="facility_list"><ul class="small_facility clearFix">'
            for(var i in infojson.facility){
                html+='<li><i class="'+infojson.facility[i]+'"></i><span>'+infojson.facility[i]+'</span></li>';
            }
            html+='</ul></figure>';
        }
        html+='<figure><ul><li><span>退款协议</span><p>该房间不支持退款</p></li></ul></figure>';
        $('.pop_up').prepend(html);
        //var sealTitle=$('.pop_up').find('figcaption').text();
        var totelPrice=$('.pop_up figcaption').attr('totelPrice');
        var priceHtml='<div class="pop_bottom clearFix"><span>¥<strong>'+infojson.infoPrice+'</strong>起</span><span class="hide" postname="totelPrice">'+infojson.totelPrice+'</span><a href="#">立即预定</a></div>';
        $('.pop_up').append(priceHtml);
        var inhref=encodeURI(ajaxObj.jumpHref+"&sealTitle="+infojson.hotelInfoName+"&totelPrice="+infojson.totelPrice+"&hotelInfoId="+InfoId+"&peopleNum="+infojson.peopleNum+"&goodsNumber="+infojson.goodsNumber);
        if(popState=="0"){
            $('.pop_up a').removeClass().addClass('cant_reserve');
             $('.pop_up a').attr('href','javascript:false');
        }
        else{
             $('.pop_up a').attr('href',inhref);
             $('.pop_up a').removeClass();
         }
    },
    init:function(){
        var _this=this;

    }
};
ajaxObj.init();
datepickerObj.init();
dailyDataObj.init();
addHtmlObj.bottomMenuHtml();
swiperObj.recommendFun();

