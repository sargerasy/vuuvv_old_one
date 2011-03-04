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


	properties:
	{
		tabView: {
			check: "qx.ui.tabview.TabView"
		}
	},

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
			mainContainer.add(new vuuvv.ui.Frame(), {flex: 1});
		}
	}
});
