/*
#asset(vuuvv/*)
*/

qx.Class.define("vuuvv.ui.ClientArea", {
	extend: vuuvv.ui.LoadingFrame,

	construct: function() {
		this.base(arguments, "/admin/appdata");
	},

	members: {
		_load: function(callback, context) {
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

			var url = "/admin/appdata";

			var req = new qx.io.remote.Request(url);
			req.setTimeout(180000);
			req.setProhibitCaching(false);

			req.addListener("completed", function(evt) {
				var content = evt.getContent();
				var treeData = eval("(" + content + ")");
				this._initializeContent(treeData.appdata);
				qx.core.Init.getApplication().setAppData(treeData.appdata);
				this.setReadyState("complete");
				callback.call(context);
			}, this);

			req.addListener("failed", function(evt) {
				this.error("Couldn't load file: " + url);
			}, this);

			req.send();
		},

		_initializeContent: function(data) {
			var appdata = data.appdata;
			var container = new qx.ui.container.Composite(new qx.ui.layout.VBox());
			this.__menubar = new vuuvv.ui.view.Menubar(appdata.menus);
			appdata.menus = this.__menubar.getModel();
			container.add(this.__menubar, {flex: 0});

			var mainsplit = new qx.ui.splitpane.Pane("horizontal");
			container.add(mainsplit, {flex: 1});

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

			var tabView = new vuuvv.ui.TabView();
			mainsplit.add(tabView);
			qx.core.Init.getApplication().setTabView(tabView);
			qx.core.Init.getApplication().setAppData(appdata);
			return container;
		}
	}
});
