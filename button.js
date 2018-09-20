// JavaScript Document
$(function(){
	var length = $(".lyf-button").length;
	if (length>0)
	{
		var num=0;	
		var obj,btn,param;
		for(num;num<length;num++)
		{
		   obj = $(".lyf-button")[0];
		   param = {
			content:$(obj).text()
		   }
		   $(obj).remove();
		  btn =new lyfbutton(param);
		  btn.display();
		}
	}

	
});
function lyfbutton(param){
	var button = this;
	var adjustparam = function(param){
		var defaultparam = {
			id:'',
			content:'',
			onclickevent:function(){}		
		};
		if(typeof param.onclickevent !="function")
		    param.onclickevent=function(){};
	    $.extend(defaultparam,param);	
		return defaultparam;
	};
	var outputHtml = function(param){
		var html='<div class="lyf-button-left"><div class="lyf-button-content"></div></div><div class="lyf-button-right"></div>';
	    $('body').append(html);
		var $buttonsleft=$('.lyf-button-left');
		 button.nowbuttonleft=$buttonsleft[$buttonsleft.length-1];
		 if(param.id.length >0)
		    $(button.nowbuttonleft).attr("id",param.id);
		 var $buttonsright=$('.lyf-button-right');
		 button.nowbuttonright=$buttonsright[$buttonsright.length-1];
		  var $buttonscontent=$('.lyf-button-content');
		 button.nowbuttoncontent=$buttonscontent[$buttonscontent.length-1];
		 $(button.nowbuttoncontent).html(param.content);
	};
	  var addEvents=function(param){
		   $(button.nowbuttonleft).click(function(ele){
			   	button.click();
		   });
		   
	 $(button.nowbuttonleft).hover(
	   function(){
		   $(this).css('cursor','pointer').css('background','url(../img/button-12-hover.png)').css('background-position','-30px -18px');
	       $(button.nowbuttonright).css('cursor','pointer').css('background','url(../img/button-12-hover.png)').css('background-position','-507px -18px');},
		   //$(button.nowbuttonright).addClass("lyf-button-right-hover");},
	   function(){
		     $(this).css('cursor','none').css('background','url(../img/button-12.png)').css('background-position','-25px -22px');
		  $(button.nowbuttonright).css('cursor','none').css('background','url(../img/button-12.png)').css('background-position','-501px -22px');});
	 $(button.nowbuttonright).hover(
	  function(){
		   $(this).css('cursor','pointer').css('background','url(../img/button-12-hover.png)').css('background-position','-507px -18px');;
	       $(button.nowbuttonleft).css('cursor','pointer').css('background','url(../img/button-12-hover.png)').css('background-position','-30px -18px');},
	   function(){
		   $(this).css('cursor','none').css('background','url(../img/button-12.png)').css('background-position','-501px -22px');
	      $(button.nowbuttonleft).css('cursor','none').css('background','url(../img/button-12.png)').css('background-position','-25px -22px');});
	   };

	  param=adjustparam(param);
	  button.param=param;
	  outputHtml(param);
	  addEvents(param);
};
lyfbutton.prototype.display = function(){
	$(this.nowbuttonleft).css('z-index','99').show();
	$(this.nowbuttonright).css('z-index','99').show();
};
lyfbutton.prototype.hide = function(){
	
	$(this.nowbutton).hide();
};
lyfbutton.prototype.close = function(){
	
	$(this.nowbutton).remove();
};
lyfbutton.prototype.click = function(){
	this.param.onclickevent();
};