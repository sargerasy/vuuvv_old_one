qx.Class.define("vuuvv.command.Test", {
	extend: vuuvv.command.Command,

	construct: function(options)
	{
		this.base(arguments, options);
	},

	members:
	{
		handle: function() {
			var f = new vuuvv.ui.page.Test();
			f.show();
		}
	}
});
