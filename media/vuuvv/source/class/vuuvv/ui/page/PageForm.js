qx.Class.define("vuuvv.ui.page.PageForm", {
	extend: vuuvv.ui.LoadingFrame,

	construct: function(url)
	{
		this.base(arguments);
		this.goPage(url);
	},

	properties:
	{
		model: {
			event: "changeModel",
			nullable: true,
			init: null
		}
	},

	members:
	{
		createPage: function() {
			var container = new qx.ui.container.Composite(new qx.ui.layout.VBox());

			var groupBox = new qx.ui.groupbox.GroupBox(this.tr("Page Details"));
			groupBox.setLayout(new qx.ui.layout.Canvas());
			container.add(groupBox, {flex: 1});

			this._form = this.getForm();
			groupBox.add(new qx.ui.form.renderer.Single(this._form));

			return container;
		},

		setupPage: function(data) {
		},

		getForm: function() {
			var form = new qx.ui.form.Form();

			form.add(new qx.ui.form.TextField().set({
				required: true,
				width: 200
			}), "title");
			form.add(new qx.ui.form.TextField(), "Url");
			form.add(new qx.ui.form.TextField(), "Keywords");
			form.add(new qx.ui.form.TextField(), "Description");
			this._htmlArea = new vuuvv.ui.HtmlArea();
			form.add(this._htmlArea, "Content");
			form.add(new qx.ui.form.TextField(), "Template");

			var saveButton = new qx.ui.form.Button("Save");
			form.addButton(saveButton);
			var cancelButton = new qx.ui.form.Button("Cancel");
			form.addButton(cancelButton);

			this._fc = new qx.data.controller.Form(null, form);
			this._fc.setModel(this._getProtoModel());

			saveButton.addListener("execute", this._onSave, this);
			return form;
		},

		goPage: function(url) {
			if (url) {
				url = "/admin/page/" + url;
				this.setUrl(url);
			}
		},

		_onSave: function() {
			this._htmlArea.syncValue();
			var data = qx.util.Serializer.toUriParameter(this._fc.getModel());
			console.log(data);
		},

		_getProtoModel: function() {
			var proto = {
				id: -1,
				title: "",
				url: "",
				keywords: "",
				description: "",
				content: "",
				template: ""
			};
			return qx.data.marshal.Json.createModel(proto);
		}
	}
});
