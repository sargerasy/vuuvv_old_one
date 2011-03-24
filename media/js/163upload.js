function FileUploader(a) {
    this.id = "";
    this.doc = document;
    this.obj = null;
    this.div = null;
    this.name = a.name || "undefined";
    this.src = a.src || "FileUploader.swf";
    this.url = a.url || "http://unknown";
    this.policy = a.policy || "";
    this.host = a.host || "";
    this.listen = new Function();
    this.listener = {};
    this.status = {
        total: 0,
        event: "ready",
        bytesLoaded: 0,
        currentId: ""
    };
    this.multi = (typeof a.multi == "boolean") ? a.multi: true;
    this.filter = a.filter || [];
    this.files = [];
    this.hash = {};
    this.auto = (typeof a.auto == "boolean") ? a.auto: false;
    this.menu = a.menu || "";
    this.field = a.field || "Filedata";
    this.variables = a.variables || null;
    this.init = function(d) {
        var c = "";
        this.id = d.id + "_Object";
        this.div = d.id ? this.doc.getElementById(d.id) : this.doc.body;
        var b = this.multi ? "apiMulti=1&": "";
        b += "apiListener=" + this.name + ".dispatch";
        if (this.host) {
            b += "&apiHost=" + this.host
        }
        if (document.all) {
            c = '<object id="' + this.id + '" width="100%" height="100%" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0"><param name="movie" value="' + this.src + '" /><param name="flashVars" value="' + b + '" /><param name="quality" value="high" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /></object>'
        } else {
            c = '<embed id="' + this.id + '" name="' + this.id + '" src="' + this.src + '" flashvars="' + b + '" quality="high" wmode="transparent" allowscriptaccess="always" width="100%" height="100%" type="application/x-shockwave-flash" />'
        }
        this.div.innerHTML = c
    };
    this.addListener = function(c, b) {
        this.listener[c] = b
    };
    this.sendListener = function(b, c) {
        if (typeof this.listener[b] == "function") {
            this.listen = this.listener[b];
            return this.listen(c, b)
        }
    };
    this.loadPolicy = function(b) {
        if (!b) {
            if (this.policy) {
                b = this.policy;
                this.policy = ""
            } else {
                return false
            }
        }
        try {
            this.obj.loadPolicy(b)
        } catch(c) {
            return false
        }
        return true
    };
    this.ready = function() {
        this.obj = this.doc.getElementById(this.id);
        if (this.filter && this.filter.length) {
            try {
                this.obj.setFileTypes(this.filter)
            } catch(b) {}
        }
        if (this.menu) {
            try {
                this.obj.setMenu(this.menu)
            } catch(b) {}
        }
        this.sendListener("onReady", {
            div: this.div
        })
    };
    this.dispatch = function(b) {
        var e = b.type;
        var c = null;
        if (b.fileId) {
            c = this.getFile(b.fileId);
            if (!c) {
                c = {}
            }
        }
        switch (e) {
        case "onReady":
            this.ready();
            break;
        case "onSelected":
            this.sendListener("onSelected", b);
            break;
        case "onCancel":
            this.sendListener("onCancel", b);
            break;
        case "onOpen":
            c.status = this.status.event = "upload";
            c.bytesLoaded = c.percent = 0;
            this.sendListener("onOpen", c);
            break;
        case "onProgress":
            this.status.event = "progress";
            c.bytesLoaded = b.bytesLoaded;
            c.percent = Math.floor((c.bytesLoaded / b.bytesTotal) * 100);
            this.sendListener("onProgress", c);
            break;
        case "onComplete":
            this.status.event = "progress";
            c.bytesLoaded = c.size;
            c.percent = 100;
            this.sendListener("onComplete", c);
            break;
        case "onCompleteData":
            c.status = this.status.event = "complete";
            c.data = b.data;
            var d = this.sendListener("onCompleteData", c);
            if (typeof d != "object") {
                d = {
                    success: true,
                    stop: false,
                    error: ""
                }
            }
            if (!d.success) {
                b.type = "onServerError";
                b.error = d.error || "server";
                return this.dispatch(b)
            }
            this.status.currentId = "";
            this.status.bytesLoaded += c.size;
            this.sendListener("onCompleteSingle", c);
            if (d.stop) {
                this.auto = false
            }
            if (this.auto) {
                if (!this.autoUpload()) {
                    this.sendListener("onCompleteQueue")
                }
            }
            break;
        case "onServerError":
        case "onHttpError":
        case "onIoError":
        case "onSecurityError":
            this.status.currentId = "";
            c.status = this.status.event = "error";
            c.bytesLoaded = c.percent = 0;
            if (b.error) {
                c.error = b.error
            } else {
                if (b.code) {
                    c.code = b.code
                }
            }
            var d = this.sendListener("onError", c);
            if (typeof d == "object") {
                if (d.stop) {
                    this.auto = false
                }
            }
            if (this.auto) {
                if (!this.autoUpload()) {
                    this.sendListener("onCompleteQueue")
                }
            }
            break;
        default:
            this.sendListener(e, b);
            break
        }
    };
    this.autoUpload = function() {
        if (!this.auto) {
            this.auto = true
        }
        if (this.isUpload()) {
            return true
        }
        var f, b = this.getFiles();
        var d = false;
        var e, c;
        for (e = 0, c = this.getFileCount(); e < c; e++) {
            f = b[e];
            if (f.status == "select") {
                d = true;
                this.startUpload(f.id);
                break
            }
        }
        return d
    };
    this.startUpload = function(b) {
        if (this.isUpload()) {
            return false
        }
        var c = this.getFile(b);
        if (!c) {
            return false
        }
        this.loadPolicy();
        this.sendListener("onStartUpload", c);
        try {
            this.obj.startUpload(b, this.url, this.variables, this.field)
        } catch(d) {
            return false
        }
        this.status.currentId = b;
        return true
    };
    this.removeFile = function(f) {
        var h = this.getFile(f);
        if (!h) {
            return false
        }
        try {
            this.obj.removeFile(f)
        } catch(j) {}
        this.setStatus({
            id: f,
            type: "total",
            data: false
        });
        var g, d, k;
        var c = [];
        var b = this.getFiles();
        for (g = 0, d = this.getFileCount(); g < d; g++) {
            k = b[g];
            if (k.id != f) {
                c[c.length] = k
            }
        }
        this.files = c;
        delete this.hash[f];
        if (this.status.currentId == f) {
            this.status.currentId = "";
            this.status.event = "delete"
        }
        return true
    };
    this.isFile = function(b) {
        var c = false;
        if (typeof this.hash[b] == "object") {
            c = true
        }
        return c
    };
    this.isUpload = function() {
        var c = this.getEvent();
        var b = (c == "upload" || c == "progress");
        if (b && !this.getCurrent()) {
            b = false
        }
        return b
    };
    this.getEvent = function() {
        return this.status.event
    };
    this.getCurrent = function() {
        var b = this.status.currentId;
        var c = this.getFile(b);
        return c
    };
    this.getFile = function(b) {
        var c = null;
        if (b) {
            if (this.isFile(b)) {
                c = this.hash[b]
            }
        }
        return c
    };
    this.getFiles = function() {
        return this.files
    };
    this.setFiles = function(b) {
        var g;
        var d = false;
        var f, c;
        for (f = 0, c = b.length; f < c; f++) {
            g = b[f];
            if (g.status == "select") {
                this.files[this.getFileCount()] = this.hash[g.id] = g;
                this.status.total += g.size;
                d = true
            } else {
                try {
                    this.obj.removeFile(g.id)
                } catch(h) {}
            }
        }
        if (d && this.auto) {
            this.autoUpload()
        }
    };
    this.getFileCount = function() {
        return this.files.length
    };
    this.getStatus = function(d) {
        var c = {};
        var b = 0;
        if (typeof d == "number") {
            b = d
        }
        c.bytesLoaded = this.status.bytesLoaded + b;
        c.bytesTotal = this.status.total;
        if (c.bytesTotal == 0) {
            c.percent = 0
        } else {
            c.percent = Math.floor((c.bytesLoaded / c.bytesTotal) * 100)
        }
        c.current = this.getCurrent();
        return c
    };
    this.setStatus = function(c) {
        if (typeof c != "object") {
            return false
        }
        var f = null;
        if (c.id) {
            f = this.getFile(c.id);
            if (!f) {
                return false
            }
        }
        switch (c.type) {
        case "select":
            try {
                this.obj.setFileSelect(c.data)
            } catch(g) {
                return false
            }
            break;
        case "reset":
            f.status = "select";
            break;
        case "enable":
            if (f.status == "disable") {
                f.status = "complete";
                return this.setStatus({
                    id: f.id,
                    type: "total",
                    data: true
                })
            }
            break;
        case "disable":
            if (f.status == "complete") {
                f.status = "disable";
                return this.setStatus({
                    id: f.id,
                    type: "total",
                    data: false
                })
            }
            break;
        case "total":
            var b = f.size;
            if (c.data) {
                this.status.total += b;
                this.status.bytesLoaded += b
            } else {
                this.status.total -= b;
                var d = f.status;
                if (d == "complete" || d == "disable") {
                    this.status.bytesLoaded -= b
                }
            }
            break;
        default:
            return false;
            break
        }
        return true
    }
}

