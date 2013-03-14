(function() {
	'use strict';
	
	var ctx = function(selector) {
		this.canvas = $(selector).get(0);
		this.context = this.canvas.getContext('2d');
		this.context.strokeWidth = 0;
		return this;
	}
	
	ctx.prototype.resize = function(w,h) {
		this.canvas.width = w;
		this.canvas.height= h;
	}

	ctx.prototype.setColor = function(color) {
		this.color = color;
		this.context.fillStyle=this.color;		
	}

	ctx.prototype.fillRect = function(x,y,w,h) {
		this.context.moveTo(x,y);
		this.context.fillRect(x,y,w,h);		
	}


	window.App = {
		cellSize: 100,
		cellCount: 0,
		drawCell: function() {
			
			this.cellCount++;
			if (this.cellCount % 100==0) {
				this.cellSize = this.cellSize/2;
			}
			if (this.cellSize < 5) {
				App.cellSize = $('#header').innerWidth() / 10;				
			}
			this.canvas.setColor(App.pickColor());
			var x = Math.floor(Math.random() * (this.canvas.canvas.width / this.cellSize)) * this.cellSize;
			var y = Math.floor(Math.random() * (this.canvas.canvas.height / this.cellSize)) * this.cellSize;
			this.canvas.fillRect(x,y,this.cellSize,this.cellSize);

			
		},
		rgba: function(r,g,b,a) {
			return 'rgba('+r+','+g+','+b+','+a+')';
		},
		pickColor: function() {
			
//			var colors = ['rgba(255,0,0,1)','rgba(0,0,0,1)','rgba(255,255,255,1)'];
//			return colors[Math.floor(Math.random()*colors.length)];
			return this.rgba(Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255),1);
			
		},
		init: function() {
			this.canvas = new ctx('#canvas');
			
			$(window).on('resize',function() {
				App.cellSize = Math.floor($('#header').innerWidth() / 10);
				$('#header').css('padding-top','20%');
				var padding = parseInt($('#header').css('padding-top'));
				console.log('Current padding',padding);
				var height = $('#header').innerHeight();
				console.log('Current Height',height);
				var diff = (height % App.cellSize);
				console.log('stretch is',diff);

				$('#header').css('padding-top',(padding-diff)+"px");
				App.canvas.resize(
					$('#header').innerWidth(),
					$('#header').innerHeight()
				);
			});	
			
			$(window).trigger('resize');
			
			setInterval(function() { App.drawCell(); }, 100);
							
			
			
		}		
	}


	$(function() {

		App.init();
	
	});	
		
		
})();