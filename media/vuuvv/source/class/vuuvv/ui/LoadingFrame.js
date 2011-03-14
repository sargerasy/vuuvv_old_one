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

		this.__stack = new qx.ui.container.Stack();
		this.add(this.__stack, {flex: 1});

		this.__stack.add(this.getLoadingPage(), {flex: 1});
		this.load(url);
	},

	properties: {
		readyState: {
			check: ["initialized", "loading", "complete"],
			init: "initialized",
			event: "changeState"
		}
	},

	members: {
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
			if (state == "complete") {
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
				this.__stack.add(content);
				this.__stack.setSelection([content]);
				this.setReadyState("complete");
				callback.call(context);
			}, this);

			req.addListener("failed", function(evt) {
				this.error("Couldn't load file: " + url);
			}, this);

			req.send();
		}
	},

	destruct: function() {
		this._disposeObjects("__stack");
	}
});
