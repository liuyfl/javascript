// JavaScript Document
function clock(cl){
	this.clock = cl;
	
	this.clockinit(100);
	this.clockmove();
}
clock.prototype.clockinit = function(r){
	/*this.clock.fillStyle = '#dbdbdb';
		this.clock.beginPath();
		this.clock.arc(303,297,118,0,2*Math.PI);
		this.clock.fill();*/
		this.clock.fillStyle = '#89d6ec';
		this.clock.font = '14px Imapct';
		for(var i = 0; i<12;i++)
		{
			var x = 300 + Math.sin(i/12*2*Math.PI)*r;
			var y = 300 - Math.cos(i/12*2*Math.PI)*r;
			this.clock.fillText(i != 0 ? i : 12 , x  , y);
		}
}
clock.prototype.drawing = function(offset,length,width){
		this.clock.save();
		//this.clock.fillStyle = '#34add0';
		this.clock.strokeStyle = '#e50eff';
		this.clock.lineWidth = width;
		var x = 300 + Math.sin(offset*2*Math.PI)*length;
		var y = 300 - Math.cos(offset*2*Math.PI)*length;
		this.clock.beginPath();
		this.clock.moveTo(300,300);
		this.clock.lineTo(x,y);
		this.clock.stroke();
		this.clock.restore();
}
clock.prototype.clockmove = function(){
	var time = this;
	this.clocktime();
	window.setInterval(function(){time.clocktime();});
}
clock.prototype.clocktime = function(){
		this.clock.fillStyle = 'white';
		this.clock.beginPath();
		this.clock.arc(300,300,80,0,2*Math.PI,true);
		this.clock.fill();
		var date  = new Date();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		hours = hours>12?hours-12:hours;
		this.drawing(hours/12,50,4);
		this.drawing(minutes/60,60,2);
		this.drawing(seconds/60,80,1);
}

