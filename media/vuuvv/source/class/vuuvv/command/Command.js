qx.Class.define("vuuvv.command.Command", {
	extend: qx.core.Object,

	construct: function(context)
	{
		this.base(arguments);
		this.__context = context;
		this.__command = new qx.ui.core.Command();
		this.__command.addListener("execute", this.handle, context);
	},

	members:
	{
		handle: function() {
			// in this function, this pointer to this.__context
			this.debug("command run");
		},

		attach: function(widget) {
			widget.setCommand(this.__command);
		}
	}
});
