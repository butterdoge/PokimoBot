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
var api_1 = require("./api");
api.command(/^vtb点歌 (.*)$/, function (m, e, reply) {
    api_1.vtbmusic.search(m[1]).then(function (e) {
        if (e) {
            api.method.sendMedia('music', e.title, e.signer, e.cover, "https://vtbmusic.com/song?id=" + e.id, e.music, e.duration, e.bitrate, config_1.default.app.color);
        }
        else {
            reply('[vtbmusic] 点歌失败', config_1.default.app.color);
        }
    });
});
api.command(/^vtb点歌$/, function (m, e, reply) {
    api_1.vtbmusic.hotMusic().then(function (e) {
        if (e) {
            api.method.sendMedia('music', e.title, e.signer, e.cover, "https://vtbmusic.com/song?id=" + e.id, e.music, e.duration, e.bitrate, config_1.default.app.color);
        }
        else {
            reply('[vtbmusic] 点歌失败', config_1.default.app.color);
        }
    });
});
