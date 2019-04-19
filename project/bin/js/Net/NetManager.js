var NetManager = /** @class */ (function () {
    function NetManager() {
        NetManager.obj = this;
    }
    NetManager.getObj = function () {
        if (!NetManager.obj) {
            var a = new NetManager();
        }
        return NetManager.obj;
    };
    NetManager.prototype.HttpConnect = function (urls, caller, callback, header, data, metod, restype) {
        if (header === void 0) { header = null; }
        if (data === void 0) { data = null; }
        if (metod === void 0) { metod = "get"; }
        if (restype === void 0) { restype = "json"; }
        var hr = new Laya.HttpRequest();
        hr.once(Laya.Event.PROGRESS, this, this.HttpRequestProgress, [caller, callback, hr]);
        hr.once(Laya.Event.COMPLETE, this, this.HttpRequestComplete, [caller, callback, hr]);
        hr.once(Laya.Event.ERROR, this, this.HttpRequestError, [caller, callback, hr]);
        hr.http.timeout = 8000;
        if (header) {
            hr.send(urls, data, metod, restype, header);
        }
        else {
            hr.send(urls, null, 'get', 'json');
        }
    };
    NetManager.prototype.HttpRequestProgress = function (caller, callback, hr, e) {
    };
    NetManager.prototype.HttpRequestComplete = function (caller, callback, hr, e) {
        callback.apply(caller, [e, 'complete', hr]);
    };
    NetManager.prototype.HttpRequestError = function (caller, callback, hr, e) {
        callback.apply(caller, [e, 'error', hr]);
    };
    NetManager.obj = null;
    return NetManager;
}());
//# sourceMappingURL=NetManager.js.map