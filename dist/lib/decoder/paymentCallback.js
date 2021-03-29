"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("../event");
exports.default = (function (message) {
    if (message.substr(0, 2) === '|$') {
        event_1.Bot.emit("paymentCallback", {
            money: Number(message.substr(2))
        });
        return true;
    }
});
