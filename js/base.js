/* 
//函数式
function $(id){
    return document.getElementById(id);
}
//对象式
var Base = {
    getId:function(id){
        return document.getElementById(id);
    },
    getTag:function(tag){
        //在ie6中虽是根据name找对象但实际上是通过id找对象的，在ff和ie7中是直接通过name找的
        return document.getElementsByTagName(tag);
    },
    getName:function(name){
        return document.getElementsByName(name);
    }
}
 */

/*
//函数式对象写法,实现连缀

//var a = function(){}
//声明方法
//var a = function(){}();
//声明方法并执行

var $ = function(){
	return new Base();
}
function Base(){
    this.elements = [];//获取的节点数组
    this.getId = function(id){//通过ID获取
        this.elements.push(document.getElementById(id));
        return this;
    }
    this.getTag = function(tag){//通过标签名获取
        var tags = document.getElementsByTagName(tag);
        for(var i=0;i<tags.length;i++){
            this.elements.push(tags[i]);
        }
        return this;
    }
    this.getName = function(name){//通过元素名称获取
        var names = document.getElementsByName(name);
        for(var i=0;i<names.length;i++){
            this.elements.push(names[i]);
        }
        return this;
    }
    this.getClass = function(className,idName){//通过元素类名获取,只能获取单名如class="footer",不能获取多名，如class="layout footer"(返回对象，奇怪)
        var node = null;
        if(arguments.length == 2){
            node = document.getElementById(idName);
        }else{
            node = document;
        }
        var all = node.getElementsByTagName('*');
        for(var i=0;i<all.length;i++){
            if(all[i].className == className){
                this.elements.push(all[i]);
            }
        }
        return this;
    }
    this.getElement = function(num){
        var element = this.elements[num];
        this.elements = [];
        this.elements[0] = element;
        return this;
    }
    
}

Base.prototype.click = function(fn){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].onclick = fn;
    }
    return this;
}
Base.prototype.css = function(attr,value){
    for(var i=0;i<this.elements.length;i++){
        if(arguments.length == 1){
            //getComputedStyle是firefox中的， currentStyle是ie中的
            if(typeof window.getComputedStyle != 'undefined'){
               return window.getComputedStyle(this.elements[i],null)[attr];
            }else if(typeof this.elements[i].currentStyle !='undefined'){
                return this.elements[i].currentStyle(attr);
            }
        }else{
            this.elements[i].style[attr] = value;    
        }
    }
    return this;
}
Base.prototype.html = function(str){
    for(var i=0;i<this.elements.length;i++){
        if(arguments.length == 0){ //没有传参，返回内容
            return this.elements[i].innerHTML;
        }else{                     //传参，设置内容
            this.elements[i].innerHTML = str;
        }
    }
    return this;
}
 */

 /*可以通过 $('#header p') 来获取元素的
//基础库
function Base(args) {
	//创建一个数组，来保存获取的节点和节点数组
	this.elements = [];
	
	if (typeof args == 'string') {
		//css模拟
		if (args.indexOf(' ') != -1) {
			var elements = args.split(' ');			//把节点拆开分别保存到数组里
			var childElements = [];					//存放临时节点对象的数组，解决被覆盖的问题
			var node = [];								//用来存放父节点用的
			for (var i = 0; i < elements.length; i ++) {
				if (node.length == 0) node.push(document);		//如果默认没有父节点，就把document放入
				switch (elements[i].charAt(0)) {
					case '#' :
						childElements = [];				//清理掉临时节点，以便父节点失效，子节点有效
						childElements.push(this.getId(elements[i].substring(1)));
						node = childElements;		//保存父节点，因为childElements要清理，所以需要创建node数组
						break;
					case '.' : 
						childElements = [];
						for (var j = 0; j < node.length; j ++) {
							var temps = this.getClass(elements[i].substring(1), node[j]);
							for (var k = 0; k < temps.length; k ++) {
								childElements.push(temps[k]);
							}
						}
						node = childElements;
						break;
					default : 
						childElements = [];
						for (var j = 0; j < node.length; j ++) {
							var temps = this.getTagName(elements[i], node[j]);
							for (var k = 0; k < temps.length; k ++) {
								childElements.push(temps[k]);
							}
						}
						node = childElements;
				}
			}
			this.elements = childElements;
		} else {
			//find模拟
			switch (args.charAt(0)) {
				case '#' :
					this.elements.push(this.getId(args.substring(1)));
					break;
				case '.' : 
					this.elements = this.getClass(args.substring(1));
					break;
				default : 
					this.elements = this.getTagName(args);
			}
		}
	} else if (typeof args == 'object') {
		if (args != undefined) {    //_this是一个对象，undefined也是一个对象，区别与typeof返回的带单引号的'undefined'
			this.elements[0] = args;
		}
	}
} */
 
