// 兼容获取类名
	//参数select 代表要获取的类名
	//[context]要查找的范围，如果要传的话按照他的范围找，如果不传给它一个默认的范围；
		//注意  这里的范围必须要获取到，
	function getClass(select,context){
		var context=context?context:document;
		if (document.getElementByClassName) {
			return context.getElementsByClassName(select);
		}else{
			var arr=[];
			var all=context.getElementsByTagName("*");
			for (var i = 0; i < all.length; i++) {
				if(checkClass(all[i].className,select)){
					arr.push(all[i])
				}
			}
			return arr;
		}
	}
	// 多类名判断语句
	function checkClass(allclass,newclass){
		var arr=allclass.split(" ")//以空格为分割成arr数组
		for (var i = 0; i < arr.length; i++) {
			if(arr[i]==newclass){
				return true;
			}
				
			}return false;
		}
	



	//兼容  各种浏览器里元素内容的获取和修改
	function setContent(obj,val){
		if (val==undefined) {
			if (obj.innnerText) {
				return obj.innnerText;
			}else{
				return obj.textContent;
			}
		}else{
			if (obj.innnerText) {
				obj.innnerText=val;
			}else{
				obj.textContent=val;
			}
		}
	}
//获取对象的样式
//obj  代表要提取的对象，   attr表示要获取的样式
	function getStyle(obj,attr){
		if (obj.currentStyle) {
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,null)[attr];
		}
	}

	// 简化获取方法
	//select  要获取的名字  类名  id名。  obj  获取的范围
	function $(select,obj){
		var select=delSpace(select);
		if (typeof select=="string") {
			var obj=obj||document;
			if (select.charAt(0)==".") {
				return getClass(select.slice(1),obj);
			}else if(select.charAt(0)=="#"){
				return document.getElementById(select.substr(1))
			}else if (/^[a-zA-Z][a-zA-Z1-6]*$/.test(select)) {
				return obj.getElementsByTagName(select)
			}else if(/^<[a-zA-Z][a-zA-Z1-6]>$/.test(select)){
				return obj.createElement(select.slice(1,-1))
			}
		}else if(typeof select=="function"){
			addEvent(window,"load",select)
			// window.onload=function(){
			// 	select()
			}
		}
	// }
	/*
	getChild (obj,type) 
	获取指定元素的子节点
	obj：指定的对象
	type：获取子节点的类型 true的时候获取有意义的文档和元素节点。false时候只获取元素节点
			当不输入的时候值为undefin 走false这条路
	*/
function getChilds(obj,type){
	var aa=obj.childNodes;
	var arr=[];
	var type=type||false;
	for (var i = 0; i < aa.length; i++) {
		if (type) {
			if (aa[i].nodeType==1||(aa[i].nodeType==3&&!( /^\s+$/.test(xiaos[i].nodeValue)))) {
				arr.push(aa[i]);
			}
		}else{
			if (aa[i].nodeType==1) {
				arr.push(aa[i]);
			};
		}
	}
	return arr;  
}
  /*
	get
  */
  /* 获取第一个有用子节点 */
function getFirst(obj,type){
	 return getChilds(obj,type)[0];
}
/*获取最后一个有用子节点 */
function getLast(obj,type){
	var all=getChilds(obj,type);
	return all[all.length-1];
}
/*获取任意一个有用子节点*/
function getNum(obj,index){
	return getChilds(obj)[index];
}
/*获得下一个兄弟节点*/
	function getNext(obj){
		var next=obj.nextSibling;
		if (next==null) {
			return false;
		}
		while(next.nodeType==8||(next.nodeType==3&&( /^\s+$/.test(next.nodeValue)))){
			next=next.nextSibling;
			if (next==null) {
				return false;
			}
		}
		return next;
	}
