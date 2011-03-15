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

			this._form = this.getForm();
			groupBox.add(new qx.ui.form.renderer.Single(this._form));

			return mainsplit;
		},

		getTree: function(data) {
			this._lookup = vuuvv.model.Tree.create(data, vuuvv.model.Menu, "parent_id", "order");
			var model = this._lookup[-1]
			model.map(function(){ this.debug(this.pwd("tag").join("/")); }, [], true);
			var tree = new qx.ui.tree.Tree();
			tree.set({width: 300});
			tree.setSelectionMode("multi");

			var ctrl = new qx.data.controller.Tree(null, tree, "children", "label");
			ctrl.setDelegate(this._getTreeDelegate());
			ctrl.setModel(model);
			this._tc = ctrl;

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

			newBtn.addListener("execute", this._onNew, this);
			delBtn.addListener("execute", this._onDelete, this);

			return commandFrame;
		},

		getForm: function() {
			var form = new qx.ui.form.Form();
			form.add(new qx.ui.form.TextField().set({
				required: true,
				width: 200
			}), "Label");
			form.add(new qx.ui.form.TextField().set({
				required: true
			}), "Url");
			form.add(new qx.ui.form.TextField().set({
				required: true
			}), "Order");

			var parentBox = new qx.ui.form.SelectBox();
			form.add(parentBox, "Parent");

			this._fc = new qx.data.controller.Form(null, form);

			this._fc.addBindingOptions("Order", {converter : function(data) {
				// model --> target
				return data + "";
			}}, {converter : function(data) {
				// target --> model
				return parseInt(data);
			}}); 
			this._fc.setModel(this._getProtoModel());

			this._pc = new qx.data.controller.List(null, parentBox);
			this._pc.setDelegate({bindItem: function(controller, item, index) {
				controller.bindProperty("url", "label", null, item, index);
				controller.bindProperty("id", "model", null, item, index);
			}});

			var saveButton = new qx.ui.form.Button("save");
			form.addButton(saveButton);
			var cancelButton = new qx.ui.form.Button("Cancel");
			form.addButton(cancelButton);

			saveButton.addListener("execute", this._onSave, this);
			return form;
		},

		_onNew: function() {
			var s = this._tc.getSelection();
			if (s.length == 1) {
				var model = s.getItem(0);
				this._fc.setModel(this._getProtoModel());
				this._setParentListModel(model, true);
			} else {
				alert("You should select only one item!");
			}
		},

		_onDelete: function() {
			var nodes = this._tc.getSelection();
			console.log(nodes.toArray());
			nodes = vuuvv.model.Tree.findRoots(nodes);
			console.log(nodes);
		},

		_onSave: function(e) {
			if (this._form.validate()) {
				var url = "/admin/nav/save";
				var req = new qx.io.remote.Request(url, "POST");
				req.setTimeout(180000);
				req.setProhibitCaching(false);
				var data = qx.util.Serializer.toUriParameter(this._fc.getModel());
				console.log(data);
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
			var data = eval("(" + e.getContent() + ")");
			var id = data.id;
			var fm = this._fc.getModel();
			var pid = fm.getParent();
			var parent = this._lookup[pid];
			var model = data.create ? new vuuvv.model.Menu() : this._lookup[id];
			model.setLevel(parent.getLevel() + 1);
			vuuvv.utils.syncObject(fm, model, ["label", "url", "order", "level"]);
			if (data.create) {
				model.setId(id);
				parent.add(model, "order");
			} else {
				model.moveto(parent, "order");
			}
			this._setSelection(this._tc, model);
		},

		_getProtoModel: function() {
			var proto = {
				id: -1,
				label: "",
				url: "",
				order: 0,
				level: 0,
				parent: []
			};
			return qx.data.marshal.Json.createModel(proto);
		},

		_getTreeDelegate: function() {
			var self = this;
			return {
				bindItem: function(controller, widget, model) {
					widget.addListener("dblclick", function(e) {
						console.log(model);
						if (model.getId() == -1)
							return;
						this._setParentListModel(model, false);
						vuuvv.utils.syncObject(model, this._fc.getModel(),[
							"id", "label", "url", "order", "level"
						]);
					}, self);

					controller.bindDefaultProperties(widget, model);
				}
			};
		},

		_setParentListModel: function(node, isNew) {
			var m = new qx.data.Array();
			for (var i in this._lookup) {
				var val = this._lookup[i];
				if (!isNew && val.isDescendantOf(node, true))
					continue;
				m.push(val);
			}
			this._pc.setModel(m);
			var s = isNew ? node.getId() : node.getParent().getId();
			this._setSelection(this._pc, s);
		},

		_setSelection: function(controller, target) {
			var s = new qx.data.Array();
			s.push(target);
			controller.setSelection(s);
		}

	},

	destruct: function()
	{
		this._disposeObjects("_lookup");
	}
});
