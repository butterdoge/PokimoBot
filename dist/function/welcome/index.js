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
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var api = __importStar(require("../../lib/api"));
var config_1 = __importDefault(require("../../config"));
try {
    fs_1.default.mkdirSync(path_1.default.join(api.Data, 'welcome'));
}
catch (error) { }
var random = function (n, m) { return Math.floor(Math.random() * (m - n + 1) + n); };
var GetWelcomeBack = function (uid) {
    var file = path_1.default.join(api.Data, 'welcome', uid);
    if (fs_1.default.existsSync(file)) {
        return fs_1.default.readFileSync(file).toString();
    }
    else {
        return null;
    }
};
var sentences = [
    [
        // 早上
        '{at} 早上好，阁下昨晚睡的怎样？今天也要元气满满哦~',
        '{at} 早上好，一日之计在于晨，早起是个好习惯！',
        '{at} 早上好阁下，新的一天开始啦，不要忘记吃早饭哦~',
        '{at} 阁下早上好，一起来拥抱世界吧~',
        '{at} 早上好，阁下是刚醒还是没睡?'
    ],
    [
        // 中午
        '{at} 阁下中午好，要睡个午觉嘛？',
        '{at} 午安阁下，来打个盹吧~',
        '{at} 中午了中午了！午餐铃响了没？记得按时吃饭~',
        '{at} 干饭人，干饭魂，不干饭就没精神！阁下中午记得要好好吃饭哦~',
        '{at} 吃饱喝足，最适合睡午觉啦！阁下要不要休息一下养养膘~'
    ],
    [
        // 下午
        '{at} 下午好, 愿我的问候如清冷的早晨般滋养阁下！',
        '{at} 有没有睡午觉呀？下午是非常容易犯困的时段，阁下要加油哦！',
        '{at} 下午好下午好！阁下要不要来杯下午茶？',
        '{at} 下午好呀~不知道阁下有没有好好午休呢！午休过后会更有精神哦~',
        '{at} 阁下下午好！一天的时间已经过去大半啦~'
    ],
    [
        // 晚上
        '{at} 晚好，我正通过最亮的星为阁下许愿呢~',
        '{at} 晚上好~ 累了一天，记得要早点休息哟~',
        '{at} 无论天气如何，心里都要装着小星星哦~阁下晚上好！',
        '{at} 晚上好呀~累了一天辛苦啦！{nickname}一直都在阁下身旁，加油！',
        '{at} 阁下晚上好~今晚也要记得早点休息，{nickname}提前祝您晚安好梦~'
    ],
    [
        // 半夜
        '欢迎光临，现在是凌晨，阁下{at}的头发还好吗？',
        '{at} 萤火虫都去歇息了，阁下怎么还不睡觉？',
        '{at} 月亮不睡我不睡，阁下先请~',
        '{at} 让我看看是哪个不听话的孩子还没有乖乖睡觉！【气fufu】',
        '{at} 已经很晚啦，阁下也要早点休息，晚安~'
    ],
    [
        // 特殊
        '{at} 欢迎回来，kokodayo~',
        '{at} 欢迎光临，祝您十连五个金，不过运气谁都有，谁先用完谁先走',
        '{at} 欢迎光临，哼、哼、啊啊啊啊啊啊啊啊',
        '{at} 欢迎回来, https://d0.static.imoe.xyz/share/%E6%AD%8C%E6%9B%B2/damedane.mp3'
    ]
];
var sp = {
    'bh3': {
        // 崩坏三周三和周日概率触发
        'week_3or7': '欢迎回来，今晚深渊结算，关底大盾四路泰坦，{at}打不过，你充钱也打不过'
    },
    'first': [
        [
            "欢迎来到蔷薇花园，这里是一个多功能聊天室~",
            "我们可以在这里一起聊天，听音乐，看视频~",
            "——————————————————————————",
            "输入@+歌名 点歌",
            "输入#+视频名 点视频",
            "",
            "点击左下角头像  可以发送表情🌸",
            "点击右下角‘+’号  查看更多功能",
            "还有不懂的可以点一下这个哦~ [*教程*]  ",
            "",
            "http://r.iirose.com/i/20/1/22/13/3826-IF.jpg#e",
        ].join('\n')
    ]
};
var users = {};
api.command(/\.wb set (.*)/, function (m, e, reply) {
    var file = path_1.default.join(api.Data, 'welcome', e.uid);
    try {
        fs_1.default.writeFileSync(file, m[1]);
        reply('[Welcome] 设置成功', config_1.default.app.color);
    }
    catch (error) {
        reply('[Welcome] 设置失败', config_1.default.app.color);
    }
});
api.command(/\.wb rm/, function (m, e, reply) {
    var file = path_1.default.join(api.Data, 'welcome', e.uid);
    try {
        fs_1.default.unlinkSync(file);
        reply('[Welcome] 设置成功', config_1.default.app.color);
    }
    catch (error) {
        reply('[Welcome] 设置失败', config_1.default.app.color);
    }
});
api.Event.on('JoinRoom', function (msg) {
    if (msg.username === config_1.default.account.username)
        return;
    users[msg.uid] = true;
    if (msg.uid.substr(0, 1) === 'X') {
        api.method.sendPublicMessage(sp.first[random(0, sp.first.length - 1)], config_1.default.app.color);
        setTimeout(function () {
            delete users[msg.uid];
        }, 6e4);
        return;
    }
    setTimeout(function () {
        delete users[msg.uid];
    }, 1e4);
    var isSp = false;
    var username = " [*" + msg.username + "*] ";
    var t = new Date().getHours();
    var week = new Date().getDay();
    var welcome = '欢迎回来~';
    if (t >= 5 && t <= 10) {
        // 5:00 ~ 10:00
        var len = sentences[0].length;
        welcome = sentences[0][random(0, len - 1)];
    }
    else if (t >= 11 && t <= 13) {
        // 11:00 ~ 13:00
        var len = sentences[1].length;
        welcome = sentences[1][random(0, len - 1)];
    }
    else if (t >= 14 && t <= 18) {
        // 14:00 ~ 19:00
        var len = sentences[2].length;
        welcome = sentences[2][random(0, len - 1)];
    }
    else if (t >= 19 && t <= 23) {
        // 20:00 ~ 23:00
        var len = sentences[3].length;
        welcome = sentences[3][random(0, len - 1)];
    }
    else if (t <= 4 || t >= 24) {
        // 24:00 ~ 28:00
        var len = sentences[4].length;
        welcome = sentences[4][random(0, len - 1)];
    }
    // 特殊
    if (random(1, 10) <= 1) {
        isSp = true;
        var len = sentences[5].length;
        welcome = sentences[5][random(0, len - 1)];
    }
    // 周三和周日，1%概率触发
    if ((week === 3 || week === 7) && (t >= 14 && t <= 18) && random(1, 100) === 1) {
        welcome = sp.bh3.week_3or7;
        isSp = true;
    }
    var tmp = GetWelcomeBack(msg.uid);
    if (!isSp && tmp) {
        welcome = "{at} " + tmp;
    }
    api.method.sendPublicMessage(welcome.replace(/{at}/gm, username).replace(/{nickname}/gm, config_1.default.app.nickname), config_1.default.app.color);
});
