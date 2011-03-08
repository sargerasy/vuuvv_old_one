qx.Class.define("vuuvv.ui.page.AdminMenu", {
	extend: qx.ui.tabview.Page,

	construct: function(label, icon)
	{
		this.base(arguments, label, icon);
		this.setShowCloseButton(true);
		this.setLayout(new qx.ui.layout.HBox());

		var mainsplit = new qx.ui.splitpane.Pane("horizontal");
		this.add(mainsplit, {flex: 1});

		var treeFrame = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
		treeFrame.setBackgroundColor("background-splitpane");
		treeFrame.add(this.getCommandFrame());

		this._tree = this.getTree();
		treeFrame.add(this._tree, {flex: 1});

		mainsplit.add(treeFrame, 0);


		var groupBox = new qx.ui.groupbox.GroupBox(this.tr("Menu Details"));
		groupBox.setLayout(new qx.ui.layout.Canvas());
		mainsplit.add(groupBox, 1);

		this._form = this.getForm();
		groupBox.add(new qx.ui.form.renderer.Single(this._form));
	},

	members:
	{
		getTree: function()
		{
			var model = qx.core.Init.getApplication().getAppData().menus.struct;
			var tree = new qx.ui.tree.Tree();
			tree.setSelectionMode("multi");

			this._tc = new qx.data.controller.Tree(model, tree, "children", "label");
			var self = this;
			this._tc.setDelegate({
				configureItem: function(item){
					var model = item.getModel();
					if(model.getChildren().getLength() > 0)
						item.setAppearance("tree-folder");
					else
						item.setAppearance("tree-file");

					item.addListener("dblclick", function(){
						var items = qx.core.Init.getApplication().getAppData().menus.items;
						var pm = new qx.data.Array();
						for (var i in items) {
							pm.push(items[i]);
						}
						console.log(pm);
						this._pc.setModel(pm);
						this._fc.setModel(model);
					}, self);


					// drag & drop
					item.setDraggable(true);
					item.setDroppable(true);

					item.addListener("dragstart", function(e) {
						e.addAction("move");
					});

					item.addListener("drop", function(e) {
						console.log(e.getRelatedTarget());
					});
				}
			});
			tree.getRoot().setOpen(true);
			return tree;
		},

		getForm: function()
		{
			// form
			var form = new qx.ui.form.Form();

			// add the form items
			var nameTextfield = new qx.ui.form.TextField();
			nameTextfield.setRequired(true);
			nameTextfield.setWidth(200);
			form.add(nameTextfield, "Label", null, "label");
			form.add(new qx.ui.form.TextField(), "Tooltip");
			form.add(new qx.ui.form.TextField(), "Icon", null, "icon");
			form.add(new qx.ui.form.TextField(), "Command");

			var parent = new qx.ui.form.SelectBox();
			this._pc = new qx.data.controller.List(null, parent);
			this._pc.setDelegate({bindItem: function(controller, item, index) {
				controller.bindProperty("label", "label", null, item, index);
				controller.bindProperty("id", "model", null, item, index);
			}});
			//this._pc.add
			form.add(parent, "Parent");

			// buttons
			var saveButton = new qx.ui.form.Button("Save");
			saveButton.setWidth(70);
			form.addButton(saveButton);
			var cancelButton = new qx.ui.form.Button("Cancel");
			cancelButton.setWidth(70);
			form.addButton(cancelButton);

			// create the view
			this._fc = new qx.data.controller.Form(null, form);

			// serialization and reset /////////
			saveButton.addListener("execute", function() {
				if (form.validate()) {
				  alert("You are saving: " + qx.util.Serializer.toUriParameter(this._fc.getModel()));
				}
			}, this);
			cancelButton.addListener("execute", form.reset, form);

			return form
		},

		getCommandFrame: function()
		{
			var box = new qx.ui.layout.HBox();
			var commandFrame = new qx.ui.container.Composite(box);
			box.setSpacing(5);

			var newBtn = new qx.ui.form.Button(this.tr("New"));
			newBtn.setWidth(70);
			var delBtn = new qx.ui.form.Button(this.tr("Delete"));
			delBtn.setWidth(70);

			commandFrame.add(newBtn);
			commandFrame.add(delBtn);

			newBtn.addListener("execute", function() {
				var sel = this._tree.getSelection();
				if(sel.length == 1) {
					var model = sel[0].getModel();
					var children = model.getChildren ? model.getChildren() : new qx.data.Array();
					console.log(children);
				} else {
					alert("You should select only one item!");
				}
			}, this);
			return commandFrame;
		}

	},

	destruct: function()
	{
		this._disposeObjects("_tree", "_form", "_tc", "_fc", "_pc");
	}
});
