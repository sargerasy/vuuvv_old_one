qx.Class.define("vuuvv.ui.page.Publication", {
	extend: qx.ui.container.Composite,

	construct: function()
	{
		this.base(arguments, new qx.ui.layout.VBox);
		this.setBackgroundColor("background-splitpane");

		var toolbar = new qx.ui.toolbar.ToolBar();
		this.add(toolbar);

		var model = new vuuvv.model.RemotePublication;
		var table = new qx.ui.table.Table(model);

		table.addListener("cellDblclick", function(e) {
			var model = table.getTableModel();
			var row = e.getRow();
			var data = model.getRowData(row);
			var id = data.id;
			this._edit(id);
		}, this);

		this.add(table);
	},

	members:
	{
		_articleForm: null,

		getPublicationForm: function() {
			if (!this._publicationForm)
				this._publicationForm = new vuuvv.ui.page.PublicationForm();
			return this._publicationForm;
		},

		_edit: function(id) {
			var q = new vuuvv.Query;
			q.addListener("completed", this._onLoadDataCompleted, this);
			q.setName("Publication");
			q.query();
			//var url = "/admin/publicationdetail/" + id;
			//var req = new qx.io.remote.Request(url, "GET", "application/json");

			//req.addListener("completed", this._onLoadDataCompleted, this);
			//req.send();
		},

		_onLoadDataCompleted: function(e) {
			var data = e.getData();
			var form = this.getPublicationForm();
			form.show();
			form.setData(data);
		}
	}
});
