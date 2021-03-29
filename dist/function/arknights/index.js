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
var arknights = __importStar(require("./api"));
api.command(/查物品(.*)/, function (m, e, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var result, msg_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, arknights.getItem(m[1])];
            case 1:
                result = _a.sent();
                if (result) {
                    msg_1 = [];
                    result.forEach(function (e) {
                        msg_1.push("[" + e.name + "]\n " + e.usage.replace('\\n', '\n') + " \n " + e.description.replace('\\n', '\n'));
                    });
                    reply(msg_1.join('\n\n==========================\n\n'), config_1.default.app.color);
                }
                else {
                    reply('[Arknights] 未找到', config_1.default.app.color);
                }
                return [2 /*return*/];
        }
    });
}); });
api.command(/查掉落(.*)/, function (m, e, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var stats, msg, p1, p2, result, _loop_1, index;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reply('[Arknights] 正在查询...', config_1.default.app.color);
                stats = {
                    query: 0,
                    startAt: new Date().getTime() / 1e3
                };
                msg = [];
                p1 = [];
                p2 = [];
                return [4 /*yield*/, arknights.getItem(m[1])];
            case 1:
                result = _a.sent();
                stats.query++;
                if (result) {
                    _loop_1 = function (index) {
                        var item = result[index];
                        // 查询物品掉落
                        stats.query++;
                        var tmp = arknights.GetMatrix(item.itemId);
                        p1.push(tmp);
                        tmp.then(function (matrix) {
                            if (matrix) {
                                var _loop_2 = function (index_1) {
                                    var e_1 = matrix[index_1];
                                    var rate = e_1.quantity / e_1.times;
                                    // 查询关卡信息
                                    stats.query++;
                                    var tmp_1 = arknights.getStagesByID(e_1.stageId);
                                    p2.push(tmp_1);
                                    tmp_1.then(function (stage) {
                                        if (stage) {
                                            var cost = Math.round((stage.apCost / rate) * 1e2) / 1e2;
                                            msg.push("[" + item.name + " - " + stage.code + "] \u6389\u843D\u7387: " + Math.round(rate * 1e4) / 1e2 + "%, \u7406\u667A\u6D88\u8017: " + stage.apCost + ", \u5E73\u5747\u5355\u4EF6\u6D88\u8017\u7406\u667A: " + cost);
                                        }
                                    });
                                };
                                for (var index_1 in matrix) {
                                    _loop_2(index_1);
                                }
                            }
                        });
                    };
                    for (index in result) {
                        _loop_1(index);
                    }
                    Promise.all(p1).then(function (e) {
                        Promise.all(p2).then(function (e) {
                            msg.push("[Status] \u8BF7\u6C42\u6B21\u6570: " + stats.query);
                            msg.push("[Status] \u67E5\u8BE2\u8017\u65F6: " + Math.round(((new Date().getTime() / 1e3) - stats.startAt) * 1e6) / 1e6 + "s");
                            reply(msg.join('\n'), config_1.default.app.color);
                        });
                    });
                }
                else {
                    reply('[Arknights] 未找到 \n [Status] 请求次数: 1', config_1.default.app.color);
                }
                return [2 /*return*/];
        }
    });
}); });
