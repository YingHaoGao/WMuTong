/**
* navTree组件构造函数
* @param    $dom              jqueryObj    组件容器
* @param    hasTouchEffect    Boolean      是否有点击效果，默认值为false
* @param    touchClass        string       列表条目点击效果CSS类,类名可自定义
* @param    isCloseOther      string       是否关闭其他组
**/
var NavTree = function () {}

NavTree.prototype.init = function($dom, hasTouchEffect, touchClass, isCloseOther) {
  var that = this;
  
  //参数
  that.$dom           = $dom;
  that.$container     = $('<div class="nt-container"></div>');
  that.hasTouchEffect = hasTouchEffect;
  that.touchClass     = touchClass;
  that.isCloseOther   = isCloseOther;
};

/**********************************方法************************************/
/*
* 文档要求渲染方法
* @param    data    JSON    组件外获取到的JSON对象数组
*/
NavTree.prototype.setData = function (data) {
  var that = this;

  that.data = data;

  that.addDom();
  that.init_event();
};
//数据递归                                 ***核心函数***
NavTree.prototype.forJson = function (data,isHidden,left) {
  var that = this,
      $header = that.createHeader(
                                    data.menuNam,
                                    data.iconClassName,
                                    data.hasIcon,
                                    data.hasAngle),
      $list = that.createList(data.id,isHidden);

  $list.append($header);

  if(data.children instanceof Array){
    $header.attr('data_toggle',isHidden).css('paddingLeft',left);

    data.children.map(function(item,idx){
      $list.append(that.forJson(item,true,left + 20));
    })
    return $list;
  }else{
    $header.attr('data_toggle',isHidden).css('paddingLeft',left);
    $header.children('.nt-rightIcon').remove();
    $header.on('click',function(){
      
      if(!!that.hasTouchEffect){
        that.$container.find('.'+ that.touchClass).removeClass(that.touchClass);
        $(this).addClass(that.touchClass);  
      }

      if(data.onclick != undefined){
        data.onclick($list.data('id'))
      }
    })
    return $list;
  }
}

/*******************************插入dom********************************/
//插入dom节点
NavTree.prototype.addDom = function () {
  var that = this;
  if(that.data instanceof Array){
    that.data.map(function(item,idx){
      that.$container.append(that.forJson(item,false,0));
    })
  }else{
    alert('setData参数类型应为数组');
  }

  that.$dom.append(that.$container);
};

/*********************************事件******************************/
NavTree.prototype.init_event = function () {
  var that = this;

  that.$container.on('click','.nt-header',function(){
    var $this  = $(this),
        $list  = $this.closest('.nt-list'),
        $child = $list.children('.nt-list'),
        toggle = $this.data('toggle');

    if(!!$this.find('.nt-rightIcon').hasClass('toButtom')){
      that.hiddenList($this,$child);
    }else{
      $this.attr('data-toggle','true');
      $this.find('.nt-rightIcon').addClass('toButtom');
      $child.removeClass('hidden');
      
      if(!!that.isCloseOther){
        var $siblings = $this.closest('.nt-list').siblings();
        that.hiddenList(
                        $siblings.find('.nt-header'),
                        $siblings.find('.nt-list')
                        );
      }
    }
  })
};
NavTree.prototype.hiddenList = function ($this,$child) {
  $this.attr('data-toggle','false');
  $this.find('.nt-rightIcon').removeClass('toButtom');
  !!$child ? $child.addClass('hidden') : $($child).addClass('hidden');
};

/************************************dom模板**************************************/
/*
* 创建组件dom
*/
NavTree.prototype.createHeader = function (title,icon,hasIcon,hasAngle) {
  var $header     = $('<div class="nt-header" style="padding-left:0px;"></span>'),
      $icon       = $('<i class="nt-icon '+ (!!hasIcon ? icon : '') +'"></i>'),
      $title      = $('<span class="nt-title">'+ title +'</span>'),
      $rightIcon  = $('<i class="nt-rightIcon '+ (!!hasAngle ? 'fa fa-angle-right' : '') +'"></i>');

      $header.append($icon);
      $header.append($title);
      $header.append($rightIcon);

  return $header;
};
NavTree.prototype.createList = function (id,isHidden) {
  var $list = $('<div class="nt-list" data-id="'+ id +'"></div>');
  !!isHidden && $list.addClass('hidden');
  
  return $list;
};