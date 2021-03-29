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
var fs_1 = require("fs");
var path_1 = require("path");
var Ran = __importStar(require("../../lib/api"));
var logger_1 = __importDefault(require("../../lib/logger"));
var random = function (n, m) { return Math.floor(Math.random() * (m - n + 1) + n); };
var stats = {
    id: 0,
    question: "",
    answer: "",
    allow: false
};
var getQuestion = function () {
    try {
        var data = Object.values(JSON.parse(fs_1.readFileSync(path_1.join(__dirname, "./LanternRiddles.json")).toString()));
        var len = data.length - 1;
        var id = random(0, len);
        var result = data[id];
        return {
            id: id,
            question: result[0],
            answer: result[1]
        };
    }
    catch (error) {
        return {
            id: -1,
            question: undefined,
            answer: undefined
        };
    }
};
Ran.Event.on('PublicMessage', function (msg) {
    var reply = function (message) {
        var data = msg.message + " (_hr) " + msg.username + "_" + Math.round(new Date().getTime() / 1e3) + " (hr_) " + message;
        Ran.method.sendPublicMessage(data, "f02d2d");
    };
    if (stats.allow) {
        if (msg.message.trim() === stats.answer) {
            stats.allow = false;
            logger_1.default("ACTIVE").info(msg.username, "答对了第", stats.id, "题");
            reply("回答正确!");
        }
    }
});
Ran.command(/^结束灯谜$/, function (m, msg) {
    stats.allow = false;
    stats.question = "";
    stats.answer = "";
    stats.id = 0;
    var reply = function (message) {
        var data = msg.message + " (_hr) " + msg.username + "_" + Math.round(new Date().getTime() / 1e3) + " (hr_) " + message;
        Ran.method.sendPublicMessage(data, "f02d2d");
    };
    reply("已结束本场灯谜，要开始灯谜请发送 \"灯谜\"");
});
Ran.command(/^灯谜$/, function () {
    if (stats.allow) {
        Ran.method.sendPublicMessage("有一个正在进行的游戏", "f02d2d");
        return;
    }
    var result = getQuestion();
    if (result.question) {
        stats.answer = result.answer;
        stats.question = result.question;
        stats.id = Number(result.id);
        Ran.method.sendPublicMessage([
            "请听题: ",
            '',
            '',
            result.question
        ].join('\n'), "f02d2d");
        stats.allow = true;
    }
    else {
        Ran.method.sendPublicMessage("灯谜读取失败", "f02d2d");
    }
});
