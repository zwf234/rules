/*
脚本功能：解锁Xmind思维导图订阅到2030年
脚本作者：Stranger
电报频道：https://t.me/qixinscience

更新时间：2022.08.13
下载：商店下载

使用声明：⚠️⚠️⚠️此脚本仅供学习与交流,禁止转载与贩卖,需在24小时内从设备中删除！⚠️⚠️⚠️

QuantumultX 重写配置

[rewrite_local]
https?:\/\/www\.xmind\.(cn|net)\/\_res\/devices url script-response-body https://raw.githubusercontent.com/zwf234/rules/master/js/xmind.js

[mitm]
hostname = www.xmind.cn, www.xmind.net
*/

var _0x49754b=JSON['parse']($response['body']);_0x49754b['license']['status']='sub';_0x49754b['license']['expireTime']=0x1b8d90e4000;$done({'body':JSON['stringify'](_0x49754b)});
