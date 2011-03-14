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

		set: function(obj, key, value) {
		},

		get: function(obj, key) {
		},

		values: function(map) {
			var ret = [];
			for(var key in map) ret.push(map[key]);
			return ret
		}

	}
});
