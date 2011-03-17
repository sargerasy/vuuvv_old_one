qx.Class.define("vuuvv.ui.page.PageForm", {
	extend: vuuvv.ui.LoadingFrame,

	construct: function(url)
	{
		this.base(arguments, url);
	},

	properties:
	{
		model: {
			event: "changeModel",
			nullable: true,
			init: null
		}
	},

	members:
	{
		_initializeContent: function(data) {
			var groupBox = new qx.ui.groupbox.GroupBox(this.tr("Page Details"));
			groupBox.setLayout(new qx.ui.layout.Canvas());
		}
	}
});
