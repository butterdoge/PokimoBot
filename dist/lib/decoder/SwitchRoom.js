"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("../event");
exports.default = (function (message) {
    var tmp = message.split('>');
    if (tmp.length === 12) {
        if (/\d+/.test(tmp[0])) {
            if (tmp[3].substr(0, 2) === "'2") {
                var msg = {
                    timestamp: Number(tmp[0]),
                    avatar: tmp[1],
                    username: tmp[2],
                    color: tmp[5],
                    uid: tmp[8],
                    title: tmp[9] === "'108" ? "花瓣" : tmp[9],
                    room: tmp[10],
                    targetRoom: tmp[3].substr(2)
                };
                event_1.Bot.emit("SwitchRoom", msg);
                return true;
            }
        }
    }
});
