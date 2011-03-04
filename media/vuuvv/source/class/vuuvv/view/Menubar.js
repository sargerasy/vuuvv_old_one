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
qx.Class.define("vuuvv.view.Menubar", {
	extend : qx.ui.toolbar.Menubar,


/**
 * @param menuData {javascript object} A tree struct object, descript the menu struct.
 */
	construct : function(menuData)
	{
		this.base(arguments);

		this.__menuItemStore = {};

		this._createMenus(menuData);
	},

	events :
	{
	},


	members :
	{
		__menuItemStore : null,
		__overflowMenu : null,
		__highlightButton : null,
		__logCheckButton : null,
		__gistMenu : null,

		_createMenus: function(menuData) {
			var data = this._create_tree_data(menuData);
			for(var i in data) {
				var value = data[i];
				if (value.children) {
					var menu = this.__menuItemStore[i] = new qx.ui.menubar.MenuButton(
						this.tr(value.label)
					);
					this.add(menu);
					var sub_menu = new qx.ui.menu.Menu();
					this._create_sub_menu(sub_menu, value.children);
					menu.setMenu(sub_menu);
				} else {
					this.__menuItemStore[i] = new qx.ui.menubar.Button(
						this.tr(value.label)
					);
					this.add(this.__menuItemStore[i]);
				}
			}
		},

		_create_sub_menu: function(widget, model) {
			for(var i in model) {
				var value = model[i];
				var menu = this.__menuItemStore[i] = new qx.ui.menu.Button(
					this.tr(value.label)
				);
				widget.add(menu);
				if(value.children) {
					var sub_menu = new qx.ui.menu.Menu();
					this._create_sub_menu(sub_menu, value.children);
					menu.setMenu(sub_menu);
				} else {
					var comm = new vuuvv.command.Command(qx.core.Init.getApplication());
					comm.attach(menu);
				}
			}
		},

		_create_tree_data: function(data) {
			var root = {};
			for(var i in data) {
				var pid = data[i]["parent_id"];
				this.debug(pid);
				if (!pid)
					root[i] = data[i];
				else {
					if(!data[pid]["children"]) 
						data[pid]["children"] = {};    
					data[pid]["children"][i] = data[i];
				}
			}
			return root;
		},
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
