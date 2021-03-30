"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("../event");
var replyMsg = function (msg) {
    if (msg.includes(" (_hr) ")) {
        var replies_1 = [];
        msg.split(" (hr_) ").forEach(function (e) {
            if (e.includes(" (_hr) ")) {
                var tmp = e.split(" (_hr) ");
                var user = tmp[1].split("_");
                replies_1.unshift({
                    message: tmp[0],
                    username: user[0],
                    time: Number(user[1])
                });
                replies_1.sort(function (a, b) {
                    return (a.time - b.time);
                });
            }
            else {
                //@ts-ignore
                replies_1.unshift(e);
            }
        });
        return replies_1;
    }
    return null;
};
exports.default = (function (message) {
    if (message.indexOf('<') !== -1) {
        var parser_1 = false;
        var tmp1 = message.split('<');
        tmp1.forEach(function (e) {
            var tmp = e.split('>');
            if (/^\d+$/.test(tmp[0])) {
                if (tmp.length === 11) {
                    parser_1 = true;
                    var reply = replyMsg(tmp[3]);
                    event_1.Bot.emit("PublicMessage", {
                        timestamp: Number(tmp[0]),
                        avatar: tmp[1],
                        username: tmp[2],
                        message: reply ? String(reply.shift()) : tmp[3],
                        color: tmp[5],
                        uid: tmp[8],
                        title: tmp[9] === "'108" ? "花瓣" : tmp[9],
                        messageId: Number(tmp[10]),
                        replyMessage: reply
                    });
                }
                else if (tmp.length === 12) {
                    if (tmp[3] === "'1") {
                        parser_1 = true;
                        var msg = {
                            timestamp: Number(tmp[0]),
                            avatar: tmp[1],
                            username: tmp[2],
                            color: tmp[5],
                            uid: tmp[8],
                            title: tmp[9] === "'108" ? "花瓣" : tmp[9],
                            room: tmp[10]
                        };
                        event_1.Bot.emit('JoinRoom', msg);
                    }
                    else if (tmp[3].substr(0, 2) === "'2") {
                        parser_1 = true;
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
                    }
                    else if (tmp[3] === "'3") {
                        parser_1 = true;
                        var msg = {
                            timestamp: Number(tmp[0]),
                            avatar: tmp[1],
                            username: tmp[2],
                            color: tmp[5],
                            uid: tmp[8],
                            title: tmp[9] === "'108" ? "花瓣" : tmp[9],
                            room: tmp[10]
                        };
                        // 触发消息时传入额外的参数。
                        event_1.Bot.emit("LeaveRoom", msg);
                    }
                }
            }
        });
        return parser_1;
    }
    else {
        var tmp = message.split('>');
        if (tmp.length === 11) {
            if (/^\d+$/.test(tmp[0])) {
                var reply = replyMsg(tmp[3]);
                var message_1 = reply ? String(reply.shift()) : tmp[3];
                var msg = {
                    timestamp: Number(tmp[0]),
                    avatar: tmp[1],
                    username: tmp[2],
                    message: message_1,
                    color: tmp[5],
                    uid: tmp[8],
                    title: tmp[9] === "'108" ? "花瓣" : tmp[9],
                    messageId: Number(tmp[10]),
                    replyMessage: reply
                };
                event_1.Bot.emit("PublicMessage", msg);
                return true;
            }
        }
    }
});
