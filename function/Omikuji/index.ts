import * as api from '../../lib/api'
import config from '../../config'
import fs from 'fs'
import path from 'path'
import localconfig from './config.json'
// 创建文件夹的部分完成,同时返回指定json对象。
const wordPath = path.join(__dirname, '../../../function/Omikuji/data.json')
const target: Array<Array<String>> = JSON.parse(fs.readFileSync(wordPath).toString())
// 定义一个 御神籤 对象
const { TheEndingWords, TheBeginWords } = localconfig
class Omikuji {
  poemTitle: String;
  poemContext: String;
  poemExplain: String;
  // constructor(poemTitle: String, poemContext: String, poemExplain: String) {
  //     this.poemContext = poemContext;
  //     this.poemTitle = poemTitle;
  //     this.poemExplain = poemExplain;
  // }
  constructor (singleArray: Array<String>) {
    this.poemTitle = singleArray[0]
    this.poemContext = singleArray[1]
    this.poemExplain = singleArray[2]
  }

  showContext () {
    // 🙏🏻🌸🌟🌺⛩💕
    // 願望：難實現吧。疾病：危險吧。遺失物：難出現吧。盼望的人：壞吧。蓋新居、搬家：壞吧。旅行：壞吧。結婚、交往：全部壞吧。
    const part1: String = this.poemContext.slice(0, 5)
    const part2: String = this.poemContext.slice(5, 10)
    const part3: String = this.poemContext.slice(10, 15)
    const part4: String = this.poemContext.slice(15, 20)
    const explainMode: RegExp = /^(.*)願望：(.*)疾病：(.*)遺失物：(.*)盼望的人：(.*)蓋新居、搬家：(.*)旅行：(.*)結婚、交往：(.*)$/
    const explaindetail: any = (this.poemExplain).match(explainMode)?.slice(1, 9)
    // 很难解决，我直接any好了...对不住，不然会说他可能是null，无法读取[];
    if (explaindetail === undefined) {
      return `
        ⛩您抽到的神籤的题头为:${this.poemTitle},
        签文内容如下：
        🍥${part1}🍥
        🍥${part2}🍥
        🍥${part3}🍥
        🍥${part4}🍥

        💡该签文的一种解读如下:

        🎏签文内容的解读:
        ${this.poemExplain}。
        （有的签文无法正确排版唷~）

        ${TheEndingWords[0]}

        签文阅后即焚，信之则灵💕。
        `
    }
    return `
        ⛩您抽到的神籤的题头为:${this.poemTitle},
        签文内容如下：
        🍥${part1}🍥
        🍥${part2}🍥
        🍥${part3}🍥
        🍥${part4}🍥

        💡该签文的一种解读如下:

        🎏签文内容的解读:
        ${explaindetail[0]}

        诸事凶吉：
        ✨願望：${explaindetail[1]}
        💊疾病：${explaindetail[2]}
        💸遺失物：${explaindetail[3]}
        💖盼望的人：${explaindetail[4]}
        🏡蓋新居、搬家：${explaindetail[5]}
        🌄旅行：${explaindetail[6]}
        👰結婚、交往：${explaindetail[7]}

        ${TheEndingWords[0]}

        签文阅后即焚，信之则灵💕。
        `
  }
}
// 接下来定义一个数组转御神籤对象的函数。
api.command(/^我要抽神签.*$/, async (m, e, reply) => {
  const num = Math.floor(Math.random() * 100)
  const omikuji = new Omikuji(target[num])
  console.log(`随机数是${num}`)
  omikuji.showContext()
  reply(`🙏🏻${e.username},${TheBeginWords[0]}`, config.app.color)
  reply(omikuji.showContext(), config.app.color)
})
