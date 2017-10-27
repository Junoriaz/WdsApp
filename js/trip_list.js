var loadObj={
    listNode:$('.big_pic_list ul'),
    loadLiveFun:function(json,loadLength){
         var _this=this;
         var href=pathObj.setJsonFun('/static/weicity/trip_detail.html','/shopTrip/unconfine/tripDetail.form');
         for(var i=0;i<json.data.length;i++){
            var html='<li><a href="'+href+'?Id='+json.data[i].tripId+'"><img class="main_pic" src="'+imgAddress+'trip/'+json.data[i].tripId+'/'+json.data[i].imgaddr+'" onerror="imgError(this)"><i class="collect"></i><figure><figcaption>'+json.data[i].tripName+'</figcaption><em class="info">'+json.data[i].content1+'</em></figure></a></li>';
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
            url:pathObj.setJsonFun('/static/weicity/json/trip_list.json','/shopTrip/unconfine/search.form'),
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
            _this.searchFun();
            e.preventDefault();
        });
    }
};
loadObj.init();
searchObj.init(loadObj);
pullloadObj.init();
addHtmlObj.bottomMenuHtml();