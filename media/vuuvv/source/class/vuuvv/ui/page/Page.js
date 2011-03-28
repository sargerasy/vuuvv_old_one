qx.Class.define("vuuvv.ui.page.Page", {
	extend: vuuvv.ui.LoadingFrame,

	construct: function()
	{
		this.base(arguments, "/admin/pages");
	},

	members:
	{
		_lookup: null,

		createPage: function() {
			this._createCommands();
			var mainsplit = new qx.ui.splitpane.Pane("horizontal");

			var listFrame = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
			listFrame.setBackgroundColor("background-splitpane");
			//listFrame.add(this.getCommandFrame());

			this._list = this.getList();
			listFrame.add(this._list, {flex: 1});

			mainsplit.add(listFrame, 0);

			this._form = new vuuvv.ui.page.PageForm();
			mainsplit.add(this._form);


			return mainsplit;
		},

		setupPage: function(data) {
			var model = qx.data.marshal.Json.createModel(data);
			this._lc.setModel(model)
		},

		getList: function() {
			var list = new qx.ui.form.List();
			list.set({width: 300});
			list.setSelectionMode("multi");
			this._lc = new qx.data.controller.List(null, list);
			this._lc.setDelegate(this._getDelegate());
			return list;
		},

		_createCommands: function() {
			this._new = new qx.ui.core.Command();
			this._new.setLabel("New");
			this._new.addListener("execute", this._onNew, this);

			this._delete = new qx.ui.core.Command();
			this._delete.setLabel("Delete");
			this._delete.addListener("execute", this._onDelete, this);

			this._edit = new qx.ui.core.Command();
			this._edit.setLabel("Edit");
			this._edit.addListener("execute", this._onEdit, this);
		},

		_onNew: function() {
			this._form.reset();
		},

		_onDelete: function() {
			var items = this._lc.getSelection();
			var proto = {"ids": []};
			for (var i = 0; i < items.length; i++) {
				proto.ids.push(items[i].getId());
			}
			var data = qx.util.Serializer.toUriParameter(qx.data.marshal.Json.createModel(proto));
			var url = "/admin/page/remove"
			var req = new qx.io.remote.Request(url, "POST");
			req.setTimeout(180000);
			req.setProhibitCaching(false);
			req.setData(data);
			req.addListener("completed", this._onDeleteCompleted, this);

			req.send();
		},

		_onDeleteCompleted: function(e) {
			var data = eval("(" + e.getContent() + ")");
			var model = this._lc.getModel();
			for (var i = 0; i < data.ids.length; i++) {
				var id = data.ids[i];
				for (var j = 0; j < model.length; j++) {
					var item = model.getItem(j)
					if (item.getId() == id) {
						model.removeAt(j);
						break;
					}
				}
			}
		},

		_onEdit: function() {
			var model = this._lc.getSelection().getItem(0);
			console.log(model);
			var page = this._form.goPageId(model);
		},

		_getContextMenu: function() {
			var menu = new qx.ui.menu.Menu;

			var newBtn = new qx.ui.menu.Button("", "", this._new);
			var editBtn = new qx.ui.menu.Button("", "", this._edit);
			var delBtn = new qx.ui.menu.Button("", "", this._delete);

			menu.add(newBtn);
			menu.add(editBtn);
			menu.add(delBtn);

			return menu;
		},

		/**
		 * Left side widget delegate
		 */
		_getDelegate: function() {
			var self = this;
			return {
				bindItem: function(ctrl, widget, index) {
					ctrl.bindProperty("url", "label", null, widget, index);
					ctrl.bindProperty("id", "model", null, widget, index);
					widget.setContextMenu(self._getContextMenu());
				}
			};
		}
	}
});
