qx.Class.define("vuuvv.ui.page.AdminMenu", {
	extend: qx.ui.tabview.Page,

	construct: function(label, icon)
	{
		this.base(arguments, label, icon);
		this.setShowCloseButton(true);
		this.setLayout(new qx.ui.layout.HBox(5));

		var menus = qx.core.Init.getApplication().getAppData().menus;

		var marshaler = new qx.data.marshal.Json();
		marshaler.toClass(menus.root, true);
		var model = marshaler.toModel(menus.root);

		var tree = new qx.ui.tree.Tree();
		this.add(tree, {flex: 1});

		var controller = new qx.data.controller.Tree(model, tree, "children", "label");
		tree.getRoot().setOpen(true);
	}
});
