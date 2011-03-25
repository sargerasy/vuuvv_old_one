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

		createPage: function() {
			this._createCommands();
			var mainsplit = new qx.ui.splitpane.Pane("horizontal");

			var treeFrame = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
			treeFrame.setBackgroundColor("background-splitpane");
			treeFrame.add(this.getCommandFrame());

			this._tree = this.getTree();
			treeFrame.add(this._tree, {flex: 1});

			mainsplit.add(treeFrame, 0);

			this._editarea = this.getEditArea();
			mainsplit.add(this._editarea);

			return mainsplit;
		},

		setupPage: function(data) {
			data = data.nav;
			this._lookup = vuuvv.model.Tree.create(data, vuuvv.model.Menu, "parent_id", "order");
			var model = this._lookup[-1];
			this._tc.setModel(model);
			this._tree.getRoot().setOpen(true);
		},

		getTree: function() {
			var tree = new qx.ui.tree.Tree();
			tree.set({width: 300});
			tree.setSelectionMode("multi");

			var ctrl = new qx.data.controller.Tree(null, tree, "children", "label");
			ctrl.setDelegate(this._getTreeDelegate());
			this._tc = ctrl;

			return tree;
		},

		getEditArea: function() {
			var editarea = new qx.ui.container.Stack();

			var menueditor = new qx.ui.groupbox.GroupBox(this.tr("Menu Details"));
			menueditor.setLayout(new qx.ui.layout.Canvas());
			this._menuForm = this.getMenuForm();
			menueditor.add(new qx.ui.form.renderer.Single(this._menuForm));
			editarea.add(menueditor);

			var pageeditor = new vuuvv.ui.page.PageForm();
			editarea.add(pageeditor);

			this._pageeditor = pageeditor;
			this._menueditor = menueditor;

			return editarea;
		},

		toMenuEditor: function() {
			this._editarea.setSelection([this._menueditor]);
		},

		toPageEditor: function() {
			this._editarea.setSelection([this._pageeditor]);
		},

		getCommandFrame: function() {
			var box = new qx.ui.layout.HBox();
			var commandFrame = new qx.ui.container.Composite(box);
			box.setSpacing(5);

			var newBtn = new qx.ui.form.Button("", "", this._new);
			var editBtn = new qx.ui.form.Button("", "", this._edit);
			var delBtn = new qx.ui.form.Button("", "", this._delete);
			var editPageBtn = new qx.ui.form.Button("", "", this._editPage);

			commandFrame.add(newBtn, {flex: 1});
			commandFrame.add(editBtn, {flex: 1});
			commandFrame.add(delBtn, {flex: 1});
			commandFrame.add(editPageBtn, {flex: 1});

			return commandFrame;
		},

		_getTreeContextMenu: function() {
			var menu = new qx.ui.menu.Menu;

			var newBtn = new qx.ui.menu.Button("", "", this._new);
			var editBtn = new qx.ui.menu.Button("", "", this._edit);
			var delBtn = new qx.ui.menu.Button("", "", this._delete);
			var editPageBtn = new qx.ui.menu.Button("", "", this._editPage);

			menu.add(newBtn);
			menu.add(editBtn);
			menu.add(delBtn);
			menu.add(editPageBtn);

			return menu;
		},

		getMenuForm: function() {
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

		_onEdit: function() {
			this.toMenuEditor();
			var model = this._tc.getSelection().getItem(0);
			this._editModel(model);
		},

		_onEditPage: function() {
			this.toPageEditor();
			var model = this._tc.getSelection().getItem(0);
			if (model.getId() == -1)
				return;
			var page = this._pageeditor.goPage(model.getUrl());
			page.addListener("newPageLoaded", function() {
				page._fc.getModel().setUrl(model.getUrl());
				page._fc.getModel().setTitle(model.getLabel());
			}, this);
		},

		_onNew: function() {
			this.toMenuEditor();
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
			nodes = vuuvv.model.Tree.findRoots(nodes);
			var proto = {"ids": []};
			for (var i = 0; i < nodes.length; i++) {
				proto.ids.push(nodes[i].getId());
			}

			var data = qx.util.Serializer.toUriParameter(qx.data.marshal.Json.createModel(proto));
			var url = "/admin/nav/remove"
			var req = new qx.io.remote.Request(url, "POST");
			req.setTimeout(180000);
			req.setProhibitCaching(false);
			req.setData(data);
			req.addListener("completed", this._onDeleteCompleted, this);

			req.send();
		},

		_onDeleteCompleted: function(e) {
			var data = eval("(" + e.getContent() + ")");
			for (var i = 0; i < data.ids.length; i++) {
				var id = data.ids[i];
				var node = this._lookup[id];
				node.rm();
				var self = this;
				node.map(function() {
					// this point to the node object;
					delete self._lookup[this.getId()];
				}, []);
			}
		},

		_onSave: function(e) {
			if (this._menuForm.validate()) {
				var url = "/admin/nav/save";
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
			var data = eval("(" + e.getContent() + ")");
			var id = data.id;
			var fm = this._fc.getModel();
			var pid = fm.getParent();
			var parent = this._lookup[pid];
			var model = data.create ? new vuuvv.model.Menu() : this._lookup[id];
			fm.setId(id);
			model.setLevel(parent.getLevel() + 1);
			vuuvv.utils.syncObject(fm, model, ["id", "label", "url", "order", "level"]);
			if (data.create) {
				parent.add(model, "order");
				this._lookup[id] = model;
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
						this._editModel(model);
					}, self);
					widget.setContextMenu(self._getTreeContextMenu());

					self._enableTreeDnd(widget);
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
		},

		_editModel: function(model) {
			if (model.getId() == -1)
				return;
			this._setParentListModel(model, false);
			vuuvv.utils.syncObject(model, this._fc.getModel(),[
				"id", "label", "url", "order", "level"
			]);
		},

		_createCommands: function() {
			this._new = new qx.ui.core.Command();
			this._new.setLabel("New");
			this._new.addListener("execute", this._onNew, this);

			this._delete = new qx.ui.core.Command();
			this._delete.setLabel("Delete");
			this._delete.addListener("execute", this._onDelete, this);

			this._editPage = new qx.ui.core.Command();
			this._editPage.setLabel("Edit Page");
			this._editPage.addListener("execute", this._onEditPage, this);

			this._edit = new qx.ui.core.Command();
			this._edit.setLabel("Edit");
			this._edit.addListener("execute", this._onEdit, this);
		},

		_enableTreeDnd: function(widget) {
			widget.setDraggable(true);
			widget.setDroppable(true);
			widget.addListener("dragstart", function(e) {
				e.addAction("move");
			});
			widget.addListener("drop", function(e) {
				console.log(e.getRelatedTarget());
			});
		}

	},

	destruct: function()
	{
		this._disposeObjects("_tree", "_form", "_tc", "_fc", "_pc", 
							"_lookup", "_new", "_delete", "_editPage", "_edit",
							"_pageeditor", "_menueditor", "_editarea"
		);
	}
});
