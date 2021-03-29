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
    static currentID: number=1;
    content: String;
    user: String;
    time: Date;
    uid: String;
    mid: number;
    constructor(content: String, user: String, time: Date,uid:String,mid:number=-1) {
        this.content = content;
        this.user = user;
        this.time = time;
        this.uid = uid;
        // 要是有构造函数重载我也不会用这有点别扭的写法。
        if (mid == -1) {
            this.mid = BoardMessage.currentID;
            BoardMessage.currentID++;
        }
           
        else {
            this.mid = mid;
        }
            
    }

    showText() {
        let text: String = `这条留言的时间是:${this.time.getFullYear()}年，${this.time.getMonth()}月，${this.time.getDate()}日。
        写下这篇留言的人是:${this.user};
        内容，如下：
        ${this.content}`;
        // 不这样改的话下面reply会报错，不能直接返回text，不知道为什么，待研究。
        return `这条留言的时间是:${this.time.getFullYear()}年${this.time.getMonth()+1}月${this.time.getDate()}日。
        写下这篇留言的人是:${this.user};
        留言的序列号为:${this.mid};
        内容，如下：
        ${this.content}`;
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
        // json的parse只能默认转换成一个普通对象，而不是一个类，必须重新转换成一个类的对象才可以调用其方法。
        let itemMess = new BoardMessage(item.content, item.user, new Date(item.time), item.uid,item.mid);
        const text: string = itemMess.showText();
        reply(text, config.app.color);
    })
})