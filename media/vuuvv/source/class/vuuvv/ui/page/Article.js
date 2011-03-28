qx.Class.define("vuuvv.ui.page.Article", {
	extend: qx.ui.container.Composite,

	construct: function()
	{
		this.base(arguments, new qx.ui.layout.VBox);
		this.setBackgroundColor("background-splitpane");

		var toolbar = new qx.ui.toolbar.ToolBar();
		this.add(toolbar);

		var model = new vuuvv.model.RemoteArticle;
		var table = new qx.ui.table.Table(model);

		this.add(table);

		
		var renderer = new qx.ui.table.cellrenderer.Dynamic;
	},

	members:
	{
	}
});
