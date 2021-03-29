"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (message, color) {
    return JSON.stringify({
        m: message,
        mc: color,
        i: Math.random().toString().substr(2, 12)
    });
});
