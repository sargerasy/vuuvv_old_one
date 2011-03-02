var _mateItem = function (parent, txt, id) {
	//parent node
	this._parent = parent;
	//basic information
	this._text = txt;
	this._nav = "";
	this._id = id;
	this._sort = -1;
	this._tag = null;
	//sub item collection
	this._sub = [];
	//site url collection
	this._urlList = [];
	//layout display container
	this._layout = null;
	this._selected = false;
	//This variable is now utilized to judge the mouse over and mouse out event.
	this._onhover = false;
	this._mouseFlag = false;
	//20100323 Added by John, properties which will be used for saving the default items.
	this._defItem = null;
	this._highLighted = false;
	//20100329 Added by John, properties which will be used for auto selecting menu.
	this._chosenItem = false;
	//item styles
	this._staticCss = null;
	this._hoverCss = null;
	this._selectCss = null;
	this._subDiv = null;

	//menu item click delegate
	this._clickSelfDelegate = null;
	//menu item click delegate
	this._clickParDelegate = null;
	//menu item hover handler
	this._hoverHandler = null;
	//menu item mouse out handler
	this._mouseOutHandler = null;
	//menu item mouse redirection handler
	this._redirectHandler = null;
}

_mateItem.prototype._tool = {
	getPosition: function (e) {
		var t = e.offsetTop;
		var l = e.offsetLeft;
		while (e = e.offsetParent) {
			t += e.offsetTop;
			l += e.offsetLeft;
		}
		return { _X: l, _Y: t };
	},
	getBrowser: function () {
		var _A;
		if (_A = /(msie) (.)\.[^;]+;/.exec(navigator.userAgent.toLowerCase())) {
			if (document.documentMode) {
				return { Category: _A[1], Version: 8 };
			}
		}
		else {
			_A = /(firefox|netscape|opera|safari|chrome)/.exec(navigator.userAgent.toLowerCase());
		}
		return { Category: _A ? _A[1] : "unknow", Version: (_A && _A[2]) ? _A[2] : -1 };
	}
}

//Search for certain item according to the URL list
_mateItem.prototype._searchUrlList = function () {
	if (this._chosenItem) { return this; }
	for (var i in this._sub) {
		var _temp = arguments.callee.call(this._sub[i]);
		if (_temp) { return _temp; }
	}
	return null;
}

//Visit All brother nodes
_mateItem.prototype._visitBrothers = function (doSthHandler, selfHandler) {
	if (doSthHandler) {
		var _col;
		if (this._parent && this._parent instanceof _mateItem) { _col = this._parent._sub; }
		if (this._parent && this._parent instanceof _menu) { _col = this._parent._elements; }
		for (var i in _col) {
			if (_col[i] != this) {
				doSthHandler.apply(_col[i]);
			}
			else if (selfHandler) {
				selfHandler.apply(_col[i]);
			}
		}
	}
}

_mateItem.prototype._each = function (itemHandler) {
	for (var i = 0, ci; ci = this._sub[i]; i++) {
		itemHandler.call(null, ci);
		if (ci._sub && ci._sub.length > 0) {
			arguments.callee.apply(ci, arguments);
		}
	}
}

//Set all nodes in the same level as static style except for the selected one
_mateItem.prototype._setBroNormal = function () {
	this._visitBrothers(function () { this._setCss(this._staticCss + " m" + this._id + "_static"); this._selected = false; this._highLighted = false; });
}

//set current node as selected
_mateItem.prototype._setSelected = function (showStyle) {
	if (this._selected) { return null; }
	this._selected = true;
	this._layout.className = this._selectCss + " m" + this._id + "_selected";
	this._setBroNormal();
	if (this._clickSelfDelegate) {
		this._clickSelfDelegate.call(this, 1, showStyle);
	}
	if (this._clickParDelegate) {
		this._clickParDelegate.call(this);
	}
	if (this._tag == 1) { return this; }
	return this._parent._setSelected();
}

//menu item on mouse over
_mateItem.prototype._setCss = function (cssName) {
	this._layout.className = cssName;
}

//menu item sort function
_mateItem.prototype._reSort = function () {
	this._sub = this._sub.sort(function (x, y) { return x._sort < y._sort ? 1 : x._sort == y._sort ? 0 : -1; });
}

