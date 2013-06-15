/**
 * 工具包
 */
var Utils = {
	/**
	 * 数字转中文
	 *
	 * @number {Integer} 形如123的数字
	 * @return {String} 返回转换成的形如 一百二十三 的字符串
	 */
	numberToChinese : function(number) {
		/*
		 * 单位
		 */
		var units = '个十百千万@#%亿^&~';
		/*
		 * 字符
		 */
		var chars = '零一二三四五六日八九';
		var a = (number + '').split(''), s = [];
		if (a.length > 12) {
			throw new Error('too big');
		} else {
			for ( var i = 0, j = a.length - 1; i <= j; i++) {
				if (j == 1 || j == 5 || j == 9) {// 两位数 处理特殊的 1*
					if (i == 0) {
						if (a[i] != '1')
							s.push(chars.charAt(a[i]));
					} else {
						s.push(chars.charAt(a[i]));
					}
				} else {
					s.push(chars.charAt(a[i]));
				}
				if (i != j) {
					s.push(units.charAt(j - i));
				}
			}
		}
		// return s;
		return s.join('').replace(/零([十百千万亿@#%^&~])/g, function(m, d, b) {// 优先处理 零百 零千 等
			b = units.indexOf(d);
			if (b != -1) {
				if (d == '亿')
					return d;
				if (d == '万')
					return d;
				if (a[j - b] == '0')
					return '零'
			}
			return '';
		}).replace(/零+/g, '零').replace(/零([万亿])/g, function(m, b) {// 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
			return b;
		}).replace(/亿[万千百]/g, '亿').replace(/[零]$/, '').replace(/[@#%^&~]/g, function(m) {
			return {
				'@' : '十',
				'#' : '百',
				'%' : '千',
				'^' : '十',
				'&' : '百',
				'~' : '千'
			}[m];
		}).replace(/([亿万])([一-九])/g, function(m, d, b, c) {
			c = units.indexOf(d);
			if (c != -1) {
				if (a[j - c] == '0')
					return d + '零' + b
			}
			return m;
		});
	}
};

window.onload=function (){
	//alert(window.screen.width)
	//alert(document.body.clientWidth)
	var mydate=new Date();
	var month=mydate.getMonth()+1;
	var today=mydate.getDate();
	var yesterday=mydate.getDate()-1;
    if(yesterday=='0'){
        var m=mydate.getMonth();
        if(m=='1' || m=='3' || m=='5' || m=='7' || m=='8' || m=='10' || m=='12' ){
            yesterday='31';
        } else {
            yesterday='30';
        }
    }
	var tomorrow=mydate.getDate()+1;
    if(tomorrow=='31'){
        if(month=='1' || month=='3' || month=='5' || month=='7' || month=='8' || month=='10' || month=='12' ){
            tomorrow='31';
        } else {
            tomorrow='1';
        }
    }
    var m_byest=yesterday-1;
    if(m_byest=="0"){
        var m=mydate.getMonth();
        if(m=='1' || m=='3' || m=='5' || m=='7' || m=='8' || m=='10' || m=='12' ){
            m_byest='31';
        } else {
            m_byest='30';
        }
    }
    var m_atomo=tomorrow+1;
    if(m_atomo=="31"){
        var m=mydate.getMonth();
        if(m=='1' || m=='3' || m=='5' || m=='7' || m=='8' || m=='10' || m=='12' ){
            m_aotmo='31';
        } else {
            m_aotmo='1';
        }
    } else if(atomo=="32"){
        m_tomo="1";
    }
	var day=mydate.getDay();
	var yest=mydate.getDay()-1;
    if(yest=="0"){
        yest="7";
    }
	var tomo=mydate.getDay()+1;
    if(tomo=="8"){
        tomo="1";
    }
	var byest=mydate.getDay()-2;
    if(byest=="-1"){
        byest="6";
    }
	var atomo=mydate.getDay()+2;
    if(atomo=="8"){
        atomo=="1";
    } else if(atomo=="9"){
        atomo="2";
    }
    
	//document.getElementById('month').innerHTML=month+"月";
	var width=document.body.clientWidth;
	var canvas=document.getElementById('day');
	canvas.width=width;
	var cxt=canvas.getContext('2d');
	if(width<500){
		var firstPoint=width*1/7;
		var lastPoint=width*6/7;
		var center=width*1/2;
		cxt.fillStyle="#54FF9F";
		cxt.beginPath();
		cxt.globalAlpha=0.6;
		cxt.arc(firstPoint,103,46,0,Math.PI*2,true);
		cxt.closePath();
		cxt.fill();
		cxt.fillStyle="#6495ED";
		cxt.beginPath();
		cxt.arc(lastPoint,103,46,0,Math.PI*2,true);
		cxt.closePath();
		cxt.fill();
		cxt.fillStyle="#ffca96";
		cxt.beginPath();
		cxt.globalAlpha=0.3;
		cxt.arc(center,103,96,0,Math.PI*2,true);
		cxt.closePath();
		cxt.fill();
		cxt.fillStyle="#8de3de";
		cxt.beginPath();
		cxt.globalAlpha=0.6;
		cxt.arc(center,103,76,0,Math.PI*2,true);
		cxt.closePath();
		cxt.fill();
		cxt.fillStyle="#FFF";
		cxt.font = "16px Broadway";
		cxt.fillText("星期"+Utils.numberToChinese(yest), firstPoint-24, 88);
		cxt.font = "30px Broadway";
		cxt.globalAlpha=0.9;
		cxt.fillText(yesterday, firstPoint-8, 117);
		cxt.font = "20px Broadway";
		cxt.fillText("星期"+Utils.numberToChinese(day), center-45, 75);
		cxt.font = "23px Broadway";
		cxt.fillText(today, center+25, 75);
		cxt.beginPath();
		cxt.strokeStyle="#FFF";   
	    cxt.moveTo(center-74,90);   
	    cxt.lineTo(center+74,90);   
	    cxt.stroke();   
		cxt.font = "30px Broadway";
		cxt.globalAlpha=0.9;
		cxt.fillStyle="#FFF";
		cxt.font = "16px Broadway";
		cxt.fillText("星期"+Utils.numberToChinese(tomo), lastPoint-24, 88);
		cxt.font = "30px Broadway";
		cxt.globalAlpha=0.9;
		cxt.fillText(tomorrow, lastPoint-8, 117);
		//cxt.fillText(tomorrow, lastPoint-8, 110);  
	} else {
		var firstPoint=width*2/8;
		var lastPoint=width*6/8;
		var center=width*1/2;
		cxt.fillStyle="#54FF9F";
		cxt.beginPath();
		cxt.globalAlpha=0.6;
		cxt.arc(firstPoint-170,103,36,0,Math.PI*2,true);
		cxt.closePath();
		cxt.fill();
		cxt.beginPath();
		cxt.globalAlpha=0.6;
		cxt.arc(firstPoint,103,46,0,Math.PI*2,true);
		cxt.closePath();
		cxt.fill();
		cxt.fillStyle="#6495ED";
		cxt.beginPath();
		cxt.arc(lastPoint,103,46,0,Math.PI*2,true);
		cxt.closePath();
		cxt.fill();
		cxt.beginPath();
		cxt.arc(lastPoint+170,103,36,0,Math.PI*2,true);
		cxt.closePath();
		cxt.fill();
		cxt.fillStyle="#ffca96";
		cxt.beginPath();
		cxt.globalAlpha=0.2;
		cxt.arc(center,103,96,0,Math.PI*2,true);
		cxt.closePath();
		cxt.fill();
		cxt.fillStyle="#8de3de";
		cxt.beginPath();
		cxt.globalAlpha=0.6;
		cxt.arc(center,103,76,0,Math.PI*2,true);
		cxt.closePath();
		cxt.fill();
		cxt.fillStyle="#FFF";
		cxt.globalAlpha=0.9;
		cxt.font = "16px Broadway";
		cxt.fillText("星期"+Utils.numberToChinese(yest), firstPoint-24, 88);
		cxt.font = "30px Broadway";
		cxt.fillText(yesterday, firstPoint-8, 117);
		cxt.globalAlpha=0.9;
		cxt.font = "16px Broadway";
		cxt.fillText("星期"+Utils.numberToChinese(byest), firstPoint-170-24, 93);
		cxt.font = "24px Broadway";
		cxt.fillText(yesterday-1, firstPoint-170-8, 120);
        cxt.globalAlpha=0.9;
		cxt.font = "20px Broadway";
		cxt.fillText("星期"+Utils.numberToChinese(day), center-45, 75);
		cxt.font = "23px Broadway";
		cxt.fillText(today, center+25, 75);
		cxt.beginPath();
		cxt.strokeStyle="#FFF";   
	    cxt.moveTo(center-74,90);   
	    cxt.lineTo(center+74,90);   
	    cxt.stroke();   
		cxt.font = "30px Broadway";
		cxt.globalAlpha=0.9;
		cxt.fillStyle="#FFF";
		cxt.font = "16px Broadway";
		cxt.fillText("星期"+Utils.numberToChinese(tomo), lastPoint-24, 88);
		cxt.font = "30px Broadway";
		cxt.globalAlpha=0.9;
		cxt.fillText(tomorrow, lastPoint-15, 117);
		cxt.globalAlpha=0.9;
		cxt.fillStyle="#FFF";
		cxt.font = "16px Broadway";
		cxt.fillText("星期"+Utils.numberToChinese(atomo), lastPoint+170-24, 93);
		cxt.font = "24px Broadway";
		cxt.globalAlpha=0.9;
		cxt.fillText(tomorrow+1, lastPoint+170-12, 120);
	}
    var pic=document.getElementById('hpic');
    var ctx=pic.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle="#6495ED";
    ctx.arc(65,60,60,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
	if(width>400 && width<600){
		document.getElementById('progress_bar').style.width="200px";
	} else if(width<400){
		document.getElementById('progress_bar').style.width="150px";
	} else if(width>600){
		document.getElementById('progress_bar').style.width="350px";
	}
}
$( document ).on( "pageinit", "#home", function() {
    $( document ).on( "swipeleft swiperight", "#home", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight" ) {
                $( "#defaultpanel" ).panel( "open" );
            }
        }
    });
});
$( document ).on( "pageinit", "#home", function() {
    $( "#perset" ).on( "click", function() {
        var target = $( this ),
            short = target.attr( "id" ),
            closebtn = '<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" data-shadow="false" data-iconshadow="false" class="ui-btn-right">Close</a>',
            header = '<div data-role="header"><h2>个人设置</h2></div>',
            img = "<div style='margin:20px;padding-bottom:20px'><input type='text' /><input type='range' name='slider-fill-mini' id='slider-fill-mini' value='40' min='0' max='100' data-mini='true' data-highlight='true' data-theme='b' data-track-theme='d' /></div>",
            popup = '<div data-role="popup" id="popup-' + short + '" data-short="' + short +'" data-theme="none" data-overlay-theme="a" data-corners="false" data-tolerance="15">' + closebtn + header + img + '</div>';
        // Create the popup. Trigger "pagecreate" instead of "create" because currently the framework doesn't bind the enhancement of toolbars to the "create" event (js/widgets/page.sections.js).
        $.mobile.activePage.append( popup ).trigger( "pagecreate" );
        // Wait with opening the popup until the popup image has been loaded in the DOM.
        // This ensures the popup gets the correct size and position
        $( ".photo", "#popup-" + short ).load(function() {
            var height = $( this ).height(),
                width = $( this ).width();
            // Set height and width attribute of the image
            $( this ).attr({ "height": height, "width": width });
            // Open the popup
            $( "#popup-" + short ).popup( "open" );
            // Clear the fallback
            clearTimeout( fallback );
        });
        // Fallback in case the browser doesn't fire a load event
        var fallback = setTimeout(function() {
            $( "#popup-" + short ).popup( "open" );
        }, 2000);
    });
    // Set a max-height to make large images shrink to fit the screen.
    $( document ).on( "popupbeforeposition", ".ui-popup", function() {
        // 68px: 2 * 15px for top/bottom tolerance, 38px for the header.
        var maxHeight = $( window ).height() - 68 + "px";
        $( "img.photo", this ).css( "max-height", maxHeight );
    });
    // Remove the popup after it has been closed to manage DOM size
    $( document ).on( "popupafterclose", ".ui-popup", function() {
        $( this ).remove();
    });
});
$( document ).on( "pageinit", "#home", function() {
    $( "#change" ).on( "click", function() {
        var target = $( this ),
            short = target.attr( "id" ),
            closebtn = '<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" data-shadow="false" data-iconshadow="false" class="ui-btn-right">Close</a>',
            header = '<div data-role="header"><h2>修改昵称</h2></div>',
            img = "<div style='margin:20px;padding-bottom:20px'><input type='text' /><a href='#' data-role='button' data-mini='true' data-inline='true' data-icon='check' data-theme='b'>确认修改</a></div>",
            popup = '<div data-role="popup" id="popup-' + short + '" data-short="' + short +'" data-theme="none" data-overlay-theme="a" data-corners="false" data-tolerance="15">' + closebtn + header + img + '</div>';
        // Create the popup. Trigger "pagecreate" instead of "create" because currently the framework doesn't bind the enhancement of toolbars to the "create" event (js/widgets/page.sections.js).
        $.mobile.activePage.append( popup ).trigger( "pagecreate" );
        // Wait with opening the popup until the popup image has been loaded in the DOM.
        // This ensures the popup gets the correct size and position
        $( ".photo", "#popup-" + short ).load(function() {
            var height = $( this ).height(),
                width = $( this ).width();
            // Set height and width attribute of the image
            $( this ).attr({ "height": height, "width": width });
            // Open the popup
            $( "#popup-" + short ).popup( "open" );
            // Clear the fallback
            clearTimeout( fallback );
        });
        // Fallback in case the browser doesn't fire a load event
        var fallback = setTimeout(function() {
            $( "#popup-" + short ).popup( "open" );
        }, 2000);
    });
    // Set a max-height to make large images shrink to fit the screen.
    $( document ).on( "popupbeforeposition", ".ui-popup", function() {
        // 68px: 2 * 15px for top/bottom tolerance, 38px for the header.
        var maxHeight = $( window ).height() - 68 + "px";
        $( "img.photo", this ).css( "max-height", maxHeight );
    });
    // Remove the popup after it has been closed to manage DOM size
    $( document ).on( "popupafterclose", ".ui-popup", function() {
        $( this ).remove();
    });
});
