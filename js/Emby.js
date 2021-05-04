/**
* @author: Stranger
*
Surge
[Script]
embyPremiere.js = type=http-response,pattern=^https?:\/\/mb3admin.com\/admin\/service\/registration\/validateDevice,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/zwf234/rules/master/js/Emby.js

QuanX
[rewrite_local]
^https:\/\/mb3admin\.com\/admin\/service(\/registration\/validateDevice|\/appstore\/register|\/registration\/validate|\/registration\/getStatus|\/supporter\/retrievekey) url script-echo-response https://raw.githubusercontent.com/zwf234/rules/master/js/Emby.js

Loon
[Script]
http-response ^https?:\/\/mb3admin.com\/admin\/service\/registration\/validateDevice requires-body=1,max-size=0, script-path=https://raw.githubusercontent.com/zwf234/rules/master/js/Emby.js,tag=embyUnlocked

Shadowrocket
[Script]
EmbyPremiere = type=http-response,script-path=https://raw.githubusercontent.com/zwf234/rules/master/js/Emby.js,pattern=^https?:\/\/mb3admin.com\/admin\/service\/registration\/validateDevice,max-size=131072,requires-body=true,timeout=10,enable=true

----------------------------------------

[MITM]
hostname = mb3admin.com

*/
var url = $request.url;

const myStatus = "HTTP/1.1 200 OK";
const myHeaders = {
    "Crack": "KS", 
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Headers": "*", 
    "Access-Control-Allow-Method": "*", 
    "Access-Control-Allow-Credentials": "true"
};


if (url.indexOf('/admin/service/registration/validateDevice') != -1) {
  obj = {
      "cacheExpirationDays": 365,
      "message": "Device Valid",
      "resultCode": "GOOD"
	};
} else if (url.indexOf('/admin/service/appstore/register') != -1) {
  obj = {
      "featId":"",
      "registered":true,
      "expDate":"2099-01-01",
      "key":""
	};
} else if (url.indexOf('/admin/service/registration/validate') != -1) {
	obj = {
      "featId":"",
      "registered":true,
      "expDate":"2099-01-01",
      "key":""
	};
} else if (url.indexOf('/admin/service/registration/getStatus') != -1){
	obj = {
      "planType":"Cracked",
      "deviceStatus":"",
      "subscriptions":[]
	};
} else if (url.indexOf('/admin/service/supporter/retrievekey') != -1){
	obj = {
      "Success":false,
      "ErrorMessage":"Supporter not found"
	};
}

myData = JSON.stringify(obj);

const myResponse = {
    status: myStatus,
    headers: myHeaders, // Optional.
    body: myData // Optional.
};

$done(myResponse);
