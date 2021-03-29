"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = exports.WebSocket = void 0;
var events_1 = require("events");
exports.WebSocket = new events_1.EventEmitter();
exports.Bot = new events_1.EventEmitter();
//@ts-ignore
exports.Bot.setMaxListeners(Number.MAX_SAFE_INTEGER);
