/*
原脚本未做任何修改，只是保存并添加了注释

QuantumultX
[rewrite_local]
# 京东比价
^https?://api\.m\.jd\.com/client\.action\?functionId=(wareBusiness|serverConfig|basicConfig) url script-response-body https://raw.githubusercontent.com/zwf234/rules/master/js/jd_price.js

[mitm]
hostname = api.m.jd.com


Surge & Loon
[Script]
# 京东比价
http-response ^https?://api\.m\.jd\.com/client\.action\?functionId=(wareBusiness|serverConfig|basicConfig) script-path=https://raw.githubusercontent.com/zwf234/rules/master/js/jd_price.js, requires-body=true, timeout=10, tag=jd_price.js

[mitm]
hostname = api.m.jd.com


*/
const version = '0.0.0.5';
const path1 = "serverConfig";
const path2 = "wareBusiness";
const path3 = "basicConfig";
const url = $request.url;
const body = $response.body;
let now = 0;
const $tool = tool();

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

if (url.indexOf(path1) !== -1) {
  let obj = JSON.parse(body);
  delete obj.serverConfig.httpdns;
  delete obj.serverConfig.dnsvip;
  delete obj.serverConfig.dnsvip_v6;
  $done({body: JSON.stringify(obj)});
}

if (url.indexOf(path3) !== -1) {
  let obj = JSON.parse(body);
  let JDHttpToolKit = obj.data.JDHttpToolKit;
  if (JDHttpToolKit) {
    delete obj.data.JDHttpToolKit.httpdns;
    delete obj.data.JDHttpToolKit.dnsvipV6;
  }
  $done({body: JSON.stringify(obj)});
}

if (url.indexOf(path2) !== -1) {
  if (Math.ceil(Math.random() * 4) === 1) {
    // 25%几率检查更新
    $tool.get({url: "https://raw.githubusercontent.com/JDHelloWorld/jd_price/main/version.log"}, (err, resp, data) => {
      let latest = data.split('\n')[0]
      let msg = data.split('\n')[1]
      if (version !== latest) {
        $tool.notify('请更新！', `最新：${latest}  Github:JDHelloWorld`, `更新内容${msg}`,)
        $done({body});
        return false
      } else {
        showHistory()
      }
    })
  } else {
    // 直接运行
    showHistory()
  }
}

function showHistory() {
  let obj = JSON.parse(body);
  const floors = obj.floors;
  const commodity_info = floors[floors.length - 1];
  const shareUrl = commodity_info.data.property.shareUrl;
  // 当前价格
  if (commodity_info.data.otherUseBannerInfo)
    now = parseFloat(commodity_info.data.otherUseBannerInfo.bannerPrice.replace('¥', ''));
  else
    now = parseFloat(commodity_info.data.priceInfo.jprice)
  request_history_price(shareUrl, data => {
    if (data) {
      const lowerword = adword_obj();
      lowerword.data.ad.textColor = "#fe0000";
      let bestIndex = 0;
      for (let index = 0; index < floors.length; index++) {
        const element = floors[index];
        if (element.mId === lowerword.mId) {
          bestIndex = index + 1;
          break;
        } else {
          if (element.sortId > lowerword.sortId) {
            bestIndex = index;
            break;
          }
        }
      }

      // 成功
      if (data.ok === 1) {
        lowerword.data.ad.adword = data.text;
        floors.insert(bestIndex, lowerword);
      }

      // 失败
      if (data.ok === 0) {
        lowerword.data.ad.adword = "⚠️ " + "失败！";
        floors.insert(bestIndex, lowerword);
      }
      $done({body: JSON.stringify(obj)});
    } else {
      $done({body});
    }
  })
}

