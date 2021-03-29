"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../../config"));
var got_1 = __importDefault(require("got"));
var logger_1 = __importDefault(require("../logger"));
var idMap = {
    "start": 2,
    "heartbeat": 3,
    "connected": 4,
    "login_success": 5,
    "login_fail": 6,
    "command": 7,
    "sendMsg": 8
};
exports.default = (function (type) {
    var id = idMap[type] || null;
    if (!id)
        return;
    got_1.default("https://webmonitor.peer.ink/server/upBp?userId=" + config_1.default.account.username + "&locationPointId=" + id).then(function (resp) {
        if (resp.statusCode !== 200) {
            logger_1.default("Status").warn("信息上报失败");
        }
    }).catch(function (err) {
        logger_1.default("Status").warn("信息上报失败");
    });
});
