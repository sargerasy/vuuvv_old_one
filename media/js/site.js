(function($) {
	var ie_menu = function() {
		var ie55 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 5.5") != -1);
		var ie6 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 6.0") != -1);
		if (jQuery.browser.msie && (ie55 || ie6)) {
			$(".item-hover, .item-normal, .item-last").each(function() {
				var t = $(this);
				var bgIMG = t.css('background-image');
				if(bgIMG.indexOf(".png") != -1) {
					var width = t.css("width");
					var iebg = "/media/images/static_" + parseInt(width) + ".png";
					t.css('background-image', 'none');
					t.get(0).runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + iebg + "',sizingMethod='crop')";
				}
			});
		}
	};

	$(document).ready(function() {
		ie_menu();
		var mouseIn = function(){
			var t = $(this);
			t.removeClass("item-normal");
			t.addClass("item-hover");
		};
		var mouseOut = function() {
			var t = $(this);
			t.removeClass("item-hover");
			t.addClass("item-normal");
		};
		$(".item-normal").mouseover(mouseIn);
		$(".item-normal").mouseout(mouseOut);
	});
})(jQuery);
