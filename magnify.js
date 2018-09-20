// JavaScript Document
function Magnify(param){
	var magnify = this;
	var outputhtml =function(param){
		var html= '<div class="mag"><div class="magnify-img1" id="magnify_img1">';
        	html +='<img id="magnify_smallimg"/><span class="magnify-mask" id="magnify_mask"></span>';
	        html +='<span class="magnify-proxy" id="magnify_proxy"></span></div>';
	        html +='<div class="magnify-img2" id="magnify_img2"><img id="magnify_bigimg" class="magnify-img"/></div></div>';
		$('#'+param.divid).append(html);
		$('#magnify_smallimg').attr('src',param.orgimg);
		$('#magnify_bigimg').attr('src',param.bigimg);
		$('#magnify_img1').css('height',param.orgheight);
		$('#magnify_img1').css('width',param.orgwidth);
		$('#magnify_img2').css('height',param.bigheight/2);
		$('#magnify_img2').css('width',param.bigwidth/2);
		$('#magnify_mask').css('height',param.orgheight/2);
		$('#magnify_mask').css('width',param.orgwidth/2);
		$('#magnify_proxy').css('height',param.orgheight);
	}
	var paramcopy = function(){
		magnify.mask = document.getElementById("magnify_mask");
		magnify.orgcontainer = document.getElementById("magnify_img1");
		magnify.orgimg = document.getElementById("magnify_smallimg");
		magnify.bigcontainer = document.getElementById("magnify_img2");
		magnify.bigimg = document.getElementById("magnify_bigimg");
		magnify.visible = false;
		magnify.eventproxy = document.getElementById("magnify_proxy");
		return magnify;
	}
	outputhtml(param);
	magnify = paramcopy();
	this.act();
}
Magnify.prototype.adjuststyle = function(style){
	var mag = this;
	mag.mask.style.display= style;
	mag.bigcontainer.style.display = style;
}
Magnify.prototype.setoffset = function(clientX,clientY){
	var mag = this;
	var range = {
		offsetleft:mag.orgcontainer.offsetWidth-mag.mask.offsetWidth,
		offsettop:mag.orgcontainer.offsetHeight-mag.mask.offsetHeight
	};
	var left = clientX - mag.orgcontainer.offsetLeft-mag.mask.offsetWidth/2;
	var top = clientY - mag.orgcontainer.offsetTop- mag.mask.offsetHeight/2;
	if(left<0)
	 left=0;
	 else
	 {
		  if(left>range.offsetleft)
	        left = range.offsetleft;
	 }
	 if(top<0)
	  top=0;
	  else
	  {
		  if(top>range.offsettop)
		     top = range.offsettop;
	  }
	  var rate = {
		  left:left/range.offsetleft,
		  top:top/range.offsettop
	  };
	  mag.mask.style.left = left+'px';
	  mag.mask.style.top = top+ 'px';
	  mag.bigimg.style.left =  - rate.left *(mag.bigimg.offsetWidth- mag.bigcontainer.offsetWidth)+'px';
	  mag.bigimg.style.top =  -rate.top *(mag.bigimg.offsetHeight - mag.bigcontainer.offsetHeight)+'px';
}
Magnify.prototype.act = function(){
	var mag = this;
	mag.orgcontainer.onmouseover = function(ev){
		var ev = ev||window.event;
		var target = ev.target||ev.srcElement;
		mag.adjuststyle("block");
		this.visible = true;
	};
	mag.orgcontainer.onmouseout = function(ev){
		var ev = ev||window.event;
		var target = ev.target||ev.srcElement;
		mag.adjuststyle("none");
		this.visible = false;
	};
	mag.orgcontainer.onmousemove = function(ev){
		var ev = ev||window.event;
		if(!this.visible) return;
		mag.setoffset(ev.clientX,ev.clientY);
	};
}