"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (uid, message, color) {
    return JSON.stringify({
        g: uid,
        m: message,
        mc: color,
        i: Math.random().toString().substr(2, 12)
    });
});
