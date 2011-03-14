/*
#asset(vuuvv/*)
*/
qx.Class.define("vuuvv.ui.page.Menu", {
	extend: vuuvv.ui.LoadingFrame,

	construct: function()
	{
		this.base(arguments, "/admin/nav");
	},

	members:
	{
		_lookup: null,

		_initializeContent: function(data) {
			data = data.nav
			var mainsplit = new qx.ui.splitpane.Pane("horizontal");

			var treeFrame = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
			treeFrame.setBackgroundColor("background-splitpane");
			treeFrame.add(this.getCommandFrame());

			this._tree = this.getTree(data);
			treeFrame.add(this._tree, {flex: 1});

			mainsplit.add(treeFrame, 0);


			var groupBox = new qx.ui.groupbox.GroupBox(this.tr("Menu Details"));
			groupBox.setLayout(new qx.ui.layout.Canvas());
			mainsplit.add(groupBox, 1);

			//this._form = this.getForm();
			//groupBox.add(new qx.ui.form.renderer.Single(this._form));

			return mainsplit;
		},

		getTree: function(data) {
			this._lookup = vuuvv.model.Tree.create(data, vuuvv.model.Menu, "parent_id", "order", "tag");
			var model = this._lookup[-1]
			model.map(function(){ this.debug(this.pwd("tag").join("/")); }, [], true);
			var tree = new qx.ui.tree.Tree();
			tree.set({width: 300});
			tree.setSelectionMode("multi");

			var ctrl = new qx.data.controller.Tree(null, tree, "children", "label");
			ctrl.setModel(model);

			tree.getRoot().setOpen(true);
			return tree;
		},

		getCommandFrame: function() {
			var box = new qx.ui.layout.HBox();
			var commandFrame = new qx.ui.container.Composite(box);
			box.setSpacing(5);

			var newBtn = new qx.ui.form.Button(this.tr("New"));
			var delBtn = new qx.ui.form.Button(this.tr("Delete"));
			var editBtn = new qx.ui.form.Button(this.tr("Edit Page"));
			var createBtn = new qx.ui.form.Button(this.tr("Create Page"));

			commandFrame.add(newBtn, {flex: 1});
			commandFrame.add(delBtn, {flex: 1});
			commandFrame.add(editBtn, {flex: 1});
			commandFrame.add(createBtn, {flex: 1});

			return commandFrame;
		}
	},

	destruct: function()
	{
		this._disposeObjects("_lookup");
	}
});
