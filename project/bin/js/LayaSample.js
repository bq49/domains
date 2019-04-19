var WebGL = Laya.WebGL;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(600, 400, WebGL);
        var dyd = new DynamicDomain("./conf/urls.json", this, this.onDomainReady);
    }
    GameMain.prototype.onDomainReady = function (dyd) {
        var url = dyd.getDomain();
        if (url != null) {
            NetManager.getObj().HttpConnect(url, this, this.onResponse);
        }
        else {
            Debug.trace("LayaSample.url == null");
        }
    };
    GameMain.prototype.onResponse = function (s, stat, hr) {
        Debug.trace("LayaSample.onResponse:");
        Debug.trace(stat);
        Debug.trace(s);
        Debug.trace(hr);
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map