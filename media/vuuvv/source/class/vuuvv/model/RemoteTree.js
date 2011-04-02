qx.Class.define('vuuvv.model.RemoteTree', {
	extend: qx.ui.table.model.Remote,

	construct: function(modelName, columns) {
		this.base(arguments);
		this.setModelName(modelName);
		if (columns)
			this.setColumns(columns);
		this.setFields(columns);
	},

	properties: {
		modelName: {
			init: ""
		},

		fields: {
			init: []
		},

		parent: {
			init: null,
			apply: "_applyParent",
			nullable: true
		}
	},

	members: {
		_applyParent: function(value, old) {
			this.reloadData();
		},

		// overloaded - called whenever the table request the row count
		_loadRowCount: function() {
			var q = new vuuvv.Query;
			q.addListener("completed", this._onRowCountCompleted, this);
			q.setType("count");
			q.setName(this.getModelName());
			q.addCondition("parent", "exact", this.getParent());
			q.query();
		},

		_onRowCountCompleted: function(e) {
			var data = e.getData();
			if (data != null) {
				this._onRowCountLoaded(data.value);
			}
		},

		// overloaded - called whenever the table requests new data
		_loadRowData: function(firstRow, lastRow) {
			var q = new vuuvv.Query;
			q.addListener("completed", this._onLoadDataCompleted, this);
			q.setName(this.getModelName());
			q.setLimit([firstRow, lastRow]);
			q.setFields(this.getFields());
			q.addCondition("parent", "exact", this.getParent());
			q.query();
		},

		_onLoadDataCompleted: function(e) {
			var data = e.getData();
			this._onRowDataLoaded(data.value);
		},

		up: function() {
		},

		enter: function(id) {
			this.setParent(id);
		}
	}
});
