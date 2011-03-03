/*
#asset(vuuvv/*)
*/

qx.Class.define("vuuvv.ui.ClientArea", {
	extend: qx.ui.container.Composite,

	construct: function() {
		this.base(arguments, new qx.ui.layout.VBox());
		this.initReadyState();
		this.addListener("changeState", function(){
			this.debug(this.getReadyState());
		});
	},

	properties: {
		readyState: {
			check: ["initialized", "loading", "complete"],
			init: "initialized",
			event: "changeState"
		}
	},

	members: {
		load: function(callback, context) {
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
			var timer = qx.util.TimerManager.getInstance();

			var url = "script/test.json";

			var req = new qx.io.remote.Request(url);
			req.setTimeout(180000);
			req.setProhibitCaching(false);

			req.addListener("completed", function(evt) {
				var content = evt.getContent();
				var treeData = eval("(" + content + ")");
				this._initializeContent(treeData.appData);
				this.setReadyState("complete");
				callback.call(context);
			}, this);

			req.addListener("failed", function(evt) {
				this.error("Couldn't load file: " + url);
			}, this);

			req.send();
//			var store = new qx.data.store.Json(url);
//			store.addListener("loaded", function(e) {
//				this.debug(e.getData().getAppData().getMenus());
//				this._initializeContent();
//				this.setReadyState("complete");
//				callback.call(context);
//			}, this);
		},

		_initializeContent: function(appData) {
			this.__toolbar = new vuuvv.view.Toolbar(appData.menus);
			this.add(this.__toolbar, {flex: 0});

			var mainsplit = new qx.ui.splitpane.Pane("horizontal");
			this.add(mainsplit, {flex: 1});

			//left side
			var leftside = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
			leftside.setBackgroundColor("background-splitpane");
			mainsplit.add(leftside, 0);

			var searchComposlite = new qx.ui.container.Composite();
			searchComposlite.setLayout(new qx.ui.layout.HBox(3));
			searchComposlite.setAppearance("textfield");
			leftside.add(searchComposlite);

			var searchIcon = new qx.ui.basic.Image("icon/16/actions/edit-find.png");
			searchComposlite.add(searchIcon);

			this._searchTextField = new qx.ui.form.TextField();
			this._searchTextField.setLiveUpdate(true);
			this._searchTextField.setAppearance("widget");
			this._searchTextField.setPlaceholder("Filter...");

			searchComposlite.add(this._searchTextField, {flex: 1});

			var list = new qx.ui.form.List();
			leftside.add(list, {flex: 1});

			// create the status of the tree
			this._status = new qx.ui.basic.Label("0/0");
			this._status.setAppearance("widget");
			this._status.setWidth(80);
			this._status.setTextAlign("right");
			searchComposlite.add(this._status);

			var infosplit = new qx.ui.splitpane.Pane("vertical");
			infosplit.setDecorator(null);

			mainsplit.add(infosplit);

			var slider1 = new qx.ui.form.Slider();
			var slider2 = new qx.ui.form.Slider();
			slider1.setWidth(100);
			slider2.setWidth(100);

			var controller = new qx.data.controller.Object(slider1);
			controller.addTarget(slider2, "value", "value");

			infosplit.add(slider1);
			infosplit.add(slider2);
		}
	}
});
