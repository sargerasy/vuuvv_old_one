/*
#asset(vuuvv/*)
*/
qx.Class.define("vuuvv.ui.LoadingFrame", {
	extend: qx.ui.container.Composite,

	construct: function(url) {
		this.base(arguments, new qx.ui.layout.VBox());
		this.initReadyState();
		this.addListener("changeState", function(){
			this.debug(this.getReadyState());
		});

		this._stack = new qx.ui.container.Stack();
		this.add(this._stack, {flex: 1});

		this._stack.add(this.getLoadingPage(), {flex: 1});
		this.load(url);
	},

	properties: {
		readyState: {
			check: ["initialized", "loading", "completed", "failed"],
			init: "initialized",
			event: "changeState"
		},

		url: {
			check: "String",
			apply: "_applyUrl",
			event: "changeUrl",
			init: ""
		}
	},

	members: {
		_stack: null,
		_loadingPage: null,
		_loadedPage: null,

		_applyUrl: function() {
			this._stack.setSelection([this._loadingPage]);
			var state = this.getReadyState();
			if (state == "completed" || state == "loading") 
				return;
			this._stack.setSelection([this._loadingPage]);
			this.setReadyState("loading");

			var req = new qx.io.remote.Request(url);
			req.setTimeout(180000);
			req.setProhibitCaching(false);

			req.addListener("completed", function(e) {
				var data = eval("(" + e.getContent() + ")");
				if (state == "initialized") this._createPage();
				this._setupPage(data);
				this._stack.setSelection([this._loadedPage]);
				this.setReadyState("completed");
			}, this);

			req.addListener("failed", function(e) {
				this.setReadyState("failed");
			}, this);
		},

		getLoadingPage: function() {
			var layout = new qx.ui.layout.Atom();
			layout.setCenter(true);
			var container = new qx.ui.container.Composite(layout);
			var loading = new qx.ui.basic.Image("vuuvv/loading66.gif", "100%", "100%");
			container.add(loading);
			return container;
		},

		load: function(url, callback, context) {
			var callback = callback || qx.lang.Function.empty;
			var context = context || this;

			var state = this.getReadyState();
			if (state == "completed") {
				callback.call(context);
				return;
			}
			if (state == "loading") {
				this.addListenerOnce("changeState", function(){
					callback.call(context);
				});
				return;
			}
			this.setReadyState("loading");

			var req = new qx.io.remote.Request(url);
			req.setTimeout(180000);
			req.setProhibitCaching(false);

			req.addListener("completed", function(e) {
				var data = eval("(" + e.getContent() + ")");
				var content = this._initializeContent(data);
				this._stack.add(content);
				this._stack.setSelection([content]);
				this.setReadyState("completed");
				callback.call(context);
			}, this);

			req.addListener("failed", function(evt) {
				this.error("Couldn't load file: " + url);
			}, this);

			req.send();
		}
	},

	destruct: function() {
		this._disposeObjects("_stack");
	}
});
