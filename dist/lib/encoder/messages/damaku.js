"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (message, color) {
    var data = {
        t: message,
        c: color
    };
    return "~" + JSON.stringify(data);
});
