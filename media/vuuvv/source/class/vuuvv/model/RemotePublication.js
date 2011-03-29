qx.Class.define('vuuvv.model.RemotePublication', {
	extend: qx.ui.table.model.Remote,

	construct: function() {
		this.base(arguments);
		this.setColumns(["category", "creation_date", "title", "link"]);
	},

	properties: {
	},

	members: {
		// overloaded - called whenever the table request the row count
		_loadRowCount: function() {
			var url = "/admin/publicationcount"
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
			var url = ["/admin/publication", firstRow, lastRow].join("/")
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
