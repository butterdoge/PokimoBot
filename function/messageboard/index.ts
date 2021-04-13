/* eslint-disable brace-style */
import * as api from '../../lib/api'
import logger from '../../lib/logger'
import config from '../../config'
import fs from 'fs'
import path from 'path'
// 对「留言数目」初始化。
/*
const initTotal = () => {
  const Boardmessages: Array<any> = getBoardMessage()// 我为这行代码的any道个歉，忍不住偷懒。
  let max: number = 0
  Boardmessages.forEach((value) => {
    // 求取最大的uid
    if (value.mid > max) { max = value.mid }
  })
  // const total = Boardmessages.length;
  BoardMessage.currentID = max + 1
} */

const randomRangeId = (num:number) => {
  let returnStr = ''
  const charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < num; i++) {
    const index = Math.round(Math.random() * (charStr.length - 1))
    returnStr += charStr.substring(index, index + 1)
  }
  return returnStr
}
// 创建文件夹的部分完成,同时返回指定json对象。
// 只读操作。
const getBoardMessage = () => {
  const wordPath = path.join(__dirname, '../../data/messageboard/board.json')
  if (!fs.existsSync(wordPath)) {
    fs.mkdirSync(path.join(__dirname, '../../data/messageboard'))
    fs.writeFileSync(wordPath, '[]')
    return []
  }
  const target: Array<BoardMessage> = JSON.parse(fs.readFileSync(wordPath).toString())
  target.forEach(function (item) {
    item.time = new Date(item.time)
  })
  return target
  // 这边用object不知道为什么会有问题，待研究。
}

const Mupdate = (file: any) => {
  try {
    fs.writeFileSync((path.join(__dirname, '../../data/messageboard/board.json')), JSON.stringify(file))
    logger('messageboard').info('留言板文件读取成功')
  } catch (error) {
    logger('messageboard').warn('留言板文件读取失败', error)
  }
}

// 创建信息域的部分。
class BoardMessage {
    static currentID: number = 1;
    content: String;
    user: String;
    time: Date;
    uid: String;
    // mid: number;
    mid:String;
    constructor (content: String, user: String, time: Date, uid: String, mid: String = 'NaN') {
      this.content = content
      this.user = user
      this.time = time
      this.uid = uid
      // 要是有构造函数重载我也不会用这有点别扭的写法。
      // 如果该词条不存在的话选用新添ID。
      // if (mid === -1) {
      //   this.mid = BoardMessage.currentID
      //   BoardMessage.currentID++
      // }
      // //    如果存在的话，具有显式id，就用原先的id。
      // else {
      //   this.mid = mid
      // }
      if (mid === 'NaN') {
        this.mid = randomRangeId(10)
      }
      else {
        this.mid = mid
      }
    }

    showText () {
      return `
        📆这条留言的时间是:${this.time.getFullYear()}年${this.time.getMonth() + 1}月${this.time.getDate()}日。
        📝写下这篇留言的人是:${this.user};
        留言的序列号为:${this.mid};
        内容，如下：

        ${this.content}`
    }
}
// initTotal()
api.command(/^.写下留言(.*)$/, async (m, e, reply) => {
  const theMessage: BoardMessage = new BoardMessage(m[1], e.username, new Date(), e.uid)
  const Boardmessages: Array<BoardMessage> = getBoardMessage()
  Boardmessages.push(theMessage)
  Mupdate(Boardmessages)
  reply('✒️这篇留言被记录下来了。', config.app.color)
})

api.command(/^.*读取留言.*$/, async (m, e, reply) => {
  const Boardmessages: Array<BoardMessage> = getBoardMessage()
  Boardmessages.forEach(function (item) {
    // json的parse只能默认转换成一个普通对象，而不是一个类，必须重新转换成一个类的对象才可以调用其方法。
    const itemMess = new BoardMessage(item.content, item.user, new Date(item.time), item.uid, item.mid)
    const text: string = itemMess.showText()
    reply(text, config.app.color)
  })
})

// 影响编号，删去一条条目。
api.command(/^删除留言编号(.*)$/, async (m, e, reply) => {
  // 其实现在只是个对象的数组,用Object比较合适，不知道为什么用boardmessage可以通过检查↑。
  const Boardmessages: Array<Object> = getBoardMessage()
  // 从对象数组的角度操作即可吧,不用全部转换成Message数组了，因为我不会转换。
  let flag: boolean = false
  Boardmessages.forEach(function (item: any, index) {
    // 这边应该不能用any，要用interface...看到这个代码的人对不起（x，会试着提高变成素养的。
    // 声明个interface有一丢丢小麻烦...
    if (item.mid === m[1]) {
      flag = true
      console.log(`匹配成功，该留言的id为${item.mid}`)
      reply(
            `❗️ 即将删去的消息内容为: ${item.content}\n❗️ 留下该留言的人为: ${item.user}
            `, config.app.color)
      if (e.uid === item.uid || e.uid === config.app.master_uid) {
        Boardmessages.splice(index, 1)
        reply('你撕下了这个留言。', config.app.color)
        Mupdate(Boardmessages)
      } else {
        reply('只可以是作者或者机器人主人撕下。', config.app.color)
      }
    }
  })
  if (flag === false) { reply('😥找不到你说的留言唷', config.app.color) }
})

// 只读操作，不会影响编号。
api.command(/^看看留言$/, async (m, e, reply) => {
  const Boardmessages: Array<Object> = getBoardMessage()
  const total: number = Boardmessages.length
  const num = Math.floor(Math.random() * total)
  const targetPost: any = Boardmessages[num]
  const itemMess = new BoardMessage(targetPost.content, targetPost.user, new Date(targetPost.time), targetPost.uid, targetPost.mid)
  const text: string = itemMess.showText()
  reply(text, config.app.color)
})
