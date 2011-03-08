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
			event: "changeLabel"
		},

		tooltip: {
			check: "String",
			event: "changeTooltip"
		},

		icon : {
			check: "String",
			event: "changeIcon"
		},

		command: {
			check: "String",
			event: "changeCommand"
		},

		parent: {
			check: "vuuvv.model.AdminMenu",
			event: "changeParent"
		}
	},

	statics: {
		create: function(data, parentPath) {
			var root = new vuuvv.model.AdminMenu();
			root.setLabel("all");
			var parents = {};

			for (var i in data) {
				var child = new vuuvv.model.AdminMenu();
				var item = data[i];
				child.setId(item.id);
				child.setLabel(item.label);
				child.setTooltip(item.tooltip);
				child.setIcon(item.icon);
				child.setCommand(item.command);
				parents[i] = child;
			}

			for (var i in parents) {
				var pid = data[i][parentPath];
				var item = parents[i];
				parent = pid ? parents[pid] : root;
				item.setParent(parent);
				parent.getChildren().push(item);
			}
			return {"struct": root, "items": parents};
		}
	},

	destruct: function() {
	}
});
