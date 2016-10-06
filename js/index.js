var sence=$(".sence")[0];
var snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
for (var i = 0; i < 20; i++) {
	for (var j = 0; j < 20; j++) {
		var div=document.createElement("div");
		div.className="b";
		div.id=i+"_"+j;
		sence.appendChild(div)
	}
}
var a=39;
var dict={};
for(var i in snake){
	dict[snake[i].x+snake[i].y]=true;
}
for (var i = 0; i < snake.length; i++) {	
	document.getElementById((snake[i].x+'_'+snake[i].y)).className="b s";
}

document.onkeydown=function(){
	t=setInterval(move,200)
	document.onkeydown=function(e){
		var ev=e||window.event;
		
		if (Math.abs(a-ev.keyCode==2)) {
			return false;
		};
		a=ev.keyCode;
	}
}
function move(){
	var h=snake[snake.length-1];
	var nh=null;
	// if (Math.abs(dir-ev.keyCode==2)) {
	// 	return false;
	// };
	if (a==37) {
		nh={x:h.x,y:h.y-1}
	}
	if (a==38) {
		nh={x:h.x-1,y:h.y}
	}
	if (a==39) {
		nh={x:h.x,y:h.y+1}
	}
	if (a==40) {
		nh={x:h.x+1,y:h.y}
	}
	if (dict[nh.x+"_"+nh.y]||nh.y>19||nh.y<0||nh.x>19||nh.x<0) {
		clearInterval(t)
		alert("GAME,OVER")
		return false;
	}
	if(nh.x==fod.x&&nh.y==fod.y) {
		fod=food()
	}else{
		var w=snake.shift()
		dict[nh.x+"_"+nh.y]=true;
		delete dict[w.x+"_"+w.y]
		document.getElementById((w.x+'_'+w.y)).className="b";
	}
	
	document.getElementById((nh.x+'_'+nh.y)).className="b s";
	snake.push(nh)
}
var fod=food();
function food(){
	var x=Math.floor(Math.random()*20);
	var y=Math.floor(Math.random()*20);
	while(dict[x+"_"+y]){
	 x=Math.floor(Math.random()*20);
	 y=Math.floor(Math.random()*20);
	}
	document.getElementById((x+'_'+y)).className="b f";
	return {x:x,y:y};
}