//基础库定义--将所有方法置于外面
function Base(oneElements){
    //存放获取的节点数组
    this.elements = [];
    
    if(typeof oneElements == 'string'){
        switch(oneElements.charAt(0)){
            case '#':
                this.elements.push(this.getId(oneElements.substring(1)));
                break;
            case '.':
                this.elements = this.getClass(oneElements.substring(1));
                break;
            default:
                this.elements = this.getTag(oneElements);
        }
    }else if(typeof oneElements == 'object'){
        if(oneElements != undefined){
            this.elements[0] = oneElements;
        }
    }
}
//简化调用
var $ = function(oneElements){
    return new Base(oneElements);
}
//通过ID获取元素
Base.prototype.getId = function(id){
    return document.getElementById(id);
}
//通过标签名获取元素
Base.prototype.getTag = function(tag,parentNode){
    var node = null;
    var temps = [];
    if(parentNode != undefined){
        node = parentNode;
    }else{
        node = document;
    }
    var tags = node.getElementsByTagName(tag);
    for(var i=0;i<tags.length;i++){
        temps.push(tags[i]);
    }
    return temps;
}
//通过元素名称获取元素
Base.prototype.getName = function(name){
    var names = document.getElementsByName(name);
    for(var i=0;i<names.length;i++){
        this.elements.push(names[i]);
    }
    return this;
}
//通过类名获取元素
Base.prototype.getClass = function(className,parentNode){
    var node = null;
    var temps =[];
    if(parentNode != undefined){
        node = parentNode;
    }else{
        node = document;
    }
    var all = node.getElementsByTagName('*');
    for(var i=0;i<all.length;i++){
        if(all[i].className == className){
            temps.push(all[i]);
        }
    }
    return temps;
}
//设置CSS选择器子节点
Base.prototype.find = function(str){
    var childElements = [];
    for(var i=0;i<this.elements.length;i++){
        switch(str.charAt(0)){
            case '#':
                childElements.push(this.getId(str.substring(1)));
                break;
            case '.':
                var temps = this.getClass(str.substring(1),this.elements[i]);
                for(var j=0;j<temps.length;j++){
                    childElements.push(temps[j]);
                }
                break;
            default :
                var temps = this.getTag(str,this.elements[i]);
                for(var j=0;j<temps.length;j++){
                    childElements.push(temps[j]);
                }
        }
    }
    this.elements = childElements;
    return this;
}

//通过元素数组序号获取这个节点对象
Base.prototype.getElement = function(num){
    return this.elements[num];
}
Base.prototype.eq = function(num){
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this;
}
//鼠标左键单击方法
Base.prototype.click = function(fn){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].onclick = fn;
    }
    return this;
}
//css设置和获取方法
Base.prototype.css = function(attr,value){
    for(var i=0;i<this.elements.length;i++){
        if(arguments.length == 1){
            if(typeof window.getComputedStyle != 'undefined'){
                return window.getComputedStyle(this.elements[i],null)[attr];
            }else if(typeof this.elements[i].currentStyle !='undefined'){
                return this.elements[i].currentStyle(attr);
            }
        }else{
            this.elements[i].style[attr] = value;    
        }
    }
    return this;
}
//元素内部HTML设置和获取
Base.prototype.html = function(str){
    for(var i=0;i<this.elements.length;i++){
        if(arguments.length == 0){
            return this.elements[i].innerHTML;
        }else{
            this.elements[i].innerHTML = str;
        }
    }
    return this;
}
//元素添加类名
Base.prototype.addClass = function(className){
    for(var i=0;i<this.elements.length;i++){
        if(!this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
            this.elements[i].className += ' ' + className;
        }
    }
    return this;
}
//元素移除类名
Base.prototype.removeClass = function(className){
    for(var i=0;i<this.elements.length;i++){
        if(this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
            this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),'');
        }
    }
    return this;
}
//设置显示
Base.prototype.show = function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display = 'block';
    }
    return this;
}
//设置隐藏
Base.prototype.hide = function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display = 'none';
    }
    return this;
}
//设置鼠标移入移出
Base.prototype.hover = function(over,out){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].onmouseover = over;
        this.elements[i].onmouseout = out;
    }
    return this;
}
//设置对象水平和垂直居中
Base.prototype.center = function(width,height){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.top = (document.documentElement.clientHeight - height)/2 + 'px';
        this.elements[i].style.left = (document.documentElement.clientWidth - width)/2 + 'px';
    }
    return this;
}
//浏览器窗口大小改变
Base.prototype.resize = function(fn){
    window.onresize = fn;
    return this;
}
//锁屏方法
Base.prototype.lock = function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display = 'block';
    }
    return this;
}
//解锁屏方法
Base.prototype.unlock = function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display = 'none';
    }
    return this;
}

/* 
//拖拽事件
Base.prototype.drag = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		addEvent(this.elements[i],'mousedown',function(e){
            if(trim(this.innerHTML).length == 0) e.preventDefault();
            var _this = this;
			var diffX = e.clientX - _this.offsetLeft;
			var diffY = e.clientY - _this.offsetTop;
            
            if(e.target.tagName == 'H2'){
                addEvent(document,'mousemove',move);
                addEvent(document,'mouseup',up);
            }else{
                removeEvent(document,'mousemove',move);
                removeEvent(document,'mouseup',up);
            }
            
            function move(e){
				var left = e.clientX - diffX;
				var top = e.clientY - diffY;
				
				if (left < 0) {
					left = 0;
				} else if (left > getInner().width - _this.offsetWidth) {
					left = getInner().width - _this.offsetWidth;
				}
				
				if (top < 0) {
					top = 0;
				} else if (top > getInner().height - _this.offsetHeight) {
					top = getInner().height - _this.offsetHeight;
				}
				
				_this.style.left = left + 'px';
				_this.style.top = top + 'px';
                
                if (typeof _this.setCapture != 'undefined') {
                    _this.setCapture();
                } 
            }
            
            function up(){
				removeEvent(document,'mousemove',move);
                removeEvent(document,'mouseup',up);
				this.onmouseup = null;
				if (typeof _this.releaseCapture != 'undefined') {
					_this.releaseCapture();
				}
            }
		});
	}
	return this;
} 

 */
 //接受插件入口
Base.prototype.extend = function(name,fn){
    Base.prototype[name] = fn;
}

















