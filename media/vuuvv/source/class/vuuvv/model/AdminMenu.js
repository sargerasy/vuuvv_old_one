qx.Class.define("vuuvv.model.AdminMenu", {
	extend: qx.core.Object,

	construct: function() {
		this.base(arguments);
		this.setChildren(new qx.data.Array());
	},

	properties: {
		children: {
			check: "qx.data.Array",
			event: "changeChildren"
		},

		id: {
			check: "Integer",
			event: "changeId"
		},

		label: {
			check: "String",
			event: "changeLabel",
			init: ""
		},

		tooltip: {
			check: "String",
			event: "changeTooltip",
			init: ""
		},

		icon : {
			check: "String",
			event: "changeIcon",
			init: ""
		},

		command: {
			check: "String",
			event: "changeCommand",
			init: ""
		},

		parent: {
			check: "vuuvv.model.AdminMenu",
			event: "changeParent",
			init: null
		}
	},

	members: {
		/*
		* Tell the this object is descendance of id
		*/
		isDescendance: function(id) {
			var p = this;
			while (p.getId() != -1) {
				if (p.getId() == id)
					return true;
				p = p.getParent();
			}
		},

		isParent: function(id) {
			return this.getParent().getId() == id;
		},

		getParentId: function() {
			var p = this.getParent();
			if(p)
				return p.getId();
			return null;
		},

		getDescendance: function() {
			var children = this.getChildren().toArray();
			var len = children.length;
			for (var i = 0; i < len; i++) {
				children = children.concat(children[i].getDescendance());
			}
			return children;
		}
	},

	statics: {
		create: function(data, parentPath) {
			var root = new vuuvv.model.AdminMenu();
			root.setLabel("all");
			root.setId(-1);
			var items = {};

			for (var i in data) {
				var child = new vuuvv.model.AdminMenu();
				var item = data[i];
				child.setId(item.id);
				child.setLabel(item.label);
				child.setTooltip(item.tooltip);
				child.setIcon(item.icon);
				child.setCommand(item.command);
				items[i] = child;
			}

			for (var i in items) {
				var pid = data[i][parentPath];
				var item = items[i];
				var p = pid ? items[pid] : root;
				item.setParent(p);
				p.getChildren().push(item);
			}
			items[-1] = root;
			return items;
		}
	},

	destruct: function() {
	}
});
