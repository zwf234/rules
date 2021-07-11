/*
0 8,12 * * * https://raw.githubusercontent.com/zwf234/rules/master/js/jd_zcxyc.js
*/
const $ = new Env('众筹许愿池');
const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
let timestamp = Date.now();
let cookiesArr = [],
    cookie = "",
    message;
    a =''
let allMessage = '';
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {
    };
} else {
    cookiesArr = [
        $.getdata("CookieJD"),
        $.getdata("CookieJD2"),
        ...jsonParse($.getdata("CookiesJD") || "[]").map((item) => item.cookie),
    ].filter((item) => !!item);
}


const JD_API_HOST = "https://api.m.jd.com/client.action";

!(async () => {
    if (!cookiesArr[0]) {
        $.msg(
            $.name,
            "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取",
            "https://bean.m.jd.com/", {
                "open-url": "https://bean.m.jd.com/"
            }
        );
        return;
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            ck2 = cookiesArr[Math.round(Math.random()*5)];
            $.UserName = decodeURIComponent(
                cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]
            );
            $.index = i + 1;
            message = "";
            console.log(`\n******开始【京东账号${$.index}】${$.UserName}*********\n`);

            await task()
        }
    }
    if ($.isNode() && allMessage) {
        await notify.sendNotify(`${$.name}`, `${allMessage}` )
    }
})()
    .catch((e) => {
        $.log("", `❌ ${$.name}, 失败! 原因: ${e}!`, "");
    })
    .finally(() => {
        $.done();
    });

function showMsg() {
    return new Promise(resolve => {
        $.log($.name, '', `京东账号${$.index}${$.nickName}\n${message}`);
        
        resolve()
    })
}