function request_history_price(share_url, callback) {
  let id = share_url.match(/product\/(.*)\./)[1]
  let share = `https://item.jd.com/${id}.html`
  $tool.get({
    url: `https://m.gwdang.com/trend/data_new?opt=trend&dp_id=${id}-3&search_url=${encodeURIComponent(share)}&from=m&period=360`,
    headers: {
      'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    },
    timeout: 5000
  }, (error, response, data) => {
    if (!error) {
      data = JSON.parse(data).data

      // 历史最高、低
      let history = {
        max: data['series'][0]['max'] / 100,
        maxt: time(data['series'][0]['max_stamp'] * 1000),
        min: data['series'][0]['min'] / 100,
        mint: time(data['series'][0]['min_stamp'] * 1000)
      };

      let priceList = data['series'][0]['data'];
      let price30 = {price: 99999999.00, text: ""};
      let before618 = 0, after618 = 0, before11 = 0, after11 = 0;

      for (let j of priceList) {
        let stamp = j['x'] * 1000;
        let day = time(stamp).split(' ')[0];
        let price = j['y'] / 100;

        // 618
        if (stamp <= 1592409600000) before618 = price
        if (stamp >= 1592409600000 && after618 === 0) after618 = price

        // 双十一
        if (stamp < 1605024000000) before11 = price
        if (stamp > 1605024000000 && after11 === 0) after11 = price

        // 30天内
        if (dayDiff(day) < 31 && price <= price30.price) {
          price30.price = price;
          price30.text = day;
        }
      }

      let Jun18 = Math.min(...[before618, after618]);
      let Nov11 = Math.min(...[before11, after11]);
      // 去除99999999
      if (history.min === 99999999.00) history.min = '-';
      if (price30.price === 99999999.00) price30.price = '-'

      let l1 = `当前价${space(8)}${now}\n`
      let l2 = `最高价${space(8)}${history.max}${space(8)}${history.maxt}${space(8)}${priceDiff(history.max, now)}\n最低价${space(8)}${history.min}${space(8)}${history.mint}${space(8)}${priceDiff(history.min, now)}\n`
      let l3 = `六一八${space(8)}${Jun18}${space(8)}2020-06-18${space(8)}${priceDiff(Jun18, now)}\n`
      let l4 = `双十一${space(8)}${Nov11}${space(8)}2020-11-11${space(8)}${priceDiff(Nov11, now)}\n`
      let l5 = `三十天${space(8)}${price30.price}${space(8)}${price30.text}${space(8)}${priceDiff(price30.price, now)}`
      let text = l1 + l2 + l3 + l4 + l5
      callback({ok: 1, text: text});
    } else {
      $tool.notify("Error", "比价网查询超时！")
      callback(null, null);
    }
  })
}

function adword_obj() {
  return {
    "bId": "eCustom_flo_199",
    "cf": {
      "bgc": "#ffffff",
      "spl": "empty"
    },
    "data": {
      "ad": {
        "adword": "",
        "textColor": "#8C8C8C",
        "color": "#f23030",
        "text-align": "justify",
        "word-break": "break-all",
        "newALContent": true,
        "hasFold": true,
        "class": "com.jd.app.server.warecoresoa.domain.AdWordInfo.AdWordInfo",
        "adLinkContent": "",
        "adLink": ""
      }
    },
    "mId": "bpAdword",
    "refId": "eAdword_0000000028",
    "sortId": 13
  }
}

function time(time = +new Date()) {
  let date = new Date(time + 8 * 3600 * 1000);
  return date.toJSON().substr(0, 19).replace('T', ' ').split(' ')[0].replace(/\./g, '-');
}

function dayDiff(date) {
  return parseInt((new Date() - new Date(date)) / (1000 * 60 * 60 * 24) + '')
}

function priceDiff(old, now) {
  let diff = old - now;
  if (diff === 0)
    return '-'
  return diff > 0 ? `⬇️${diff.toFixed(2)}` : `⬆️${Math.abs(diff).toFixed(2)}`;
}

function space(len) {
  let blank = "";
  for (let i = 0; i < len; i++) {
    blank += " ";
  }
  return blank;
}

function tool() {
  const isSurge = typeof $httpClient != "undefined"
  const isQuanX = typeof $task != "undefined"
  const isResponse = typeof $response != "undefined"
  const node = (() => {
    if (typeof require == "function") {
      const request = require('request')
      return ({request})
    } else {
      return (null)
    }
  })()
  const notify = (title, subtitle, message) => {
    if (isQuanX) $notify(title, subtitle, message)
    if (isSurge) $notification.post(title, subtitle, message)
    if (node) console.log(JSON.stringify({title, subtitle, message}));
  }
  const write = (value, key) => {
    if (isQuanX) return $prefs.setValueForKey(value, key)
    if (isSurge) return $persistentStore.write(value, key)
  }
  const read = (key) => {
    if (isQuanX) return $prefs.valueForKey(key)
    if (isSurge) return $persistentStore.read(key)
  }
  const adapterStatus = (response) => {
    if (response) {
      if (response.status) {
        response["statusCode"] = response.status
      } else if (response.statusCode) {
        response["status"] = response.statusCode
      }
    }
    return response
  }
  const get = (options, callback) => {
    if (isQuanX) {
      if (typeof options == "string") options = {url: options}
      options["method"] = "GET"
      $task.fetch(options).then(response => {
        callback(null, adapterStatus(response), response.body)
      }, reason => callback(reason.error, null, null))
    }
    if (isSurge) $httpClient.get(options, (error, response, body) => {
      callback(error, adapterStatus(response), body)
    })
    if (node) {
      node.request(options, (error, response, body) => {
        callback(error, adapterStatus(response), body)
      })
    }
  }
  const post = (options, callback) => {
    if (isQuanX) {
      if (typeof options == "string") options = {url: options}
      options["method"] = "POST"
      $task.fetch(options).then(response => {
        callback(null, adapterStatus(response), response.body)
      }, reason => callback(reason.error, null, null))
    }
    if (isSurge) {
      $httpClient.post(options, (error, response, body) => {
        callback(error, adapterStatus(response), body)
      })
    }
    if (node) {
      node.request.post(options, (error, response, body) => {
        callback(error, adapterStatus(response), body)
      })
    }
  }
  return {isQuanX, isSurge, isResponse, notify, write, read, get, post}
}
