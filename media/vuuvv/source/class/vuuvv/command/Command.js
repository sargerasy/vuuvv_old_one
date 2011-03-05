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
			tabs.add(this.getLabel(), this.getIcon());
		}
	}
});
