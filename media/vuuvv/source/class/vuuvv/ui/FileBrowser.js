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
			var toolbar = new qx.ui.toolbar.ToolBar();
			toolbar.add(new qx.ui.toolbar.Button("test"));
			this.add(toolbar);

			this._table = this._getTable();
			this.add(this._table);
		},

		_getTable: function() {
			var model = new vuuvv.model.RemoteFileModel;
			var table = new qx.ui.table.Table(model);
			table.getTableColumnModel().setColumnVisible(0, false);
			this.set({width: 600, height: 400});
			table.addListener("cellDblclick", function(e) {
				var model = table.getTableModel();
				model.cdRow(e.getRow());
			}, this);
			var newRenderer = new qx.ui.table.cellrenderer.Conditional();
			newRenderer.addNumericCondition("==", true, null, "#0000FF", null, null, "dir");
			table.getTableColumnModel().setDataCellRenderer(1, newRenderer);
			return table;
		}
	}
});
