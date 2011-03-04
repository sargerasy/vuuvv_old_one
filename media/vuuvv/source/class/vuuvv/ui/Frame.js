
/*
#asset(vuuvv/*)
*/

qx.Class.define("vuuvv.ui.Frame", {
	extend: qx.ui.container.Composite,

	construct: function()
	{
		this.base(arguments, new qx.ui.layout.VBox());
		this.add(new vuuvv.ui.view.Header(), {flex: 0});

		this.__stack = new qx.ui.container.Stack();
		this.add(this.__stack, {flex: 1});

		// loading page
		var layout = new qx.ui.layout.Atom();
		layout.setCenter(true);
		this.__loading = new qx.ui.container.Composite(layout);
		var loading = new qx.ui.basic.Image("vuuvv/loading66.gif", "100%", "100%");
		this.__loading.add(loading);
		this.__stack.add(this.__loading, {flex: 1});

		// content
		this.__content = new vuuvv.ui.ClientArea();
		this.__stack.add(this.__content);

		this.__content.load(function(){
			this.__stack.setSelection([this.__content]);
		}, this);
	},

	members :
	{
	}
});

