/*****************************************************
#require(vuuvv.ui.page.AdminMenu)
#require(vuuvv.ui.page.User)
#require(vuuvv.ui.page.Group)
#require(vuuvv.ui.page.Permission)
#require(vuuvv.ui.page.Menu)
#require(vuuvv.ui.page.Page)
#require(vuuvv.ui.page.About)
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
		this.setLabel(options.label);
		this.setToolTipText(options.tooltip);
		this.setIcon(options.icon);
		this.addListener("execute", this.handle, this);
		this.setPageClassName("vuuvv.ui.page." + options.command);
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
