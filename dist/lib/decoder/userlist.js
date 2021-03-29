"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("../event");
exports.default = (function (message) {
    if (message.substr(0, 3) === '%*"') {
        var list_1 = [];
        message.substr(3).split('<').forEach(function (e, i) {
            var tmp = e.split('>');
            if (tmp.length >= 8) {
                list_1.push({
                    avatar: tmp[0],
                    username: tmp[2],
                    color: tmp[3],
                    room: tmp[4],
                    uid: tmp[8]
                });
            }
        });
        event_1.Bot.emit("UserList", list_1);
        return true;
    }
});
