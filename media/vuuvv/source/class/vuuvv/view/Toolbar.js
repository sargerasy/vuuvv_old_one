/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
   2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
   LGPL: http://www.gnu.org/licenses/lgpl.html
   EPL: http://www.eclipse.org/org/documents/epl-v10.php
   See the LICENSE file in the project's top-level directory for details.

   Authors:
 * Martin Wittemann (martinwittemann)

 ************************************************************************ */
/* ************************************************************************

#asset(vuuvv/images/*)

 ************************************************************************ */

/**
 * The playground toolbar containing all buttons and menus.
 */
qx.Class.define("vuuvv.view.Toolbar", {
	extend : qx.ui.toolbar.ToolBar,


/**
 * @param sampleNames {Array} An array containing all names of the samples as
 *   String.
 */
	construct : function(sampleNames)
	{
		this.base(arguments);

		this.__menuItemStore = {};

		// run button
		var goodsButton = new qx.ui.toolbar.MenuButton(
			this.tr("Goods")
		);
		this.add(goodsButton);
		goodsButton.setToolTipText(this.tr("Goods Manage"));

		var promotionButton = new qx.ui.toolbar.MenuButton(
			this.tr("Promotion")
		);
		this.add(promotionButton);
		promotionButton.setToolTipText(this.tr("Promotion Manage"));

		var orderButton = new qx.ui.toolbar.MenuButton(
			this.tr("Order")
		);
		this.add(orderButton);
		orderButton.setToolTipText(this.tr("Order Manage"));

		var articleButton = new qx.ui.toolbar.MenuButton(
			this.tr("Article")
		);
		this.add(articleButton);
		articleButton.setToolTipText(this.tr("Article Manage"));

		var statisticsButton = new qx.ui.toolbar.MenuButton(
			this.tr("Statistics")
		);
		this.add(statisticsButton);
		statisticsButton.setToolTipText(this.tr("Statistics Report"));

		var memberButton = new qx.ui.toolbar.MenuButton(
			this.tr("Member")
		);
		this.add(memberButton);
		memberButton.setToolTipText(this.tr("Member Manage"));

		var accessButton = new qx.ui.toolbar.MenuButton(
			this.tr("Access")
		);
		this.add(accessButton);
		accessButton.setToolTipText(this.tr("Access Manage"));

		this.addSpacer();
		// help button
		var helpButton = new qx.ui.toolbar.Button(
				this.tr("About"), "icon/22/actions/help-about.png"
				);
		this.add(helpButton);
		helpButton.setToolTipText(this.tr("admin About"));
		helpButton.addListener("execute", function() {
			this.fireEvent("openManual");
		}, this);
//		selectSampleButton.setMenu(this.__createSampleMenu(sampleNames));
//
//		// enable doverflow handling
//		this.setOverflowHandling(true);
//
//		// remove priority for overflow handling
//		this.setRemovePriority(helpButton, 7);
//		this.setRemovePriority(apiButton, 6);
//		this.setRemovePriority(this.__logCheckButton, 5);
//		this.setRemovePriority(selectSampleButton, 4);
//		this.setRemovePriority(this.__highlightButton, 3);
//		this.setRemovePriority(gistButton, 2);
//		this.setRemovePriority(urlShortButton, 1);
//
//		// add a button for overflow handling
//		var chevron = new qx.ui.toolbar.MenuButton(null, "icon/22/actions/media-seek-forward.png");
//		chevron.setAppearance("toolbar-button");  // hide the down arrow icon
//		this.add(chevron);
//		this.setOverflowIndicator(chevron);
//
//		// add the overflow menu
//		this.__overflowMenu = new qx.ui.menu.Menu();
//		chevron.setMenu(this.__overflowMenu);
//
//		// add the listener
//		this.addListener("hideItem", function(e) {
//			var item = e.getData();
//			var menuItem = this._getMenuItem(item);
//			menuItem.setVisibility("visible");
//			// menus
//			if (item.getMenu && item.getMenu()) {
//				var menu = item.getMenu();
//				item.setMenu(null);
//				menuItem.setMenu(menu);
//			}
//		}, this);
//
//		this.addListener("showItem", function(e) {
//			var item = e.getData();
//			var menuItem = this._getMenuItem(item);
//			menuItem.setVisibility("excluded");
//			// menus
//			if (menuItem.getMenu()) {
//				var menu = menuItem.getMenu();
//				menuItem.setMenu(null);
//				item.setMenu(menu);
//			}
//		}, this);
	},

	events :
	{
		/**
		 * Fired if the run button is pressed.
		 */
		"run" : "qx.event.type.Event",

		/**
		 * Fired if a new sample should be selected. The data contains the name of
		 * the new sample.
		 */
		"changeSample" : "qx.event.type.Data",

		/**
		 * Data event if the code highlighting should be used.
		 */
		"changeHighlight" : "qx.event.type.Data",

		/**
		 * Data event if the log should be shown.
		 */
		"changeLog" : "qx.event.type.Data",

		/**
		 * Event which will indicate a url shortening action.
		 */
		"shortenUrl" : "qx.event.type.Event",

		/**
		 * Event which will be fired to open the api.
		 */
		"openApi" : "qx.event.type.Event",

		/**
		 * Event which will be fired to open the manual.
		 */
		"openManual" : "qx.event.type.Event",

		/**
		 * Event signaling that a new gist has been selected.
		 */
		"changeGist" : "qx.event.type.Data",

		/**
		 * Event which will be fireed if the gists should be reloaded.
		 */
		"reloadGists" : "qx.event.type.Data",

		/**
		 * Fired if a new gist should be created.
		 */
		"newGist" : "qx.event.type.Event",

		/**
		 * Fired if the gist should be edited.
		 */
		"editGist" : "qx.event.type.Event"
	},


	members :
	{
		__menuItemStore : null,
		__overflowMenu : null,
		__highlightButton : null,
		__logCheckButton : null,
		__gistMenu : null,

		/**
		 * Controlls the presed state of the log button.
		 * @param show {Boolean} True, if the button should be pressed.
		 */
		showLog : function(show) {
			this.__logCheckButton.setValue(show);
		},


		/**
		 * Controlls the enabled property of the highlight button.
		 * @param value {Boolean} True, if the button should be enabled.
		 */
		enableHighlighting : function(value) {
								 this.__highlightButton.setEnabled(value);
								 // if the button will be disable, remove the pressed state
								 if (!value) {
									 this.__highlightButton.setValue(false);
								 }
							 },


		/**
		 * Generates a menu to select the samples.
		 * @param sampleNames {Array} An array containing all names of the samples.
		 * @return {qx.ui.menu.Menu} Menu of the samples.
		 */
		__createSampleMenu : function(sampleNames)
		{
			var menu = new qx.ui.menu.Menu;

			for (var i = 0; i < sampleNames.length; i++)
			{
				var name = sampleNames[i];

				var sampleEntryButton = new qx.ui.menu.Button(
						name, "icon/22/actions/edit-paste.png"
						);
				menu.add(sampleEntryButton);

				sampleEntryButton.addListener(
						"execute", qx.lang.Function.bind(function(sample, e) {
							this.fireDataEvent("changeSample", sample);
						}, this, name)
						);
			}

			return menu;
		},


		/**
		 * Updates the gists shown in the toolbar.
		 * @param names {Array} An array of gist names.
		 * @param texts {Array} An array of gist contents.
		 * @param ids {Array} An array of gist ids.
		 */
		updateGists: function(names, texts, ids) {
						 this.__gistMenu.updateGists(names, texts, ids);
					 },


		/**
		 * Signals that something went wrong during the loading of the gists.
		 * @param invalid {Boolean} true, if something was wrong
		 * @param message {String} The message what was wrong.
		 */
		invalidGist : function(invalid, message) {
						  this.__gistMenu.invalidUser(invalid, message);
					  },


		/**
		 * Helper for the overflow handling. It is responsible for returning a 
		 * corresponding menu item for the given toolbar item.
		 * 
		 * @param toolbarItem {qx.ui.core.Widget} The toolbar item to look for.
		 * @return {qx.ui.core.Widget} The coresponding menu item.
		 */
		_getMenuItem : function(toolbarItem) {
						   var cachedItem = this.__menuItemStore[toolbarItem.toHashCode()];

						   if (!cachedItem) {
							   if (toolbarItem instanceof qx.ui.toolbar.CheckBox) {
								   cachedItem = new qx.ui.menu.CheckBox(toolbarItem.getLabel());
							   } else {
								   cachedItem = new qx.ui.menu.Button(toolbarItem.getLabel(), toolbarItem.getIcon());
								   // special case for the gist button
								   if (toolbarItem.getLabel() == null) {
									   cachedItem.setLabel("gist");
									   cachedItem.setIcon(null);
								   }
							   }

							   // connect the execute
							   cachedItem.addListener("execute", function() {
								   toolbarItem.execute();
							   });

							   this.__overflowMenu.addAt(cachedItem, 0);
							   this.__menuItemStore[toolbarItem.toHashCode()] = cachedItem;
						   }

						   return cachedItem;
					   }    
	},


	/*
	 *****************************************************************************
	 DESTRUCTOR
	 *****************************************************************************
	 */

	destruct : function() {
				   this._disposeObjects("__highlightButton", "__logCheckButton", "__gistMenu");
			   }
});
