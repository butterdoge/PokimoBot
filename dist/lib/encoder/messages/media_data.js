"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (type, title, signer, cover, link, url, duration) {
    var typeMap = {
        'music': 0,
        'video': 1
    };
    var data = JSON.stringify({
        b: "=" + typeMap[type],
        c: cover.substr(4),
        d: duration,
        n: title,
        o: link.substr(4),
        r: signer,
        s: url.substr(4)
    });
    return "&1" + data;
});
