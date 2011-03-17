qx.Class.define("vuuvv.ui.page.Page", {
	extend: vuuvv.ui.LoadingFrame,

	construct: function()
	{
		this.base(arguments, "/admin/page");
	},

	members:
	{
		_lookup: null,

		_initializeContent: function(data) {
			data = data.page
			//this._createCommands();
			var mainsplit = new qx.ui.splitpane.Pane("horizontal");

			var listFrame = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
			listFrame.setBackgroundColor("background-splitpane");
			//listFrame.add(this.getCommandFrame());

			this._list = this.getList(data);
			listFrame.add(this._list, {flex: 1});

			mainsplit.add(listFrame, 0);


			var groupBox = new qx.ui.groupbox.GroupBox(this.tr("Page Details"));
			groupBox.setLayout(new qx.ui.layout.Canvas());
			mainsplit.add(groupBox, 1);

			//this._form = this.getForm();
			//groupBox.add(new qx.ui.form.renderer.Single(this._form));

			return mainsplit;
		},

		getList: function(data) {
			var list = new qx.ui.list.List();
			list.set({width: 300});
			list.setSelectionMode("multi");
			return list;
		}
	}
});
