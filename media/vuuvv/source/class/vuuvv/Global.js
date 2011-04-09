/* ************************************************************************

#asset(qx/icon/${qx.icontheme}/22/actions/*.png)

************************************************************************ */
qx.Class.define("vuuvv.Global", {
	statics: {
		icons: {
			"new": "icon/22/actions/document-new.png",
			"edit": "icon/22/actions/document-properties.png",
			"delete": "icon/22/actions/edit-delete.png",
			"find": "icon/22/actions/edit-find.png",
			"reload": "icon/22/actions/view-refresh.png",
			"up": "icon/22/actions/go-up.png",
			"enter": "icon/22/actions/dialog-ok.png",
			"src": "icon/22/actions/document-properties.png"
		},

		getIcon: function(name) {
			return vuuvv.Global.icons[name.toLowerCase()];
		}
	}
});