//menu item click event
_mateItem.prototype._clickHandler = function (showStyle) {
	this._setSelected(showStyle);
	var _url = this._redirect();
	if (_url) {
		window.location.href = _url;
	}
}

//find the url when a certain tab is chosen
_mateItem.prototype._redirect = function () {
	if (this._nav && this._nav != "") {
		var _filter = this._nav;
		if (this._redirectHandler) {
			var temp = this._redirectHandler.apply(this, arguments);
			_filter = temp ? temp : _filter;
		}
		return _filter;
	}
	if (this._defItem) {
		return arguments.callee.apply(this._defItem);
	}
	return null;
}

_mateItem.prototype._isContains = function (sourceObj, targetObj) {
	while (sourceObj != null && typeof (sourceObj.tagName) != "undefined") {
		if (sourceObj == targetObj) { return true; }
		sourceObj = sourceObj.parentNode;
	}
	return false;
}

//Set layout content
_mateItem.prototype._setHTML = function (flag) {
	if (flag == 1) {
		return "<table class='InnerTab'><tr><td>" + this._text + "</td></tr></table>";
	}
	if (flag == 2) {
		return "<div class='Left'></div><div class='Middle'>" + this._text + "</div><div class='Right'></div>";
	}
	if (flag == 3) {
		return "<div class='Left'></div><div class='Middle'><span style='text-decoration:underline;'>" + this._text + "</span></div><div class='Right'></div>";
	}
	if (flag == 4) {
		return "<div style='position:relative;z-index:2;display:block'>" + this._text + "</div><img src='/shared/Templates/components/IRMainMenuBar/Light1.png' class='ima' />";
		//return "<div style='position:relative;z-index:2;display:block'>" + this._text + "</div><img src='Images/Light1.png' class='ima' />";
	}
	return this._text;
}

//menu item initialazation
//flagTab, whether to vertical align the text
_mateItem.prototype._init = function (staticCss, hoverCss, selectedCss, flagTab) {
	//Save the current object for further usage
	var _this = this;

	//Init the basic params
	this._staticCss = staticCss;
	this._hoverCss = hoverCss;
	this._selectCss = selectedCss;

	//Set layout style
	this._layout = document.createElement("DIV");
	this._layout.className = this._staticCss + " m" + _this._id + "_static";
	this._layout.innerHTML = this._setHTML(flagTab);

	//Attach layout events
	this._layout.onmouseover = function (evt) {
		if (_this._onhover) { return; }
		_this._onhover = true;
		(_this._hoverHandler != null) && (_this._hoverHandler());
		if (!_this._highLighted && !_this._selected && _this._tag != 1) {
			_this._setCss.call(_this, _this._hoverCss + " m" + _this._id + "_hover");
		}

	}
	this._layout.onmouseout = function (evt) {
		var _evt = evt || window.event;
		var _sourceElement = _evt.toElement || _evt.relatedTarget;
		if (_this._isContains(_sourceElement, _this._layout)) {
			return;
		}
		_this._onhover = (_this._mouseOutHandler != null) && (_this._mouseOutHandler.apply(_this, arguments));
		if (!_this._highLighted && !_this._selected && _this._tag != 1 && !_this._onhover) {
			_this._setCss.call(_this, _this._staticCss + " m" + _this._id + "_static");
		}
	}
	this._layout.onclick = function () { _this._clickHandler.call(_this); }
}


//Add sub nodes
_mateItem.prototype._subAdd = function (subItem) {
	if ((subItem._tag != 3) && this._sub.length == 0) {
		subItem._setCss(subItem._selectCss + " m" + subItem._id + "_selected");
		this._defItem = subItem;
		subItem._highLighted = true;
	}
	else if (subItem._tag == 3) {
		this._defItem = subItem;
	}
	subItem._parent = this;
	this._sub.push(subItem);
	if (!this._subDiv) { return; }
	this._subDiv.appendChild(subItem._layout);
}

