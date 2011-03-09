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
			properties = properties || qx.util.PropertyUtil.getProperties(tar.constructor);

			for (var key in properties) {
				var name = properties instanceof Array ? properties[key] : key;
				try {
					var value = src["get" + qx.lang.String.firstUp(name)]();
					tar["set" + qx.lang.String.firstUp(name)](value);
				} catch(err) {
					vuuvv.utils.getApp().debug("vuuvv.utils#syncObject: " + err.description);
				}
			}
		}
	}
});
