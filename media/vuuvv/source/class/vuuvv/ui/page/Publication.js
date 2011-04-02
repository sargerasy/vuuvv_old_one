qx.Class.define("vuuvv.ui.page.Publication", {
	extend: vuuvv.ui.page.ModelPage,

	construct: function()
	{
		this.base(arguments, "Publication", null, vuuvv.ui.ModelView);
	},

	members:
	{
		_onFormDataLoaded: function(e) {
			var data = e.getData().data;
			var form = e.getData().form;
			form.setModel(data.Category, "category_id");
			if (data.value.length > 0) {
				form.setModel(data.value[0]);
				var sel = new qx.data.Array();
				sel.push(data.value[0].category_id);
				form.getController("category_id").setSelection(sel);
			}
		},

		_getProto: function() {
			return {
				title: {
					init: "",
					type: "TextArea"
				},
				link: {
					init: "",
					type: "TextField"
				},
				category_id: {
					init: [],
					type: "SelectBox",
					delegate: {
						bindItem: function(ctrl, widget, index) {
							ctrl.bindProperty("name", "label", null, widget, index);
							ctrl.bindProperty("id", "model", null, widget, index);
						}
					}
				},
				creation_date: {
					init: vuuvv.utils.mydateFormat().format(new Date()),
					type: "DateField"
				}
			};
		}
	}
});
