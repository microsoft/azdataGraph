"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendedConnectionHandler = exports.OnAction = void 0;
const mx_1 = require("../mx");
var OnAction;
(function (OnAction) {
    OnAction["CASCADE"] = "0";
    OnAction["NO_ACTION"] = "1";
    OnAction["SET_NULL"] = "2";
    OnAction["SET_DEFAULT"] = "3";
})(OnAction || (exports.OnAction = OnAction = {}));
class extendedConnectionHandler extends mx_1.mxGraphFactory.mxConnectionHandler {
    constructor() {
        super(...arguments);
        this.currentRow = 0;
    }
}
exports.extendedConnectionHandler = extendedConnectionHandler;
