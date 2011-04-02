qx.Class.define("vuuvv.ui.page.Award", {
	extend: vuuvv.ui.page.ModelPage,

	construct: function()
	{
		this.base(arguments, "Award", null, vuuvv.ui.ModelView);
	},

	members:
	{
		_onFormDataLoaded: function(e) {
			var data = e.getData().data;
			var form = e.getData().form;
			if (data.value.length > 0) {
				form.setModel(data.value[0]);
			}
		},

		_getProto: function() {
			return {
				name: {
					init: "",
					type: "TextField"
				},
				thumbnail: {
					init: "",
					type: "TextField"
				},
				image: {
					init: "",
					type: "TextField"
				},
				year: {
					init: new Date().getYear(),
					type: "TextField"
				}
			};
		}
	}
});
