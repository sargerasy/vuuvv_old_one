/**
#require(qx.ui.form.DateField)
*/
qx.Class.define("vuuvv.ui.page.PublicationForm", {
	extend: qx.ui.window.Window,

	construct: function() {
		this.base(arguments);
		this.setLayout(new qx.ui.layout.VBox);
		this._createWidgetContent();
		this.center();
	},

	members: {
		_createWidgetContent: function() {
			var form = new vuuvv.ui.Form("Publication", this._getProto());
			this.add(form);
			this._form = form;
			this._form.addListener("save", this._onSave, this);
		},

		setData: function(data) {
			this._form.setModel(data.publication);
			this._form.setModel(data.category, "category_id");
			var sel = new qx.data.Array();
			sel.push(data.publication.category_id);
			console.log(sel);
			this._form.getController("category_id").setSelection(sel);
		},

		reset: function() {
			this._form.reset();
		},

		_onSave: function() {
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
