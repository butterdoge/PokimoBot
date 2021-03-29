import * as api from '../../lib/api';
import logger from '../../lib/logger';
import config from '../../config';
import fs from 'fs';
import path from 'path';
// 创建文件夹的部分完成,同时返回指定json对象。
const getBoardMessage = () => {
	const wordPath = path.join(__dirname, "../../data/messageboard/board.json")
    if (!fs.existsSync(wordPath)) {
        fs.mkdirSync(path.join(__dirname, "../../data/messageboard"));
		fs.writeFileSync(wordPath, "[]");
        return [];
	}
    let target: Array<BoardMessage>= JSON.parse(fs.readFileSync(wordPath).toString());
    target.forEach(function(item) {
        item["time"] = new Date (item["time"]);
    })
    return target;
    // 这边用object不知道为什么会有问题，待研究。
}

const update = (file: any) => {
	try {
		fs.writeFileSync((path.join(__dirname, "../../data/messageboard/board.json")), JSON.stringify(file));
		logger("Word").info("词库文件写入成功");
	} catch (error) {
		logger("Word").warn("词库文件写入失败", error);
	}
}

// 创建信息域的部分。
class BoardMessage{
    content: String;
    user: String;
    time: Date;
    uid: String;
    constructor(content: String, user: String, time: Date,uid:String) {
        this.content = content;
        this.user = user;
        this.time = time;
        this.uid = uid;
    }
    showText() {
        let text: String = `这条留言的时间是:${this.time.getFullYear()}年，${this.time.getDate()}月，${this.time.getDay()}日。
        写下这篇留言的人是:this.user;
        内容，如下：
        this.content`;
        // 不这样改的话下面reply会报错，不能直接返回text，不知道为什么，待研究。
        return `这条留言的时间是:${this.time.getFullYear()}年，${this.time.getDate()}月，${this.time.getDay()}日。
        写下这篇留言的人是:this.user;
        内容，如下：
        this.content`;
    }
}

api.command(/^.写下留言(.*)$/, async (m, e, reply) => {
    let theMessage:BoardMessage = new BoardMessage(m[1], e.username, new Date(), e.uid)
    let Boardmessages:Array<BoardMessage> = getBoardMessage();
    Boardmessages.push(theMessage);
    update(Boardmessages);
    reply("这篇留言被记录下来了。",config.app.color);
});

api.command(/^.*读取留言.*$/, async (m, e, reply) => {
    let Boardmessages: Array<BoardMessage> = getBoardMessage();
    Boardmessages.forEach(function (item) {
        reply(item.showText(), config.app.color);
    })
})