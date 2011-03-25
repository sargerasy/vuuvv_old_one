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

	events: 
	{
		newPageLoaded: "qx.event.type.Event",
		oldPageLoaded: "qx.event.type.Event"
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
			var page = data.create ? this._getProtoModel() : qx.data.marshal.Json.createModel(data.page);
			this._fc.setModel(page);
			var evt = data.create ? "newPageLoaded" : "oldPageLoaded";
			this.fireEvent(evt);
		},

		getForm: function() {
			var form = new qx.ui.form.Form();

			form.add(new qx.ui.form.TextField().set({
				required: true,
				width: 200
			}), "title");
			form.add(new qx.ui.form.TextField(), "Url");
			form.add(new qx.ui.form.TextField(), "Keywords");
			form.add(new qx.ui.form.TextField(), "Desc");
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

		newPage: function() {
		},

		goPage: function(url) {
			if (url) {
				url = "/admin/page/" + url;
				this.setUrl(url);
			}
			return this;
		},

		_onSave: function() {
			if (this._form.validate()) {
				this._htmlArea.syncValue();
				var data = qx.util.Serializer.toUriParameter(this._fc.getModel());
				console.log(data);
				var url = "/admin/page/save";
				var req = new qx.io.remote.Request(url, "POST");
				req.setTimeout(180000);
				req.setProhibitCaching(false);
				req.setData(data);
				req.addListener("completed", this._onSaveCompleted, this);
				req.addListener("failed", function(e) {
					this.debug("failed");
				}, this);
				req.addListener("timeout", function(e) {
					this.debug("timeout");
				}, this);
				req.send();
			}
		},

		_onSaveCompleted: function() {
			alert("Page Saved");
			this.debug("data saved");
		},

		_getProtoModel: function() {
			var proto = {
				id: -1,
				title: "",
				url: "",
				keywords: "",
				desc: "",
				content: "",
				template: ""
			};
			return qx.data.marshal.Json.createModel(proto);
		}
	}
});
