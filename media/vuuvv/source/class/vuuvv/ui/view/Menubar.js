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
qx.Class.define("vuuvv.ui.view.Menubar", {
	extend : qx.ui.menubar.MenuBar,


/**
 * @param menuData {javascript object} A tree struct object, descript the menu struct.
 */
	construct : function(menuData)
	{
		this.base(arguments);

		this.__menuItemStore = {};

		this._createMenus(menuData);
	},

	properties: 
	{
		model: {
			check: "Object",
			event: "changeModel",
			init: null
		}
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
			var menus = vuuvv.model.AdminMenu.create(menuData, "parent_id");
			this.setModel(menus);
			var top = menus[-1].getChildren();
			for (var i = 0; i < top.getLength(); i++) {
				var item = top.getItem(i);
				var children = item.getChildren();
				var menu = this.__menuItemStore[i] = new qx.ui.menubar.Button(
				   this.tr(item.getLabel())
				);
				this.add(menu);
				if (children.getLength() > 0) {
					var sub_menu = new qx.ui.menu.Menu();
					this._create_sub_menu(sub_menu, children)
					menu.setMenu(sub_menu);
				}
			}
		},

		_create_sub_menu: function(widget, model) {
			for (var i = 0; i < model.getLength(); i++) {
				var item = model.getItem(i);
				var menu = this.__menuItemStore[i] = new qx.ui.menu.Button(
					this.tr(item.getLabel())
				);
				widget.add(menu);
				var comm = new vuuvv.command.Command(item);
				menu.setCommand(comm);
				var children = item.getChildren();
				if (children.getLength()) {
					var sub_menu = new qx.ui.menu.Menu();
					this._create_sub_menu(sub_menu, children);
					menu.setMenu(sub_menu);
				}
			}
		},

		/**
		 * Helper for the overflow handling. It is responsible for returning a 
		 * corresponding menu item for the given toolbar item.
		 * 
		 * @param toolbarItem {qx.ui.core.Widget} The toolbar item to look for.
		 * @return {qx.ui.core.Widget} The coresponding menu item.
		 */
		_getMenuItem : function(toolbarItem) {
		}    
	},


	/*
	 *****************************************************************************
	 DESTRUCTOR
	 *****************************************************************************
	 */

	destruct : function() {
	   //this._disposeObjects("__highlightButton", "__logCheckButton", "__gistMenu");
	}
});
