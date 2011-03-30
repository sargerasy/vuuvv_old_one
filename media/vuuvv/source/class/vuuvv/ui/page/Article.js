qx.Class.define("vuuvv.ui.page.Article", {
	extend: qx.ui.container.Composite,

	construct: function()
	{
		this.base(arguments, new qx.ui.layout.VBox);
		this.setBackgroundColor("background-splitpane");

		var toolbar = new qx.ui.toolbar.ToolBar();
		var newBtn = new qx.ui.toolbar.Button("New");
		toolbar.add(newBtn);
		newBtn.addListener("execute", this._onNew, this);
		this.add(toolbar);

		var model = new vuuvv.model.RemoteArticle;
		var table = new qx.ui.table.Table(model);

		table.addListener("cellDblclick", function(e) {
			var model = table.getTableModel();
			var row = e.getRow();
			var data = model.getRowData(row);
			var id = data.id;
			this._editArticle(id);
		}, this);

		this.add(table);
	},

	members:
	{
		_articleForm: null,

		getArticleForm: function() {
			if (!this._articleForm)
				this._articleForm = new vuuvv.ui.page.ArticleForm();
			return this._articleForm;
		},

		_editArticle: function(id) {
			var url = "/admin/detail/Article/" + id;
			var req = new qx.io.remote.Request(url, "GET", "application/json");

			req.addListener("completed", this._onLoadDataCompleted, this);
			req.send();
		},

		_onLoadDataCompleted: function(e) {
			var data = e.getContent();
			var form = this.getArticleForm();
			form.show();
			form.setData(data);
		},

		_onNew: function(e) {
			//var url = "/admin/detail/Article/" + id;
			var req = new qx.io.remote.Request(url, "GET", "application/json");

			req.addListener("completed", this._onLoadDataCompleted, this);
			req.send();
		}
	}
});