_mateItem.prototype._urlAdd = function (url) {
	var _url = window.location.href;
	if (_url.toLowerCase().indexOf(url.toLowerCase()) > -1) {
		this._chosenItem = true;
	}
	if (this._urlList.length == 0) {
		this._nav = url;
	}
	this._urlList.push(url);
}
///////////////////////////////////////////////////////////////////////////////////////////////
//Level 1 menu item
var _menuLv1 = function (parent, txt, id) {
	//validation
	if (!parent) { alert("no menu available"); return; }

	//inheriting from the base class
	_mateItem.apply(this, arguments);

	//create dom elements
	/***************************************************/
	this._tag = 1;
	this._subDiv = document.createElement("DIV");
	this._subDiv.className = "SubTier Relative Hide";
	this._parent._subTier.appendChild(this._subDiv);
	/***************************************************/
	//extra properties
	/***************************************************/
	var me = this;
	this._inUse = false;
	this._inDisappearing = false;
	this._aligned = false;
	this._movingTimer = null;
	this._outTimer = null;
	this._shrinkTimer = null;  //Added by John 20100528 a flag used to save shrink timeout
	/***************************************************/
	//methods
	/***************************************************/
	//Lv 1 item shrink delay, hover delay.
	//intVal=the cut corner delay
	//longVal= the standard hover delay
	//noSubVal= the delay for none child items
	//Added by John 20100528
	this._hoverDelay = function (intVal, longVal, noSubVal) {
		var _originalValue = intVal;
		var _longValue = longVal;
		var _tempVal = intVal;
		var _nosubVal = noSubVal;
		return {
			reset: function () {
				_tempVal = _originalValue;
				return _tempVal;
			},
			set: function (setVal) {
				_tempVal = setVal;
			},
			get: function () {
				return _tempVal;
			},
			setLongest: function () {
				_tempVal = _longValue;
			},
			getInterval: function () {
				return _originalValue;
			},
			getLongest: function () {
				return _longValue;
			},
			getNoSubDelay: function () {
				return _nosubVal;
			},
			autoGet: function (item) {
				if (item && item._sub) {
					return item._sub.length > 0 ? _longValue : _nosubVal;
				}
				return _nosubVal;
			}
		}
	} (200, 1500, 300);

	//menu move out
	this._MoveOut = function (ctrl, curr, target, func) {
		var _cssTxt = ctrl.style.cssText;
		var _flag = curr * 2;
		if (_flag < target) {

			_cssTxt = _cssTxt.replace(/;top:.*?;/gi, "") + ";top:" + _flag + "px;";
			ctrl.style.cssText = _cssTxt;
			var _this = this;
			var _args = arguments;
			this._outTimer = setTimeout(function () { _args.callee.call(_this, ctrl, _flag, target, func); }, 40);
		}
		else {
			_cssTxt = _cssTxt.replace(/;top:.*?;/gi, "") + ";top:" + target + "px;";
			ctrl.style.cssText = _cssTxt;
			if (func) {
				func.apply(this, arguments);
			}
			clearTimeout(this._outTimer);
		}
	}

	//menu shrink
	this._MoveIn = function (ctrl, curr, target, func) {
		var _cssTxt = ctrl.style.cssText;
		var _flag = curr * 2;
		if (_flag < target) {
			_cssTxt = _cssTxt.replace(/;top:.*?;/gi, "") + ";top:" + (target - _flag) + "px;";
			ctrl.style.cssText = _cssTxt;
			var _this = this;
			var _args = arguments;
			this._movingTimer = setTimeout(function () { _args.callee.call(_this, ctrl, _flag, (target - _flag), func); }, 40);
		}
		else {
			_cssTxt = _cssTxt.replace(/;top:.*?;/gi, "") + ";top:" + target + "px;";
			ctrl.style.cssText = _cssTxt;
			if (func) {
				func.apply(this, arguments);
			}
			clearTimeout(this._movingTimer);
		}

	}

	//menu out with no animation
	this._Out = function (ctrl, target) {
		var _cssTxt = ctrl.style.cssText;
		_cssTxt = _cssTxt.replace(/;top:.*?;/gi, "") + ";top:" + target + "px;";
		ctrl.style.cssText = _cssTxt;

	}

	//Rest all sub items to default style.
	this._reset = function () {
		this._subDiv.className = "SubTier Relative Hide";
		for (var i in this._sub) {
			if (this._sub[i]._selected) {
				this._sub[i]._selected = false;
			}
		}
	}

	this._align = function (flag) {
		/*central align*/
		if (me._aligned && flag == undefined) { return; }
		me._aligned = true;
		var _length = 0;
		var container = me._subDiv;
		var collection = container.childNodes;
		var _tempFirst = null;
		for (var j = 0, di; di = collection[j]; j++) {
			if (di.tagName == "DIV") {
				if (!_tempFirst) { _tempFirst = di; }
				_length += di.clientWidth;
				//Added by John 20100511 calculate the image width, which is necessary for IE 7
				for (var q = 0, qi; qi = di.childNodes[q]; q++) {
					if (qi.tagName == "IMG") {
						qi.style.width = Math.max((di.clientWidth - 30), 0) + "px";
						break;
					}
				}
			}
		}
		if (_length > 0) {
			var _sourcePadding = me._layout.offsetLeft - me._layout.parentNode.offsetLeft;
			var _sourceLength = me._layout.clientWidth;
			var _distance = (_length - _sourceLength) / 2;
			//-15 because there are 30px left padding for each level 2 item and to cantralize the items, the first 30px should be calculated
			//which means there should be a aggragated 15px on left margin
			var _contentPadding = _sourcePadding - _distance - 15;
			_contentPadding = Math.max(0, _contentPadding);
			var _marginPadding = container.clientWidth - _length - 30;
			_contentPadding = Math.min(_contentPadding, _marginPadding);
			var br = this._tool.getBrowser();
			if (br.Category == "msie" && br.Version == 6) {
				_contentPadding = _contentPadding / 2;
			}
			_tempFirst.style.marginLeft = _contentPadding + "px";
		}
	}

	this._showSub = function (clickFlag, selectFlag) {
		//Step 1: Reset to default                                                            
		this._subDiv.className = "SubTier Relative Hide";
		this._inUse = false;
		if (selectFlag) {
			this._selectedLv1().set(this);
		}
		if (this._sub.length == 0) { return; }
		//Step 2: Get prepared to be displayed
		this._subDiv.className = "SubTier Relative";
		this._align();
		this._onhover = false;
		//Step 3: Start to show the dom
		if (clickFlag) {
			this._MoveOut(this._subDiv, 2, 14);
		}
		else {
			this._Out(this._subDiv, 14);
		}
	}

	this._setStatus = function (sender) {
		var _item = sender;
		return {
			_static: function () {
				_item._subDiv.className = "SubTier Relative Hide";
				_item._setCss(_item._staticCss + " m" + _item._id + "_static");
				_item._inDisappearing = false;
				_item._mouseFlag = false;
			},
			_hover: function () {
				_item._visitBrothers(function () {
					if (this._selected) { return; }
					this._setStatus._static();
				}, function () {
					if (this._selected) { return; }
					//Change the main item into the hover status
					this._setCss(_item._hoverCss + " m" + _item._id + "_hover");
					//move out the sub
					this._subDiv.className = "SubTier SubTierHover Absolute ZIndex1";
					this._align();
					this._Out(this._subDiv, 14);
				});
			},
			_slideStatic: function () {
				_item._MoveIn(_item._subDiv, 2, 14, function () {
					_item._subDiv.className = "SubTier Relative Hide";
					_item._setCss(_item._staticCss + " m" + _item._id + "_static");
					_item._inDisappearing = false;
					_item._mouseFlag = false;
				});
			},
			_slideHover: function () {
				_item._visitBrothers(function () {
					if (this._selected) { return; }
					this._setStatus._static();
				}, function () {
					if (this._selected) { return; }
					//Change the main item into the hover status
					this._setCss(_item._hoverCss + " m" + _item._id + "_hover");
					//move out the sub
					this._subDiv.className = "SubTier SubTierHover Absolute ZIndex1";
					this._align();
					this._MoveOut(this._subDiv, 2, 14);
				});
			}
		}
	} (this);

	/***************************************************/
	//attach handlers
	//invoke when the item itself is selected
	this._clickSelfDelegate = function (selectFlag, clickFlag) {
		this._showSub(clickFlag, selectFlag);
	}
	this._hoverHandler = function () {
		if (this._inDisappearing) {
			this._inDisappearing = false;
			if (this._mouseFlag) {
				return;
			}
			this._mouseFlag = false;
		}

		setTimeout(
			function () {
			//If no mouse pointer hovered,
			if (!me._onhover) {
				return;
			}

			//Step 1: change the layout style, the highlighted one do not need to be hightlighted again
			//and the selected one do not need to change layout.
			/*********************/
			var _node = me._selectedLv1().get;
			me._mouseFlag = true;
			//Animation will be used if the _node is a none sub node.
			if (_node._sub.length == 0 && !_node._inUse) {
				_node._inUse = true;
				me._setStatus._slideHover()
				return;
			}
			/*********************/
			me._setStatus._hover();
		}
		, me._hoverDelay.getInterval());
	}
	this._mouseOutHandler = function (evt) {
		if (this._selected) {
			return;
		}
		var _evt = evt || window.event;
		var _sourceElement = _evt.toElement || _evt.relatedTarget;
		if (this._isContains(_sourceElement, this._subDiv)) {
			return false;
		}
		this._inDisappearing = true;
		setTimeout(
			function () {
			if (!me._inDisappearing || !me._mouseFlag) { return; }
			/*********************************/
			var _node = me._selectedLv1().get;
			_node._inUse = false;
			me._mouseFlag = false;
			//if the _node is a none sub node, animation will be used.
			if (_node._sub.length == 0) {
				me._setStatus._slideStatic();

				return;
			}
			/*********************************/
			//just hide the sub div of current item
			me._setStatus._static();
		}
		, me._hoverDelay.autoGet(me));

		return false;

	}
	//init the object
	this._init('ItemStatic', 'ItemHover', 'ItemSelected', 1);
	this._subDiv.onmouseout = me._layout.onmouseout;
	this._subDiv.onmouseover = me._layout.onmouseover;
}
_menuLv1.prototype = _mateItem.prototype;
//20100510 Added by John, a prototype  property which will always save the current selected level 1 items
_menuLv1.prototype._selectedLv1 = function () {
	var _lvSelected;
	return function () {
		return {
			get: _lvSelected,
			set: function (sender) {
				_lvSelected = sender;
			}
		}
	};
} ();
////////////////////////////////////////////////////////////////////////////////////////////////
//Level 2 menu item
//cId presents for the container id which will hold all level 3 items
var _menuLv2 = function (parent, txt, id, cId, mSort) {
	_mateItem.apply(this, arguments);
	this._tag = 2;
	var _container = document.getElementById(cId);
	if (_container) {
		this._subDiv = document.createElement("DIV");
		this._subDiv.className = "PageUperTier Hide";
		_container.appendChild(this._subDiv);
	}
	if (mSort) { this._sort = mSort };
	this._init('SubStatic', 'SubHover', 'SubSelected', 4);
}
_menuLv2.prototype = _mateItem.prototype;

