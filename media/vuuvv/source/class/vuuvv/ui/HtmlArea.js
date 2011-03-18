/* ************************************************************************
#asset(qx/icon/Oxygen/16/actions/format-*.png)
#asset(qx/icon/Oxygen/16/actions/edit-*.png)
#asset(qx/icon/Oxygen/16/actions/insert-image.png)
#asset(qx/icon/Oxygen/16/actions/insert-table.png)
#asset(qx/icon/Oxygen/16/actions/insert-link.png)
#asset(qx/icon/Oxygen/16/actions/insert-text.png)
#asset(qx/icon/Oxygen/16/actions/insert-horizontal-rule.png)
#asset(vuuvv/images/*)
************************************************************************ */

qx.Class.define("vuuvv.ui.HtmlArea", {
	extend: qx.ui.container.Composite,
	implement: [
		qx.ui.form.IForm,
		qx.ui.form.IStringForm
	],
	include: [
		qx.ui.form.MForm
	],

	construct: function() {
		this.base(arguments, new qx.ui.layout.VBox());

		this._htmlArea = new qx.ui.embed.HtmlArea("", null, "blank.html");
		this._htmlArea.set( {width: 600, height:400} );

		this._srcArea = new qx.ui.form.TextArea();

		this._editArea = new qx.ui.container.Stack();
		this._editArea.add(this._htmlArea);
		this._editArea.add(this._srcArea);

		this.add(this._setupToolBar());
		this.add(this._editArea);

		this.bind("value", this._srcArea, "value");
		this.bind("value", this._htmlArea, "value");
		this._srcArea.bind("value", this, "value");
	},

	properties: {
		value: {
			check: "String",
			init: "",
			nullable: true,
			event: "changeValue"
		},

		mode: {
			check: ["src", "html"],
			init: "html",
			event: "changeMode"
		}
	},

	members : {
		_htmlArea: null,

		syncValue: function() {
			this.setValue(this._htmlArea.getHtml());
		},

		resetValue : function() {
			this.initValue();
		},

		_test: function() {
			this.debug(this.getHtml());
		},

		_getToolbarEntries: function() {
			return [{
				bold:                { text: "Format Bold", image: "qx/icon/Oxygen/16/actions/format-text-bold.png", action: this._htmlArea.setBold },
				italic:              { text: "Format Italic", image: "qx/icon/Oxygen/16/actions/format-text-italic.png", action: this._htmlArea.setItalic },
				underline:           { text: "Format Underline", image: "qx/icon/Oxygen/16/actions/format-text-underline.png", action: this._htmlArea.setUnderline },
				strikethrough:       { text: "Format Strikethrough", image: "qx/icon/Oxygen/16/actions/format-text-strikethrough.png", action: this._htmlArea.setStrikeThrough },
				removeFormat:        { text: "Remove Format", image: "qx/icon/Oxygen/16/actions/edit-clear.png", action: this._htmlArea.removeFormat }
			}, {
				alignLeft:           { text: "Align Left", image: "qx/icon/Oxygen/16/actions/format-justify-left.png", action: this._htmlArea.setJustifyLeft },
				alignCenter:         { text: "Align Center", image: "qx/icon/Oxygen/16/actions/format-justify-center.png", action: this._htmlArea.setJustifyCenter },
				alignRight:          { text: "Align Right", image: "qx/icon/Oxygen/16/actions/format-justify-right.png", action: this._htmlArea.setJustifyRight },
				alignJustify:        { text: "Align Justify", image: "qx/icon/Oxygen/16/actions/format-justify-fill.png", action: this._htmlArea.setJustifyFull }
			}, {
				indent:              { text: "Indent More", image: "qx/icon/Oxygen/16/actions/format-indent-more.png", action: this._htmlArea.insertIndent },
				outdent:             { text: "Indent Less", image: "qx/icon/Oxygen/16/actions/format-indent-less.png", action: this._htmlArea.insertOutdent }
			}, {
				insertHR:            { text: "Insert Horizontal Ruler", image: "vuuvv/images/insert-horizontal-rule.png", action: this._htmlArea.insertHorizontalRuler }
			}, {
				ol:                  { text: "Insert Ordered List", image: "vuuvv/images/format-list-ordered.png", action: this._htmlArea.insertOrderedList },
				ul:                  { text: "Inserted Unordered List", image: "vuuvv/images/format-list-unordered.png", action: this._htmlArea.insertUnorderedList }
			}, {
				undo:                { text: "Undo Last Change", image: "qx/icon/Oxygen/16/actions/edit-undo.png", action: this._htmlArea.undo },
				redo:                { text: "Redo Last Undo Step", image: "qx/icon/Oxygen/16/actions/edit-redo.png", action: this._htmlArea.redo }
			}, {
				src:                 { text: "Go to source code", image: "", action: this._showSource, context: this}
			}];
		},

		_setupToolBar: function() {
			var toolbar = new qx.ui.toolbar.ToolBar;
			toolbar.setDecorator("main");
			var btn;
			var items = this._getToolbarEntries();
			for (var i = 0; i < items.length; i++) {
				var part = new qx.ui.toolbar.Part;
				toolbar.add(part);

				for(var j in items[i]) {
					var item = items[i][j];
					var label = item.image ? null : j;
					var context = item.context ? item.context : this._htmlArea;
					btn = new qx.ui.toolbar.Button(label, item.image);
					btn.set({
						focusable: false,
						keepFocus: true,
						center: true,
						toolTipText: item.text ? item.text : ""
					});
					btn.addListener("execute", item.action, context);
					part.add(btn);
				}
			}
			return toolbar;
		},

		_showSource: function() {
			var mode = this.getMode();
			if (mode === "html") {
				this.syncValue();
				this._editArea.setSelection([this._srcArea]);
				this.setMode("src");
			} else {
				this._editArea.setSelection([this._htmlArea]);
				this.setMode("html");
			}
		}
	},

	destruct : function() {
		this._disposeObjects("_htmlArea");
	}
});