function task() {
    return new Promise(async (resolve) => {

                let options = {
    url: `https://api.m.jd.com/client.action`,

    body: `functionId=healthyDay_getHomeData&body={"appId":"1EFVQwQ","taskToken":"","channelId":1}&client=wh5&clientVersion=1.0.0`,
headers: {
"Origin": "https://h5.jd.com",
"Host": "api.m.jd.com",
"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 UBrowser/5.6.12150.8 Safari/537.36",
      "Cookie": cookie,
      }
                }
      
        $.post(options, async (err, resp, data) => {
            try {

                    data = JSON.parse(data);
                if(data.data.bizMsg == "success"){
                 $.log(`===============存货金币===============`)   
                 $.log(`${data.data.result.userInfo.userScore}币`)
                 userScore = data.data.result.userInfo.userScore
                 $.log(`===============抽奖需要===============`)  
                 $.log(`${data.data.result.userInfo.scorePerLottery}币`)
                 scorePerLottery = data.data.result.userInfo.scorePerLottery
                 tasklist = data.data.result.taskVos
                 $.log(`===============去做任务===============`)
                 
                 
                 
                   $.log(`===============浏览并关注众筹频道===============`)
                   tk =tasklist[0].shoppingActivityVos[0].taskToken 
                   taskId = tasklist[0].taskId
                   await dotask(tk,taskId,0)
                   await dotask(tk,taskId,1)
                   
                   await dotask(tk,taskId,0)
                   $.log(`===============浏览众筹频道===============`)
                   tk =tasklist[1].shoppingActivityVos[0].taskToken 
                   taskId = tasklist[1].taskId
                   await dotask(tk,taskId,0)
                   await dotask(tk,taskId,1)
                   await $.wait(15000)
                   await dotask(tk,taskId,0)
                   $.log(`===============每浏览商品15s可获得200金币===============`)
                   tk =tasklist[2].productInfoVos[0].taskToken 
                   taskId = tasklist[2].taskId
                   item = tasklist[2].productInfoVos[0].itemId
                   await dotask(tk,taskId,0,item)
                   await dotask(tk,taskId,1,item)
                   await $.wait(15000)
                   await dotask(tk,taskId,0,item)
                   
                   tk =tasklist[2].productInfoVos[1].taskToken 
                   taskId = tasklist[2].taskId
                   item = tasklist[2].productInfoVos[1].itemId
                   await dotask(tk,taskId,0,item)
                   await dotask(tk,taskId,1,item)
                   await $.wait(15000)
                   await dotask(tk,taskId,0,item)
                   tk =tasklist[2].productInfoVos[2].taskToken 
                   taskId = tasklist[2].taskId
                   item = tasklist[2].productInfoVos[2].itemId
                   await dotask(tk,taskId,0,item)
                   await dotask(tk,taskId,1,item)
                   await $.wait(15000)
                   await dotask(tk,taskId,0,item)
                   tk =tasklist[2].productInfoVos[3].taskToken
                   item = tasklist[2].productInfoVos[3].itemId
                   taskId = tasklist[2].taskId
                   await dotask(tk,taskId,0,item)
                   await dotask(tk,taskId,1,item)
                   await $.wait(15000)
                   await dotask(tk,taskId,0,item)
                   tk =tasklist[2].productInfoVos[4].taskToken 
                   item = tasklist[2].productInfoVos[4].itemId
                   taskId = tasklist[2].taskId
                   await dotask(tk,taskId,0,item)
                   await dotask(tk,taskId,1,item)
                   await $.wait(15000)
                   await dotask(tk,taskId,0,item)
                   $.log(`===============邀请一个好友助力可获得300金币===============`)
                   tk =tasklist[3].assistTaskDetailVo.taskToken
                   taskId = tasklist[3].taskId
                   yqm = tasklist[3].assistTaskDetailVo.itemId
                   $.log(`邀请码${yqm}\n正在取随机CK互相助力3次`)
                   for (let i = 0 ; i < 3; i++){
                   await help(tk,taskId,0,yqm)
                   await help(tk,taskId,1,yqm)
                   
                   await help(tk,taskId,0,yqm)}
                   $.log(`===============关注店铺可获得200金币===============`)
                   tk =tasklist[4].followShopVo[0].taskToken 
                   item = tasklist[4].followShopVo[0].itemId
                   taskId = tasklist[4].taskId
                   await dotask(tk,taskId,0,item)
                   await dotask(tk,taskId,1,item)
                   
                   await dotask(tk,taskId,0,item)
                   tk =tasklist[4].followShopVo[1].taskToken 
                   item = tasklist[4].followShopVo[1].itemId
                   taskId = tasklist[4].taskId
                   await dotask(tk,taskId,0,item)
                   await dotask(tk,taskId,1,item)
                   
                   await dotask(tk,taskId,0,item)
                   tk =tasklist[4].followShopVo[2].taskToken 
                   item = tasklist[4].followShopVo[2].itemId
                   taskId = tasklist[4].taskId
                   await dotask(tk,taskId,0,item)
                   await dotask(tk,taskId,1,item)
                   
                   await dotask(tk,taskId,0,item)
                   $.log(`===============连续签到===============`)
                   tk =tasklist[5].simpleRecordInfoVo.taskToken
                   item = tasklist[5].simpleRecordInfoVo.itemId
                   taskId = tasklist[5].taskId
                   await dotask(tk,taskId,0,item)
                   await dotask(tk,taskId,1,item)
                   
                   await dotask(tk,taskId,0,item)
                   await getLottery()
                   
                   
                    cj = $.userScore/500
                    cj = parseInt(cj)
                    if(cj > 0){
                    for (let i = 0 ; i < cj; i++){
                    await getLottery()}}
                   }else  if(data.data.bizMsg !== "success"){
                
                    console.log(data.msg)
                 
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

function help(taskToken,taskId,actionType,itemId) {
    return new Promise(async (resolve) => {

                let options = {
    url: `https://api.m.jd.com/client.action`,

    body: `functionId=harmony_collectScore&body={"appId":"1EFVQwQ","taskToken":"${taskToken}","taskId":${taskId},"itemId":"${itemId}","actionType":${actionType}}&client=wh5&clientVersion=1.0.0`,
headers: {
"Origin": "https://h5.jd.com",
"Host": "api.m.jd.com",
"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 UBrowser/5.6.12150.8 Safari/537.36",
      "Cookie": ck2,
      }
                }
      
        $.post(options, async (err, resp, data) => {
            try {

                    data = JSON.parse(data);
                if(data.data.bizMsg == "success"){
                 $.log(`===============任务完成===============`)   
                 console.log(data.data.bizMsg)
                 $.log(`获得${data.data.result.userScore}`)
                }else  if(data.data.bizMsg !== "success"){
                
                    console.log(data.data.bizMsg)
                
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}


function dotask(taskToken,taskId,actionType,itemId) {
    return new Promise(async (resolve) => {

                let options = {
    url: `https://api.m.jd.com/client.action`,

    body: `functionId=harmony_collectScore&body={"appId":"1EFVQwQ","taskToken":"${taskToken}","taskId":${taskId},"itemId":"${itemId}","actionType":${actionType}}&client=wh5&clientVersion=1.0.0`,
headers: {
"Origin": "https://h5.jd.com",
"Host": "api.m.jd.com",
"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 UBrowser/5.6.12150.8 Safari/537.36",
      "Cookie": cookie,
      }
                }
      
        $.post(options, async (err, resp, data) => {
            try {

                    data = JSON.parse(data);
                if(data.data.bizMsg == "success"){
                 $.log(`===============任务完成===============`)   
                 console.log(data.data.bizMsg)
                 $.log(`获得${data.data.result.userScore}`)
                }else  if(data.data.bizMsg !== "success"){
                
                    console.log(data.data.bizMsg)
                
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

function getLottery() {
    return new Promise(async (resolve) => {

                let options = {
    url: `https://api.m.jd.com/client.action`,

    body: `functionId=interact_template_getLotteryResult&body={"appId":"1EFVQwQ"}&client=wh5&clientVersion=1.0.0`,
headers: {
"Origin": "https://h5.jd.com",
"Host": "api.m.jd.com",
"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 UBrowser/5.6.12150.8 Safari/537.36",
      "Cookie": cookie,
      }
                }
      
        $.post(options, async (err, resp, data) => {
            try {
                     
                    data = JSON.parse(data);
                 if(data.data.bizMsg == "success"){
                 $.userScore = data.data.result.userScore
                 $.bizMsg = data.data.bizMsg
                 $.log(`===============开始抽奖===============`)   
                 if(data.data.result.userAwardsCacheDto.jBeanAwardVo){
     $.log(data.data.result.userAwardsCacheDto.jBeanAwardVo.prizeName)
     allMessage += `京东账号${$.index}-${$.nickName || $.UserName}\n抽奖京豆: ${data.data.result.userAwardsCacheDto.jBeanAwardVo.quantity}${$.index !== cookiesArr.length ? '\n\n' : '\n\n'}`;
                 }else 
                 $.log(`叼毛 恭喜你 几把毛都没抽到`)
                 
                 
                 
                }else  if(data.data.bizMsg !== "success"){
                
                    console.log(data.data.bizMsg)
                
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}


















































function safeGet(data) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true;
        }
    } catch (e) {
        console.log(e);
        console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
        return false;
    }
}

function jsonParse(str) {
    if (typeof str == "string") {
        try {
            return JSON.parse(str);
        } catch (e) {
            console.log(e);
            $.msg($.name, "", "不要在BoxJS手动复制粘贴修改cookie");
            return [];
        }
    }
}

function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {
            }
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), a = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(a, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {
        })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {
        })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "H+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
            h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h)
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}
