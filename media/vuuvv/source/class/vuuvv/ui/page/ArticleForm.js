/**
#require(qx.ui.form.DateField)
*/
qx.Class.define("vuuvv.ui.page.ArticleForm", {
	extend: qx.ui.window.Window,

	construct: function() {
		this.base(arguments);
		this.setLayout(new qx.ui.layout.VBox);
		this._createWidgetContent();
		this.center();
	},

	members: {
		_createWidgetContent: function() {
			var form = new vuuvv.ui.Form("Article", this._getProto());
			this.add(form);
			this._form = form;
			this._form.addListener("save", this._onSave, this);
		},

		setData: function(data) {
			this._form.setModel(data.article);
			this._form.setModel(data.category, "category_id");
			var sel = new qx.data.Array();
			sel.push(data.article.category_id);
			console.log(sel);
			this._form.getController("category_id").setSelection(sel);
		},

		reset: function() {
			this._form.reset();
		},

		_onSave: function(e) {
			var data = e.getData();
			var url = "/admin/save/Article";
			var req = new qx.io.remote.Request(url, "POST", "application/json");
			req.setData(data);
			req.send();
		},

		_getProto: function() {
			return {
				title: {
					init: "",
					type: "TextField"
				},
				thumbnail: {
					init: "",
					type: "TextField"
				},
				content: {
					init: "",
					type: "HtmlArea"
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
