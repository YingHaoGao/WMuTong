/**
 * 编辑栏组件
 * @param   document   $obj            容器，
 * @param   String     styleOrClass    整体样式,style || class
 * @param   String     title           标题文本
 * @param   String     highlight       可选，高亮标记，iconUrl || style || class
 * @param   [object]   buttons         按钮样式
 * */
var EditBar = function () {};
EditBar.prototype.render = function ($obj, title, highlight, buttons) {
    var that = this;
    //默认数据
    that.sStyleDef = "width: 100%; line-height: 30px; height: 40px; padding: 5px 10px; box-sizing: border-box;" +
        "background: #41007A; overflow: hidden; color: #fff; font-size: 20px; font-weight: bolder; margin-bottom: 10px;";
    that._title = title;
    that._highlight = highlight;
    that._buttons = buttons || [{
        styleOrClass:'fa fa-trash-o',
        onclick:function(idx){
            alert('按钮编号：'+ idx);
        }
    }];
    //初始容器
    that.$obj = $obj;
    $obj.innerHTML = "";
    if (highlight && typeof highlight == "string")
        that.setHighlight();
    if (title && typeof title == "string")
        that.setTitle();
    that.setButtons();
};
EditBar.prototype.setHighlight = function () {
    var that = this;
    var $b = document.createElement('b');
    if(!!that._highlight.match(/:.+;/g)){
        $b.setAttribute('style',that._highlight);
    }else if(!!that._highlight.match(/\./g)){
        var $img = document.createElement('img');
        $img.setAttribute('style','width:'+ that.$span.setOffset('width') +'px; height:'+ that.$span.setOffset('width') +'px');
        $img.src = that._highlight;
        $b.append($img);
    }else{
        $b.className = that._highlight;
    }
    that.$obj.append($b);
};
EditBar.prototype.setTitle = function () {
    var that = this;
    //添加标题
    that.$span = document.createElement('span');
    if(that.$span.textContent==null){
        that.$span.innerText = that._title+'';
    }else{
        that.$span.textContent = that._title+'';
    }
    that.$obj.append(that.$span);
};
EditBar.prototype.setButtons = function () {
    var that = this,
        $span = document.createElement('span');
    $span.style = 'float:right; color:#D6D400;';

    try {
        that._buttons.map(function(item,idx){
            var $a = document.createElement('a');
            //样式
            if(!!item.styleOrClass.match(/:.+;/g)){
                $a.setAttribute('style',item.styleOrClass);
            }else{
                $a.className = item.styleOrClass;
            }
            //绑定事件
            $a.addEventListener('click',function(event){
                item.onclick(idx);
            });
            //插入span
            $span.append($a);
        })
    }catch(e){
        alert('参数buttons格式不正确，格式为数组')
    }
    //插入document
    that.$obj.append($span);
};
