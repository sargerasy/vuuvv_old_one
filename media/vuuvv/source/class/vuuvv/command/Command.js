/*****************************************************
#require(vuuvv.ui.page.AdminMenu)
#require(vuuvv.ui.page.User)
#require(vuuvv.ui.page.Group)
#require(vuuvv.ui.page.Permission)
#require(vuuvv.ui.page.Menu)
#require(vuuvv.ui.page.Page)
#require(vuuvv.ui.page.About)
#require(vuuvv.ui.page.Article)
*****************************************************/
qx.Class.define("vuuvv.command.Command", {
	extend: qx.ui.core.Command,

	properties:
	{
		pageClassName:
		{
			check: String
		}
	},
	construct: function(options)
	{
		this.base(arguments);
		this.setLabel(options.getLabel());
		this.setToolTipText(options.getTooltip());
		this.setIcon(options.getIcon());
		this.addListener("execute", this.handle, this);
		this.setPageClassName("vuuvv.ui.page." + options.getCommand());
	},

	members:
	{
		handle: function() {
			var app = qx.core.Init.getApplication();
			var tabs = app.getTabView();
			tabs.add(this.getLabel(), this.getIcon(), this.getPageClassName());
		}
	}
});
