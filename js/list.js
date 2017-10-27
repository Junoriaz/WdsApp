var loadObj={
	listNode:$('.big_pic_list ul'),
    loadLiveFun:function(json,loadLength){
     var _this=this;
         for(var i=0;i<json.recommend.length;i++){
            var html='<li><a href="'+json.recommend[i].vrUrl+'?hotelId='+json.recommend[i].hotelId+'"><img class="main_pic" src="'+imgAddress+json.recommend[i].hotelId+'/'+json.recommend[i].defaultImgThumbUrl+'"><i class="collect"></i><span>¥<strong>'+json.recommend[i].livePrice+'</strong>/起</span><figure><figcaption>'+json.recommend[i].hotelName+'</figcaption><em>'+json.recommend[i].briefInfo+'</em><br><i class="icon">一家三口</i><i class="icon">风景党</i></figure></a></li>';
            _this.listNode.append(html);
        }
    },
	init:function(){
		var _this=this;
		searchObj.searchFun();
	}
};
var searchObj={                     //搜索框对象
    listNode:$('.big_pic_list ul'),
    searchForm:$('.search_form'),
    moreNode:$('.morelist'),
    startNum:1,
    emdNum:10,
    loadLength:10,
    canLoad:true,
    searchFun:function(){
        var _this=this;
        var data={start:_this.startNum,end:_this.emdNum};
        if(_this.searchVal!=undefined&&_this.searchVal!=null)
        data.keyWords=_this.searchVal;
        postObj.data=data;
         var options={
            type:'get',
            url:pathObj.setJsonFun('/static/weicity/json/list.json','/shopHotel/unconfine/search.form'),
            data:data,
            dataType:"json",
            // beforeSubmit: showRequest,
            success:function(json){
                    if(_this.emdNum>=json.counts){
                         _this.moreNode.text('无更多内容');
                         //_this.loadLength=json.counts-_this.startNum+1;
                         _this.canLoad=false;
                         //pullloadObj.init();
                         // document.removeEventListener('touchstart',pullloadObj.startFun());
                         //console.log(_this.loadLength);
                    }
                    else{
                        _this.moreNode.text('加载更多');
                        _this.canLoad=true;
                        pullloadObj.init();
                    }
                    _this.startNum+=10;
                    _this.emdNum+=10;
                    loadObj.loadLiveFun(json,_this.loadLength);
                    //console.log(_this.startNum,_this.emdNum,json.counts);
                    
                },
                error:function(){
                    alert('加载出错');
                }
            };
            $.ajax(options);
    },
    init:function(loadObj){
        var _this=this;
        _this.searchForm.submit(function(e){
             _this.listNode.empty();
            _this.searchVal=_this.searchForm.find('input').val();
            _this.submitEvent=e;
            _this.startNum=1;
            _this.emdNum=10;
            _this.searchFun(e,loadObj);
            e.preventDefault();
        });
    }
};
loadObj.init();
searchObj.init(loadObj);
pullloadObj.init();

/*window.onload=function(){
	$('#container').height($(window).height());
	var map = new BMap.Map("container"); 
	var userlocal = new BMap.Geolocation(); 
	var convertor = new BMap.Convertor();  
	var point = new BMap.Point(120.21937542,30.25924446);  
	var pointArr = [];
    pointArr.push(point);
    translateCallback=function(data){
    	if(data.status === 0) {
    		var mapmark = new BMap.Marker(data.points[0]);
    		map.centerAndZoom(data.points[0],14);
    		map.addOverlay(mapmark);
   		}
    };   
    convertor.translate(pointArr,1,5,translateCallback);
   
	map.addControl(new BMap.NavigationControl());
	userlocal.getCurrentPosition(function(resule){
	});
	
};
navigator.geolocation.getCurrentPosition(function (position) {
     var x = position.coords.longitude;
     var y = position.coords.latitude;
 
})*/