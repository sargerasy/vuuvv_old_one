qx.Class.define("vuuvv.ui.Dialog", {
	extend: qx.ui.container.Composite, 

	construct: function() {
		this.base(arguments);

		this.set({
			"visibility": "hidden",
			"decorator": "shadow-popup"
		});
		this.setLayout(new qx.ui.layout.Grow());

		var root = qx.core.Init.getApplication().getRoot();
		root.add(this);

		var maxZIndex = 1E5;
		var windows = root.getWindows();
		for (var i = 0; i < windows.length; i++) {
			var zIndex = windows[i].getZIndex();
			maxZIndex = Math.max(maxZIndex, zIndex);
		}
		this.setZIndex(maxZIndex + 1);

		qx.ui.core.FocusHandler.getInstance().addRoot(this);

		this.getApplicationRoot().addListener("resize",this._centerme, this);

		this.addListener("appear", this._centerme, this);

		this._createWidgetContent();
	},

	properties: {
		useBlocker: {
			check: "Boolean",
			init: true
		},

		blockerColor: {
			check: "String",
			init: "black"
		},

		blockerOpacity: {
			check: "Number",
			init: 0.5
		},

		focusable: {
			refine: true,
			init: true
		}
	},

	events: {
		"ok": "qx.event.type.Event",
		"cancel" : "qx.event.type.Event"
	},

	members: {
		show: function() {
			if (this.isUseBlocker()) {
				var root = this.getApplicationRoot();
				root.setBlockerOpacity(this.getBlockerOpacity());
				root.setBlockerColor(this.getBlockerColor());
				root.blockContent(this.getZIndex() - 1);
			}
			this.setVisibility("visible");
			this.focus();
		},

		hide: function() {
			this.setVisibility("hidden");
			if (this.isUseBlocker()) {
				this.getApplicationRoot().unblockContent();
			}
		},

		_createWidgetContent: function() {
			this.error("_createWidgetContent not implemented!");
		},

		_centerme: function() {
			var bounds = this.getBounds();
			this.set({
				marginTop: Math.round((qx.bom.Document.getHeight() - bounds.height) / 2),
				marginLeft: Math.round((qx.bom.Document.getWidth() - bounds.width) /2)
			});
		}
	}
});
