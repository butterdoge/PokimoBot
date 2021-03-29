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
var Ran = __importStar(require("../../lib/api"));
var logger_1 = __importDefault(require("../../lib/logger"));
var utils_1 = require("./utils");
Ran.Event.on('PublicMessage', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var imgs, _i, imgs_1, url, realUrl, rate, m, cmd, type, user, user, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (msg.username === config_1.default.account.username)
                    return [2 /*return*/];
                imgs = utils_1.getImg(msg.message);
                if (!imgs) return [3 /*break*/, 5];
                logger_1.default("SCP-079").info(msg.username + " \u7684\u6D88\u606F\u4E2D\u5305\u542B " + imgs.length + " \u5F20\u56FE\u7247\uFF0C\u68C0\u6D4B\u4E2D...");
                _i = 0, imgs_1 = imgs;
                _a.label = 1;
            case 1:
                if (!(_i < imgs_1.length)) return [3 /*break*/, 5];
                url = imgs_1[_i];
                logger_1.default("SCP-079").info("\u6B63\u5728\u68C0\u67E5\u7B2C " + (imgs.indexOf(url) + 1) + "/" + imgs.length + " \u5F20\u56FE\u7247...");
                return [4 /*yield*/, utils_1.getRealUrl(url)];
            case 2:
                realUrl = _a.sent();
                return [4 /*yield*/, utils_1.isPorn(realUrl)];
            case 3:
                rate = _a.sent();
                logger_1.default("SCP-079").info("\u7B2C " + (imgs.indexOf(url) + 1) + "/" + imgs.length + " \u5F20\u56FE\u7247\u68C0\u6D4B\u5B8C\u6210\uFF0Crate: " + rate);
                if (rate > 0.8) {
                    // 是涩图
                    Ran.method.admin.mute("all", msg.username, "30m", "[YakumoRan|" + config_1.default.account.username + "] \u6DA9\u56FE\u81EA\u52A8\u5C01\u7981");
                    Ran.method.sendPublicMessage("\n".repeat(50), "000");
                    Ran.method.sendPrivateMessage(config_1.default.app.master_uid, [
                        "\u7528\u6237  [*" + msg.username + "*]  (uid: [@" + msg.uid + "@] ) \u521A\u521A\u53D1\u9001\u4E86\u4E00\u6761\u5305\u542B\u6DA9\u56FE\u7684\u6D88\u606F",
                        "rate: " + rate * 1e2 + "%",
                        "\u539F\u59CB\u6D88\u606F: ",
                        msg.message
                    ].join('\n'), config_1.default.app.color);
                    return [3 /*break*/, 5];
                }
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 1];
            case 5:
                if (msg.username === config_1.default.app.master) {
                    m = msg.message.trim();
                    if (m.substr(0, 1) === '/') {
                        cmd = m.substr(1).split(' ');
                        if (cmd[0] === 'mute' && msg.replyMessage) {
                            type = cmd[1] ? cmd[1] : "all";
                            user = msg.replyMessage.pop();
                            if (user) {
                                Ran.method.admin.mute(type, user.username, "30m", cmd[2] ? cmd[2] : "?");
                            }
                        }
                        else if (cmd[0] === 'kick' && msg.replyMessage) {
                            user = msg.replyMessage.pop();
                            if (user) {
                                Ran.method.admin.kick(user.username);
                            }
                        }
                        else if (cmd[0] === 'ban' && msg.replyMessage) {
                            user = msg.replyMessage.pop();
                            if (user) {
                                Ran.method.admin.blackList(user.username, "1d", cmd[1] ? cmd[1] : "?");
                            }
                        }
                        else if (cmd[0] === 'call') {
                            Ran.method.admin.notice(cmd[1]);
                        }
                    }
                }
                return [2 /*return*/];
        }
    });
}); });
