/*

网站：https://qxnav.com/
电报频道：https://t.me/qixinscience
苹果商店下载: 彩云天气
修改内容：解锁会员至2099


===========QuantumultX===========
[rewrite_local]
^https:\/\/biz\.caiyunapp\.com\/v2\/user.+ url script-response-body https://raw.githubusercontent.com/zwf234/rules/master/js/caiyun.js


[MITM]
biz.caiyunapp.com

===========QuantumultX===========
*/

var obj = JSON.parse($response.body); 
// 

obj ={
  "result": {
    "xy_vip_expire": 0,
    "vip_expired_at": 0,
    "ranking_above": 99,
    "auto_renewal_type": "",
    "third_party_id": null,
    "svip_expired_at": 4093515016.946474,
    "is_login": true,
    "is_xy_vip": false,
    "platform_name": "caiyun",
    "xy_svip_expire": 0,
    "third_party_ids": [],
    "score": 2000,
    "is_xy_auto_renewal": false,
    "is_primary": true,
    "phone_num": "13800138000",
    "free_trial": 0,
    "last_acted_at": 1626863905.591368,
    "vip_type": "s",
    "is_phone_verified": true,
    "wt": {
      "ranking_above": 99,
      "vip": {
        "enabled": true,
        "is_auto_renewal": false,
        "auto_renewal_type": "",
        "svip_auto_renewal_type": "",
        "svip_expired_at": 4093515016.946474,
        "expired_at": 0
      },
      "last_acted_at": 1626863905.591368,
      "created_at": 1626863905.591368,
      "is_login": true
    },
    "device_id": "B409FB39-AAC3-46E3-80B6-7544B5BB8C27",
    "name": "奇心科技",
    "bound_status": {
      "qq": {
        "username": "",
        "is_bound": false,
        "id": ""
      },
      "weibo": {
        "username": "",
        "is_bound": false,
        "id": ""
      },
      "google": {
        "username": "",
        "is_bound": false,
        "id": ""
      },
      "apple": {
        "username": "",
        "is_bound": false,
        "id": ""
      },
      "weixin": {
        "username": "",
        "is_bound": false,
        "id": ""
      },
      "caiyun": {
        "username": "",
        "is_bound": true,
        "id": "60f7f9217112ca00110b567f"
      },
      "twitter": {
        "username": "",
        "is_bound": false,
        "id": ""
      },
      "facebook": {
        "username": "",
        "is_bound": false,
        "id": ""
      }
    },
    "created_at": 1626863905.590722,
    "is_auto_renewal": false,
    "hasBeenInvited": false,
    "platform_id": "",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJ1c2VyX2lkIjoiNjBmN2Y5MjE3MTEyY2EwMDExMGI1NjdmIiwic3ZpcF9leHBpcmVkX2F0IjoxNjYzMTUxOTQwLjk0NjQ3NCwidmlwX2V4cGlyZWRfYXQiOjB9.ezQpaDFL1T_WCIZq42Q71hLgGa9DYDBaz0OjDzeuf2I",
    "svip_given": 0,
    "avatar": "https://caiyunapp.com/imgs/webtrs/default.png",
    "is_vip": true,
    "gender": "0",
    "_id": "60f7f9217112ca00110b567f"
  },
  "rc": 0
}

$done({body:JSON.stringify(obj)});
// 
