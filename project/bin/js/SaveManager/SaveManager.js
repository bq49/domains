var SaveManager = /** @class */ (function () {
    function SaveManager() {
        this.mtObj = null;
        this.refreshSaveObj();
    }
    SaveManager.getObj = function () {
        if (!SaveManager.obj) {
            SaveManager.obj = new SaveManager();
        }
        return SaveManager.obj;
    };
    SaveManager.prototype.refreshSaveObj = function () {
        this.mtObj = this.getObjTotal(SaveManager.SAVE_KEY_NN, {});
    };
    SaveManager.prototype.clearAll = function () {
        Laya.LocalStorage.clear();
        this.refreshSaveObj();
        Debug.trace("SaveManager.clearAll-----------");
    };
    SaveManager.prototype.save = function (key, v) {
        this.mtObj[key] = v;
        this.saveObjTotal(SaveManager.SAVE_KEY_NN, this.mtObj);
    };
    SaveManager.prototype.get = function (key, def) {
        if (this.mtObj[key] != null && this.mtObj[key] != undefined) {
            return this.mtObj[key];
        }
        this.save(key, def);
        return def;
    };
    SaveManager.prototype.saveObjTotal = function (key, obj) {
        Laya.LocalStorage.setJSON(key, obj);
    };
    SaveManager.prototype.getObjTotal = function (key, def) {
        var a = Laya.LocalStorage.getJSON(key);
        if (a) {
            return a;
        }
        return def;
    };
    SaveManager.SAVE_KEY_NN = "domainlist"; //json obj
    SaveManager.KEY_API_URLS = "list";
    return SaveManager;
}());
//# sourceMappingURL=SaveManager.js.map