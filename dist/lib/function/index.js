"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var config_1 = __importDefault(require("../../config"));
var api_1 = require("../api");
var logger_1 = __importDefault(require("../logger"));
var functionPath = path_1.default.join(__dirname, '../../function');
var func = {};
fs_1.default.readdirSync(functionPath).forEach(function (e) {
    logger_1.default('Plugin').info("\u6B63\u5728\u52A0\u8F7D " + e + " ...");
    var itemPath = path_1.default.join(functionPath, e);
    var packageData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(itemPath, 'package.json')).toString());
    if (e !== 'core')
        require(path_1.default.join(itemPath, packageData.main));
    func[packageData.id] = {};
    func[packageData.id].helper = Object.values(packageData.commands);
    func[packageData.id].author = packageData.author;
    func[packageData.id].intro = packageData.intro;
    func[packageData.id].name = packageData.name;
    try {
        fs_1.default.mkdirSync("./data/" + packageData.id);
    }
    catch (error) { }
    logger_1.default('Plugin').info(e + " \u52A0\u8F7D\u5B8C\u6210");
});
api_1.Event.on('PublicMessage', function (msg) {
    var helper = function (id) {
        if (func[id]) {
            var helper_3 = func[id].helper;
            var author = func[id].author;
            var intro = func[id].intro;
            var name_1 = func[id].name;
            var parseAuthor = function (type, author) {
                var typeMap = {
                    name: "作者",
                    github: "GitHub",
                    bilibili: "Bilibili",
                    iirose: "蔷薇花园"
                };
                var authorMap = {
                    name: '{author}',
                    github: 'https://github.com/{author}',
                    bilibili: 'https://space.bilibili.com/{author}',
                    iirose: ' [*{author}*] '
                };
                return typeMap[type] + ": " + (authorMap[type] || '{author}').replace('{author}', author);
            };
            var maxLen = 0;
            for (var _i = 0, helper_1 = helper_3; _i < helper_1.length; _i++) {
                var e = helper_1[_i];
                if (maxLen < e.cmd.length)
                    maxLen = e.cmd.length;
            }
            var len = maxLen + 6;
            var tmp = [];
            tmp.push(name_1 + ": ");
            tmp.push('');
            for (var type in author) {
                tmp.push(parseAuthor(type.toLowerCase(), author[type]));
            }
            tmp.push('');
            tmp.push('');
            if (intro.length > 0) {
                for (var _a = 0, intro_1 = intro; _a < intro_1.length; _a++) {
                    var e = intro_1[_a];
                    tmp.push(e);
                }
            }
            else {
                tmp.push('暂无简介');
            }
            tmp.push('');
            tmp.push('');
            for (var _b = 0, helper_2 = helper_3; _b < helper_2.length; _b++) {
                var e = helper_2[_b];
                tmp.push("" + e.cmd + ' '.repeat(len - e.cmd.length) + e.helper);
            }
            return tmp.join('\n');
        }
        else {
            return "[YakumoRan] \u63D2\u4EF6\u672A\u627E\u5230";
        }
    };
    if (msg.message.trim() === '.help') {
        var tmp = [];
        for (var id in func) {
            tmp.push(helper(id));
        }
        api_1.method.sendPublicMessage(tmp.join('\n================================\n'), config_1.default.app.color);
    }
    else if (msg.message.substr(0, 5) === '.help') {
        var id = msg.message.substr(6).trim();
        api_1.method.sendPublicMessage(helper(id), config_1.default.app.color);
    }
});
