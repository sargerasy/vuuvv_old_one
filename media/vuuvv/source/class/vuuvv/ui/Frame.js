
/*
#asset(vuuvv/*)
*/

qx.Class.define("vuuvv.ui.Frame", {
	extend: qx.ui.container.Composite,

	construct: function()
	{
		this.base(arguments, new qx.ui.layout.VBox());
		this.add(new vuuvv.view.Header(), {flex: 0});

		var layout = new qx.ui.layout.Atom();
		layout.setCenter(true);
		var container = new qx.ui.container.Composite(layout);
		this.add(container, {flex: 1});
		var loading = new qx.ui.basic.Image("vuuvv/loading66.gif", "100%", "100%");
		container.add(loading);
	},

	members :
	{
	}
});

