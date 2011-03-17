qx.Class.define("vuuvv.ui.page.PageForm", {
	extend: vuuvv.ui.LoadingFrame,

	construct: function(url)
	{
		this.base(arguments);
		this.goPage(url);
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
		createPage: function() {
			var container = new qx.ui.container.Composite(new qx.ui.layout.VBox());

			var groupBox = new qx.ui.groupbox.GroupBox(this.tr("Page Details"));
			groupBox.setLayout(new qx.ui.layout.Canvas());
			container.add(groupBox, {flex: 1});

			var form = new qx.ui.form.Form();

			form.add(new qx.ui.form.TextField().set({
				required: true,
				width: 200
			}), "Label");
			form.add(new qx.ui.form.TextField().set({
				required: true
			}), "Url");
			form.add(new qx.ui.form.TextField().set({
				required: true
			}), "Order");

			return container;
		},

		setupPage: function(data) {
		},

		goPage: function(url) {
			if (url) {
				url = "/admin/page/" + url;
				this.setUrl(url);
			}
		}
	}
});
