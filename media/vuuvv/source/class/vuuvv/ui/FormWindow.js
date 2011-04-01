
qx.Class.define("vuuvv.ui.FormWindow", {
	extend: qx.ui.window.Window,

	construct: function(name, proto) {
		this.base(arguments);
		this.setLayout(new qx.ui.layout.VBox);
		this._createWidgetContent(name, proto);
		this.center();
	},

	events: {
		save: "qx.event.type.Data"
	},

	members: {
		_form: null,

		_createWidgetContent: function(name, proto) {
			var form = new vuuvv.ui.Form(name, proto);
			this.add(form);
			this._form = form;
			this._form.addListener("save", this._onSave, this);
		},

		reset: function() {
			this._form.reset();
		},

		_onSave: function(e) {
			console.log(e.getData());
		},

		_onSaveCompleted: function(e) {
			this.fireDataEvent("save", e.getData());
		},

		getForm: function() {
			return this._form;
		}
	},

	destruct: function() {
		this._disposeObjects("_form");
		this._form= null;
	}
});
