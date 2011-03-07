qx.Class.define("vuuvv.ui.page.AdminMenu", {
	extend: qx.ui.tabview.Page,

	construct: function(label, icon)
	{
		this.base(arguments, label, icon);
		this.setShowCloseButton(true);
		this.setLayout(new qx.ui.layout.HBox(5));

		var menus = qx.core.Init.getApplication().getAppData().menus;

		var model = qx.data.marshal.Json.createModel(menus.root, true);

		var tree = new qx.ui.tree.Tree();
		this.add(tree, {flex: 1});

		var controller = new qx.data.controller.Tree();
		controller.setModel(model);
		controller.setChildPath("children");
		controller.setLabelPath("label");
		controller.setTarget(tree);
		controller.setDelegate({
			configureItem: function(item){
				var model = item.getModel();
				if(model.getChildren && model.getChildren())
					item.setAppearance("tree-folder");
				else
					item.setAppearance("tree-file");

				item.addListener("dblclick", function(){
					fc.setModel(this);
				}, model);
			}
		});
		tree.getRoot().setOpen(true);

		var groupBox = new qx.ui.groupbox.GroupBox("Simple Form");
		groupBox.setLayout(new qx.ui.layout.Canvas());
		this.add(groupBox, {flex: 1});

		// form
		var form = new qx.ui.form.Form();

		// add the form items
		var nameTextfield = new qx.ui.form.TextField();
		nameTextfield.setRequired(true);
		nameTextfield.setWidth(200);
		form.add(nameTextfield, "Label", null, "label");
		form.add(new qx.ui.form.TextField(), "Tooltip");
		form.add(new qx.ui.form.TextField(), "Icon");
		form.add(new qx.ui.form.TextField(), "Command");

		var parentfield = new qx.ui.form.TextField();
		parentfield.hide();
		form.add(parentfield, "Parent", null, "parent_id");

		// buttons
		var saveButton = new qx.ui.form.Button("Save");
		saveButton.setWidth(70);
		form.addButton(saveButton);
		var cancelButton = new qx.ui.form.Button("Cancel");
		cancelButton.setWidth(70);
		form.addButton(cancelButton);

		// create the view
		groupBox.add(new qx.ui.form.renderer.Single(form));
		var fc = new qx.data.controller.Form(null, form);
		fc.addBindingOptions("parent_id", {converter: function(data) {
			return data+"";
		}}, {converter: function(data) {
			return data instanceof Integer ? parseInt(data) : null;
		}});

		// serialization and reset /////////
		saveButton.addListener("execute", function() {
			if (form.validate()) {
			  alert("You are saving: " + qx.util.Serializer.toUriParameter(fc.getModel()));
			}
		}, this);
		cancelButton.addListener("execute", form.reset, form);
	}
});
