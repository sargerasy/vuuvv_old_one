qx.Class.define("vuuvv.ui.FileBrowser", {
	extend: qx.ui.window.Window,

	construct: function() {
		this.base(arguments);
		this.setLayout(new qx.ui.layout.VBox);
		this._createWidgetContent();
		this.center();
	},

	properties: {
		modal: {
			refine: true,
			init: true
		}
	},

	members: {
		_createWidgetContent: function() {
			var table = new qx.ui.table.Table();
			this.add(table);
			var model = new qx.ui.table.model.Simple();
			model.setColumns(["name", "size", "modified data"]);
			this.set({width: 600, height: 400});
		}
	}
});
