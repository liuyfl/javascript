// JavaScript Document
$(function(){
	var length = $(".lyfdialog").length;
	if (length>0)
	{
		var num=0;	
		var obj,dlg,param;
		for(num;num<length;num++)
		{
		   obj = $(".lyfdialog")[0];
		   param = {
			width:$(obj).width(),
			height:$(obj).height(),
			title:$(obj).attr("title"),
			content:$(obj).text(),
			onAfterLocation:$(obj).attr("onafterlocation"),
			/*position:$(obj).css('position'),
			top:$(obj).css('top'),
			left:$(obj).css('left'),
			right:$(obj).css('right'),
			bottom:$(obj).css('bottom'),
			margin:$(obj).css('margin'),
			padding:$(obj).css('padding'),*/
			maskflag:false
		   }
		   $(obj).remove();
		  dlg =new lyfDialog(param);
		  dlg.display();
		}
		//var width = obj.width();
	}
	
	
});
 function lyfDialog(param){
	   var dialog=this;
	   var outputHTML=function(param){
		   var htm= '<div  class="lyf-dialog">';
	       htm += '<div class="lyf-highlight">';
	       htm += '<div class="lyf-btnclose"><div class="lyf-btnclose-highlight"><img src="关闭.png" width="12px" height="12px" /></div></div>';
	       htm += '<div class="lyf-title" >titletitle</div>';
	       htm += '<div class="lyf-innerborder-highlight"><div class="lyf-innerborder"></div></div>';
	       htm += '</div></div>';
		   if($('.lyf-mask').length<=0)htm += '<div class="lyf-mask"></div>';
	       $("body").append(htm);
		   var $dialogs=$('.lyf-dialog');
		   dialog.nowDialog=$dialogs[$dialogs.length-1];
		   //修改dialog样式
		   $(dialog.nowDialog).css('width',param.width);
		   $(dialog.nowDialog).css('height',param.height);
		   $(dialog.nowDialog.getElementsByClassName('lyf-highlight')).css('width',param.width-2).css('height',param.height-2);
		   $(dialog.nowDialog.getElementsByClassName('lyf-title')).css('width',param.width-44);
		   $(dialog.nowDialog.getElementsByClassName('lyf-innerborder-highlight')).css('width',param.width-16).css('height',param.height-35);
		   $(dialog.nowDialog.getElementsByClassName('lyf-innerborder')).css('width',param.width-20).css('height',param.height-39);
		   $(dialog.nowDialog.getElementsByClassName('lyf-title')).html(param.title);
		   $(dialog.nowDialog.getElementsByClassName('lyf-innerborder')).html(param.content);
	   };
	   var addEvents=function(param){
		   $(".lyf-btnclose").click(function(ele){
			   	if(!param.onBeforeClose())
					dialog.close();
				param.onAfterClose();
				
		   });
	   };
	   var adjustParam=function(param){
		   var defaultParam={
				width:800,
				height:400,
				title:'Dialog',
				content:'',
				/*position:'',
			    top:'',
		    	left:'',
		    	right:'',
			    bottom:'',
			    margin:'',
			    padding:'',*/
				maskflag:true,
				onBeforeClose:function(){},
				onAfterLocation:function(nowDialog){},
				onAfterClose:function(){}};
			if(typeof param.onAfterLocation !="function")param.onAfterLocation=function(nowDialog){};
			$.extend(defaultParam,param);
			if(defaultParam.width<=0)
			{
				defaultParam.width=400;
			}
			if(defaultParam.height<=0)
			{
				defaultParam.height=300;
			}
			return defaultParam;
	   }
	  param=adjustParam(param);
	  dialog.param=param;
	  outputHTML(param);
	  addEvents(param);

   };
   lyfDialog.prototype.display = function(){
	   if(this.param.maskflag)
	   {
	   	var bh =$("html").height();
	    var bw =$("html").width();
		$(".lyf-mask").css('position','absolute').css('top','60px').css('left','5px').css('height',bh).css('width',bw).css('display','block');
	   }
	   left1 =($("html").width()-$(this.nowDialog).width())/2;
	   top1 =($("html").height()-$(this.nowDialog).height())/2;
	   $(this.nowDialog).css('left',left1).css('top',top1);
	   
	  	this.param.onAfterLocation(this.nowDialog);
	   /*if(this.param.position!=null)
	      $(this.nowDialog).css('position',this.param.position);
	   if(this.param.top!=null)
	      $(this.nowDialog).css('top',this.param.top);
	   if(this.param.left!=null)
	      $(this.nowDialog).css('left',this.param.left);
	   if(this.param.right!=null)
	      $(this.nowDialog).css('right',this.param.right);
	   if(this.param.bottom!=null)
	      $(this.nowDialog).css('bottom',this.param.bottom);
	   if(this.param.magin!=null)
	      $(this.nowDialog).css('magin',this.param.magin);
	   if(this.param.padding!=null)
	      $(this.nowDialog).css('padding',this.param.padding);*/
		$(this.nowDialog).css('z-index','99').show();	
   };
   lyfDialog.prototype.hide = function(){
	   $('.lyf-mask').hide();
	   $(this.nowDialog).hide();
   };
   lyfDialog.prototype.close=function(){
	   $('.lyf-mask').hide();
	   $(this.nowDialog).remove();
   };
   