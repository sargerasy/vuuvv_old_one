qx.Class.define("vuuvv.utils",
{
	statics : {
		getMenus: function() {
			return qx.core.Init.getApplication().getAppData().menus;
		},

		getApp: function() {
			return qx.core.Init.getApplication();
		},

		syncObject: function(src, tar, properties) {
			properties = properties || vuuvv.utils.keys(qx.util.PropertyUtil.getProperties(tar.constructor));

			for (var i = 0; i < properties.length; i++) {
				var name = properties[i];
				try {
					var value = src["get" + qx.lang.String.firstUp(name)]();
					tar["set" + qx.lang.String.firstUp(name)](value);
				} catch(err) {
					vuuvv.utils.getApp().debug("vuuvv.utils#syncObject: " + name + " " + err.description);
				}
			}
		},

		keys: function(map) {
			var ret = [];
			for(var key in map) ret.push(key);
			return ret;
		},

		values: function(map) {
			var ret = [];
			for(var key in map) ret.push(map[key]);
			return ret
		},

		getShowEffect: function(widget) {
			var effect;
			if (qx.bom.client.Engine.MSHTML) {
				effect = new qx.fx.effect.core.Fade(
					widget.getContainerElement().getDomElement()
				).set({
					from: 0,
					to: 1
				});
			} else {
				effect = new qx.fx.effect.combination.Grow(
					widget.getContainerElement().getDomElement()
				);
			}
			return effect;
		},

		getHideEffect: function(widget) {
			var effect;
			if (qx.bom.client.Engine.MSHTML) {
				effect = new qx.fx.effect.core.Fade(
					widget.getContainerElement().getDomElement()
				).set({
					from: 1,
					to: 0
				});
			} else {
				effect = new qx.fx.effect.combination.Shrink(
					widget.getContainerElement().getDomElement()
				);
			}
			return effect;
		},

		suffix: function(name) {
			var parts = name.split(".");
			return parts.length <= 1 ? "" : parts[parts.length - 1];
		},

		shrink: function(x, y, mx, my) {
			var ret = {x: x, y: y};
			if (x <= mx && y <= my)
				return ret;
			var dx = mx/x;
			var dy = my/y;
			var d = Math.min(dx, dy);
			ret.x = x * d;
			ret.y = y * d;
			return ret;
		},

		shrinky: function(x, y, mx, my) {

		}
	}
});
