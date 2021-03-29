"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var damaku_1 = __importDefault(require("./damaku"));
var JoinRoom_1 = __importDefault(require("./JoinRoom"));
var LeaveRoom_1 = __importDefault(require("./LeaveRoom"));
var like_1 = __importDefault(require("./like"));
var SwitchRoom_1 = __importDefault(require("./SwitchRoom"));
var Music_1 = __importDefault(require("./Music"));
var paymentCallback_1 = __importDefault(require("./paymentCallback"));
var PrivateMessage_1 = __importDefault(require("./PrivateMessage"));
var PublicMessage_1 = __importDefault(require("./PublicMessage"));
var userlist_1 = __importDefault(require("./userlist"));
exports.default = (function (msg) {
    var status = [];
    status.push(userlist_1.default(msg));
    status.push(PublicMessage_1.default(msg));
    status.push(LeaveRoom_1.default(msg));
    status.push(JoinRoom_1.default(msg));
    status.push(PrivateMessage_1.default(msg));
    status.push(damaku_1.default(msg));
    status.push(like_1.default(msg));
    status.push(SwitchRoom_1.default(msg));
    status.push(Music_1.default(msg));
    status.push(paymentCallback_1.default(msg));
    status.filter(function (e) { return e; });
    if (status.length > 0)
        return true;
    return false;
});
