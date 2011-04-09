qx.Class.define('vuuvv.model.Remote', {
	extend: qx.ui.table.model.Remote,

	construct: function(modelName, columns, related) {
		this.base(arguments);
		this.setModelName(modelName);
		if (columns)
			this.setColumns(columns);
		this.setFields(columns);
		this.setRelated(related);
	},

	properties: {
		modelName: {
			init: ""
		},

		fields: {
			init: []
		},

		related: {
			init: null,
			nullable: true
		}
	},

	members: {
		// overloaded - called whenever the table request the row count
		_loadRowCount: function() {
			var q = new vuuvv.Query;
			q.addListener("completed", this._onRowCountCompleted, this);
			q.setType("count");
			q.setName(this.getModelName());
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
			q.setType("related_query");
			q.setName(this.getModelName());
			q.setLimit([firstRow, lastRow]);
			q.setFields(this.getFields());
			q.setRelated(this.getRelated());
			q.query();
		},

		_onLoadDataCompleted: function(e) {
			var data = e.getData();
			this._onRowDataLoaded(data.value);
		}
	}
});
