$(document).ready(function() {

	var screen1 = $('#screen1');
	var screen2 = $('#screen2');
	var screen3 = $('#screen3');
	var screen4 = $('#screen4');

	var arrow1 = $('#arrow1');
	var arrow2 = $('#arrow2');
	var arrow3 = $('#arrow3');
	var arrow4 = $('#arrow4');

	var screenW;
	var screenH;
	var activeScreen = 'screen1';

	screenW = $(window).width();
	screenH = $(window).height();

    //DISABLE IPAD SCROLLING
	document.ontouchmove = function(e){
		e.preventDefault();
	}

	drawLayout();

	window.onorientationchange = function(){
		if(navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/iPod/i))
			drawLayout();
	}

	if(!navigator.userAgent.match(/iPhone/i) &&
		 !navigator.userAgent.match(/iPod/i))
	 {
		$(window).resize(function()
		{
			drawLayout();
		});
	 }


	function drawLayout()
	{
		screenW = $(window).width();
		screenH = $(window).height();

		screen1.css({'height': screenH + 'px', 'width': screenW + 'px', 'top': '0', 'top': '0'});
		screen2.css({'height': screenH + 'px', 'width': screenW + 'px', 'left': screenW + 'px', 'top': '0'});
		screen3.css({'height': screenH + 'px', 'width': screenW + 'px', 'left': screenW + 'px', 'top': screenH + 'px'});
		screen4.css({'height': screenH + 'px', 'width': screenW + 'px', 'left': '0', 'top': screenH + 'px'});

		arrow1.css({'height': screenH/2 + 'px', 'width': screenW/7 + 'px', 'right': '0', 'bottom': 0});
		arrow2.css({'height': screenW/7 + 'px', 'width': screenW/2 + 'px', 'right': 0, 'bottom': 0});
		arrow3.css({'height': screenH + 'px', 'width': screenW/7 + 'px', 'left': 0, 'top': 0});
		arrow4.css({'height': screenH + 'px', 'width': screenW + 'px', 'left': '0', 'top': 0 + 'px'});

		var dur = 0;
		switch(activeScreen)
		{
			case 'screen1':
				screen1.animate({left: 0, top: 0}, dur);
				screen2.animate({left: screenW, top: 0}, dur);
				screen3.animate({left: screenW, top: screenH}, dur);
				screen4.animate({left: 0, top: screenH}, dur);
				break;
			case 'screen2':
				screen1.animate({left: -screenW, top: 0}, dur);
				screen2.animate({left: 0, top: 0}, dur);
				screen3.animate({left: 0, top: screenH}, dur);
				screen4.animate({left: -screenW, top: screenH}, dur);
				break;
			case 'screen3':
				screen1.animate({left: -screenW, top: -screenH}, dur);
				screen2.animate({left: 0, top: -screenH}, dur);
				screen3.animate({left: 0, top: 0}, dur);
				screen4.animate({left: -screenW, top: 0}, dur);
				break;
			case 'screen4':
				screen1.animate({left: 0, top: -screenH}, dur);
				screen2.animate({left: screenW, top: -screenH}, dur);
				screen3.animate({left: screenW, top: 0}, dur);
				screen4.animate({left: 0, top: 0}, dur);
				break;
		}
		$('html,body').scrollTop(0);
		$('html,body').scrollLeft(0);
	}

	var duration = 500;


	//ADD SWIPE FOR IPAD
    $('html, body').swipe({swipe:swipe, threshold:0});
    $('html, body').swipe({swipe:swipe, threshold:0, fingers: 2});


	function swipe(event, direction)
	{
		if(activeScreen == 'screen1' && direction == 'left')
		{
			activeScreen = 'screen2';
			left();
		}
		if(activeScreen == 'screen2' && direction == 'up')
		{
			activeScreen = 'screen3';
			down();
		}
		if(activeScreen == 'screen3' && direction == 'right')
		{
			activeScreen = 'screen4';
			right();
		}
		if(activeScreen == 'screen4' && direction == 'down')
		{
			activeScreen = 'screen1';
			up();
		}

	}

	arrow1.click(function(){
		left();
	})

	arrow2.click(function(){
		down();
	})

	arrow3.click(function(){
		right();
	})

	arrow4.click(function(){
		window.location = 'https://williamyaps.github.io/index3.html'
	})

	function left()
	{
		activeScreen = 'screen2';
		screen1.animate({left: -screenW, top: 0}, duration);
		screen2.animate({left: 0, top: 0}, duration);
		screen3.animate({left: 0, top: screenH}, duration);
		screen4.animate({left: -screenW, top: screenH}, duration);
	}

	function down()
	{
		activeScreen = 'screen3';
		screen1.animate({left: -screenW, top: -screenH}, duration);
		screen2.animate({left: 0, top: -screenH}, duration);
		screen3.animate({left: 0, top: 0}, duration);
		screen4.animate({left: -screenW, top: 0}, duration);
	}

	function right()
	{
		activeScreen = 'screen4';
		screen1.animate({left: 0, top: -screenH}, duration);
		screen2.animate({left: screenW, top: -screenH}, duration);
		screen3.animate({left: screenW, top: 0}, duration);
		screen4.animate({left: 0, top: 0}, duration);
	}

	function up()
	{
		activeScreen = 'screen1';
		screen1.animate({left: 0, top: 0}, duration);
		screen2.animate({left: screenW, top: 0}, duration);
		screen3.animate({left: screenW, top: screenH}, duration);
		screen4.animate({left: 0, top: screenH}, duration);
	}
});