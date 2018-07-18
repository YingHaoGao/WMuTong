/**
 * @Author   MuTong
 * @DateTime 2018-06-07
 * @param    {[type]}   deAppearances [description]
 */
var OrgTree = function(deAppearances){
	var that = this;

	that.$canvas = $('<canvas></canvas>');
	that.$container = $('<div class="ot-container"></div>');
	that.deAppearances = deAppearances;
	that.onAdd = null;
};

/************************************************方法*************************************************/
/**
 * @title    将组件实例与容器对象绑定
 * @param    [type]
 * @param    {[type]}   container [接收渲染结果的容器，可以是id或DOM-Element对象。]
 */
OrgTree.prototype.attach = function(container){
	var that = this;
	
	if(typeof container == 'string'){
		that.$scope = $('#'+ container);
	}else{
		that.$scope = $(container);
	}
	that.$scope.addClass('ot-scope');

	that.$scope.append( that.$canvas, that.$container );

	// that._lineTo( that.$canvas, $module.find('.ot-up') );
};

/**
 * @title    刷新组织结构图
 * @param    [type]
 * @param    {[type]}   container [联系人数据，数组中每个对象结构如下：]
 */
OrgTree.prototype.refresh = function(contacts){
	var that = this;

	if(contacts instanceof Array){
		contacts.map(function(item,idx){
			var $scope = that.$container;
			var leader = item.leaderChain.split(/\//g);
			leader.map(function(_item){
				if(!isNaN(parseInt(_item))){
					$scope = $scope.find('#'+_item).children('.ot-down');
				}
			});

			$scope.append(that._moduleDom(false, item));
		})
	}else{
		alert('contacts参数数据格式应为数组')
	}

	that._setScope();
	that._setCanvas();
	that._lineTo(that.$scope);
};

/**
 * @title    添加数据时的回调函数
 * @param    [type]
 * @param    {[type]}   modelName [description]
 * @param    {[type]}   dataObj   [description]
 */
OrgTree.prototype.onAdd = function(modelName, dataObj){
	console.log(modelName, dataObj);
};

/**
 * @title    删除数据时的回调函数
 * @param    [type]
 * @param    {[type]}   modelName [description]
 * @param    {[type]}   dataObj   [description]
 */
OrgTree.prototype.onDel = function(modelName, dataObj){
	console.log(modelName, dataObj);
};

/**
 * @title    修改数据时的回调函数
 * @param    [type]
 * @param    {[type]}   modelName [description]
 * @param    {[type]}   dataObj   [description]
 */
OrgTree.prototype.onMod = function(modelName, dataObj){
	console.log(modelName, dataObj);
};

/********************************************事件********************************************/
OrgTree.prototype._add_event = function($scope){
	var that = this;

	$scope.find('.ot-addIcon').mouseup(function(){
			that._mouseUp($(this));
			that._add($(this),that);
	});
	$scope.find('.ot-addIcon').mousedown(function(){
			that._mouseDown($(this));
	})
};
OrgTree.prototype._structure = function(){

};
OrgTree.prototype._mouseDown = function($this){
	$this.addClass('ot-action');
};
OrgTree.prototype._mouseUp = function($this){
	$this.removeClass('ot-action');
};
OrgTree.prototype._add = function($this,that){
	var $thisModule = $this.closest('.ot-module'),
		$down = $thisModule.children('.ot-down'),
		$module = that._moduleDom(true);

	$down.append($module);
	that._setScope();
	that._setCanvas();
	that._lineTo(that.$scope);
};

/************************************************内置方法****************************************/
/**
 * @Author   MuTong
 * @DateTime 2018-06-07
 * @param    [type]
 * @param    {[type]}   up   [description]
 * @param    {[type]}   down [description]
 * @return   {[type]}        [description]
 */
OrgTree.prototype._moduleDom = function(isAdd, data){
	var that = this,
		saveType = !!isAdd ? 'add' : 'edit',
		id = !!data ? data.id : '',
		$module = $('<div id="'+ id +'" class="ot-module" data-type="'+ (!!isAdd ? "add" : "edit") +'"></div>'),
		$add = $('<span class="ot-addIcon '+ (!!isAdd ? "hidden" : "") +'">+</span>'),
		$up = $('<div class="ot-up"></div>'),
		$down = $('<div class="ot-down"></div>'),
		modelName = that.deAppearances.adapters.modelName;

	$module.append($add);
	$module.append($up);
	$module.append($down);

	that.detailEdit = new DetailEdit(that.deAppearances.dvAppearances,that.deAppearances.ebAppearances);
	that.detailEdit.attach($up[0],that.deAppearances.adapters.binders,data || {});
	that.detailEdit.show(true,!!isAdd);

	that.detailEdit.onSave = function(dataObj){
		if(saveType == 'edit'){
			that.onMod(modelName, dataObj);
		}else{
			that.onAdd(modelName, dataObj);
			saveType = 'edit';
			$add.removeClass('hidden');
		}
	}
	that.detailEdit.onDel = function(dataObj){
		var $parent = $module.closest('.ot-down').closest('.ot-module'),
			$next = $module.next('.ot-module'),
			nIdex = $module.index(),
			$downM = $module.children('.ot-down').children('.ot-module');

		$.each($downM,function(key,item){
			if(!!$next.length){
				$next.before(item);
			}else{
				$parent.children('.ot-down').append(item);
			}
		});

		$module.remove();
		that._setScope();
		that._setCanvas();
		that._lineTo(that.$scope);
		that.onDel(modelName,dataObj);
	}

	that._add_event($module);

	return $module;
};
//
OrgTree.prototype._setCanvas = function(){
	var that = this,
		width = that.$scope.outerWidth(),
		height = that.$scope.outerHeight();

	that.$canvas.css('background','#171341');
	that.$canvas.attr({
		width:width,
		height:height
	});
};
//
OrgTree.prototype._setScope = function(){
	var that = this,
		width = that.$container.outerWidth(),
		height = that.$container.outerHeight();

	that.$scope.css({
		width     : width,
		height    : height
	});
};
//
OrgTree.prototype._lineTo = function($scope){
	var that = this,
		$top = $($scope.find('.ot-up')[0]),
		$dwn = $($scope.find('.ot-down')[0]),
		topL = $top.offset().left - that.$canvas.offset().left,
		topT = $top.offset().top,
		topW = $top.outerWidth(),
		topH = $top.outerHeight(),
		topX = parseInt(topL + ( topW / 2 )),
		topY = parseInt( topT + topH ),
		cld  = [],
		ctx  = that.$canvas[0].getContext('2d');

	var line = {
		h      : 50,
		color  : '#2F257E',
		width  : 2,
		s      : 5
	};

	$.each($scope.find('.ot-module>.ot-up'),function(key,item){
		var l = $(item).offset().left - that.$canvas.offset().left,
			t = $(item).offset().top,
			w = $(item).outerWidth(),
			h = $(item).outerHeight();
			
		cld.push({
			$ : $(item),
			l : l,
			t : t,
			w : w,
			h : h,
			x : parseInt(l + ( w / 2 )),
			y : parseInt(t + h),
		});
	});

	ctx.strokeStyle = line.color;
	ctx.lineWidth = line.width;

	cld.map(function(item,idx){
		var nChile = item.$.next('.ot-down').find('.ot-module').length;
		var nTop = item.$.parents('.ot-down').length;
		if(!!nTop){
			that._animation(ctx, 'top', item.x, item.t);
		}
		if(!!nChile){
			that._animation(ctx, 'bottom', item.x, item.t + item.h);
		}
		if(nChile > 1){
			var child = that._childSE(item.$);
			that._animation(ctx, 'left', item.x, item.t + item.h + 50, child.start);
			that._animation(ctx, 'right', item.x, item.t + item.h + 50, child.end);
		}
	});
};
OrgTree.prototype._animation = function(ctx,dir,x,y,ex){
	var line = {
		h      : 50,
		color  : '#2F257E',
		width  : 2,
		s      : 40
	};

	ctx.beginPath();
	ctx.moveTo( x, y );
	var now_x = x, now_y = y;
	switch(dir){
		case 'left':
			now_x = ex;
			break;
		case 'right':
			now_x = ex;
			break;
		case 'top':
			now_y = y - line.h;
			break;
		case 'bottom':
			now_y = y + line.h;
			break;
		default:
			break;
	}
	ctx.lineTo( now_x, now_y );
	ctx.stroke();
	ctx.closePath();
};
OrgTree.prototype._childSE = function($up){
	var that = this,
		child = $up.next('.ot-down').children('.ot-module');
	
	return {
		start : $(child[0]).offset().left - that.$canvas.offset().left + ($(child[0]).outerWidth() / 2),
		end   : $(child[child.length - 1]).offset().left - that.$canvas.offset().left + ($(child[child.length - 1]).outerWidth() / 2),
	}
};