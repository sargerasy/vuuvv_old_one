/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

/* ************************************************************************

#asset(vuuvv/*)
#asset(qx/icon/${qx.icontheme}/*)

 ************************************************************************ */

/**
 * This is the main application class of your custom application "admin"
 */
qx.Class.define("vuuvv.Application", {
	extend : qx.application.Standalone,



/*
 *****************************************************************************
 MEMBERS
 *****************************************************************************
 */

	members :
	{
		/**
		 * This method contains the initial application code and gets called 
		 * during startup of the application
		 * 
		 * @lint ignoreDeprecated(alert)
		 */
		main : function()
		{
			// Call super class
			this.base(arguments);

			// Enable logging in debug variant
			if (qx.core.Variant.isSet("qx.debug", "on"))
			{
				// support native logging capabilities, e.g. Firebug for Firefox
				qx.log.appender.Native;
				// support additional cross-browser console. Press F7 to toggle visibility
				qx.log.appender.Console;
			}

			var layout = new qx.ui.layout.VBox();

			var mainContainer = new qx.ui.container.Composite(layout);
			this.getRoot().add(mainContainer, {edge: 0});
			mainContainer.add(new vuuvv.ui.frame());

//			mainContainer.add(new admin.view.Header(), {flex: 0});
//
//			var layout = new qx.ui.layout.Atom();
//			layout.setCenter(true);
//			var container = new qx.ui.container.Composite(layout)
//			mainContainer.add(container, {flex: 1});
//			var loading = new qx.ui.basic.Image("admin/loading66.gif", "100%", "100%");
//			container.add(loading);

//			//toolbar
//			this.__toolbar = new admin.view.Toolbar();
//			mainContainer.add(this.__toolbar, {flex: 0});
//
//			var mainsplit = new qx.ui.splitpane.Pane("horizontal");
//			mainContainer.add(mainsplit, {flex: 1});
//
//			// tree side
//			var leftComposite = this._leftComposite = new qx.ui.container.Composite();
//			leftComposite.setLayout(new qx.ui.layout.VBox(3));
//			leftComposite.setBackgroundColor("background-splitpane");
//			mainsplit.add(leftComposite, 0);
//
//			var searchComposlite = new qx.ui.container.Composite();
//			searchComposlite.setLayout(new qx.ui.layout.HBox(3));
//			searchComposlite.setAppearance("textfield");
//			leftComposite.add(searchComposlite);
//
//			var searchIcon = new qx.ui.basic.Image("icon/16/actions/edit-find.png");
//			searchComposlite.add(searchIcon);
//
//			this._searchTextField = new qx.ui.form.TextField();
//			this._searchTextField.setLiveUpdate(true);
//			this._searchTextField.setAppearance("widget");
//			this._searchTextField.setPlaceholder("Filter...");
//
//			searchComposlite.add(this._searchTextField, {flex: 1});
//
//			var list = new qx.ui.form.List();
//			leftComposite.add(list, {flex: 1});
//
//			// create the status of the tree
//			this._status = new qx.ui.basic.Label("0/0");
//			this._status.setAppearance("widget");
//			this._status.setWidth(80);
//			this._status.setTextAlign("right");
//			searchComposlite.add(this._status);
//
//			var infosplit = new qx.ui.splitpane.Pane("vertical");
//			infosplit.setDecorator(null);
//
//			mainsplit.add(infosplit);

		}
	}
});
