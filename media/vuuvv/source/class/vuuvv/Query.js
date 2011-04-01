qx.Class.define("vuuvv.Query", {
	extend: qx.core.Object,

	construct: function() {
		this.base(arguments);
		console.log(this);
		this.setConditions([]);
		this.setFields([]);
	},

	properties: {
		name: {
			init: "",
			nullable: true
		},

		type: {
			check: ["save", "delete", "query"],
			init: "query"
		},

		conditions: {
			init: []
		},

		orderby: {
			init: null,
			nullable: true
		},

		limit: {
			init: null,
			nullable: true
		},

		value: {
			init: null,
			nullable: true
		},

		fields: {
			init: []
		}
	},

	events: {
		completed: "qx.event.type.Data",
		failed: "qx.event.type.Event",
		timeout: "qx.event.type.Event"
	},

	members: {
		query: function() {
			var req = new qx.io.remote.Request(this.getUrl(), "POST", "application/json");
			var data;
			switch (this.getType()) {
				case "query":
					data = this.parseData() || "1=1";
					break;
				case "save":
					data = this.getValue();
					break;
				case "delete":
					break;
			}
			if (data)
				req.setData(data);

			req.addListener("completed", this._onCompleted, this);
			req.addListener("failed", this._onFailed, this);
			req.addListener("timeout", this._onTimeout, this);
			req.send();
		},

		getUrl: function() {
			return ["/admin", this.getType(), this.getName()].join("/");
		},

		parseData: function() {
			var p = ["conditions", "orderby", "limit", "value", "fields"];
			var result = "";
			for(var i = 0; i < p.length; i++) {
				var name = p[i];
				var value = this.get(name);
				if (vuuvv.utils.isFalse(value))
					result += encodeURIComponent(name) + "=" + encodeURIComponent(qx.util.Json.stringify(value)) + "&";
			}
			return result.substring(0, result.length - 1);
		},

		/**
		 * Like Django's filter syntax, eg. addCondition("id", "exact", 5), to Django's id__exact=5
		 */
		addCondition: function(field, op, value) {
			this.getConditions().push([field, op, value]);
		},

		_onCompleted: function(e) {
			this.fireDataEvent("completed", e.getContent());
		},

		_onFailed: function(e) {
			this.fireEvent("failed");
		},

		_onTimeout: function(e) {
			this.fireEvent("timeout");
		}
	}
});
