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

	var origin_menu = null;
	var disp_menu = null;

	var set_top_menu_behavior = function() {
		var get_sub = function(parent) {
			sn = parent.attr("sn");
			return $("#sub-container-" + sn);
		};

		var hover_menu = function(parent, sn, show) {
			var add = "item-" + (show ? "hover" : "normal");
			var remove = "item-" + (show ? "normal" : "hover");
			if (!parent.hasClass("item-selected")) 
				parent.removeClass(remove)
					.addClass(add)
					.attr("id", add + "-" + sn);
		};

		var show_sub_menu = function(sn, show) {
			var disp = show ? "block" : "none";
			var pos = show ? "absolute" : "relative";
			var sub = $("#sub-container-" + sn);
			sub.css("display", disp).css("position", pos);
		}

		var show_menu = function(parent, show) {
			var sn = parent.attr("sn");
			hover_menu(parent, sn, show);
			show_sub_menu(sn, show);
			disp_menu = parent;
		};

		var show_origin = function() {
			show_sub_menu(origin_menu.attr("sn"), true);
			disp_menu = origin_menu;
		};

		var Lotimer, Litimer, Sotimer;
		var clear_timer = function() {
			if (Lotimer) clearTimeout(Lotimer);
			if (Litimer) clearTimeout(Litimer);
			if (Sotimer) clearTimeout(Sotimer);
		};

		$(".item-normal, .item-selected").hover(function() {
			var t = $(this);
			var sub = get_sub(t);
			sub.data("stayin", true);
			litimer = setTimeout(function() {
				if (!sub.data("stayin")) 
					return;
				clear_timer();
				show_menu(disp_menu, false);
				show_menu(t, true);
			}, 300);
		}, function() {
			var t = $(this);
			clear_timer();
			get_sub(t).data("stayin", false);
			Lotimer = setTimeout(function() {
				show_menu(t, false);
				show_origin();
			}, 800);
		});

		$(".sub-container").hover(function() {
			var t = $(this);
			t.data("stayin", true);
			clear_timer();
		}, function() {
			var t = $(this);
			t.data("stayin", false);
			Lotimer = setTimeout(function() {
				show_menu(disp_menu, false);
				show_origin();
			}, 800);
		});
	};

	$(document).ready(function() {
		//ie_menu();
		origin_menu = disp_menu = $(".item-selected");
		set_top_menu_behavior();
		$(".menu-link").click(function(){document.location.href = $(this).attr("href");});
	});
})(jQuery);
