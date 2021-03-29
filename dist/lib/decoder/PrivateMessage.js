"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("../event");
exports.default = (function (message) {
    if (message.substr(0, 1) === '"') {
        var tmp = message.substr(1).split('>');
        if (tmp.length === 11) {
            if (/^\d+$/.test(tmp[0])) {
                var msg = {
                    timestamp: Number(tmp[0]),
                    uid: tmp[1],
                    username: tmp[2],
                    avatar: tmp[3],
                    message: tmp[4],
                    color: tmp[5],
                    messageId: Number(tmp[10])
                };
                event_1.Bot.emit("PrivateMessage", msg);
                return true;
            }
        }
    }
});
