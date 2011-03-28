qx.Class.define('vuuvv.model.RemoteArticle', {
	extend: qx.ui.table.model.Remote,

	construct: function() {
		this.base(arguments);
		this.setColumns(["category", "Creation Date", "title"]);
	},

	properties: {
	},

	members: {
		// overloaded - called whenever the table request the row count
		_loadRowCount: function() {
			var url = "/admin/articlecount"
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
