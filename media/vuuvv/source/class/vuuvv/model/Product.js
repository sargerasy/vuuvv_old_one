qx.Class.define("vuuvv.model.Product", {
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

		name: {
			check: "String",
			event: "changeName"
		},

		thumbnail: {
			check: "String",
			event: "changeThumbnail",
			init: "/"
		},

		image: {
			check: "String",
			event: "changeImage"
		}
	}
});
