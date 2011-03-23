qx.Class.define('vuuvv.model.RemoteFileModel', {
	extend: qx.ui.table.model.Remote,

	construct: function() {
		this.base(arguments);
		this.setColumns(["dir", "File Name", "Size", "Last Modified"]);
		var top = "/admin/file/media/upload/";
		this.setTop(top);
		this.setUrl(top);
	},

	properties: {
		data: {
			check: "Object",
			event: "changeData",
			init: {}
		},

		url: {
			check: "String",
			event: "changeString",
			init: "",
			apply: "_applyUrl"
		},

		top: {
			check: "String",
			event: "changeTop",
			init: ""
		}
	},

	members: {
		// overloaded - called whenever the table request the row count
		_loadRowCount: function() {
			var url = this.getUrl();
			var req = new qx.io.remote.Request(url, "GET", "application/json");

			req.addListener("completed", this._onRowCountCompleted, this);
			req.send();
		},

		_onRowCountCompleted: function(e) {
			var data = e.getContent();
			if (data != null) {
				this.setData(data);
				this._onRowCountLoaded(data.length);
			}
		},

		// overloaded - called whenever the table requests new data
		_loadRowData: function() {
			var items = this.getData();
			this._onRowDataLoaded(items);
		},

		_applyUrl: function(value, old) {
			this.reloadData();
		},

		_normpath: function(url) {
			var parts = url.split("/");
			var new_parts = [];
			for (var i = 0; i < parts.length; i++) {
				var comp = parts[i];
				if (comp === "" || comp ===".")
					continue;
				if (comp === "..") { 
					if (new_parts.length > 0)
						new_parts.pop();
					continue;
				}
				new_parts.push(comp);
			}
			var path = new_parts.join("/");
			if (qx.lang.String.startsWith(url, "/"))
				path = "/" + path;
			return path;
		},

		up: function() {
			this.cd("..");
		},

		cd: function(url) {
			this.setUrl(this._genUrl(url));
		},

		cdRow: function(row) {
			var data = this.getRowData(row);
			if (data.dir)
				this.cd(this.getRowData(row)["File Name"]);
		},

		_genUrl: function(url) {
			var url = [this.getUrl(), url].join("/");
			url = this._normpath(url);
			if (!qx.lang.String.startsWith(url, this.getTop()))
				url = this.getTop();
			return url;
		},

		rowUrl: function(row) {
			var url = this._genUrl(this.getRowData(row)["File Name"]);
			return url.substring("/admin/file".length);
		}
	}
});
