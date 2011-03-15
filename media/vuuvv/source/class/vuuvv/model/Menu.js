qx.Class.define("vuuvv.model.Menu", {
	extend: vuuvv.model.Tree,

	construct: function() {
		this.base(arguments);
	},

	properties:
	{
		id: {
			event: "changeId",
			nullable: true
		},

		label: {
			check: "String",
			event: "changeLabel"
		},

		url: {
			check: "String",
			event: "changeUrl",
			init: "/"
		},

		order: {
			check: "Integer",
			event: "changeOrder"
		},

		level: {
			check: "Integer",
			event: "changeLevel",
			init: 0
		}
	}
});
