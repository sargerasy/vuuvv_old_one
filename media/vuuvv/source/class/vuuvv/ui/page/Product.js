qx.Class.define("vuuvv.ui.page.Product", {
	extend: vuuvv.ui.page.ModelPage,

	construct: function()
	{
		this.base(arguments, "Menu", ["label", "url", "order", "parent"], vuuvv.ui.TreeModelView);
	},

	members:
	{
		_onFormDataLoaded: function(e) {
			var data = e.getData().data;
			var form = e.getData().form;
			form.setModel(data.Menu, "parent_id");
			if (data.value.length > 0) {
				form.setModel(data.value[0]);
				var sel = new qx.data.Array();
				sel.push(data.value[0].parent_id);
				form.getController("parent_id").setSelection(sel);
			}
		},

		_getProto: function() {
			return {
				label: {
					init: "",
					type: "TextField"
				},
				url: {
					init: "",
					type: "TextField"
				},
				order: {
					init: 0,
					type: "TextField"
				},
				parent_id: {
					init: [],
					type: "SelectBox",
					delegate: {
						bindItem: function(ctrl, widget, index) {
							ctrl.bindProperty("url", "label", null, widget, index);
							ctrl.bindProperty("id", "model", null, widget, index);
						}
					}
				}
			};
		}
	}
});