////////////////////////////////////////////////////////////////////////////////////////////////
//Level 3 menu item
//cId presents for the container id which will hold all level 3 items
var _menuLv3 = function (parent, txt, id, cId, mSort) {
	_mateItem.apply(this, arguments);
	this._tag = 3;
	var _container = document.getElementById(cId);
	if (_container) {
		this._subDiv = document.createElement("DIV");
		this._subDiv.className = "FourthTier Hide";
		_container.appendChild(this._subDiv);
	}
	if (mSort) { this._sort = mSort };

	//invoke when the item itself is selected
	this._clickSelfDelegate = function () {
		if (this._parent._sub.length == 0) { this._parent._subDiv.parentNode.style.display = "none"; return; }
		this._parent._subDiv.className = "PageUperTier";
		this._parent._subDiv.parentNode.style.display = "block";
		if (this._parent._parent instanceof _mateItem) {
			var _up2 = this._parent._parent;
			var _up1 = this._parent;

			for (var i in _up2._sub) {
				if (_up2._sub[i] != _up1 && "Hide".indexOf(_up2._sub[i]._subDiv.className) == -1) {
					_up2._sub[i]._subDiv.className = _up2._sub[i]._subDiv.className + " Hide";
				}
			}
		}
	}

	this._redirectHandler = function () {
		if (!this._nav || this._nav == "") { return null; }
		var _navigationUrl = window.location.href;
		var _url = this._nav.toLowerCase().replace(/\/fy\d{2}\/q\d/gi, function (x) {
			var arr = /\/fy\d{2}\/q\d/.exec(_navigationUrl.toLowerCase());
			if (arr && arr.length > 0) {
				return arr[0];
			}
			return x;
		});
		var _checker;
		if (_url.indexOf("windowsandwindowslivedivision") > -1) {
			_checker = _url.replace("windowsandwindowslivedivision", "client");
		}
		for (var i = 0, ci; ci = this._urlList[i]; i++) {
			var _tempera = ci.toLowerCase();
			if (_tempera == _url) {
				return ci;
			}
			if (_checker && _checker == _tempera) {
				return ci;
			}
		}
		return null;
	}
	this._init('PageItemStatic', 'PageItemHover', 'PageItemSelected', 2);
}
_menuLv3.prototype = _mateItem.prototype;
///////////////////////////////////////////////////////////////////////////////////////////////
var _menu = function (container) {
	if (!container) { alert("no menu container"); return; }
	this._uperTier = document.createElement("DIV");
	this._uperTier.className = "UperTier";
	this._lowerTier = document.createElement("DIV");
	this._lowerTier.className = "LowerTier";
	this._subTier = document.createElement("DIV");
	this._subTier.className = "SubTierCon";
	this._lowerTier.appendChild(this._uperTier);
	container.appendChild(this._lowerTier);
	container.appendChild(this._subTier);
	this._expend = false;
	this._elements = [];
	this._selectedItem = null;
	this._chosen = null;
	this._childMenu = null;
}

