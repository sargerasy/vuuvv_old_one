qx.Class.define("vuuvv.ui.Uploader", {
	extend: qx.ui.embed.Flash,

	construct: function(swfUrl, callback, buttonSkin) {
		swfUrl = swfUrl || "/media/flash/uploader.swf";
		callback = callback || "vuuvv.ui.Uploader.callback";
		buttonSkin = buttonSkin || "/media/images/selectFileButton.png";
		this.base(arguments, swfUrl);
		this.setWmode("transparent");
		this.setVariables({
			"YUIBridgeCallback": callback,
			"buttonSkin": buttonSkin
		});
		vuuvv.utils.getApp().setUploader(this);
	},

	events: {
		fileSelect: "qx.event.type.Data",
		uploadStart: "qx.event.type.Event",
		uploadProgress: "qx.event.type.Data",
		uploadCancel: "qx.event.type.Event",
		uploadComplete: "qx.event.type.Event",
		uploadCompleteData: "qx.event.type.Data",
		uploadError: "qx.event.type.Data"
	},

	statics: {
		callback: function(id, evt) {
			var self = vuuvv.utils.getApp().getUploader();
			console.log(self.getContentElement());
			console.log(evt);
		}
	},

	members: {
		_swf: null,

		upload: function(fileid, url, method, vars, fieldName) {
			this._swf.upload(fileid, url, method, vars, fieldName);
		},

		uploadThese: function(fileids, url, method, vars, fieldName) {
			this._swf.uploadThese(fileids, url, method, vars, fieldName);
		},

		uploadAll: function(url, method, vars, fieldName) {
			this._swf.uploadAll(url, method, vars, fieldName);
		},

		cancel: function(fileid) {
			this._swf.cancel(fileid);
		},

		clearFileList: function() {
			this._swf.clearFileList();
		},

		removeFile: function (fileID) {
			this._swf.removeFile(fileID);
		},

		setAllowLogging: function (allowLogging) {
			this._swf.setAllowLogging(allowLogging);
		},

		setSimUploadLimit : function (simUploadLimit) {
		   this._swf.setSimUploadLimit(simUploadLimit);
		},

		setAllowMultipleFiles : function (allowMultipleFiles) {
		   this._swf.setAllowMultipleFiles(allowMultipleFiles);
		},

		setFileFilters : function (fileFilters) {
		   this._swf.setFileFilters(fileFilters);
		},

		enable : function () {
			this._swf.enable();
		},

		disable : function () {
			this._swf.disable();
		}
	},

	destruct: function() {
		this._disposeObjects("_swf");
	}
});
