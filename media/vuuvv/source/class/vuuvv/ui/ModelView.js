qx.Class.define("vuuvv.ui.ModelView", {
	extend: qx.ui.container.Composite,

	construct: function(name, proto, columns) {
		this.base(arguments, new qx.ui.layout.VBox);
		this.setBackgroundColor("background-splitpane");

		this.setName(name);
		this.setProto(proto);
		if (!columns) {
			columns = [];
			for (var i in this._proto) {
				columns.push(i);
			}
		}
		this.setColumns(columns);

		this._createContent();
	},

	properties: {
		name: {
			nullable: true
		},

		columns: {
			init: []
		},

		commands: {
			init: {} 
		}
	},

	events: {
		formDataLoaded: "qx.event.type.Data"
	},

	members: {
		_proto: null,
		_table: null,
		_formWindow: null,

		setProto: function(proto) {
			this._proto = proto;
		},

		getProto: function() {
			return this._proto;
		},

		_createContent: function() {
			this._createCommands(this.getCommandNames());
			this.add(this._createToolbar());
			this.add(this._createTable());
		},

		_createToolbar: function() {
			var toolbar = new qx.ui.toolbar.ToolBar();
			var commands = this.getCommands();
			for (var name in commands) {
				toolbar.add(new qx.ui.toolbar.Button("", "", commands[name]));
			}
			return toolbar;
		},

		_createCommands: function(names) {
			var commands = this.getCommands();
			var command, name;
			for (var i = 0; i < names.length; i++) {
				command = new qx.ui.core.Command();
				name = qx.lang.String.firstUp(names[i]);
				command.setLabel(name);
				command.addListener("execute", this["_on" + name], this);
				commands[names[i]] = command;
			}
			this.setCommands(commands);
		},

		getCommand: function(name) {
			return this.getCommands[name];
		},

		getFormWindow: function() {
			if (!this._formWindow)
				this._formWindow = new vuuvv.ui.FormWindow(this.getName(), this._proto);
			return this._formWindow;
		},

		reload: function() {
			this._table.getTableModel().reloadData();
		},

		_createTable: function() {
			var cls = this.getTableModelClass();
			var model = new cls(this.getName(), this.getColumns());
			this._table = new qx.ui.table.Table(model);
			this._table.addListener("cellDblclick", this._onDblclick, this);
			return this._table;
		},

		_onEdit: function(e) {
			var row = this._table.getSelectionModel().getSelectedRanges()[0].minIndex;
			var id = this._table.getTableModel().getRowData(row).id;
			this._edit(id);
		},

		_onLoadDataCompleted: function(e) {
			var data = e.getData();
			var win = this.getFormWindow();
			win.show();
			this.fireDataEvent("formDataLoaded", {"data": data, "form": win.getForm()});
		},

		//override
		_onNew: function() {
			this.getFormWindow().reset();
			this._edit(-1);
		},

		//override
		_edit: function(id) {
			var q = new vuuvv.Query;
			q.addListener("completed", this._onLoadDataCompleted, this);
			q.setName(this.getName())
			q.addCondition("id", "exact", id);
			q.query();
		},

		//override
		_onDelete: function() {
		},

		//override
		_onFind: function() {
		},

		//override
		_onReload: function() {
			this.reload();
		},

		//override
		_onDblclick: function(e) {
			this._onEdit(e);
		},

		//override
		getCommandNames: function() {
			return ["new", "delete", "edit", "find", "reload"];
		},

		//overrride
		getTableModelClass: function() {
			return vuuvv.model.Remote;
		}
	},

	destruct: function() {
		this._disposeObjects("_proto", "_table", "_formWindow");
		this._proto = null;
		this._table = null;
		this._formWindow = null;
	}
});