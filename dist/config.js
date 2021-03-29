"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var configPath = "./config.json";
if (!fs_1.default.existsSync(configPath)) {
    var defaultConfig = {
        app: {
            nickname: "机器人昵称",
            master: "主人用户名",
            master_uid: '主人uid',
            color: "消息颜色"
        },
        chat: {
            disable: true
        },
        account: {
            username: "机器人用户名",
            password: "机器人密码md5",
            room: "房间id"
        },
        logger: {
            level: "INFO"
        }
    };
    fs_1.default.writeFileSync(configPath, JSON.stringify(defaultConfig, undefined, 4));
    console.log("默认配置创建完成，请修改 config.json 后重新启动程序");
    process.exit(0);
}
exports.default = JSON.parse(fs_1.default.readFileSync("./config.json").toString());
