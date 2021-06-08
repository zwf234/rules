/*************************

本脚本仅用于小白，懒人一键清除京东Cookie

可解决以下问题
同一账号获取两次，即账号一 = 账号二
多账号删除ck，例：5个账号变成1个
ck获取错误，可清除再次尝试
其他京东Cookie问题

本脚本修改于NobyDa京东多合一签到脚本，只是给那些不愿意动手、动脑、甚至是看不懂中国汉字的人使用，当然其他人也可以用

======Quantumult X=======
[task_local]
0 0 0 0 1/1 ?  https://raw.githubusercontent.com/zwf234/rules/master/js/Del_jd_ck.js, tag=清除京东ck, img-url=https://qxzy.top/rules/QuantumultX/img/jd.png, enabled=true

*************************/
var LogDetails = false; //是否开启响应日志, true则开启

var stop = '0'; //自定义延迟签到, 单位毫秒. 默认分批并发无延迟; 该参数接受随机或指定延迟(例: '2000'则表示延迟2秒; '2000-5000'则表示延迟最小2秒,最大5秒内的随机延迟), 如填入延迟则切换顺序签到(耗时较长), Surge用户请注意在SurgeUI界面调整脚本超时; 注: 该参数Node.js或JSbox环境下已配置数据持久化, 留空(var stop = '')即可清除.

var DeleteCookie = true; //是否清除所有Cookie, true则开启.

var boxdis = true; //是否开启自动禁用, false则关闭. 脚本运行崩溃时(如VPN断连), 下次运行时将自动禁用相关崩溃接口(仅部分接口启用), 崩溃时可能会误禁用正常接口. (该选项仅适用于QX,Surge,Loon)

var ReDis = false; //是否移除所有禁用列表, true则开启. 适用于触发自动禁用后, 需要再次启用接口的情况. (该选项仅适用于QX,Surge,Loon)

var out = 0; //接口超时退出, 用于可能发生的网络不稳定, 0则关闭. 如QX日志出现大量"JS Context timeout"后脚本中断时, 建议填写6000

var $nobyda = nobyda();


function ReadCookie() {
  DualAccount = 1;
  const EnvInfo = $nobyda.isJSBox ? "JD_Cookie" : "CookieJD"
  const EnvInfo2 = $nobyda.isJSBox ? "JD_Cookie2" : "CookieJD2"
  const EnvInfo3 = $nobyda.isJSBox ? "JD_Cookies" : "CookiesJD"
  if (DeleteCookie) {
    if ($nobyda.read(EnvInfo) || $nobyda.read(EnvInfo2) || ($nobyda.read(EnvInfo3) || '[]') != '[]') {
      $nobyda.write("", EnvInfo)
      $nobyda.write("", EnvInfo2)
      $nobyda.write("", EnvInfo3)
      $nobyda.notify("京东Cookie清除成功 !", "", '请手动关闭脚本内"DeleteCookie"选项')
      $nobyda.done()
      return
    }
    $nobyda.notify("脚本终止", "", '未关闭脚本内"DeleteCookie"选项 ‼️')
    $nobyda.done()
    return
  } else if ($nobyda.isRequest) {
    GetCookie()
    return
  }
  Key = Key || $nobyda.read(EnvInfo)
  DualKey = DualKey || $nobyda.read(EnvInfo2)
  OtherKey = OtherKey || $nobyda.read(EnvInfo3)
  KEY = Key || DualKey
  if (KEY || OtherKey) {
    if ($nobyda.isJSBox || $nobyda.isNode) {
      if (Key) $nobyda.write(Key, EnvInfo);
      if (DualKey) $nobyda.write(DualKey, EnvInfo2);
      if (OtherKey) $nobyda.write(OtherKey, EnvInfo3);
      if (stop !== '0') $nobyda.write(stop, "JD_DailyBonusDelay");
    }
    out = parseInt($nobyda.read("JD_DailyBonusTimeOut")) || out
    stop = Wait($nobyda.read("JD_DailyBonusDelay"), true) || Wait(stop, true)
    boxdis = $nobyda.read("JD_Crash_disable") === "false" || $nobyda.isNode || $nobyda.isJSBox ? false : boxdis
    LogDetails = $nobyda.read("JD_DailyBonusLog") === "true" || LogDetails
    ReDis = ReDis ? $nobyda.write("", "JD_DailyBonusDisables") : ""
    if (KEY) {
      all()
    } else {
      double()
    }
  } else {
    $nobyda.notify("京东签到", "", "脚本终止, 未获取Cookie ‼️")
    $nobyda.done()
  }
}
