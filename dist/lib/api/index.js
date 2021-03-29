"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = exports.method = exports.command = exports.Event = void 0;
var path_1 = __importDefault(require("path"));
var damaku_1 = __importDefault(require("../encoder/messages/damaku"));
var Like_1 = __importDefault(require("../encoder/system/Like"));
var payment_1 = __importDefault(require("../encoder/system/payment"));
var PrivateMessage_1 = __importDefault(require("../encoder/messages/PrivateMessage"));
var PublicMessage_1 = __importDefault(require("../encoder/messages/PublicMessage"));
var logger_1 = __importDefault(require("../logger"));
var event_1 = require("../event");
var websocket_1 = require("../websocket");
var fs_1 = require("fs");
var config_1 = __importDefault(require("../../config"));
var media_card_1 = __importDefault(require("../encoder/messages/media_card"));
var media_data_1 = __importDefault(require("../encoder/messages/media_data"));
var status_1 = __importDefault(require("../core/status"));
var blackList_1 = __importDefault(require("../encoder/admin/blackList"));
var kick_1 = __importDefault(require("../encoder/admin/kick"));
var media_clear_1 = __importDefault(require("../encoder/admin/media_clear"));
var media_cut_1 = __importDefault(require("../encoder/admin/media_cut"));
var media_exchange_1 = __importDefault(require("../encoder/admin/media_exchange"));
var media_goto_1 = __importDefault(require("../encoder/admin/media_goto"));
var media_operation_1 = __importDefault(require("../encoder/admin/media_operation"));
var mute_1 = __importDefault(require("../encoder/admin/mute"));
var notice_1 = __importDefault(require("../encoder/admin/notice"));
var setMaxUser_1 = __importDefault(require("../encoder/admin/setMaxUser"));
var whiteList_1 = __importDefault(require("../encoder/admin/whiteList"));
exports.Event = event_1.Bot;
var command = function (regexp, callback) {
    event_1.Bot.on('PublicMessage', function (e) {
        if (e.username === config_1.default.account.username)
            return;
        regexp.lastIndex = 0;
        if (regexp.test(e.message)) {
            status_1.default("command");
            logger_1.default('Command').info(e.username + " \u89E6\u53D1\u4E86 " + regexp + " \u547D\u4EE4: " + e.message);
            var reply = function (msg, color) {
                return exports.method.sendPublicMessage(msg, color);
            };
            regexp.lastIndex = 0;
            //@ts-ignore
            callback(regexp.exec(e.message), e, reply);
        }
    });
};
exports.command = command;
exports.method = {
    sendPublicMessage: function (message, color) {
        status_1.default("sendMsg");
        logger_1.default('Bot').debug("\u53D1\u9001\u4E86\u7FA4\u804A\u6D88\u606F: " + message);
        var data = PublicMessage_1.default(message, color);
        return websocket_1.send(data);
    },
    sendPrivateMessage: function (uid, message, color) {
        logger_1.default('Bot').debug("\u5411 " + uid + " \u53D1\u9001\u4E86\u79C1\u804A\u6D88\u606F: " + message);
        var data = PrivateMessage_1.default(uid, message, color);
        return websocket_1.send(data);
    },
    sendDamaku: function (message, color) {
        logger_1.default('Bot').debug("\u53D1\u9001\u4E86\u5F39\u5E55\u6D88\u606F: " + message);
        var data = damaku_1.default(message, color);
        return websocket_1.send(data);
    },
    like: function (uid, message) {
        if (message === void 0) { message = ''; }
        logger_1.default('Bot').debug("\u5411 " + uid + " \u53D1\u9001\u4E86\u70B9\u8D5E, " + message);
        var data = Like_1.default(uid, message);
        return websocket_1.send(data);
    },
    payment: function (uid, money, message) {
        logger_1.default('Bot').debug("\u5411 " + uid + " \u8F6C\u8D26 " + money + " \u8537\u8587\u5E01, \u7559\u8A00: " + message);
        var data = payment_1.default(uid, money, message);
        return websocket_1.send(data);
    },
    sendMedia: function (type, title, signer, cover, link, url, duration, BitRate, color) {
        var cardData = media_card_1.default(type, title, signer, cover, BitRate, color);
        var mediaData = media_data_1.default(type, title, signer, cover, link, url, duration);
        return [
            websocket_1.send(cardData),
            websocket_1.send(mediaData)
        ];
    },
    admin: {
        blackList: function (username, time, msg) {
            var data = blackList_1.default(username, time, msg || "undefined");
            websocket_1.send(data);
        },
        kick: function (username) {
            var data = kick_1.default(username);
            websocket_1.send(data);
        },
        mute: function (type, username, time, msg) {
            var data = mute_1.default(type, username, time, msg);
            websocket_1.send(data);
        },
        notice: function (msg) {
            var data = notice_1.default(msg);
            websocket_1.send(data);
        },
        setMaxUser: function (num) {
            var data = setMaxUser_1.default(num);
            websocket_1.send(data);
        },
        whiteList: function (username, time, msg) {
            var data = whiteList_1.default(username, time, msg || "undefined");
            websocket_1.send(data);
        },
        media: {
            clear: function () {
                var data = media_clear_1.default();
                websocket_1.send(data);
            },
            cut: function (id) {
                var data = media_cut_1.default(id);
                websocket_1.send(data);
            },
            exchange: function (id1, id2) {
                var data = media_exchange_1.default(id1, id2);
                websocket_1.send(data);
            },
            goto: function (time) {
                var data = media_goto_1.default(time);
                websocket_1.send(data);
            },
            op: function (op, time) {
                var data = media_operation_1.default(op, time);
                websocket_1.send(data);
            }
        }
    }
};
exports.Data = path_1.default.join(__dirname, '../../data');
try {
    fs_1.mkdirSync(exports.Data);
}
catch (error) { }
