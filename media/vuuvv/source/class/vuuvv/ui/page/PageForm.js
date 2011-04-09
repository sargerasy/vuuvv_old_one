qx.Class.define("vuuvv.ui.page.PageForm", {
	extend: vuuvv.ui.LoadingFrame,

	construct: function()
	{
		this.base(arguments);
		this.setReadyState("completed");
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
		_form: null,

		getController: function() {
			if (this._form)
				return this._form.getController();
			return null;
		},

		createPage: function() {
			var container = new qx.ui.container.Composite(new qx.ui.layout.VBox());

			var form = new vuuvv.ui.Form("Page", this._getProto());
			container.add(form);
			this._form = form;
			this._htmlArea = form.getWidget("Content");
			this._form.addListener("aftersave", this._onSave, this);

			return container;
		},

		setupPage: function(data) {
			var page = data.create ? this._form.getProtoModel() : qx.data.marshal.Json.createModel(data.page);
			this.getController().setModel(page);
			var evt = data.create ? "newPageLoaded" : "oldPageLoaded";
			this.fireEvent(evt);
		},

		reset: function() {
			this._form.reset();
		},

		goPage: function(url) {
			if (url) {
				url = "/admin/page/" + url;
				this.setUrl(url);
			}
			return this;
		},

		goPageId: function(id) {
			if (id) {
				var url = "/admin/page/id/" + id;
				this.setUrl(url);
			}
			return this;
		},

		_onSave: function(e) {
			var data = e.getData();
			console.log(e.getData());
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
		},

		_onSaveCompleted: function() {
			alert("Page Saved");
			this.debug("data saved");
		},

		_getProto: function() {
			return {
				title: {
					init: "",
					type: "TextField"
				},
				url: {
					init: "",
					type: "TextField"
				},
				keywords: {
					init: "",
					type: "TextArea"
				},
				desc: {
					init: "",
					type: "TextArea"
				},
				content: {
					init: "",
					type: "HtmlArea"
				},
				template: {
					init: "normal",
					type: "TextField"
				}
			};
		}
	}
});
