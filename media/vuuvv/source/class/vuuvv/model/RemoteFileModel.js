qx.Class.define('vuuvv.model.RemoteFileModel', {
	extend: qx.ui.table.model.Remote,

	construct: function() {
		this.base(arguments);
		this.setColumns(["dir", "File Name", "Size", "Last Modified"]);
		var top = "/media/upload";
		var url = "/admin/file"
		this.setUrl(url);
		this.setTop(top);
		this.setPath(top);
	},

	properties: {
		data: {
			check: "Object",
			event: "changeData",
			init: {}
		},

		url: {
			check: "String",
			event: "changeUrl",
			init: ""
		},

		path: {
			check: "String",
			event: "changePath",
			init: "",
			apply: "_applyPath"
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
			var url = this.getPath();
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

		_applyPath: function(value, old) {
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
			this.setPath(this._genPath(url));
		},

		cdRow: function(row) {
			var data = this.getRowData(row);
			if (data.dir)
				this.cd(this.getRowData(row)["File Name"]);
		},

		_genPath: function(url) {
			var url = [this.getUrl(), this.getTop(), this.getPath(), url].join("/");
			url = this._normpath(url);
			if (!qx.lang.String.startsWith(url, this.getTop()))
				url = this.getTop();
			return url;
		},

		rowPath: function(row) {
			var url = this._genPath(this.getRowData(row)["File Name"]);
			return url.substring("/admin/file".length);
		},

		curPath: function() {
			var url = this._genPath("");
			return url.substring("/admin/file".length);
		}
	}
});
