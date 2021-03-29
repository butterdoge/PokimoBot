"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("../event");
exports.default = (function (message) {
    if (message.substr(0, 2) === '&1') {
        var tmp = message.substr(2).split('>');
        if (tmp.length === 7) {
            var msg = {
                url: "http" + tmp[0].split(' ')[0],
                link: "http" + tmp[0].split(' ')[1],
                duration: Number(tmp[1]),
                title: tmp[2],
                singer: tmp[3].substr(2),
                owner: tmp[4],
                pic: "http" + tmp[6]
            };
            event_1.Bot.emit("music", msg);
            return true;
        }
    }
});
