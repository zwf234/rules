/*
更新：2021.02.27
小小影视 无限观看&免广告
电报频道：@qixinscience
感谢@GB-png，提供新方法

QX:
https:\/\/.*\.(xiaoxiaoapps|xiaoxiaoimg)\.com\/(ssp-svr\/ssp\/list3|ucp/index|getGlobalData) url script-response-body https://raw.githubusercontent.com/zwf234/rules/master/xxysad.js
Surge:
http-response https:\/\/.*\.(xiaoxiaoapps|xiaoxiaoimg)\.com\/(ssp-svr\/ssp\/list3|ucp/index|getGlobalData) requires-body=1,max-size=0,script-path= https://raw.githubusercontent.com/zwf234/rules/master/xxysad.js

MITM = *.xxjjappss.com,*.huaerdadi.com,*.xiaoxiaoapps.com,*.xiaoxiaoimg.com
*/
const path1 = "/ucp/index";
const ad = 'ssp-svr/ssp/list3';
const adold = 'getGlobalData';
let obj = JSON.parse($response.body);

if ($request.url.indexOf(path1) != -1){
	obj.data.uinfo["down_daily_remainders"] = "666";
	obj.data.uinfo["play_daily_remainders"] = "666";
	obj.data.uinfo["curr_group"] = "5";
	obj.data.user["isvip"] = "1";
	obj.data.user["goldcoin"] = "666";
}

if ($request.url.indexOf(ad) != -1) {
delete obj.data.pmap
}

if ($request.url.indexOf(adold) != -1) {
delete obj.data.adrows
delete obj.data.adgroups
delete obj.data.iOS_adgroups
}

$done({body: JSON.stringify(obj)});
