"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (type, username, time, intro) {
    var typeMap = {
        "chat": "41",
        "music": "42",
        "all": "43"
    };
    return "!h3[\"" + typeMap[type] + "\",\"" + username + "\",\"" + time + "\",\"" + intro + "\"]";
});
