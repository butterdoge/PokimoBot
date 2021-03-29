"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../../../config"));
exports.default = (function () {
    var data = {
        r: config_1.default.account.room,
        n: config_1.default.account.username,
        p: config_1.default.account.password,
        st: 'n',
        mo: '',
        mb: '',
        mu: '01'
    };
    return "*" + JSON.stringify(data);
});
