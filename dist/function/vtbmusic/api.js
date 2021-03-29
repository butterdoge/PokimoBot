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
exports.vtbmusic = void 0;
var mm = __importStar(require("music-metadata"));
var got_1 = __importDefault(require("got"));
var random = function (n, m) { return Math.floor(Math.random() * (m - n + 1) + n); };
exports.vtbmusic = {
    getMusicInfo: function (url) { return __awaiter(void 0, void 0, void 0, function () {
        var buf, _a, _b, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = Buffer).from;
                    return [4 /*yield*/, got_1.default(url)];
                case 1:
                    buf = _b.apply(_a, [(_c.sent()).rawBody]);
                    return [4 /*yield*/, mm.parseBuffer(buf)];
                case 2:
                    result = _c.sent();
                    return [2 /*return*/, {
                            duration: Number(result.format.duration),
                            bitrate: Math.round(Number(result.format.bitrate) / 1e3)
                        }];
            }
        });
    }); },
    getCdnList: function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, _a, _b, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, got_1.default('https://api.aqua.chat/v1/GetCDNList', {
                            method: 'POST',
                            headers: {
                                "User-Agent": "iirose/YakumoRan",
                                "Content-Type": "application/json;charset=UTF-8"
                            },
                            body: "{\"PageIndex\":1,\"PageRows\":10}"
                        })];
                case 1:
                    data = _b.apply(_a, [(_c.sent()).body]).Data;
                    result = {};
                    Object.values(data).forEach(function (e) {
                        result[e.name] = e;
                    });
                    return [2 /*return*/, result];
            }
        });
    }); },
    parseMusic: function (music) { return __awaiter(void 0, void 0, void 0, function () {
        var CDNList, url, info, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, exports.vtbmusic.getCdnList()];
                case 1:
                    CDNList = _a.sent();
                    url = {
                        music: "" + CDNList[music.CDN.indexOf(':') === -1 ? music.CDN : music.CDN.split(':')[1]].url + music.Music,
                        cover: "" + CDNList[music.CDN.indexOf(':') === -1 ? music.CDN : music.CDN.split(':')[0]].url + music.CoverImg
                    };
                    return [4 /*yield*/, exports.vtbmusic.getMusicInfo(url.music)];
                case 2:
                    info = _a.sent();
                    data = {
                        id: music.Id,
                        music: url.music,
                        cover: url.cover,
                        duration: info.duration,
                        bitrate: info.bitrate,
                        title: music.OriginName,
                        signer: music.VocalName
                    };
                    return [2 /*return*/, data];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    search: function (keyword) { return __awaiter(void 0, void 0, void 0, function () {
        var body, result, _a, _b, music, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    body = {
                        pageIndex: 1,
                        pageRows: 1,
                        search: {
                            condition: "OriginName",
                            keyword: keyword
                        }
                    };
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, got_1.default('https://api.aqua.chat/v1/GetMusicList', {
                            method: "post",
                            headers: {
                                "User-Agent": "iirose/YakumoRan",
                                "Content-Type": "application/json;charset=UTF-8"
                            },
                            body: JSON.stringify(body)
                        })];
                case 1:
                    result = _b.apply(_a, [(_c.sent()).body]);
                    if (Object.values(result.Data).length === 0)
                        return [2 /*return*/, null];
                    music = Object.values(result.Data);
                    return [2 /*return*/, exports.vtbmusic.parseMusic(music[random(0, music.length - 1)])];
                case 2:
                    error_2 = _c.sent();
                    console.log(error_2);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    hotMusic: function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, result, _a, _b, music, error_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    body = {
                        pageIndex: 1,
                        pageRows: 10
                    };
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, got_1.default('https://api.aqua.chat/v1/GetHotMusicList', {
                            method: "post",
                            headers: {
                                "User-Agent": "iirose/YakumoRan",
                                "Content-Type": "application/json;charset=UTF-8"
                            },
                            body: JSON.stringify(body)
                        })];
                case 1:
                    result = _b.apply(_a, [(_c.sent()).body]);
                    music = Object.values(result.Data);
                    return [2 /*return*/, exports.vtbmusic.parseMusic(music[random(0, music.length - 1)])];
                case 2:
                    error_3 = _c.sent();
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    }); }
};
