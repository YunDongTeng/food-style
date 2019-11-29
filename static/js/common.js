var stoneCommon = {
  userAgent: navigator.userAgent,
  count: 120,
  lang: '',
  msg: {
    cn:{
      ms1: '鑾峰彇楠岃瘉鐮�',
      ms2: '閲嶆柊鑾峰彇(',
    },
    en:{
      ms1: 'Get validation code',
      ms2: 'Regain(',
    }
  },
  running: false,
  inputPass: 'input_pass',
  inputError: 'input_error',
  errorCls: '.stone_line_error, .login_pop_error, .stone_input_error',

  getCookieLang: function(){
    stoneCommon.lang = stoneCommon.getCookie('cookieLang') || 'cn';
  },

  setCountDown: function($ele){
    var unale = 'stone_btn_resend_unable',
      msg = stoneCommon.msg[stoneCommon.lang].ms1,
      reGetMsg = stoneCommon.msg[stoneCommon.lang].ms2  + stoneCommon.count +'s)',
      $value = $ele.find('span');

    $value.text(reGetMsg);
    $ele.addClass(unale);

    if(!stoneCommon.running){
      stoneCommon.running = true;
      var intetval = setInterval(function(){
        if(stoneCommon.count > 0){
          stoneCommon.count--;
          stoneCommon.setCountDown($ele);
        }else{
          stoneCommon.count = 120;
          $value.text(msg);
          $ele.removeClass(unale);
          stoneCommon.running = false;
          clearInterval(intetval);
        }
      }, 1000);
    }
  },

  showError: function($ele, msg){
    $ele.removeClass(stoneCommon.inputPass).addClass(stoneCommon.inputError);
    $ele.nextAll(stoneCommon.errorCls).text(msg).show();
  },

  hideError: function($ele){
    $ele.removeClass(stoneCommon.inputError).removeClass(stoneCommon.inputPass);
    $ele.nextAll(stoneCommon.errorCls).text('').hide();
  },

  inputFocus: function($ele){
    $ele.addClass(stoneCommon.inputPass);
  },

  setCookie: function(name, value){
    var mins = 1,
      exp = new Date();
    exp.setTime(exp.getTime() + mins*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
  },

  getCookie: function(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  },

  delCookie: function(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = stoneCommon.getCookie(name);
    if(cval != null){
      document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }
  },

  getUrlParams: function(name){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == name){
        return pair[1];
      }
    }
    return '';
  },

  addMeta: function(){
    var oMeta = document.createElement('meta'),
      tMeta = document.createElement('meta'),
      rMeta = document.createElement('meta');
    // 淇敼title
    document.title = 'Stone娓告垙骞冲彴';

    // 娣诲姞闄愬埗360鎬ラ€熸祻瑙堝櫒
    oMeta.name = 'renderer';
    oMeta.content = 'webkit|ie-comp|ie-stand';
    document.getElementsByTagName('head')[0].appendChild(oMeta);
    // 娣诲姞description
    tMeta.name = 'description';
    tMeta.content = '美食圈子';
    document.getElementsByTagName('head')[0].appendChild(tMeta);
    // keywords
    rMeta.name = 'keywords';
    rMeta.content = '美食圈子';
    document.getElementsByTagName('head')[0].appendChild(rMeta);
  },

  totleFlow: function(){
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?58e2a11651a091667cfa215bfa33b893";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  },

  getBrowserVersion: function(){
    var agent = stoneCommon.userAgent,
      isOpera = agent.indexOf("Opera") > -1,
      isIe = agent.indexOf("compatible") > -1 && agent.indexOf("MSIE") > -1 && !isOpera,
      hadShowVerion = stoneCommon.getCookie('hadShowVerion');
    $('body').append('<div class="stone_version">\
                    <div class="stone_version_container">\
                      <a class="stone_chrome" href="http://www.google.cn/chrome/browser/desktop/"></a>\
                      <a class="stone_IE" href="https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads"></a>\
                      <div class="stone_continue"></div>\
                    </div>\
                  </div>');

    if (isIe && !hadShowVerion) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(agent);
      var fIEVersion = parseFloat(RegExp["$1"]);

      if(fIEVersion < 9){
        $('.stone_version').show();

        $('.stone_continue').click(function(){
          $('.stone_version').hide();
          stoneCommon.setCookie('hadShowVerion', 'true');
        });

      }
    }
  },

  setHolder: function($ele, value){
    var flag = false;

    if($ele.attr('type') == 'password'){
      flag = true;
      $ele.attr('type', 'text');
    }

    $ele.val(value);
    $ele.focus(function(){
      if($ele.val() === value){
        $ele.val('')
      }
      if(flag){
        $ele.attr('type', 'password');
      }

    }).blur(function(){
      if($ele.val() === ''){
        $ele.val(value);
        $ele.attr('type', 'text');
      }
    });
  },

  addClick: function(){
    $('body').keydown(function(e){
      if(e.keyCode ==13){
        if(!stoneHeader.logined){
          $('#submit').trigger('click');
        }
        $('.stone_btn_submit').trigger('click');

      }
    });
  },

  setCookieLang: function(){
    var lang = stoneCommon.getUrlParams('lang') || 'cn';
    stoneCommon.setCookie('cookieLang', lang);
  },


};

$(function(){
  /*stoneCommon.addMeta();*/
  stoneCommon.totleFlow();
  stoneCommon.getBrowserVersion();
  stoneCommon.addClick();
  stoneCommon.setCookieLang();
  stoneCommon.getCookieLang();
});
