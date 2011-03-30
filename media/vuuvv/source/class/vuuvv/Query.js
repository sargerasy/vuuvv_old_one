qx.Class.define("vuuvv.Query", {
	extend: qx.core.Object,

	construct: function() {
		this.base(arguments);
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

		order: {
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
			req.setData(this.parseData());

			req.addListener("completed", this._onCompleted, this);
			req.addListener("failed", this._onFailed, this);
			req.addListener("timeout", this._onTimeout, this);
			req.send();
		},

		getUrl: function() {
			return ["/admin", this.getType(), this.getName()].join("/");
		},

		parseData: function() {
			var p = ["conditions", "order", "limit", "value", "fields"];
			var result = "";
			for(var i = 0; i < p.length; i++) {
				var name = p[i];
				var value = this.get(name);
				console.log(value)
				console.log(value != [])
				console.log(value !== [])
				console.log(value !== [] && value !== {})
				if (value && value !== [] && value !== {})
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
