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

		tag: {
			check: "String",
			event: "changeUrl"
		},

		order: {
			check: "Integer",
			event: "changeOrder"
		},

		page_id: {
			event: "changePage_id",
			nullable: true
		}
	}
});
