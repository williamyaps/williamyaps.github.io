$(document).ready(function() {

	//CHECK IF BROWSER SUPPORTS CANVAS
	var test_canvas = document.createElement("canvas");
	var canvascheck =(test_canvas.getContext)? true : false

	var stylesheet;

    if(!canvascheck)
	{
		stylesheet = $('#stylesheet');
		stylesheet.attr('href', 'css/screenOld.css');
		$('#illustration').attr('src', 'images/illustrationOld.png');
		return;
	}

    if(navigator.userAgent.match(/Android/i) ||
		 navigator.userAgent.match(/webOS/i) ||
		 navigator.userAgent.match(/iPhone/i) ||
		 navigator.userAgent.match(/iPod/i))
	{
		window.location = 'mobile.html';
	}

	var canvas = $('#pathCanvas');
	var context = canvas[0].getContext('2d');

    var header = $('header');
    var logo = $('#logo');

    var screen1 = $('#screen1');
    var screen2 = $('#screen2');
    var screen3 = $('#screen3');
    var screen4 = $('#screen4');

    var arrow1 = $('#arrow1');
    var arrow2 = $('#arrow2');
    var arrow3 = $('#arrow3');
    var arrow4 = $('#arrow4');

    var text1 = screen1.children('h2');
    var text2 = $('.firstChild');
    var text3 = $('.secondChild');
    var text4 = $('.lastChild');
    var text5 = screen3.children('h2');
    var text6 = $('#contact').children('h2');

	var contact = $('#contact');
	var names = $('#contact').children('ul');

    var number1 = screen1.children('p');
    var number2 = screen2.children('p');
    var number3 = screen3.children('p');
    var number4 = screen4.children('p');

    var illustration = $('#illustration');
    var electric = $('#electric');
    var router = $('#router');
	var phone = $('#phone');
	var back = $('#back');

	var duration = 1000;
	var count = 1;
	var nameInterval;

    var screenW;
    var screenH;
    var smallSize;
    var largeSize;
	var activeScreen = 'screen1';

	var easterEgg = false;
	var codeArray = [38,38,40,40,37,39,37,39,66,65];
	var checkArray = [];
	var i = 0;

	//CHECK FOR IPAD
    var isiPad = navigator.userAgent.match(/iPad/i) != null;

    //DISABLE IPAD SCROLLING
    document.ontouchmove = function(e){
             e.preventDefault();
    }

	//DISABLE KEYBOARD SCROLLING
	var ar=new Array(33,34,35,36,37,38,39,40);
	$(document).keydown(function(e){
		 var key = e.which;
		  if($.inArray(key,ar))
		  {
			  e.preventDefault();
			  return false;
		  }
		  return true;
	});

	window.onorientationchange = function(){
		drawLayout();
	}

    drawLayout();
    $(window).resize(function()
    {
        if(!isiPad)
		{
            drawLayout();
		}
    });

    var x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7, x8, y8, x9, y9, x10, y10, x11, y11, x12, y12,
        x13, y13, x14, y14, x15, y15, x16,y16, x17, y17, x18, y18, x19, y19, x20, y20, x21, y21, x22, y22, x23, y23 = 0;

    var ux1, uy1, ux2, uy2, ux3, uy3, ux4, uy4, ux5, uy5, ux6, uy6, ux7, uy7, ux8, uy8, ux9, uy9, ux10, uy10, ux11, uy11, ux12, uy12,
        ux13, uy13, ux14, uy14, ux15, uy15, ux16,uy16, ux17, uy17, ux18, uy18, ux19, uy19, ux20, uy20 = 0;

    var ex1, ey1, ex2, ey2, ex3, ey3, ex4, ey4, ex5, ey5, ex6, ey6, ex7, ey7, ex8, ey8 = 0;

    function drawLayout()
    {
		resolution = $(window).width() / $(window).height();

        screenW = $(window).width();
        screenH = $(window).height();

		if(easterEgg)
		{
			screenH /= 2;
			screenW /= 2;
		}

        smallSize = Math.min(screenW, screenH);
        largeSize = Math.max(screenW, screenH);

        screen1.css({'height': screenH + 'px', 'width': screenW + 'px', 'left': '0', 'top': '0'});
        screen2.css({'height': screenH + 'px', 'width': screenW + 'px', 'left': screenW + 'px', 'top': '0'});
        screen3.css({'height': screenH + 'px', 'width': screenW + 'px', 'left': screenW + 'px', 'top': screenH + 'px'});
        screen4.css({'height': screenH + 'px', 'width': screenW + 'px', 'left': '0', 'top': screenH + 'px'});

        canvas.attr('height', screenH * 2);
        canvas.attr('width', screenW * 2);

        //VARIABLES FOR SIZE PATH
        var circleSize = largeSize / 15;

        //22X & Y POINTS FOR MAINPATH
        x1 = circleSize + screenW/20,   y1 = x1;
        x2 = x1 ,                       y2 = screenH/7*5;
        x3 = x1,						y3 = y2 + 50;
        x4 = x3 + 50,                   y4 = y3;
        x5 = screenW + screenW/12,      y5 = y4;
        x6 = x5,                        y6 = screenH / 6;
        x7 = x6,                        y7 = y6 - 50;
        x8 = x7+ 50,                    y8 = y7;
        x9 = screenW * 2 - screenW/9,   y9 = y8;
        x10 = x9 + 50,                  y10 = y9;
        x11 = x10,                      y11 = y10 + 50;
        x12 = x11,                      y12 = screenH + 150;
        x13 = screenW +screenW/3*2,     y13 = y12;
        x14 = x13-50,                   y14 = y13;
        x15 = x14,                      y15 = y14 + 50;
        x16 = x15,                      y16 = screenH * 2 - screenH/5;
        x17 = x16,                      y17 = y16 + 50;
        x18 = x16-50,					y18 = y17;
        x19 = screenW / 2 + 50,         y19 = y18;
        x20 = x19 - 50,                 y20 = y19;
        x21 = x20,                      y21 = y20-50;
        x22 = x21,                      y22 = screenH + screenH/5*3;
        x23 = screenW /12*11,           y23 = y18;

        //20 POINTS FOR UTP PATH
        ux1 = screenW + screenW/10*8,   uy1 = screenH/10*2;
        ux2 = x10 + 20,                 uy2 = uy1;
        ux3 = ux2 + 50,                 uy3 = uy2;
        ux4 = ux3,                      uy4 = uy3 + 50;
        ux5 = ux4,                      uy5 = uy4 + screenH / 3;
        ux6 = ux5,                      uy6 = uy5 + 50;
        ux7 = ux6 - 50,                 uy7 = uy6;
        ux8 = ux7 - screenW/6,          uy8 = uy7;
        ux9 = ux8 - 50,                 uy9 = uy8;
        ux10 = ux9,                     uy10 = uy9 + 50;
        ux11 = ux10,                    uy11 = uy10 + screenH / 2;
        ux12 = ux11,                    uy12 = uy11 + 50;
        ux13 = ux12 - 50,               uy13 = uy12;
        ux14 = screenW + screenW/10,    uy14 = uy13;
        ux15 = ux14 - 50,               uy15 = uy14;
        ux16 = ux15,                    uy16 = uy15 + 50;
        ux17 = ux16,                    uy17 = uy16 + screenH/6;
        ux18 = ux17,                    uy18 = uy17 + 50;
        ux19 = ux18 - 50,               uy19 = uy18;
        ux20 = screenW/20+smallSize/4,	uy20 = uy19;

        //8 POINTS FOR ELECTRIC PATH
        ex1 = screenW/10*9,             ey1 = screenH/10;
        ex2 = ex1,                      ey2 = y4 + screenH/13;
        ex3 = ex2,                      ey3 = ey2 + 50;
        ex4 = ex2-50,                   ey4 = ey3;
        ex5 = screenW/20+smallSize/4+50,ey5 = ey4;
        ex6 = ex5 - 50,					ey6 = ey5;
        ex7 = ex6,                      ey7 = ey5+50;
        ex8 = ex7,                      ey8 = uy20;

		var mainStroke = 40;
		context.clearRect (0 , 0 , 2 * screenW , 2 * screenH);

		if(largeSize < 800 || smallSize < 600)
		{
			mainStroke = smallSize / 15;
		}

		context.beginPath();
		context.moveTo(ex1, ey1);
		context.lineTo(ex2, ey2);
		context.bezierCurveTo(ex2, ey2, ex3, ey3, ex4, ey4);
		context.lineTo(ex5, ey5);
		context.bezierCurveTo(ex5, ey5, ex6, ey6, ex7, ey7);
		context.lineTo(ex8, ey8);
		context.lineWidth = 4;
		context.strokeStyle = '#cf4329';
		context.stroke();

		context.beginPath();
		context.moveTo(ux1, uy1);
		context.lineTo(ux2, uy2);
		context.bezierCurveTo(ux2, uy2, ux3, uy3, ux4, uy4);
		context.lineTo(ux5, uy5);
		context.bezierCurveTo(ux5, uy5, ux6, uy6, ux7, uy7);
		context.lineTo(ux8, uy8);
		context.bezierCurveTo(ux8, uy8, ux9, uy9, ux10, uy10);
		context.lineTo(ux11, uy11);
		context.bezierCurveTo(ux11, uy11, ux12, uy12, ux13, uy13);
		context.lineTo(ux14, uy14);
		context.bezierCurveTo(ux14, uy14, ux15, uy15, ux16, uy16);
		context.lineTo(ux17, uy17);
		context.bezierCurveTo(ux17, uy17, ux18, uy18, ux19, uy19);
		context.lineTo(ux20, uy20);
		context.lineWidth = 4;
		context.strokeStyle = '#cf4329';
		context.stroke();

		context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.bezierCurveTo(x2, y2, x3, y3, x4, y4);
		context.lineTo(x5, y5);
		context.lineTo(x6, y6);
		context.bezierCurveTo(x6, y6, x7, y7, x8, y8);
		context.lineTo(x9, y9);
		context.bezierCurveTo(x9, y9, x10, y10, x11, y11);
		context.lineTo(x12, y12);
		context.lineTo(x13, y13);
		context.bezierCurveTo(x13, y13, x14, y14, x15, y15);
		context.lineTo(x16, y16);
		context.bezierCurveTo(x16, y16, x17, y17, x18, y18);
		context.lineTo(x19, y19);
		context.bezierCurveTo(x19, y19, x20, y20, x21, y21);
		context.lineTo(x22,y22);
		context.lineWidth = mainStroke;
		context.strokeStyle = '#a90000';
		context.stroke();

		context.fillStyle = '#a90000';
		context.beginPath();
		context.arc(x1,y1,circleSize,0,Math.PI*2,true);
		context.closePath();
		context.fill();

		context.beginPath();
		context.arc(x5,y5,circleSize,0,Math.PI*2,true);
		context.closePath();
		context.fill();

		context.beginPath();
		context.arc(x12,y12,circleSize,0,Math.PI*2,true);
		context.closePath();
		context.fill();

		context.beginPath();
		context.arc(x23,y23,circleSize,0,Math.PI*2,true);
		context.closePath();
		context.fill();

        arrow1.css({'top': y5 - mainStroke/2, 'height': mainStroke, 'width': mainStroke * 4});
        arrow2.css({'left': x11 - mainStroke/2 - screenW, 'width': mainStroke, 'height': mainStroke * 4});
        arrow3.css({'top': y18 - mainStroke/2 - screenH, 'height': mainStroke, 'width': mainStroke * 4});
        arrow4.css({'top': y22 - mainStroke - screenH, 'left': x22 - mainStroke/2, 'width': mainStroke, 'height': mainStroke * 4});

		arrow1.children('.arrowImage').css({'height': mainStroke, 'width': mainStroke * 1.5});
		arrow1.children('.arrowText').css({'height': mainStroke, 'width': mainStroke * 2.25, 'left': -5});
		arrow2.children('.arrowImage').css({'width': mainStroke, 'height': mainStroke * 1.5});
		arrow2.children('.arrowText').css({'width': mainStroke, 'height': mainStroke * 2.25, 'top': -5});
		arrow3.children('.arrowImage').css({'height': mainStroke, 'width': mainStroke * 1.5});
		arrow3.children('.arrowText').css({'height': mainStroke, 'width': mainStroke * 2.25});
		arrow4.children('.arrowImage').css({'width': mainStroke, 'height': mainStroke * 1.5});

        text1.css({'bottom': screenH - y4 - mainStroke/2, 'left': x2 + 10, 'font-size': screenW/7});
        text2.css({'top':screenH/3, 'left': screenW/10 * 3 + screenW/50, 'font-size': screenW/20 * 1.35, 'width': screenW});
        text3.css({'top': screenH/3 + screenW/18, 'left': screenW/10*3 + screenW/50, 'font-size': screenW/25, 'width': screenW});
        text4.css({'top': screenH/3 + 2*screenW/20, 'left': screenW/10*3 + screenW/50, 'font-size': screenW/20 * 2.77, 'width': screenW});
        text5.css({'top':screenH/5*2, 'left': screenW/7, 'font-size': screenW/13});

        contact.css({'top':screenH/5*2, 'left': smallSize/2 + (screenW - smallSize/2)/10});
        text6.css({'font-size': screenW/13, 'left': 0});
		names.css({'font-size': screenW/13, 'left': screenW/4 - screenW/40});

        number1.css({'top':y1 - circleSize/3*2, 'left': x1 - screenW / 100, 'font-size': screenW/20});
        number2.css({'top':y5 - circleSize/3*2, 'left': x5 - screenW - screenW / 100, 'font-size': screenW/20});
        number3.css({'top':y12 - screenH - circleSize/3*2, 'left': x12 - screenW - screenW / 100, 'font-size': screenW/20});
        number4.css({'top':y23 - screenH - circleSize/3*2, 'left': x23 - screenW / 100, 'font-size': screenW/20});

        illustration.css({'top':screenH/3, 'left': screenW/20 - 40, 'height': smallSize/2, 'width': smallSize/2});
        electric.css({'width': screenW/25, 'height': screenW/25});
        electric.css({'top':ey1 - electric.width()/2, 'left': ex1 - electric.width()/2});
        router.css({'height': screenW/16, 'width': screenW/16});
        router.css({'top':uy1 - router.height()/10*8, 'left': ux1 - screenW - router.height()/2});
		phone.css({'width': screenH/7, 'height': screenH/7, 'margin-top': screenH/60});
		back.css({'top':screenH/3 + smallSize/4 + 40, 'left': screenW/20 + smallSize/4 - 20, 'height': smallSize/5, 'width': smallSize/5});

        header.css({'top': screenH/20, 'width': screenW/8, 'height': (screenW/8)/(2.9)});
        logo.css({'top': screenH/20, 'width': screenW/8, 'height': (screenW/8)/(2.9)});

		if(!isiPad)
		{
			switch(activeScreen)
			{
				case 'screen1':
					$('html,body').scrollTop(0);
					$('html,body').scrollLeft(0);
					break;
				case 'screen2':
					$('html,body').scrollTop(0);
					$('html,body').scrollLeft(screenW);
					break;
				case 'screen3':
					$('html,body').scrollTop(screenH);
					$('html,body').scrollLeft(screenW);
					break;
				case 'screen4':
					$('html,body').scrollTop(screenH);
					$('html,body').scrollLeft(0);
					break;
			}
		}
		else if(isiPad)
		{
			var dur = 0;
			switch(activeScreen)
			{
				case 'screen1':
					screen1.animate({left: 0, top: 0}, dur);
					screen2.animate({left: screenW, top: 0}, dur);
					screen3.animate({left: screenW, top: screenH}, dur);
					screen4.animate({left: 0, top: screenH}, dur);
					canvas.animate({left: 0, top: 0}, dur);
					break;
				case 'screen2':
					screen1.animate({left: -screenW, top: 0}, dur);
					screen2.animate({left: 0, top: 0}, dur);
					screen3.animate({left: 0, top: screenH}, dur);
					screen4.animate({left: -screenW, top: screenH}, dur);
					canvas.animate({left: -screenW, top: 0}, dur);
					break;
				case 'screen3':
					screen1.animate({left: -screenW, top: -screenH}, dur);
					screen2.animate({left: 0, top: -screenH}, dur);
					screen3.animate({left: 0, top: 0}, dur);
					screen4.animate({left: -screenW, top: 0}, dur);
					canvas.animate({left: -screenW, top: -screenH}, dur);
					break;
				case 'screen4':
					screen1.animate({left: 0, top: -screenH}, dur);
					screen2.animate({left: screenW, top: -screenH}, dur);
					screen3.animate({left: screenW, top: 0}, dur);
					screen4.animate({left: 0, top: 0}, dur);
					canvas.animate({left: 0, top: -screenH}, dur);
					break;
			}
			$('html,body').scrollTop(0);
			$('html,body').scrollLeft(0);
		}
    }

    //CHANGE SCREENS
    arrow1.click(function(){
        activeScreen = 'screen2';

		if(!isiPad)
			$('html, body').animate({scrollLeft: screenW}, duration);
		else
		{
			ipadLeft();
		}
    })

    arrow2.click(function(){
        activeScreen = 'screen3';

		if(!isiPad)
        	$('html, body').animate({scrollTop: screenH}, duration);
		else
		{
			ipadDown();
		}
    })

    arrow3.click(function(){
        activeScreen = 'screen4';

		if(!isiPad)
			$('html, body').animate({scrollLeft: 0}, duration);
		else
		{
			ipadRight();
		}
    })

    arrow4.click(function(){
        activeScreen = 'screen1';

		if(!isiPad)
			$('html, body').animate({scrollTop: 0}, duration);
		else
		{
			ipadUp();
		}
    })

	$(document).keydown(function(e){

		if(e.which == codeArray[i])
		{
			checkArray[i] = e.which;
			i++;

			if(checkArray.toString() == codeArray.toString())
			{
				checkArray = [];
				i = 0;

				if(!easterEgg)
					easterEgg = true;
				else if(easterEgg)
					 easterEgg = false;

				drawLayout();
			}
		}
		else
		{
			checkArray = [];
			i = 0;
		}
	});

	contact.hover(function(){
		showNames();
		nameInterval = setInterval(function(){showNames();},1500)},
		function(){noNames();});


	names.children().first().css('opacity', 1);

	function showNames()
	{
		var namesArray = [];
		namesArray = names.children();

		namesArray.each(function(i){
			if(i == count)
				$(this).css('opacity', 1);
			else
				$(this).css('opacity', 0);
		});

		if(count < namesArray.length-1)
			count++;
		else
			count = 0;
	}

	function noNames()
	{
		names.children().css('opacity', 0);
		names.children().first().css('opacity', 1);
		clearInterval(nameInterval);
	}

	//ADD SWIPE FOR IPAD
    $('html, body').swipe({swipe:swipe, threshold:0});
    $('html, body').swipe({swipe:swipe, threshold:0, fingers: 2});


	function swipe(event, direction)
	{
		if(activeScreen == 'screen1' && direction == 'left')
		{
			activeScreen = 'screen2';
			ipadLeft();
		}
		if(activeScreen == 'screen2' && direction == 'up')
		{
			activeScreen = 'screen3';
			ipadDown();
		}
		if(activeScreen == 'screen3' && direction == 'right')
		{
			activeScreen = 'screen4';
			ipadRight();
		}
		if(activeScreen == 'screen4' && direction == 'down')
		{
			activeScreen = 'screen1';
			ipadUp();
		}

	}

	function ipadLeft()
	{
		screen1.animate({left: -screenW, top: 0}, duration);
		screen2.animate({left: 0, top: 0}, duration);
		screen3.animate({left: 0, top: screenH}, duration);
		screen4.animate({left: -screenW, top: screenH}, duration);
		canvas.animate({left: -screenW, top: 0}, duration);
	}

	function ipadDown()
	{
		screen1.animate({left: -screenW, top: -screenH}, duration);
		screen2.animate({left: 0, top: -screenH}, duration);
		screen3.animate({left: 0, top: 0}, duration);
		screen4.animate({left: -screenW, top: 0}, duration);
		canvas.animate({left: -screenW, top: -screenH}, duration);
	}

	function ipadRight()
	{
		screen1.animate({left: 0, top: -screenH}, duration);
		screen2.animate({left: screenW, top: -screenH}, duration);
		screen3.animate({left: screenW, top: 0}, duration);
		screen4.animate({left: 0, top: 0}, duration);
		canvas.animate({left: 0, top: -screenH}, duration);
	}

	function ipadUp()
	{
		screen1.animate({left: 0, top: 0}, duration);
		screen2.animate({left: screenW, top: 0}, duration);
		screen3.animate({left: screenW, top: screenH}, duration);
		screen4.animate({left: 0, top: screenH}, duration);
		canvas.animate({left: 0, top: 0}, duration);
	}
});