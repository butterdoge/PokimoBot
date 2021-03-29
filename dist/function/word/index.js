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
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var api = __importStar(require("../../lib/api"));
var config_1 = __importDefault(require("../../config"));
var logger_1 = __importDefault(require("../../lib/logger"));
var getWord = function () {
    var wordPath = path_1.default.join(__dirname, "../../data/word/word.json");
    if (!fs_1.default.existsSync(wordPath)) {
        fs_1.default.writeFileSync(wordPath, "{}");
        return {};
    }
    return JSON.parse(fs_1.default.readFileSync(wordPath).toString());
};
//苏苏的随机数生成姬
var random = function (n, m) { return Math.floor(Math.random() * (m - n + 1) + n); };
//更新json文件
var update = function (file) {
    try {
        fs_1.default.writeFileSync(path_1.default.join(__dirname, path_1.default.join(__dirname, "../../data/word/word.json")), JSON.stringify(file));
        logger_1.default("Word").info("词库文件写入成功");
    }
    catch (error) {
        logger_1.default("Word").warn("词库文件写入失败", error);
    }
};
//过滤一些关键词
var fitter = function (txt) {
    txt = txt.replace(/[\ |\[|\]]/g, "");
    return txt;
};
//判断error
var isError = function (element, index, array) {
    return (element == null);
};
//添加问答...
api.command(/^\.问(.*)答(.*)$/, function (m, e, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var word, wd1, wd2, i;
    return __generator(this, function (_a) {
        word = getWord();
        wd1 = m[1];
        wd2 = m[2];
        wd1 = fitter(wd1);
        if (word[wd1] == null) {
            word[wd1] = [];
        }
        i = word[wd1].push(wd2);
        update(word);
        reply("添加成功,当前序列为" + i, config_1.default.app.color);
        return [2 /*return*/];
    });
}); });
//删除部分问答
api.command(/^\.删问(.*)序[号|列](.*)$/, function (m, e, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var word, wd1, wd2, passed;
    return __generator(this, function (_a) {
        word = getWord();
        wd1 = m[1];
        wd2 = Number(m[2]) - 1;
        wd1 = fitter(wd1);
        word[wd1].splice(wd2, 1);
        passed = word[wd1].every(isError);
        if (passed == true) {
            delete word[wd1];
        }
        update(word);
        reply("删除成功", config_1.default.app.color);
        return [2 /*return*/];
    });
}); });
//查看词库list
api.command(/^\.问表(.*)$/, function (m, e, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var word, wd1, ran, _i, _a, list;
    return __generator(this, function (_b) {
        word = getWord();
        wd1 = m[1];
        ran = 0;
        for (_i = 0, _a = word[wd1]; _i < _a.length; _i++) {
            list = _a[_i];
            ran++;
            reply(ran + ":" + list, config_1.default.app.color);
        }
        return [2 /*return*/];
    });
}); });
//删除一整个回复
api.command(/^\.删全问(.*)$/, function (m, e, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var wd1, word;
    return __generator(this, function (_a) {
        wd1 = m[1];
        word = getWord();
        wd1 = fitter(wd1);
        delete word[wd1];
        update(word);
        reply("删除成功", config_1.default.app.color);
        return [2 /*return*/];
    });
}); });
//关键词回复
api.command(/^(.*)$/, function (m, e, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var word, wd1, ran, rd;
    return __generator(this, function (_a) {
        word = getWord();
        wd1 = m[1];
        wd1 = fitter(wd1);
        if (word[wd1] != null) {
            ran = word[wd1].length;
            rd = random(0, ran - 1);
            reply(word[wd1][rd], config_1.default.app.color);
        }
        return [2 /*return*/];
    });
}); });
