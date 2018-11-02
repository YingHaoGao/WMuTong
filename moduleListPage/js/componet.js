/**
 * 	componet组件
 */

var Componet = function (tpl) {
	this.tpl = tpl;
	this.num = 0;
}
//export
Componet.prototype.attach = function (dataObj, container) {
	var that = this;

	that.dataObj = dataObj;
	that.hScope = typeof container == String 
							? document.getElementById(container) : container;

	that.eachTpl(that.tpl, that.hScope);
}
Componet.prototype.refresh = function (dataFieldPath, dataFieldVal) {
	var that = this;

	that.editData( that.dataObj, dataFieldPath, dataFieldVal );
	that.hScope.innerHTML = '';
	that.eachTpl(that.tpl, that.hScope);
}


/****************************************核心****************************************/
/**
 * @Author   MuTong
 * 遍历tpl参数
 * @param    Object   	obj        [当前循环的tpl]
 * @param    element    elementObj [当前循环的element节点]
 */
Componet.prototype.eachTpl = function (obj, elementObj) {
	var that = this; 

	if(that.isNullObj(obj)){
		return;
	}else{
		for(let key in obj){
			if(obj[key] instanceof Array){
				if(!!obj['$'+key]){
					var arrPath = obj['$'+key].split('.'),
						arrData = that.dataObj;

					for(let i=0;i<arrPath.length;i++){
						arrData = arrData[arrPath[i]];
					}
					for(let i=0;i<arrData.length;i++){
						that.num = i;
						for(let idx in obj[key]){
							let classObj = that.classify( key, obj[key] );
							elementObj.appendChild(classObj.val);
							that.eachTpl( obj[key][idx], classObj.val );
						}
					}
				}else{
					for(let idx in obj[key]){
						let classObj = that.classify( key, obj[key] );
						elementObj.appendChild(classObj.val);
						that.eachTpl( obj[key][idx], classObj.val );
					}
				}
			}else{
				let classObj = that.classify( key, obj[key] );

				if(!!classObj.isTag){
					elementObj.appendChild(classObj.val);
					that.eachTpl( obj[key], classObj.val );
				}else{
					classObj.setFun( elementObj, classObj.val, obj[key]['_'],
						obj[key] );
				}
			}
		}
	}
	
}

/**
 * @Author   MuTong
 * 属性分类
 * @param    String   string  [tpl中循环的每个key]
 * @param    Object   tplArgs [主要用于回调函数的参数]
 * @return   Object           []
 */
Componet.prototype.classify = function (string, tplArgs ) {
	var that = this,
		obj = { isTag: false, val: false, setFun: null },
		num = that.num;

	switch(true){
		case string[0] == '$':
			obj.isTag = false;
			obj.val = string.substring(1,string.lenght);
			obj.setFun = function(ele, key, val, _val){
				ele[key] = val;
				if(!!_val['%']) {
					ele[key] = that.dataToValue( that.dataObj, _val['%'], num );

					if(!!_val['<<']) _val['<<'].call(ele, tplArgs, num);

					if(!!_val['>>']) that.addEventHandler( ele, 'change', function(event){ 
										_val['>>'].call(ele, ele.value, tplArgs, num);
									} )
				}
			};
			break;
		case string[0] == ':':
			obj.isTag = false;
			obj.val = string.substring(1,string.lenght);
			obj.setFun = function(ele, key, val, _val){
				ele.setAttribute(key, val);
				if(!!_val['%']) {
					ele.setAttribute(key, that.dataToValue( that.dataObj, _val['%'], num ));

					if(!!_val['<<']) _val['<<'].call(ele, tplArgs, num);

					if(!!_val['>>']) that.addEventHandler( ele, 'change', function(event){ 
										_val['>>'].call(ele, ele.value, tplArgs, num);
									} )
				}
			};
			break;
		case string[0] == '@':
			obj.isTag = false;
			obj.val = string.substring(1,string.lenght);
			obj.setFun = function(ele, key, val, _val){
				if(!!_val['%']) {
					that.addEventHandler( ele, key, function(){
						 // console.log(that.dataToValue( that.dataObj, _val['%'] ))
						that.dataToValue( that.dataObj, _val['%'], num ).call(ele, tplArgs, num) 
					} );
				}else{
					that.addEventHandler( ele, key, function(){
						val.call(ele, tplArgs, num) 
					} );
				}
			};
			break;
		case string[0] == '#':
			obj.isTag = true;
			obj.val = that.createTager('div');
			break;
		case string[0] == '%':
			obj.isTag = false;
			obj.val = string.substring(1,string.lenght);
			obj.setFun = function(ele, key, val, _val){
				ele.setAttribute(key, val);
				if(!!_val['%']) {
					ele.setAttribute(key, that.dataToValue( that.dataObj, _val['%'] ));

					if(!!_val['<<']) _val['<<'].call(ele, tplArgs, num);

					if(!!_val['>>']) that.addEventHandler( ele, 'change', function(event){ 
										_val['>>'].call(ele, ele.value, tplArgs, num);
									} )
				}
			};
			break;
		case string != null:
			obj.isTag = true;
			obj.val = that.createTager(string);
			break;
		default:
			break;
	}

	return obj;
}

