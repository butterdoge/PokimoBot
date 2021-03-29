"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("../event");
exports.default = (function (message) {
    if (message.substr(0, 1) === '=') {
        var tmp = message.substr(1).split('>');
        if (tmp.length === 6) {
            var msg = {
                username: tmp[0],
                avatar: tmp[5],
                message: tmp[1],
                color: tmp[2],
            };
            event_1.Bot.emit("damaku", msg);
            return true;
        }
    }
});
