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

		this._loadingPage = this.getLoadingPage();
		this._stack.add(this._loadingPage, {flex: 1});
		if (url) this.setUrl(url);
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

		_applyUrl: function(url) {
			console.log(url);
			var state = this.getReadyState();
			if (state == "loading") 
				return;
			this._stack.setSelection([this._loadingPage]);
			this.setReadyState("loading");

			var req = new qx.io.remote.Request(url);
			req.setTimeout(180000);
			req.setProhibitCaching(false);

			req.addListener("completed", function(e) {
				var data = eval("(" + e.getContent() + ")");
				if (state == "initialized") {
					var page = this.createPage();
					this._stack.add(page);
					this._loadedPage = page;
				}
				this.setupPage(data);
				this._stack.setSelection([this._loadedPage]);
				this.setReadyState("completed");
			}, this);

			req.addListener("failed", function(e) {
				this.setReadyState("failed");
			}, this);

			req.send();
		},

		getLoadingPage: function() {
			var layout = new qx.ui.layout.Atom();
			layout.setCenter(true);
			var container = new qx.ui.container.Composite(layout);
			var loading = new qx.ui.basic.Image("vuuvv/loading66.gif", "100%", "100%");
			container.add(loading);
			return container;
		}
	},

	destruct: function() {
		this._disposeObjects("_stack", "_loadingPage", "_loadedPage");
	}
});