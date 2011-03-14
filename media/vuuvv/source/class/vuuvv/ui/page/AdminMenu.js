qx.Class.define("vuuvv.ui.page.AdminMenu", {
	extend: qx.ui.container.Composite,

	construct: function()
	{
		this.base(arguments);
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
		// Tree Widget
		_tree: null,
		// Form Widget
		_form: null,
		// Tree Controller
		_tc: null,
		// Form Controller
		_fc: null,
		// Parent Field in form Controller
		_pc: null,

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
						vuuvv.utils.syncObject(model, this._fc.getModel(), [
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
				if (!isNew && items[i].isDescendance(id))
					continue;
				pm.push(items[i]);
			}
			this._pc.setModel(pm);
			// make the current parent selected
			var selid = isNew ? model.getId() : model.getParentId();
			this._setSelection(this._pc, selid);
		},

		_setSelection: function(controller, target) {
			var sel = new qx.data.Array();
			sel.push(target);
			controller.setSelection(sel);
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


			this._fc = new qx.data.controller.Form(this._getFormModelSkel(), form);

			this._pc = new qx.data.controller.List(null, parentBox);
			this._pc.setDelegate({bindItem: function(controller, item, index) {
				controller.bindProperty("label", "label", null, item, index);
				controller.bindProperty("id", "model", null, item, index);
			}});

			// serialization and reset /////////
			saveButton.addListener("execute", this._onSave, this);
			cancelButton.addListener("execute", form.reset, form);

			return form
		},


		_onDelete: function() {
			var sel = this._tc.getSelection();
			var data = {"ids": []};
			var items = [];
			for (var i = 0; i < sel.length; i++) {
				var item = sel.getItem(i);
				// handler the root node delete
				if (item.getId() == -1) {
					items = item.getChildren();
					data = {"ids": []};
					for (var j = 0; j < items.length; j++) {
						data.ids.push(items.getItem(j).getId());
					}
					break;
				}

				// normal condition
				var valid = true;
				for (var j = 0; j < items.length; j++) {
					if (items[j].isDescendance(item.getId())) {
						valid = false;
						items[j] = item;
						data.ids[j] = item.getId();
						break;
					}
					if (item.isDescendance(items[j].getId())) {
						valid = false;
						break;
					}
				}
				if (valid) {
					data.ids.push(item.getId());
					items.push(item);
				}
			}
			data = qx.util.Serializer.toUriParameter(qx.data.marshal.Json.createModel(data));
			var url = "/admin/menu/remove"
			var req = new qx.io.remote.Request(url, "POST");
			req.setTimeout(180000);
			req.setProhibitCaching(false);
			req.setData(data);
			req.addListener("completed", this._onDeleteCompleted, this);

			req.send();
		},

		_onDeleteCompleted: function(e) {
			var data = eval("(" + e.getContent() + ")");
			var menus = vuuvv.utils.getMenus();
			for (var i = 0; i < data.ids.length; i++) {
				var id = data.ids[i];
				var menu = menus[id];
				menu.getParent().getChildren().remove(menu);
				var descen = menu.getDescendance();
				for (var j = 0; j < descen.length; j++)
					delete menus[descen[j].getId()];
				delete menus[id];
			}
		},

		_onSave: function(e) {
			if (this._form.validate()) {
				//TODO: create a class of submit buttons.
				var url = "/admin/menu/save"
				var req = new qx.io.remote.Request(url, "POST");
				req.setTimeout(180000);
				req.setProhibitCaching(false);
				var data = qx.util.Serializer.toUriParameter(this._fc.getModel());
				req.setData(data);

				req.addListener("completed", this._onSaveCompleted, this);
				req.addListener("failed", function(e) {
					this.debug("failed");
				}, this);
				req.addListener("timeout", function(e) {
					this.debug("timeout");
				}, this);
				req.send();
			}
		},

		_onSaveCompleted: function(e) {
			var model;
			var menus = vuuvv.utils.getMenus();
			var data = eval("(" + e.getContent() + ")");
			var id = data.id;
			var formModel = this._fc.getModel();
			var pid = formModel.getParent();
			if(data.create) {
				model = new vuuvv.model.AdminMenu();
				model.setId(id);
				menus[id] = model;
				menus[pid].getChildren().push(model);
				model.setParent(menus[pid]);
			} else {
				model = menus[id];
				var opid = model.getParentId();
				if (opid != pid) {
					var old = model.getParent();
					var cur = menus[pid];
					old.getChildren().remove(model);
					cur.getChildren().push(model);
					model.setParent(cur);
				} 
			}
			vuuvv.utils.syncObject(formModel, model, ["label", "icon", "tooltip", "command"]);
			this._setSelection(this._tc, model);
		},

		_getFormModelSkel: function() {
			var modelSkeleton = {
				id: -1,
				label: "",
				tooltip: "",
				icon: "",
				command: "",
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
					this._fc.setModel(this._getFormModelSkel());
					this._setParentListModel(model, true);
				} else {
					alert("You should select only one item!");
				}
			}, this);

			delBtn.addListener("execute", this._onDelete, this);
			return commandFrame;
		}
	},

	destruct: function()
	{
		this._disposeObjects("_tree", "_form", "_tc", "_fc", "_pc", "_fm");
	}
});
