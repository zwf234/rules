/*
下载地址 3个

aktv.me aktv.fun aktv.vip , 邀请码：V0B3KA


修改内容：解锁会员 

注意事项：每次解锁需启动 QuantumultX

[rewrite_local]

^http:\/\/aktv111\.com\/api\/user.* url script-response-body https://raw.githubusercontent.com/zwf234/rules/master/js/aktv.js

[MITM]
aktv111.com


*/

var obj = JSON.parse($response.body); 
// 

obj ={"code":200,"msg":"个人信息","time":"1661844270","data":{"id":104418,"group_id":0,"parentid":0,"area":"","imei":"","xqx":"","is_change":0,"hl":"","jyyx":"","guanzhu":0,"fensi":0,"number":"V0B3KA","photo":"http:\/\/yfui.club0","num_t":1,"num":"1","t_number":"10712","vip_time":"2099-11-30","integral":1,"power":1,"agent":1,"username":"我是一只菜鸡","nickname":"我是一只菜鸡","password":"b2497616bdd3e04d297ea4a8d1f11dd0","salt":"abDihB","email":"","mobile":"13900139000","avatar":"http:\/\/tupian.ds9rsqa.cn\/mrtx\/21_1588740537.jpg","level":10,"gender":1,"birthday":null,"bio":"","money":"99999","fencheng":0,"weichat":"","yitian":"","yitianyuan":"","qitian":"","qitianyuan":"","shiwu":"","shiwuyuan":"","yiyue":"","yiyueyuan":"","sanyue":"","sanyueyuan":"","liuyue":"","liuyueyuan":"","yinian":"","yinianyuan":"","yongjiu":"","yongjiuyuan":"","yitianurl":"","qitianurl":"","shiwuurl":"","yiyueurl":"","sanyueurl":"","liuyueurl":"","yinianurl":"","yongjiuurl":"","url8":"","url9":"","score":0,"successions":1,"maxsuccessions":1,"prevtime":1661844132,"logintime":1661844201,"loginip":"0.0.0.0","loginfailure":0,"joinip":"0.0.0.0","jointime":1661844132,"createtime":1661844132,"updatetime":1661844201,"token":"","status":"normal","verification":"","age":0,"is_okami":0,"view_num":0,"is_verifyed":0,"v_num":0,"device_code":"a0f4b8e4e3c5a656b62b7621d899368b","tj_user_count":0,"video":0,"fabu":0,"today_invite_number":0,"invite_number":0,"vip":2,"read":0,"prevtime_text":null,"logintime_text":null,"jointime_text":null,"avatar_text":"http:\/\/tupian.ds9rsqa.cn\/mrtx\/21_1588740537.jpg"}}

$done({body:JSON.stringify(obj)});
// 
