// JavaScript Document
function Scrollbar(param)
{
	var scrollbar=this;
	var adjustparam = function(param){
		var defaultParam={
		type:'all'
		};
	$.extend(defaultParam,param);
	return defaultParam;
	};
	var outputHtml = function(param){
		var html = '<div id="left"></div>';
		html +='<div id="scroll"><div id="scrollhandle"></div></div>';
		html +='<div id="right"></div>';
		
		var htm = '<div id="top"></div>';
		htm += '<div id="scroll_1"><div id="scrollhandle_1"></div></div>';
		htm +='<div id="bottom"></div>';
		
		//添加横滚动条
		function addHorizontal(){
			$("#"+param.visualdiv).after(html);
			$('#left').addClass('left');
			$('#right').addClass('right');
			$('#scroll').addClass('scroll');
			$('#scrollhandle').addClass('scrollhandle');
		    $('#scroll').css('width',$("#"+param.visualdiv).width()-40+'px');
		    var bite=$("#"+param.visualdiv).width()*$("#"+param.visualdiv).width()/$("#"+param.contentdiv).width();
		    $('#scrollhandle').css('width',bite+'px');
		    $('#left').css('top',$("#"+param.visualdiv).height()+'px');
		    $('#scroll').css('top',$("#"+param.visualdiv).height()-15+'px').css('left','20px');;
		    $('#right').css('top',$("#"+param.visualdiv).height()-30+'px').css('left',$("#"+param.visualdiv).width()-20);
		};
		//添加竖滚动条
		function addvertical(){
			$("#"+param.visualdiv).after(htm);
				$('#top').addClass('left-turn');
			$('#bottom').addClass('right-turn');
			$('#scroll_1').addClass('scroll-turn');
			$('#scrollhandle_1').addClass('scrollhandle-turn');
				$('#scroll_1').css('height',$("#"+param.visualdiv).height()-40+'px').css('top','20px').css('left',$("#"+param.visualdiv).width()+'px');
		    var bite=$("#"+param.visualdiv).height()*$("#"+param.visualdiv).height()/$("#"+param.contentdiv).height();
		    $('#scrollhandle_1').css('height',bite+'px');
		    $('#top').css('left',$("#"+param.visualdiv).width()+'px').css('top','20px');
		    $('#bottom').css('left',$("#"+param.visualdiv).width()+'px');
		};
		//选择滚动轮方向
		if(param.type=='horizontal')
		{
			addHorizontal();
		}
		else
		{
			if(param.type=='vertical')
			{
				addvertical();
			}
			else
			{
					addHorizontal();
					addvertical();
					//调整横滚动条位置
					$('#left').css('top','0px');
					$('#scroll').css('width',$("#"+param.visualdiv).width()-40+'px').css('top','-15px').css('left','20px');;
		            $('#right').css('top','-30px').css('left',$("#"+param.visualdiv).width()-20);
					$('#right').after('<div id="square"></div>');
					$('#square').css('top','-45px').css('left',$("#"+param.visualdiv).width()+'px');
			}
			
		}

	};
	var addEvents = function(param){
		//滚动距离参数
		var arg={
			vmax:$('#scroll_1').height()-$('#scrollhandle_1').height(),
			vmin:0,
			vb:$("#"+param.contentdiv).height()-$("#"+param.visualdiv).height(),
			va:$('#scroll_1').height()-$('#scrollhandle_1').height(),
			vc:($("#"+param.contentdiv).height()-$("#"+param.visualdiv).height())/($('#scroll_1').height()-$('#scrollhandle_1').height()),
			vlen:($("#"+param.contentdiv).height()-$("#"+param.visualdiv).height())*10/($("#"+param.visualdiv).height()-$('#scrollhandle_1').height()),
			hmax:$('#scroll').width()-$('#scrollhandle').width(),
			hmin:0,
			hb:$("#"+param.contentdiv).width()-$("#"+param.visualdiv).width(),
			ha:$('#scroll').width()-$('#scrollhandle').width(),
			hc:($("#"+param.contentdiv).width()-$("#"+param.visualdiv).width())/($('#scroll').width()-$('#scrollhandle').width()),
			hlen:($("#"+param.contentdiv).width()-$("#"+param.visualdiv).width())*10/($("#"+param.visualdiv).width()-$('#scrollhandle').width())
		};
			//↓事件
			function bottomclick(){
			if($('#scrollhandle_1').position().top+arg.vlen>=arg.vmax)
			{
				$('#scrollhandle_1').css('top',arg.vmax+'px');
			}
			else
			{
				$('#scrollhandle_1').css('top',$('#scrollhandle_1').position().top+arg.vlen+'px');
			}
			var l=arg.vb*$('#scrollhandle_1').position().top/arg.va;
			if(l>=arg.vb)
			{
				$("#"+param.contentdiv).css('top',-arg.vb+'px');
			}
			else
			{
				$("#"+param.contentdiv).css('top',-l+'px');
			}
		};
		//↑事件
		function topclick(){
			if($('#scrollhandle_1').position().top-arg.vlen<=arg.vmin)
			{
				$('#scrollhandle_1').css('top',arg.vmin+'px');
			}
			else
			{
				$('#scrollhandle_1').css('top',$('#scrollhandle_1').position().top-arg.vlen+'px');
			}
			var l=arg.vb*$('#scrollhandle_1').position().top/arg.va;
			if(l<=0)
			{
				$("#"+param.contentdiv).css('top','0px');
			}
			else
			{
				$("#"+param.contentdiv).css('top',-l+'px');
			}
		};
		//竖滚动条事件
		$('#bottom').click(function(){
				bottomclick();
			});
		$('#top').click(function(){
			topclick();
			});
		$('#scrollhandle_1').mousedown(function(ev){
			var dis;
			var oEvent = ev||event;
			dis = oEvent.clientY - $('#scrollhandle_1').position().top;
			document.onmousemove =function(ev){
				var oEvent = ev ||event;
				var l = oEvent.clientY- dis;
				if(l<0)
				{
					l=0;
				}
				else
				{
					if(l>$('#scroll_1').height()-$('#scrollhandle_1').height())
					{
						l=$('#scroll_1').height()-$('#scrollhandle_1').height();
					}
				}
				$('#scrollhandle_1').css('top',l+'px');
				var scale = l /($('#scroll_1').height()-$('#scrollhandle_1').height());
				$("#"+param.contentdiv).css('top',-scale*($("#"+param.contentdiv).height()-$("#"+param.visualdiv).height())+'px');
			};
			$(document).mouseup(function(){
			     document.onmouseup = null;
				document.onmousemove = null;
			});
			return false;
		});
		//→事件
			function rightclick(){
			if($('#scrollhandle').position().left+arg.hlen>=arg.hmax)
			{
				$('#scrollhandle').css('left',arg.hmax+'px');
			}
			else
			{
				$('#scrollhandle').css('left',$('#scrollhandle').position().left+arg.hlen+'px');
			}
			var l=arg.hb*$('#scrollhandle').position().left/arg.ha;
			if(l>=arg.hb)
			{
				$("#"+param.contentdiv).css('left',-arg.hb+'px');
			}
			else
			{
				$("#"+param.contentdiv).css('left',-l+'px');
			}
		};
		//←事件
		function leftclick(){
			if($('#scrollhandle').position().left-arg.hlen<=arg.hmin)
			{
				$('#scrollhandle').css('left',arg.hmin+'px');
			}
			else
			{
				$('#scrollhandle').css('left',$('#scrollhandle').position().left-arg.hlen+'px');
			}
			var l=arg.hb*$('#scrollhandle').position().left/arg.ha;
			if(l<=0)
			{
				$("#"+param.contentdiv).css('left','0px');
			}
			else
			{
				$("#"+param.contentdiv).css('left',-l+'px');
			}
		};
		
		$('#right').click(function(){
		rightclick();
			});
		$('#left').click(function(){
			leftclick();});
		$('#scrollhandle').mousedown(function(ev){
			var dis;
			var oEvent = ev||event;
			dis = oEvent.clientX - $('#scrollhandle').position().left;
			document.onmousemove = function(ev){
				var oEvent = ev ||event;
				var l = oEvent.clientX- dis;
				if(l<0)
				{
					l=0;
				}
				else
				{
					if(l>$('#scroll').width()-$('#scrollhandle').width())
					{
						l=$('#scroll').width()-$('#scrollhandle').width();
					}
				}
				$('#scrollhandle').css('left',l+'px');
				var scale = l /($('#scroll').width()-$('#scrollhandle').width());
				$("#"+param.contentdiv).css('left',-scale*($("#"+param.contentdiv).width()-$("#"+param.visualdiv).width())+'px');
			};
			$(document).mouseup(function(){
				document.onmouseup = null;
				document.onmousemove = null;
			});
			return false;
		});
	function keydown(e){
		var e = e||event;
		if(e.keyCode==38)
		 topclick();
		if(e.keyCode==40)
		bottomclick();
		 if(e.keyCode==37)
		  leftclick();
		 if(e.keyCode==39)
		  rightclick();
	};
	//document.onkeydown=keydown;
	$('#scrollhandle').mouseover(function(){
		document.onkeydown=keydown;
		});
	$('#scrollhandle').mouseout(function(){
		document.onkeydown=null;
		});
	$('#scrollhandle_1').mouseover(function(){
		document.onkeydown=keydown;
		});
	$('#scrollhandle_1').mouseout(function(){
		document.onkeydown=null;
		});
		$("#"+param.visualdiv).mouseover(function(){
			document.onmousewheel = function(e){
		var delta=0;
		var e = e||window.event;
		if(e.wheelDelta)
		{
			delta=e.wheelDelta;
		}
		else if(e.detail){
			delta=-e.detail;
		}
		if(delta<0)
		  bottomclick();
		   else
		   topclick();
	};
		});
		$("#"+param.visualdiv).mouseout(function(){
			document.onmousewheel = null;
		});
	
	
 };
    param = adjustparam(param);
    scrollbar.param=param;
	outputHtml(param);	
	addEvents(param);
};