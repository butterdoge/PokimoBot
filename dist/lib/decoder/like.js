"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("../event");
exports.default = (function (message) {
    if (message.substr(0, 2) === '@*') {
        var tmp = message.substr(2).split('>');
        if (tmp.length === 7) {
            var msg = {
                username: tmp[0],
                avatar: tmp[1],
                message: tmp[3].substr(2),
                background: tmp[4],
                timestamp: Number(tmp[5]),
                color: tmp[6]
            };
            event_1.Bot.emit("like", msg);
            return true;
        }
    }
});
