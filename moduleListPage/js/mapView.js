/**
 * [MapView description]
 * @param {[type]} deAppearances [description]
 * @param {[type]} epAppearances [description]
 */
var MapView = function(deAppearances, epAppearances){
	var that = this;

	that.$container = $('<div class="mv-container"></div>');
	that.$header = $('<div id="mv-header"></div>');
	that.$headerTitle = $('<span class="mv-headerTitle"></span>');
	that.deAppearances = deAppearances;
	that.epAppearances = epAppearances;
	that.modelName = deAppearances.adapters.modelName;
	that.isAdd = false;
	//默认定位图标
	that.icon = './images/icon.png';
	that.onAdd = null;
	that.onMod = null;
	that.onDel = null;

	that.epAppearances.btnAppearances.map(function(item,idx){
		item.onclick = function(index){
			that._editPanelBtnClick(index);
		}
	});

	that.$editPanel = new EditPanel(that.epAppearances.dvAppearances,
									that.epAppearances.btnAppearances);
	that.$editPanel.render(that.$header[0]);
	that.$header.append(that.$headerTitle);
};

/***************************方法*********************************/
/**
 * [attach description]
 * @param  {[type]} container [description]
 * @param  {[type]} bgImg     [description]
 * @return {[type]}           [description]
 */
MapView.prototype.attach = function(container, bgImg){
	var that = this;
	
	if(typeof container == 'string'){
		that.$scope = $('#'+ container);
	}else{
		that.$scope = $(container);
	}
	that.$scope.addClass('mv-scope');
	that.$scope.append(that.$header);
	that.$scope.append( that.$container );
	that.$container.css({
		"background" : "url("+ bgImg +") no-repeat 0px 0px",
		"backgroundSize" : "100% 100%"
	});

	that.$container.on('click',function(event){
		if($(event.target).hasClass('mv-container')){
			that._mapMarkClick();
		}
		if(!!that.isAdd){
			var options = {
				x : event.offsetX - 6,
				y : event.offsetY - 6,
				icon : that.icon,
				name : '',
				dvAppearances : that.epAppearances.dvAppearances,
				ebAppearances : that.deAppearances.ebAppearances,
				binders : that.deAppearances.adapters.binders
			};
			that._createModule(that,options);
			that._toggleIsAdd(false);
		}
	});
};
/**
 * [refresh description]
 * @param  {[type]} markers [description]
 * @return {[type]}         [description]
 */
MapView.prototype.refresh = function(markers){
	var that = this;

	if($.isArray(markers)){
		markers.map(function(item,idx){
			var options = {
				x : item.pos[0],
				y : item.pos[1],
				icon : item.icon,
				name : item.name,
				dvAppearances : that.deAppearances.dvAppearances,
				ebAppearances : that.deAppearances.ebAppearances,
				binders : that.deAppearances.adapters.binders
			};
			that._createModule(that,options);
		});
	}else{
		console.error('markers参数应为数组');
	}
}

MapView.prototype._createModule = function(that,options){
	var $thisMark,
		isAdd = that.isAdd,
		iconStyle = 'top:'+ options.y +'px;left:'+ options.x +'px',
		$img = $('<img class="mv-markImg" src="'+ (options.icon || that.icon) +'" title="'+ options.name +'"/>'),
		$detailEditCon = $('<div class="mv-detailEditCon '+ (!isAdd && "hidden") +'"></div>'),
		$mark = $('<div class="mv-mark '+ (!!isAdd && "action") +'" style="'+ iconStyle +'"></div>'),
		detailEdit = new DetailEdit(options.dvAppearances,options.ebAppearances);

	detailEdit.attach($detailEditCon[0],options.binders,{});
	detailEdit.show(true,!!isAdd);
	$mark.append($img, $detailEditCon);
	that.$container.append($mark);

	$img.on('click',function(){
		var $this = $(this);
		$thisMark = $this.closest('.mv-mark');
		that._mapMarkClick($this);
	});
	detailEdit.onSave = function(dataObj){
		if(!!isAdd){
			that.onAdd(that.modelName, dataObj);
			isAdd = false;
		}else{
			that.onMod(that.modelName, dataObj);
		}
	};
	detailEdit.onDel = function(dataObj){
		try{
			$thisMark.remove();
		}catch(err){
			$mark.remove();
		}
		that.onDel(that.modelName, dataObj);
	}
}

/*******************************事件********************************/
MapView.prototype._editPanelBtnClick = function(idx){
	var that = this;
	switch(idx){
		case 0:
			that._mapMarkClick();
			that._toggleIsAdd(true);
			break;
		default:
			break;
	};
};
MapView.prototype._toggleIsAdd = function(is){
	var that = this;
	if(is){
		that.isAdd = true;
		that.$container.addClass('isAdd');
		that.$headerTitle.html("请在地图上单击添加位置标记");
	}else{
		that.isAdd = false;
		that.$container.removeClass('isAdd');
		that.$headerTitle.html(null);
	}
};
MapView.prototype._mapMarkClick = function($scope){
	var that = this;

	that.$container.find('.mv-detailEditCon:not(.hidden)').addClass('hidden');
	that.$container.find('.mv-mark.action').removeClass('action');
	if(!!$scope){
		$scope.closest('.mv-mark').addClass('action');
		$scope.next('.mv-detailEditCon').removeClass('hidden');
	}
};