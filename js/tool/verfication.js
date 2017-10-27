var vertifuObj={
	flagFun:function(flagArr){
		var _this=this;
		var flag=true;
		for(var i in flagArr){
			if(flagArr[i]==false){
				flag=false;
			}
		}
		return flag;
	},
	error:function(thisNode){
		$(thisNode).closest('li').find('.error').show();
	},
	noerror:function(thisNode){
		$(thisNode).closest('li').find('.error').hide();
	},
	init:function(){
		var _this=this;
		var flagArr=null;
		$(document).on('keyup',"input[type=text],input[type=password]",function(){

			var formNode=$(this).closest('form');
			var inputNode=formNode.find('input[type=text],input[type=password]');
			// if(flagArr!=null&&flagArr[inputNode.index($(this))]==false){
			// 	var index=flagArr[inputNode.index($(this))];
			// 	console.log(index);
			// }
			flagArr=new Array(inputNode.length);
			for(i in ruleObj){
				var becheckNode=formNode.find('['+i+']');
				for(var l=0;l<becheckNode.length;l++){
					//console.log(l,ruleObj[i](becheckNode.eq(l)),becheckNode.length,becheckNode.eq(l));
					var index=inputNode.index(becheckNode.eq(l));
					if(becheckNode.attr(i)!=null&&becheckNode.attr(i)!=undefined){
						var ruleVal=becheckNode.attr(i);
					}
					flagArr[index]=ruleObj[i](becheckNode.eq(l),ruleVal);
				}
			}
			var flag=_this.flagFun(flagArr);
			if(flag==true){
				formNode.find('input[type=submit]').attr('state','can_click');
			}
			else{
				formNode.find('input[type=submit]').attr('state','cant_click');
			}
		});
		$(document).on('blur',"input[type=text],input[type=password]",function(){
			var thisInput=this;
			var thisIndex=$(thisInput).closest('form').find('input[type=text],input[type=password]').index(thisInput);
			if(flagArr!=undefined&&flagArr!=null){
				console.log(flagArr[thisIndex],thisInput);
				if(flagArr[thisIndex]==false){
					_this.error(thisInput);
					//thisInput.css('border','1px solid #F79F9F');
				}
				else{
					_this.noerror(thisInput);
					//thisInput.css('border','0 none');
				}
			}
		});

	}
};
var ruleObj={
	phone:function(inputNode){
		var inputval=inputNode.val();
		var rule=/^1[34578]\d{9}$/;
		if(inputval.match(rule)==null){
			return false;
		}
		else{
			return true;
		}
	},
	password:function(inputNode){
		var inputval=inputNode.val();
		var rule=/^[0-9a-zA-Z]{6,16}$/;
		if(inputval.match(rule)==null){
			return false;
		}
		else{
			return true;
		}
	},
	chinese:function(inputNode){
		var inputval=inputNode.val();
		var rule=/^[\u4e00-\u9fa5a-zA-Z]+$/;
		if(inputval.match(rule)==null){
			return false;
		}
		else{
			return true;
		}
	},
	notnull:function(inputNode){
		var inputval=inputNode.val();
		var rule=/^.+$/;
		if(inputval.match(rule)==null){
			return false;
		}
		else{
			return true;
		}
	},
	length:function(inputNode,value){
		var inputval=inputNode.val();
		var inputvalLeg=inputval.length;
		var minRule=/^[0-9]+/;
		var maxRule=/[0-9]+$/;
		var min=parseInt(value.match(minRule)[0]);
		var max=parseInt(value.match(maxRule)[0]);
		var rule=/^[0-9]+$/;
		if(inputvalLeg<min||inputvalLeg>max){
			return false;
		}
		else{
			return true;
		}
	},
	max:function(inputNode,value){
		var inputval=inputNode.val();
		var rule=/^[0-9]+$/;
		if(inputval.match(rule)==null||parseInt(inputval)>value){
			return false;
		}
		else{
			return true;
		}
	},
	min:function(inputNode,value){
		var inputval=inputNode.val();
		var rule=/^[0-9]+$/;
		if(inputval.match(rule)==null||parseInt(inputval)<value){
			return false;
		}
		else{
			return true;
		}
	}
};
vertifuObj.init();