/*获得上一个兄弟节点*/
	function getPre(obj){
		var next=obj.previousSibling;
		if (next==null) {
			return false;
		}
		while(next.nodeType==8||(next.nodeType==3&&( /^\s+$/.test(next.nodeValue)))){
			next=next.nextSibling;
			if (next==null) {
				return false;
			}
		}
		return next;
	}
	// 把创建的元素添加到指定的对象之后
		// obj：创建好的元素
		// zobj：指定的元素
	function insertAfter(obj,zobj){
		var fobj=zobj.parentNode;
		var next=getNext(zobj);
		if (next) {
		fobj.insertBefore(obj,next);
		}else{
		fobj.appendChild(obj);
		}
		
	}
	// 插入到指定的对象之前
		//obj: 创建好的元素   
		//zobj： 指定的元素
	function insertBefore(obj,zobj){
		var fobj=zobj.parentNode;
		fobj.insertBefore(obj,zobj);
	}
	// 把创建的对象添加到父对象的最前面
		//obj: 创建好的元素   
		//fobj： 要插入的地方的父元素
	function appendBofore(obj,fobj){
		var fist=getFirst(fobj);
		if (fist) {
			 insertBefore(obj,fist)
			}else{
				fobj.appendChild(obj)
			}
	}
	//把创建好的元素插入到指定的父元素的最后
		//obj: 创建好的元素   
		//fobj：父元素
	function appendChild(obj,fobj){
		fobj.appendChild(obj);
	}
	//给同一个事件绑定多个处理程序
	//addEvent(对象，事件，处理程序)
	function addEvent(obj,type,fn){
		if (obj.attachEvent) {
			obj.attachEvent("on"+type,fn)
		}else{
			obj.addEventListener(type,fn,false)
		}
	}
	//删除某个事件中的某个处理程序
	//addEvent(对象，事件，处理程序)
	function removeEvent(obj,type,fn){
		if (obj.detachEvent) {
			obj.detachEvent("on"+type,fn)
		}else{
			obj.removeEventListener(type,fn,false)
		}
	}
	//滚动事件兼容问题
	//obj   给谁加的事件
	//upcallback   向上滚动时执行的程序
	//downcallback 向下滚动时执行的程序
	function onMouseWheel(obj,upcallback,downcallback){
		if(obj.attachEvent){
			 obj.attachEvent("onmousewheel",scrollFn);  
			 //IE、 opera 
			 }else if(obj.addEventListener){
			  obj.addEventListener("mousewheel",scrollFn,false);  
			  //chrome,safari    -webkit
			  obj.addEventListener("DOMMouseScroll",scrollFn,false); 
			   //firefox     -moz
			} 
		function scrollFn(e){
			var ev=e||window.event;
			var val=ev.wheelDelta||ev.detail;
			if (val==120||val==-3||val==-1) {
				console.log("向上")
				upcallback.call(obj)
			}if(val==-120||val==3||val==1){
				console.log("向下")
				downcallback.call(obj)
			}
			if (ev.preventDefault ) {
      			ev.preventDefault(); 
      		}//阻止默认浏览器动作(W3C) 
    			else {ev.returnValue = false;
    		}
		}
	}


	//有关cookie的函数封装
	// setCoolie("aa","张三丰",10)
function setCoolie (name,value,time) {
	if (time) {
		var dates=new Date();
		dates.setTime(dates.getTime()+time*1000*60);
		document.cookie=name+"="+value+";expires=	"+dates;
	}else{
		document.cookie=name+"="+value;
	}
}
//过期一个cookie
// delCookie("ss")
function delCookie(name){
	var dates=new Date();
		dates.setTime(dates.getTime()-100*1000*60);
		document.cookie=name+"=张三;expires="+dates;//这里的张三是随意给的 因为要删除了 给name就可以了
}
//获取一个cookie的value
// alert(getcookie("aa"))
function getcookie(name){
	var cookies= document.cookie;
	var arr=cookies.split("; ")
	for (var i = 0; i < arr.length; i++) {
		var arr1=arr[i].split("=")
		if (arr1[0]==name) {
			return arr1[1]
		};
	};

}

//去除字符串的空格
// obj  对象
// type  去除的方式    a  全部去除    l去除左边的   r  去除右边的   lr  去除左右俩边的   默认为 lr
  function  delSpace(obj,type){
  	var type=type||"lr";
  	if (type=="a") {
  		return obj.replace(/\s+/g,"")
  	}if (type=="l") {
  		return obj.replace(/^\s+/g,"")
  	}if (type=="r") {
  		return obj.replace(/\s+$/g,"")
  	}if (type=="lr") {
  		return obj.replace(/^\s+|\s+$/g,"")
  	};
  }
/*
		obj  对象
		type   发送请求的类型
		asynch   同步  或异步
		dataType  传入数据的类型
		data 
		调用的方式
		ajax({
		type:"GET",
		url:"2.php",
		asynch:true,
		data:{name:data},
		dataType:"json",
		success:function(arr){
			for (var i = 0; i < arr.length; i++) {
					var div=document.createElement("div");
					div.className="aa";
					div.style.borderRadius="5px"
					div.innerHTML=arr[i].title+arr[i].date;
					two.appendChild(div)
				}
		}
	})  
	*/
  //ajax  封装好的函数
  function ajax(obj){
var obj=obj||{};
var type=obj.type?obj.type:"GET";
var asynch=obj.asynch?obj.asynch:true;
var dataType=obj.dataType?obj.dataType:"json";
var data="";
	if (typeof obj.data=="string") {
	data=obj.data;
	}else if(typeof obj.data=="object"){
		for( var i in obj.data){
			data+=(i+"="+obj.data[i]+"&")
		}
		data=data.slice(0,-1)
	}

		var xml=XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	if (type=="GET") {
		xml.open("GET",obj.url+"?"+data,asynch);
		xml.send(null);
	}else if(type=="POST"){
		xml.open("POST",obj.url,true);
		xml.setRequestHeader("Content-Type","application/xwww-form-urlencoded"); 
		xml.send(data);
	}
	xml.onreadystatechange=function(){
		if (xml.readyState==4) {
			if (xml.status==200) {
				if (dataType=="text") {
					obj.success(xml.responseText)
				}else if(dataType=="json"){
					obj.success(eval("("+xml.responseText+")"))
				}else if (dataType=="xml") {
					obj.success(xml.responseXML)
				};
			};
		};
	}
}