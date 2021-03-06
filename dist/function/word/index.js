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
try {
    fs_1.default.mkdirSync(path_1.default.join(__dirname, "../../data/word"));
}
catch (error) { }
// ??????????????????
var isAdmin = function (name) {
    var allowed = getOp();
    if (allowed.op.includes(name)) {
        return true;
    }
    else {
        return false;
    }
};
// ??????????????????
var getWord = function () {
    var wordPath = path_1.default.join(__dirname, "../../data/word/word.json");
    if (!fs_1.default.existsSync(wordPath)) {
        fs_1.default.writeFileSync(wordPath, "{}");
        console.log("????????????");
    }
    return JSON.parse(fs_1.default.readFileSync(wordPath).toString());
};
// ??????????????????
var getOp = function () {
    var opPath = path_1.default.join(__dirname, "../../data/word/op.json");
    if (!fs_1.default.existsSync(opPath)) {
        fs_1.default.writeFileSync(opPath, '{"op":[]}');
    }
    return JSON.parse(fs_1.default.readFileSync(opPath).toString());
};
// ???????????????????????????
var random = function (n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n);
};
// ??????json??????
var update = function (file, tyf) {
    try {
        fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../data/word/" + tyf + ".json"), JSON.stringify(file, null, 3));
        logger_1.default("Word").info("????????????????????????");
    }
    catch (error) {
        logger_1.default("Word").warn("????????????????????????", error);
    }
};
// ?????????????????????
var fitter = function (txt, ty) {
    if (ty === 0) {
        txt = txt.replace(/[\s[\]]/g, "");
    }
    if (ty === 1) {
        txt = txt.replace(/[\s[\]*]/g, "");
    }
    return txt;
};
// ??????error
var isError = function (element, index, array) {
    return element === null;
};
// ????????????...
api.command(/^\.???(.*)???(.*)$/, function (m, e, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var word, wd1, wd2, i;
    return __generator(this, function (_a) {
        if (!isAdmin(e.username) && e.username !== config_1.default.app.master)
            return [2 /*return*/];
        word = getWord();
        wd1 = m[1];
        wd2 = m[2];
        wd1 = fitter(wd1, 0);
        if (word[wd1] == null) {
            word[wd1] = [];
        }
        i = word[wd1].push(wd2);
        update(word, "word");
        reply("????????????,???????????????" + i, config_1.default.app.color);
        return [2 /*return*/];
    });
}); });
// ??????????????????
api.command(/^\.??????(.*)???[???|???](.*)$/, function (m, e, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var word, wd1, wd2, passed;
    return __generator(this, function (_a) {
        if (!isAdmin(e.username) && e.username !== config_1.default.app.master)
            return [2 /*return*/];
        word = getWord();
        wd1 = m[1];
        wd2 = Number(m[2]) - 1;
        wd1 = fitter(wd1, 0);
        word[wd1].splice(wd2, 1);
        passed = word[wd1].every(isError);
        if (passed === true) {
            delete word[wd1];
        }
        update(word, "word");
        reply("????????????", config_1.default.app.color);
        return [2 /*return*/];
    });
}); });
// ????????????list
api.command(/^\.??????(.*)$/, function (m, e, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var word, wd1, ran, _i, _a, list;
    return __generator(this, function (_b) {
        if (!isAdmin(e.username) && e.username !== config_1.default.app.master)
            return [2 /*return*/];
        word = getWord();
        wd1 = m[1];
        wd1 = fitter(wd1, 0);
        ran = 0;
        for (_i = 0, _a = word[wd1]; _i < _a.length; _i++) {
            list = _a[_i];
            ran++;
            reply(ran + ":" + list, config_1.default.app.color);
        }
        return [2 /*return*/];
    });
}); });
// ?????????????????????
api.command(/^\.?????????(.*)$/, function (m, e, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var wd1, word;
    return __generator(this, function (_a) {
        if (!isAdmin(e.username) && e.username !== config_1.default.app.master)
            return [2 /*return*/];
        wd1 = m[1];
        word = getWord();
        wd1 = fitter(wd1, 0);
        delete word[wd1];
        update(word, "word");
        reply("????????????", config_1.default.app.color);
        return [2 /*return*/];
    });
}); });
// ???????????????
// api.Event.on("PublicMessage", (msg) => {
//   if (msg.username === config.account.username) return; // ??????????????????????????????
//   const word = getWord();
//   let wd1: string = msg.message.trim();
//   const reply = api.method.sendPublicMessage;
//   wd1 = fitter(wd1, 0);
//   if (word[wd1] != null) {
//     const ran: number = word[wd1].length;
//     const rd: number = random(0, ran - 1);
//     reply(word[wd1][rd], config.app.color);
//   }
// });
// ?????????????????????
api.command(/^.????????????(.*)$/, function (m, e, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var allowed, added;
    return __generator(this, function (_a) {
        allowed = getOp();
        if (e.username !== config_1.default.app.master)
            return [2 /*return*/];
        added = m[1];
        added = fitter(added, 1);
        allowed.op.push(added);
        update(allowed, "op");
        reply("??????????????????", config_1.default.app.color);
        return [2 /*return*/];
    });
}); });
api.command(/^????????????(.*)$/, function (m, e, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var allowed, username;
    return __generator(this, function (_a) {
        allowed = getOp();
        if (e.username !== config_1.default.app.master)
            return [2 /*return*/];
        username = m[1];
        username = fitter(username, 1);
        // ??????????????????
        allowed.op.forEach(function (item, index, arr) {
            if (item === username) {
                allowed.op.splice(index, 1);
            }
        });
        update(allowed, "op");
        // ???username????????????json???...???????????????????????????json...??????
        reply("??????????????????", config_1.default.app.color);
        return [2 /*return*/];
    });
}); });
// ?????????????????????????????????
// ??????????????????????????????????????????????????????????????????????????????
// ???????????????????????????????????????????????????????????????????????????????????????????????????
//??????????????????????????????????????????????????????????????????????????????????????????????????????????????????;
var getWordReg = function () {
    var wordPath = path_1.default.join(__dirname, "../../data/word/wordreg.json");
    if (!fs_1.default.existsSync(wordPath)) {
        fs_1.default.writeFileSync(wordPath, "{}");
        console.log("????????????");
    }
    return JSON.parse(fs_1.default.readFileSync(wordPath).toString());
};
// ????????????...
api.command(/^\.?????????(.*)???(.*)$/, function (m, e, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var wordreg, reg1, responce, i;
    return __generator(this, function (_a) {
        if (!isAdmin(e.username) && e.username !== config_1.default.app.master)
            return [2 /*return*/];
        wordreg = getWordReg();
        reg1 = m[1];
        responce = m[2];
        //wd1 = fitter(wd1, 0) ?????????????????????????????????fitter??????????????????????????????????????????
        if (wordreg[reg1] == null) {
            wordreg[reg1] = [];
        }
        i = wordreg[reg1].push(responce);
        update(wordreg, "wordreg");
        reply("????????????????????????,???????????????" + i, config_1.default.app.color);
        return [2 /*return*/];
    });
}); });
api.Event.on("PublicMessage", function (msg) {
    if (msg.username === config_1.default.account.username)
        return; // ??????????????????????????????
    var word = getWord();
    var wd1 = msg.message.trim();
    var reply = api.method.sendPublicMessage;
    wd1 = fitter(wd1, 0);
    // ???????????????????????????
    if (word[wd1] != null) {
        var ran = word[wd1].length;
        var rd = random(0, ran - 1);
        reply(word[wd1][rd], config_1.default.app.color);
    }
    else {
        //??????????????????????????????
        var responces = [];
        var wordreg = getWordReg();
        for (var key in wordreg) {
            var changedkey = "^" + key + "$";
            var currentReg = new RegExp(changedkey);
            // test?????????????????????????????????????????????()???????????????????????????
            if (currentReg.test(msg.message)) {
                // push???????????????????????????
                var i = 0;
                while (i < wordreg[key].length) {
                    responces.push(wordreg[key][i]);
                    i++;
                }
            }
        }
        var successes = responces.length;
        if (successes != 0) {
            var rand = random(0, successes - 1);
            reply(responces[rand], config_1.default.app.color);
        }
    }
});
