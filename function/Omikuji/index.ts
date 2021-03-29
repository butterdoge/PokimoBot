import * as api from '../../lib/api';
import logger from '../../lib/logger';
import config from '../../config';
import fs from 'fs';
import path from 'path';
import { threadId } from 'worker_threads';
// 创建文件夹的部分完成,同时返回指定json对象。
const wordPath = path.join(__dirname, "../../function/Omikuji/data.json");
let target: Array<Array<String>> = JSON.parse(fs.readFileSync(wordPath).toString());
//定义一个 御神籤 对象
class Omikuji{
    poemTitle: String;
    poemContext: String;
    poemExplain: String;
    // constructor(poemTitle: String, poemContext: String, poemExplain: String) {
    //     this.poemContext = poemContext;
    //     this.poemTitle = poemTitle;
    //     this.poemExplain = poemExplain;
    // }
    constructor(singleArray: Array<String>) {
        this.poemTitle = singleArray[0];
        this.poemContext = singleArray[1];
        this.poemExplain = singleArray[2];
    }
    showContext() {
        //🙏🏻🌸🌟🌺⛩💕
        var output: String = "您抽到的🌸神籤的题头为:" + this.poemTitle + "/n";
        const part1: String = this.poemContext.slice(0, 5);
        const part2: String = this.poemContext.slice(5,10);
        const part3: String = this.poemContext.slice(10, 15);
        const part4: String = this.poemContext.slice(15, 20);
        output = `
        您抽到的神籤的题头为:${this.poemTitle},签文内容如下：
        

        💡该签文的一种解读如下:
        ${this.poemExplain}

        🌸无论该签的凶吉如何，也不过玩世不恭一场，
        🌸神社的巫女会为你怯除那些坏运气的w。

        ⛩签文阅后即焚，信之则灵🌺。
        `
        return `
        您抽到的神籤的题头为:${this.poemTitle},签文内容如下：
        🍥${part1}🍥
        🍥${part2}🍥
        🍥${part3}🍥
        🍥${part4}🍥

        💡该签文的一种解读如下:
        ${this.poemExplain}

        无论该签的凶吉如何，也不过玩世不恭一场，
        🌟~不过，请相信，神社的巫女会为你怯除那些坏运气的w🤗。

        签文阅后即焚，信之则灵💕。
        `;
        
    }
}
// 接下来定义一个数组转御神籤对象的函数。
api.command(/^我要抽神签.*$/, async (m, e, reply) => {
    var num = Math.floor(Math.random() * 100);
    var omikuji = new Omikuji(target[num]);
    omikuji.showContext();
    reply(`🙏🏻${e.username},🍵神社的巫女给你奉上了一杯温热的茶，你虔诚祈祷，从神社祈请了一张御神籤。🙏🏻`,config.app.color);
    reply(omikuji.showContext(), config.app.color);
});