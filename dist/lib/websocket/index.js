"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = void 0;
var ws_1 = __importDefault(require("ws"));
var pako_1 = __importDefault(require("pako"));
var event_1 = require("../event");
var logger_1 = __importDefault(require("../logger"));
var socket;
var init = function () {
    socket = new ws_1.default("wss://m.iirose.com:443");
    socket.binaryType = 'arraybuffer';
    socket.onopen = function () {
        logger_1.default('WebSocket').info('WebSocket 连接成功');
        event_1.WebSocket.emit('connect');
    };
    socket.onclose = function (event) {
        logger_1.default('WebSocket').warn('WebSocket 断开连接, code: ', event.code, ', reason: ', event.reason);
        event_1.WebSocket.emit('disconnect');
        try {
            socket.close();
        }
        catch (error) { }
        setTimeout(function () {
            logger_1.default('WebSocket').warn('正在重新连接 WebSocket');
            init();
        }, 3e3);
    };
    socket.on('error', function (err) {
        logger_1.default('WebSocket').error('WebSocket出现错误', err);
    });
    socket.onmessage = function (event) {
        //@ts-ignore
        var array = new Uint8Array(event.data);
        var message;
        if (array[0] == 1) {
            message = pako_1.default.inflate(array.slice(1), {
                to: 'string'
            });
        }
        else {
            message = Buffer.from(array).toString('utf8');
        }
        event_1.WebSocket.emit('message', message);
    };
};
exports.default = (function () {
    init();
});
var send = function (data) {
    return new Promise(function (r) {
        try {
            var deflatedData = pako_1.default.gzip(data);
            var deflatedArray = new Uint8Array(deflatedData.length + 1);
            deflatedArray[0] = 1;
            deflatedArray.set(deflatedData, 1);
            socket.send(deflatedArray, function (err) {
                if (err)
                    return r(err);
                r(null);
            });
        }
        catch (error) {
            r(error);
        }
    });
};
exports.send = send;
