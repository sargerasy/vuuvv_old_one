qx.Class.define("vuuvv.ui.FileUploader", {
	extend: qx.ui.container.Composite,
	implement: [
		qx.ui.form.IForm,
		qx.ui.form.IStringForm
	],
	include: [
		qx.ui.form.MForm
	],

	properties: {
		value: {
			check: "String",
			init: "",
			nullable: true,
			apply: "_applyValue",
			event: "changeValue"
		},

		path: {
			init: null,
			nullable: true
		},

		size: {
			init: 0,
			nullable: true
		},

		progress: {
			init: 0,
			nullable: true
		}
	},

	construct: function(path) {
		this.base(arguments, new qx.ui.layout.HBox());

		this.setPath(path);
		this._createWidgets();
	},

	members: {
		_createWidgets: function() {
			this.add(this._getPreview());
			var middle = new qx.ui.container.Composite(new qx.ui.layout.VBox);
			middle.add(this._getUploader());
			middle.add(this._getProgressBar(), {flex: 1});
			this.add(middle);
			this.add(this._getBrowser());
		},

		_getPreview: function() {
			var border = new qx.ui.decoration.Single(1, "solid", "black");
			var layout = new qx.ui.layout.Atom();
			layout.setCenter(true);
			var c = new qx.ui.container.Composite(layout).set({
				width: 70,
				height:70,
				backgroundColor: "background-splitpane",
				decorator: border
			});
			this._preview = new qx.ui.basic.Image().set({
				scale: true,
				decorator: border
			});
			c.add(this._preview);
			this._preview.addListener("changeSource", this._adjustImage, this);
			this._preview.addListener("loaded", this._adjustImage, this);
			return c;
		},

		_getProgressBar: function() {
			this._pb = new qx.ui.indicator.ProgressBar(0, 100).set({
				width: 100
			});
			return this._pb;
		},

		_getUploader: function() {
			var uploader = new vuuvv.ui.Uploader(null, null, null, false);
			uploader.addListener("fileSelect", this._onFileSelected, this);
			uploader.addListener("uploadProgress", this._onFileUploading, this);
			uploader.addListener("uploadCompleteData", this._onFileUploaded, this);
			this._uploader = uploader;
			return uploader;
		},

		_adjustImage: function() {
			var src = this._preview.getSource();
			var loader = qx.io.ImageLoader;
			if (loader.isLoaded(src)) {
				var area = vuuvv.utils.shrink(loader.getWidth(src), loader.getHeight(src), 70, 70);
				this.debug(area);
				this._preview.set({
					width: parseInt(area.x),
					height: parseInt(area.y)
				});
			}
		},

		_getBrowser: function() {
			var browser = new qx.ui.form.Button("browser");
			browser.setEnabled(false);
			return browser;
		},

		_onFileSelected: function(e) {
			this.debug("uploadProgress");
			var files = e.getData().fileList;
			for (var i in files) {
				this.setSize(files[i].size);
			}
			this._uploader.uploadAll("/admin/upload", "POST", {"path": this.getPath()});
		},

		_onFileUploading: function(e) {
			this.debug("uploadProgress");
			var data = e.getData();
			this._pb.setValue(Math.round(data.bytesLoaded / this.getSize() * 100));
		},

		_onFileUploaded: function(e) {
			this.debug("uploadCompleteData");
			var name = e.getData().data;
			this.setValue(this.getPath() + name);
			this._preview.setSource(this.getValue());
		},

		_applyValue: function(value, old) {
		}
	},

	destruct: function() {
		this._disposeObjects("_pb", "_uploader", "_preview");
	}
});
