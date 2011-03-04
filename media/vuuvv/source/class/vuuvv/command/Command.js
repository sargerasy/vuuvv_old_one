qx.Class.define("vuuvv.command.Command", {
	extend: qx.ui.core.Command,

	construct: function(options)
	{
		this.base(arguments);
		this.setLabel(options.label);
		this.setToolTipText(options.tooltip);
		this.setIcon(options.icon);
		this.addListener("execute", this.handle, this);
	},

	members:
	{
		handle: function() {
			var app = qx.core.Init.getApplication();
			var tabs = app.getTabView();
			var page = new qx.ui.tabview.Page(this.getLabel(), this.getIcon());
			page.setShowCloseButton(true);
			this.debug(tabs.indexOf(page));
			this.debug(page.getButton());
			tabs.add(page);
			this.debug(tabs.indexOf(page));
			tabs.setSelection([page]);
		}
	}
});
