"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var log4js_1 = __importDefault(require("log4js"));
var config_1 = __importDefault(require("../config"));
log4js_1.default.configure({
    appenders: {
        file: {
            type: 'dateFile',
            filename: 'logs/default',
            alwaysIncludePattern: true,
            pattern: 'yyyy-MM-dd.log'
        },
        console: {
            type: 'console'
        }
    },
    categories: {
        default: {
            appenders: ['file', 'console'],
            level: config_1.default.logger.level
        }
    }
});
exports.default = log4js_1.default.getLogger;
