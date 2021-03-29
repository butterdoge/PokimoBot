"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PublicMessage_1 = __importDefault(require("./PublicMessage"));
exports.default = (function (type, title, singer, cover, BitRate, color) {
    var typeMap = {
        'music': 0,
        'video': 1
    };
    var data = "m__4=" + typeMap[type] + ">" + title + ">" + singer + ">" + cover + ">" + color + ">" + BitRate;
    return PublicMessage_1.default(data, color);
});
