qx.Class.define('vuuvv.model.Remote', {
	extend: qx.ui.table.model.Remote,

	construct: function(columns, countUrl, summaryUrl, modelName) {
		this.base(arguments);
		this.setSummaryUrl(summaryUrl);
		this.setModelName(modelName);
		this.setColumns(columns);
	},

	properties: {
		modelName: {
			init: ""
		},

		countUrl: {
			init: null,
			nullable: true
		},

		summaryUrl: {
			init: null,
			nullable: true
		}
	},

	members: {
		// overloaded - called whenever the table request the row count
		_loadRowCount: function() {
			var url = "/admin/count/" + this.getModelName();
			var req = new qx.io.remote.Request(url, "GET", "application/json");
			req.addListener("completed", this._onRowCountCompleted, this);
			req.send();
		},

		_onRowCountCompleted: function(e) {
			var data = e.getContent();
			if (data != null) {
				this._onRowCountLoaded(data.count);
			}
		},

		// overloaded - called whenever the table requests new data
		_loadRowData: function(firstRow, lastRow) {
			var url = ["/admin/article", firstRow, lastRow].join("/")
			var req = new qx.io.remote.Request(url, "GET", "application/json");

			req.addListener("completed", this._onLoadDataCompleted, this);
			req.send();
		},

		_onLoadDataCompleted: function(e) {
			var data = e.getContent();
			this._onRowDataLoaded(data);
		}
	}
});
