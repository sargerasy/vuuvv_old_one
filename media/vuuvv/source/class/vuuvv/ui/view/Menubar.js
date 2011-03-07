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
			menuData["root"] = this._create_tree_data(menuData);
			for(var i in menuData["root"].children) {
				var value = menuData["root"].children[i];
				if (value.children) {
					var menu = this.__menuItemStore[i] = new qx.ui.menubar.Button(
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
					var comm = new vuuvv.command.Command(value);
					menu.setCommand(comm);
				}
			}
		},

		_create_tree_data: function(data) {
			var root = {"label": "all", "children": []};
			for(var i in data) {
				var pid = data[i]["parent_id"];
				if (!pid)
					root.children.push(data[i]);
				else {
					if(!data[pid]["children"]) 
						data[pid]["children"] = [];    
					data[pid]["children"].push(data[i]);
				}
			}
			return root;
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
