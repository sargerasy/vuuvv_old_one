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

		var scroll = new qx.ui.container.Scroll();
		scroll.getChildControl("scrollbar-x");
		scroll.getChildControl("scrollbar-y");
		scroll.getChildControl("corner");
		this.add(scroll, {flex: 1});

		this._stack = new qx.ui.container.Stack();
		scroll.add(this._stack);

		this._loadingPage = this.getLoadingPage();
		this._stack.add(this._loadingPage, {flex: 1});

		var page = this.createPage();
		this._stack.add(page);
		this._loadedPage = page;

		if (url) this.setUrl(url);
	},

	properties: {
		readyState: {
			check: ["initialized", "loading", "completed", "failed"],
			init: "initialized",
			apply: "_applyReadyState",
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

		_applyReadyState: function(value, old) {
			switch (value) {
				case "loading":
					this._stack.setSelection([this._loadingPage]);
					break;
				case "completed":
					this._stack.setSelection([this._loadedPage]);
					break;
			}
		},

		_applyUrl: function(url) {
			var state = this.getReadyState();
			if (state == "loading") 
				return;
			this.setReadyState("loading");

			var req = new qx.io.remote.Request(url);
			req.setTimeout(180000);
			req.setProhibitCaching(false);

			req.addListener("completed", function(e) {
				var data = eval("(" + e.getContent() + ")");
				this.setupPage(data);
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
