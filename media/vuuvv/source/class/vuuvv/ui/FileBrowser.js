qx.Class.define("vuuvv.ui.FileBrowser", {
	extend: qx.ui.window.Window,

	construct: function() {
		this.base(arguments);
		this.setLayout(new qx.ui.layout.VBox);
		this._createWidgetContent();
		this.center();
	},

	properties: {
		modal: {
			refine: true,
			init: true
		}
	},

	members: {
		_createWidgetContent: function() {
			var toolbar = new qx.ui.toolbar.ToolBar();
			toolbar.add(new qx.ui.toolbar.Button("test"));
			this.add(toolbar);

			var container = new qx.ui.splitpane.Pane("horizontal");

			this._table = this._getTable();
			container.add(this._table, 1);
			this._rightside = this._getInfoArea();
			container.add(this._rightside, 0);

			this.add(container);

			this._enableDnd();
		},

		_enableDnd: function() {
			var self = this;
			this.addListener("appear", function() {
				var dom = this._rightside.getContainerElement().getDomElement();
				qx.bom.Event.addNativeListener(dom, "dragover", function(e) {
					qx.bom.Event.preventDefault(e);
					self._onDragOver(e);
				});
				qx.bom.Event.addNativeListener(dom, "dragenter", function(e) {
					self._onDragEnter(e);
				});
				qx.bom.Event.addNativeListener(dom, "dragleave", function(e) {
					qx.bom.Event.preventDefault(e);
					self._onDragLevel(e);
				});
				qx.bom.Event.addNativeListener(dom, "drop", function(e) {
					qx.bom.Event.preventDefault(e);
					self._onDrop(e);
				});
			}, this);
		},

		_getTable: function() {
			var model = new vuuvv.model.RemoteFileModel;
			var table = new qx.ui.table.Table(model);
			table.getTableColumnModel().setColumnVisible(0, false);
			this.set({width: 600, height: 400});
			table.addListener("cellDblclick", function(e) {
				var model = table.getTableModel();
				model.cdRow(e.getRow());
			}, this);
			var newRenderer = new qx.ui.table.cellrenderer.Conditional();
			newRenderer.addNumericCondition("==", true, null, "#0000FF", null, null, "dir");
			table.getTableColumnModel().setDataCellRenderer(1, newRenderer);
			return table;
		},

		_getInfoArea: function() {
			var container = new qx.ui.container.Composite(new qx.ui.layout.VBox).set({
				width: 200
			});
			var btnPane = new qx.ui.container.Composite(new qx.ui.layout.HBox).set({
				height: 40
			});
			var uploader = new vuuvv.ui.Uploader();
			vuuvv.utils.getApp().setUploader(uploader);
			uploader.fireEvent("uploadStart");
			btnPane.add(uploader);
			btnPane.add(new qx.ui.form.Button("Upload", "/media/images/uploadFileButton1.png").set({
				show: "icon",
				padding: 0
			}));
			container.add(btnPane);
			return container;
		},

		_setDragEffect: function() {
			this._rightside.getContentElement().setStyle("backgroundColor", "#cccccc");
		},

		_clearDragEffect: function() {
			this._rightside.getContentElement().setStyle("backgroundColor", "");
		},

		_onDragOver: function(e) {
		},

		_onDragEnter: function(e) {
			this._setDragEffect();
			this.debug("dragenter");
		},

		_onDragLevel: function(e) {
			this._clearDragEffect();
			this.debug("dragleave");
		},

		_onDrop: function(e) {
			this._clearDragEffect();
			this.debug("drop");
			console.log(e.dataTransfer.files);
		}
	}
});
