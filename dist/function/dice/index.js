"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../../config"));
var api = __importStar(require("../../lib/api"));
var getRandomInt = function (n, m) { return Math.floor(Math.random() * (m - n + 1) + n); };
api.command(/^骰子 (\d+)(D|d)(\d+)$/, function (m, e, reply) {
    var count = Number(m[1]);
    var max = Number(m[3]);
    var dice = [];
    var msg = [];
    var total = 0;
    for (var i = 0; i < count; i++) {
        var n = getRandomInt(1, max);
        dice.push(n);
        msg.push(i + 1 + ". " + n);
        total += n;
    }
    ;
    msg.push('');
    msg.push(dice.join('+') + "=" + total);
    reply(msg.join('\n'), config_1.default.app.color);
});
