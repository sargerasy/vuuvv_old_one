(function($) {
	window.flash = function(url,width,height,var1) {
		document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,24,0" width="'+width+'" height="'+height+'">');
		document.write('<param name="movie" value="'+url+'" />');
		document.write('<param name="quality" value="high" />');
		document.write('<param name="flashVars" value="'+var1+'" />');
		document.write('<param name="wmode" value="transparent" />');
		document.write('<param name="menu" value="false" />');
		document.write('<embed flashvars="'+var1+'" src="'+url+'" wmode="transparent" quality="high" menu="false" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+width+'" height="'+height+'"></embed>');
		document.write('</object>');
	}

	var sel_menu = null;
	var disp_menu = null;
	var hoverin_top_menu = function(item) {
		var sn = item.attr("sn");
		if (!item.hasClass("item-selected")) {
			item.removeClass("item-normal");
			item.removeClass("item-normal-" + sn);
			item.addClass("item-hover-" + sn).addClass("item-hover");
		}
		var sub = $("#sub-container-" + sn);
		sub.css("display", "block")
			.css("position", "absolute");
		disp_menu = item;
	};

	var hoverout_top_menu = function(item) {
		var sn = item.attr("sn");
		if (!item.hasClass("item-selected")) {
			item.removeClass("item-hover");
			item.removeClass("item-hover-" + sn);
			item.addClass("item-normal-" + sn).addClass("item-normal");
		}
		var sub = $("#sub-container-" + sn);
		sub.css("display", "none")
			.css("position", "relative");

		disp_menu = null;
	};

	var show_origin_sub = function() {
		var sn = sel_menu.attr("sn");
		var sub = $("#sub-container-" + sn);
		sub.css("display", "block")
			.css("position", "relative");
		disp_menu = sel_menu;
	};

	var set_top_menu_behavior = function() {
		var menutimer = null;
		var mouseIn = function(){
			var t = $(this);
			if (menutimer) {
				clearTimeout(menutimer);
			}
			if (disp_menu) hoverout_top_menu(disp_menu);
			hoverin_top_menu(t);
		};
		var mouseOut = function() {
			var t = $(this);
			menutimer = setTimeout(function() {
				hoverout_top_menu(t);
				show_origin_sub();
			}, 800);
		};
		$(".item-normal, .item-selected").mouseover(mouseIn).mouseout(mouseOut);

		var sub_mouseIn = function() {
			if (menutimer) clearTimeout(menutimer);
		};
		var sub_mouseOut = function() {
			menutimer = setTimeout(function() {
				hoverout_top_menu(disp_menu);
				show_origin_sub();
			}, 800);
		};
		$(".sub-container").mouseover(sub_mouseIn).mouseout(sub_mouseOut);
	};

	$(document).ready(function() {
		//ie_menu();
		sel_menu = $(".item-selected");
		disp_menu = sel_menu;
		set_top_menu_behavior();
		$(".menu-link").click(function(){document.location.href = $(this).attr("href");});
	});
})(jQuery);
