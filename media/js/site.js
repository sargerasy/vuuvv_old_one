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
			t.data("_hoverin", true);
			console.log("hover in " + t.attr("class"));

			setTimeout(function() {
				if (!t.data("_hoverin")){
					console.log(t.data("_hoverin"));
					console.log("too fast");
					return;
				}
				if (menutimer) {
					clearTimeout(menutimer);
				}
				if (disp_menu) hoverout_top_menu(disp_menu);
				hoverin_top_menu(t);
			}, 200);
		};
		var mouseOut = function() {
			var t = $(this);
			console.log("hover out " + t.attr("class"));
			t.data("_hoverin", false);
			menutimer = setTimeout(function() {
				hoverout_top_menu(t);
				show_origin_sub();
			}, 800);
		};
		//$(".item-normal, .item-selected").mouseover(mouseIn).mouseout(mouseOut);

		$(".item-normal").hover(function(){
			var t = $(this);
			t.data("_hoverin", true);
			console.log("hover in " + t.attr("class"));

			setTimeout(function() {
				if (!t.data("_hoverin")){
					console.log(t.data("_hoverin"));
					console.log("too fast");
					return;
				}
				if (menutimer) {
					clearTimeout(menutimer);
				}
				if (disp_menu) hoverout_top_menu(disp_menu);
				hoverin_top_menu(t);
			}, 350);
		}, function() {
			var t = $(this);
			console.log("hover out " + t.attr("class"));
			t.data("_hoverin", false);
			menutimer = setTimeout(function() {
				hoverout_top_menu(t);
				show_origin_sub();
			}, 800);
		});

		var sub_mouseIn = function() {
			if (menutimer) {
				console.log("clear timer");
				clearTimeout(menutimer);
			}
		};
		var sub_mouseOut = function() {
			menutimer = setTimeout(function() {
				hoverout_top_menu(disp_menu);
				show_origin_sub();
			}, 800);
		};
		$(".sub-container").hover(sub_mouseIn, sub_mouseOut);//mouseover(sub_mouseIn).mouseout(sub_mouseOut);

		var origin_sn = null;
		var disp_sn = null;

		var hover_menu = function(sn, show) {
			var remove = "item-" + show ? "normal" : "hover";
			var add = "item-" + show ? "hover" : "normal";
			if (!parent.hasClass("item-selected")) 
				parent.removeClass(remove)
					.removeClass(remove + "-" + sn)
					.addClass(add)
					.addClass(add + "-" + sn);
		};

		var show_sub_menu = function(sn, show) {
			var disp = show ? "block" : "none";
			var pos = show ? "absolute" : "relative";
			var sub = $("#sub-container-" + sn);
			sub.css("display", disp).css("position", pos);
			return show ? sub : null;
		}

		var show_menu = function(parent, show) {
			var sn = parent.attr("sn");
			hover_menu(sn, show);
			disp_sn = show_sub_menu(sn, show);
		};

		var show_origin = function() {
			disp_sn = show_sub_menu(sel_sn, true);
		};

		var Lotimer, Litimer, Sotimer;
		var clear_timer = function() {
			if (Lotimer) clearTimeout(Lotimer);
			if (Litimer) clearTimeout(Litimer);
			if (Sotimer) clearTimeout(Sotimer);
		};

		$(".item-normal, .item-selected").hover(function() {
			var t = $(this);
			clear_timer();
			t.data("stayin", false);
			Lotimer = setTimeout(function() {
				show_menu(t, false);
				show_origin();
			}, 800);
		}, function() {
			var t = $(this);
			t.data("stayin", true);
			litimer = setTimeout(function() {
				if (!t.data("stayin")) 
					return;
				clear_timer();
			}, 300);
		});

		$(".sub-container").hover(function() {
		}, function() {
		});
	};

	$(document).ready(function() {
		//ie_menu();
		sel_menu = $(".item-selected");
		disp_menu = sel_menu;
		set_top_menu_behavior();
		$(".menu-link").click(function(){document.location.href = $(this).attr("href");});
	});
})(jQuery);
