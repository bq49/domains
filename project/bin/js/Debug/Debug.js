var Debug = /** @class */ (function () {
    function Debug() {
    }
    Debug.error = function (ct) {
        if (!Debug.bDebug) {
            return;
        }
        console.error(ct);
    };
    Debug.trace = function (ct, data) {
        if (data === void 0) { data = {}; }
        if (!Debug.bDebug) {
            return;
        }
        console.log(ct);
    };
    Debug.bDebug = true; //window["bDebug"];
    return Debug;
}());
//# sourceMappingURL=Debug.js.map