_menu.prototype._appendItem = function (item) {
	var _this = this;
	item._clickParDelegate = function () {
		_this._selectedItem = this;
		var _flag = this._sub.length;
		_this._expend = _flag > 0 ? true : false;
		for (var i in _this._elements) {
			if (_this._elements[i] != this) {
				var _idtxt = _this._elements[i]._id;
				_this._elements[i]._layout.className = (_this._elements[i]._staticCss == null ? "ItemStatic " : _this._elements[i]._staticCss + " m") + _idtxt + "_static";
				_this._elements[i]._selected = false;
				_this._elements[i]._onhover = false;
				if (_this._elements[i]._reset) { _this._elements[i]._reset(); }
			}
		}
	}
	this._elements.push(item);
	this._uperTier.appendChild(item._layout);
}

//Search all the items which match the id filter criterion
_menu.prototype._searchItems = function (strFilter) {
	var rtnArr = [];
	for (var i in this._elements) {
		if (strFilter == "#") { return rtnArr }
		if (this._elements[i]._search) {
			rtnArr = rtnArr.concat(this._elements[i]._search(strFilter));
		}
	}
	return rtnArr;
}

//Search for items
_menu.prototype._searchByUrl = function () {
	var _url = window.location.href;
	var _judgeFlag = null;
	for (var i in this._elements) {
		if (this._elements[i]._searchUrl) {
			_judgeFlag = this._elements[i]._searchUrl(_url);
			if (_judgeFlag) { return _judgeFlag; }
		}
	}
	return null;
}

//auto selection by URL
_menu.prototype._heighLight = function () {
	if (this._childMenu) { this._childMenu._heighLight(); return; }
	var _seled = this._searchByUrl();
	if (_seled) {
		_seled._setSelected(_seled);
	}
}

_menu.prototype._chooseNode = function () {
	if (this._chosen) {
		var nodeAligned = this._chosen._setSelected();
		if (nodeAligned) { this.nodeToBeAligned = nodeAligned; }
		return;
	}
	for (var i in this._elements) {
		var _seled = this._elements[i]._searchUrlList();
		if (_seled) {
			this._chosen = _seled;
			var nodeAligned = _seled._setSelected();
			if (nodeAligned) { this.nodeToBeAligned = nodeAligned; }
			return;
		}
	}
}

_menu.prototype._setAlign = function () {
	if (this.nodeToBeAligned) {
		this.nodeToBeAligned._align(1);
	}
}

_menu.prototype._eachItem = function (fiterHandler) {
	for (var i = 0, ci; ci = this._elements[i]; i++) {
		ci._each(fiterHandler);
	}
}
