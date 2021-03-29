"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (uid, money, message) {
    if (message === void 0) { message = ''; }
    var data = JSON.stringify({
        g: uid,
        c: money,
        m: message
    });
    return "+$" + data;
});
