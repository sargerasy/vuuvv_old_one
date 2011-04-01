qx.Class.define("vuuvv.ui.page.NormalEditor", {
	extend: qx.ui.container.Composite,

	construct: function(name, columns)
	{
		this.base(arguments, new qx.ui.layout.VBox);
		this.setBackgroundColor("background-splitpane");

		var editor = new vuuvv.ui.ModelEditor(name, this._getProto(), columns);
		this.add(editor, {flex: 1});

		editor.addListener("dataLoaded", this._onDataLoaded, this);
	},

	members:
	{
		_onDataLoaded: function(e) {
		},

		_getProto: function() {
		}
	}
});