/************************************方法*********************************/


//创建节点
Componet.prototype.createTager = function (tagerName) {
	return document.createElement(tagerName);
}

//判断对象是否为空
Componet.prototype.isNullObj = function (obj) {
	for(let i in obj){
		return false;
	}
	return true;
}

/**
 * @Author   MuTong
 * 根据路径查找对象下的属性 a.*.b
 * @param    Object     obj     [description]
 * @param    String     keyPath [description]
 * @param    {[type]}   value   [description]
 */
Componet.prototype.editData = function (obj, keyPath, value) {
    var array = keyPath.match(/\w+/g);

    for(var i=0;i<array.length-1;i++){
        var cur = array[i];
        var next = array[i+1];
		
        if(!obj[cur]){
            if(isNaN(next)){
                obj[cur] = {};
            }
            else{
                obj[cur] = [];
            }
        }
        obj = obj[cur];
    }
    obj[array[i]] = value;
}

/**
 * @Author   MuTong
 * 根据路径查找对象下的属性 a[*].b
 * @param    Object    object [description]
 * @param    String    path   [description]
 * @param    Number    num    [description]
 * @return   Object           [description]
 */
Componet.prototype.dataToValue = function (object, path, num) {
    var props = path.split(".");
    var that = this;
    // var num = that.num;
    for(var i=0;i<props.length;i++){
        var p = props[i];
        var is = p.match(/\[\*+\]/g);
        var arr = p.split("[");
        p = arr[0];
        
        //路径没有[*]
        if(is == null){
        	if(object && object.hasOwnProperty(p)){
	            object = object[p];
	        }
	        else{
	            return undefined;
	        }
        }else{//路径有[*]
        	for(var a=0;a<arr.length;a++){
        		let str = p;
        		if(!!arr[a].match(/\*+\]/g)){
        			str = num;
        		}
        		if(object && object[str]){
        			object = object[str];
        		}
        	}
        }
    }

    return object;
}

/***********************************Tools********************************/
/* 
 * addEventListener:监听Dom元素的事件  封装
 *   
 *  target：监听对象 
 *  type：监听函数类型，如click,mouseover 
 *  func：监听函数 
 */  
Componet.prototype.addEventHandler = function (target,type,func){  
    if(target.addEventListener){  
        //监听IE9，谷歌和火狐  
        target.addEventListener(type, func, false);  
    }else if(target.attachEvent){  
        target.attachEvent("on" + type, func);  
    }else{  
        target["on" + type] = func;  
    }   
}  

/*
 * removeEventHandler:移除Dom元素的事件 
 *   
 *  target：监听对象 
 *  type：监听函数类型，如click,mouseover 
 *  func：监听函数 
 */  
Componet.prototype.removeEventHandler = function (target, type, func) {  
    if (target.removeEventListener){  
        //监听IE9，谷歌和火狐  
        target.removeEventListener(type, func, false);  
    } else if (target.detachEvent){  
        target.detachEvent("on" + type, func);  
    }else {  
        delete target["on" + type];  
    }  
}  