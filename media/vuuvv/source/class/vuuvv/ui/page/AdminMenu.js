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
			var model = vuuvv.utils.getMenus()[-1];
			var tree = new qx.ui.tree.Tree();
			tree.setSelectionMode("multi");

			this._tc = new qx.data.controller.Tree(null, tree, "children", "label");
			this._tc.setDelegate(this._getTreeDelegate());
			this._tc.setModel(model);
			tree.getRoot().setOpen(true);
			return tree;
		},

		_getTreeDelegate: function() {
			var self = this;
			return {
				bindItem: function(controller, widget, model){
					//if(model.getChildren().getLength() > 0)
					//	widget.setAppearance("tree-folder");
					//else
					//	widget.setAppearance("tree-file");

					widget.addListener("dblclick", function(e){
						if(model.getId() == -1)
							return;
						this._setParentListModel(model, false);
						vuuvv.utils.syncObject(model, this._fm, [
							"id", "label", "tooltip", "icon", "command"
						]);
					}, self);

					// drag & drop
					widget.setDraggable(true);
					widget.setDroppable(true);
					widget.addListener("dragstart", function(e) {
						e.addAction("move");
					});
					widget.addListener("drop", function(e) {
						console.log(e.getRelatedTarget());
					});
					controller.bindDefaultProperties(widget, model);
				}
			};
		},

		_setParentListModel: function(model, isNew) {
			var items = vuuvv.utils.getMenus();
			var id = model.getId();
			var pm = new qx.data.Array();
			for (var i in items) {
				if (!isNew && items[i].isAncestor(id))
					continue;
				pm.push(items[i]);
			}
			this._pc.setModel(pm);
			// make the current parent selected
			var sel = new qx.data.Array();
			var selid = isNew ? model.getId() : model.getParentId();
			sel.push(selid);
			this._pc.setSelection(sel);
		},

		getForm: function()
		{
			// form
			var form = new qx.ui.form.Form();

			// items
			var labelTxt = new qx.ui.form.TextField().set({
				required: true,
				width: 200
			});
			form.add(labelTxt, "Label");
			var tooltipTxt = new qx.ui.form.TextField();
			form.add(tooltipTxt, "Tooltip");
			var iconTxt = new qx.ui.form.TextField();
			form.add(iconTxt, "Icon");
			var commandTxt = new qx.ui.form.TextField();
			form.add(commandTxt, "Command");
			var parentBox = new qx.ui.form.SelectBox();
			form.add(parentBox, "Parent");

			// buttons
			var saveButton = new qx.ui.form.Button("Save");
			saveButton.setWidth(70);
			form.addButton(saveButton);
			var cancelButton = new qx.ui.form.Button("Cancel");
			cancelButton.setWidth(70);
			form.addButton(cancelButton);


			this._fm = this._getFormModelSkel();
			this._fc = new qx.data.controller.Form(this._fm, form);

			this._pc = new qx.data.controller.List(null, parentBox);
			this._pc.setDelegate({bindItem: function(controller, item, index) {
				controller.bindProperty("label", "label", null, item, index);
				controller.bindProperty("id", "model", null, item, index);
			}});

			// serialization and reset /////////
			saveButton.addListener("execute", function() {
				if (form.validate()) {
					//TODO: First send a requst to server ask updating the database.
					//TODO: create a class of submit buttons.

					var url = "/admin/menu/save"
					var req = new qx.io.remote.Request(url, "POST");
					req.setTimeout(180000);
					req.setProhibitCaching(false);
					var data = qx.util.Serializer.toUriParameter(this._fc.getModel());
					req.setData(data);
					req.send();

					// following code should be in the callback function of request completed event
					//var id = this._fm.getId();
					//var menus = vuuvv.utils.getMenus();
					//var menuModel = menus[id];
					//vuuvv.utils.syncObject(this._fm, menuModel, ["label", "icon", "tooltip", "command"]);
					//var opid = menuModel.getParentId();
					//var npid = this._fm.getParent();
					//if (opid != npid) {
					//	var old = menuModel.getParent();
					//	var cur = menus[npid];
					//	old.getChildren().remove(menuModel);
					//	cur.getChildren().push(menuModel);
					//	menuModel.setParent(cur);
					//} 
					//this.debug("You are saving: " + qx.util.Serializer.toUriParameter(this._fc.getModel()));
				}
			}, this);
			cancelButton.addListener("execute", form.reset, form);

			return form
		},

		_getFormModelSkel: function() {
			var modelSkeleton = {
				id: -1,
				label: null,
				tooltip: null,
				icon: null,
				command: null,
				parent: []
			};
			return qx.data.marshal.Json.createModel(modelSkeleton);
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
					this._fm = this._getFormModelSkel();
					this._fc.setModel(this._fm);
					this._setParentListModel(model, true);
				} else {
					alert("You should select only one item!");
				}
			}, this);
			return commandFrame;
		}

	},

	destruct: function()
	{
		this._disposeObjects("_tree", "_form", "_tc", "_fc", "_pc", "_fm");
	}
});
