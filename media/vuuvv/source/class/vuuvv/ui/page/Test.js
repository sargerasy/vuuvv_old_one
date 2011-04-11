qx.Class.define("vuuvv.ui.page.Test", {
	extend: qx.ui.window.Window,

	construct: function() {
		this.base(arguments);
		this.setLayout(new qx.ui.layout.VBox);
		this._createWidgetContent();
		this.center();
	},

	members: {
		_createWidgetContent: function() {
			var form = new qx.ui.form.Form();
			var fileuploader = new vuuvv.ui.FileUploader("/media/upload/");
			form.add(fileuploader, "file");
			this.add(new qx.ui.form.renderer.Single(form));
		}
	}
});
