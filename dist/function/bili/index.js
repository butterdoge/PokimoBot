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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../../config"));
var api = __importStar(require("../../lib/api"));
var api_1 = require("./api");
api.command(/(a|A)(v|V)(\d+)/gm, function (m, e, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var aid, data, t;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                aid = m[3];
                return [4 /*yield*/, api_1.bili.video_aid(aid)];
            case 1:
                data = _a.sent();
                if (!data)
                    return [2 /*return*/];
                t = [];
                t.push("[Bilibili]");
                t.push("[av" + data.aid + "]");
                t.push("[" + data.bvid + "]");
                t.push("https://b23.tv/" + data.bvid);
                t.push(data.pic);
                t.push(" \u6807\u9898: " + data.title);
                t.push(" \u7B80\u4ECB: " + data.desc);
                t.push("UP \u4E3B: " + data.owner.name + "(https://space.bilibili.com/" + data.owner.mid + ")");
                t.push(" \u6295\u7A3F\u65F6\u95F4: " + new Date(data.pubdate * 1e3).toISOString().replace('T', ' ').replace(/\.\d+Z/, ''));
                t.push(" \u5206\u533A: " + data.tname);
                t.push(" \u83B7\u8D5E\u6570: " + data.stat.like);
                t.push(" \u6295\u5E01\u6570: " + data.stat.coin);
                reply(t.join('\n'), config_1.default.app.color);
                return [2 /*return*/];
        }
    });
}); });
api.command(/BV(\w{10})/gm, function (m, e, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var bvid, data, t;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bvid = m[1];
                return [4 /*yield*/, api_1.bili.video_bvid(bvid)];
            case 1:
                data = _a.sent();
                t = [];
                t.push("[Bilibili]");
                t.push("[av" + data.aid + "]");
                t.push("[" + data.bvid + "]");
                t.push("https://b23.tv/" + data.bvid);
                t.push(data.pic);
                t.push(" \u6807\u9898: " + data.title);
                t.push(" \u7B80\u4ECB: " + data.desc);
                t.push("UP \u4E3B: " + data.owner.name + "(https://space.bilibili.com/" + data.owner.mid + ")");
                t.push(" \u6295\u7A3F\u65F6\u95F4: " + new Date(data.pubdate * 1e3).toISOString().replace('T', ' ').replace(/\.\d+Z/, ''));
                t.push(" \u5206\u533A: " + data.tname);
                t.push(" \u83B7\u8D5E\u6570: " + data.stat.like);
                t.push(" \u6295\u5E01\u6570: " + data.stat.coin);
                reply(t.join('\n'), config_1.default.app.color);
                return [2 /*return*/];
        }
    });
}); });
api.command(/^B站热搜$/gm, function (m, e, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var data, t_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api_1.bili.hotword()];
            case 1:
                data = _a.sent();
                if (!data) {
                    reply("[Bilibili] \u67E5\u8BE2\u5931\u8D25", config_1.default.app.color);
                }
                else {
                    t_1 = [];
                    data.forEach(function (e, i) { return __awaiter(void 0, void 0, void 0, function () {
                        var icon;
                        return __generator(this, function (_a) {
                            icon = e.icon.length === 0 ? 'http://i0.hdslb.com/bfs/feed-admin/e9e7a2d8497d4063421b685e72680bf1cfb99a0d.png' : e.icon;
                            t_1.push("[" + icon + "@16w_16h?a.jpg] " + (i + 1) + ". " + e.keyword);
                            return [2 /*return*/];
                        });
                    }); });
                    reply(t_1.join('\n'), config_1.default.app.color);
                }
                return [2 /*return*/];
        }
    });
}); });
api.command(/^今日新番$/, function (m, e, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var data, mapping, week, msg_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api_1.bili.bangumi.today()];
            case 1:
                data = _a.sent();
                mapping = {
                    1: ' 一',
                    2: ' 二',
                    3: ' 三',
                    4: ' 四',
                    5: ' 五',
                    6: ' 六',
                    7: ' 日'
                };
                if (data) {
                    week = mapping[data.day_of_week] || data.day_of_week;
                    msg_1 = [];
                    msg_1.push("\u4ECA\u5929\u662F \u661F\u671F " + week + ", \u5C06\u6709 " + Object.keys(data.seasons).length + " \u90E8\u65B0\u756A\u653E\u9001\uFF01");
                    Object.values(data.seasons).forEach(function (e) {
                        msg_1.push("\u300A" + e.title + "\u300B\u5C06\u4E8E " + e.pub_time + " \u66F4\u65B0 " + e.pub_index);
                    });
                    reply(msg_1.join('\n'), config_1.default.app.color);
                }
                else {
                    reply('[Bilibili] 读取失败', config_1.default.app.color);
                }
                return [2 /*return*/];
        }
    });
}); });
