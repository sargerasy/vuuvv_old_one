qx.Class.define("vuuvv.ui.page.Page", {
	extend: vuuvv.ui.LoadingFrame,

	construct: function()
	{
		this.base(arguments, "/admin/pages");
	},

	members:
	{
		_lookup: null,

		createPage: function() {
			//this._createCommands();
			var mainsplit = new qx.ui.splitpane.Pane("horizontal");

			var listFrame = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
			listFrame.setBackgroundColor("background-splitpane");
			//listFrame.add(this.getCommandFrame());

			this._list = this.getList();
			listFrame.add(this._list, {flex: 1});

			mainsplit.add(listFrame, 0);


			var groupBox = new qx.ui.groupbox.GroupBox(this.tr("Page Details"));
			groupBox.setLayout(new qx.ui.layout.Canvas());
			mainsplit.add(groupBox, 1);

			//this._form = this.getForm();
			//groupBox.add(new qx.ui.form.renderer.Single(this._form));

			return mainsplit;
		},

		setupPage: function(data) {
			var model = qx.data.marshal.Json.createModel(data.page);
			this._lc.setModel()
		},

		getList: function() {
			var list = new qx.ui.list.List();
			list.set({width: 300});
			list.setSelectionMode("multi");
			this._lc = new qx.data.controller.List(null, list);
			return list;
		}
	}
});
