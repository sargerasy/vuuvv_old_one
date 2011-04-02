qx.Class.define("vuuvv.ui.TreeModelView", {
	extend: vuuvv.ui.ModelView,

	construct: function(name, proto, columns) {
		this.base(arguments, name, proto, columns);
		this.setAcenstors([]);
	},

	properties: {
		acenstors: {
			init: []
		}
	},

	members: {
		//override
		_onDblclick: function(e) {
			this._onEnter(e);
		},

		//override
		getCommandNames: function() {
			return ["up", "enter", "new", "delete", "edit", "find", "reload"];
		},

		//overrride
		getTableModelClass: function() {
			return vuuvv.model.RemoteTree;
		},

		_onUp: function() {
			var id = this.getAcenstors().pop() || null;
			var model = this._table.getTableModel();
			model.enter(id);
		},

		_onEnter: function(e) {
			var row = this._table.getSelectionModel().getSelectedRanges()[0].minIndex;
			var model = this._table.getTableModel();
			var id = model.getRowData(row).id;
			model.enter(id);
			this.getAcenstors().push(id);
		}
	}
});
