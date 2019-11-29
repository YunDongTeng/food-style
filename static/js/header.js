var urlObj = {
  /* baseUrl: 'http://192.168.103.195:8081', */
  baseUrl: 'http://localhost:8081',
  indexUrl: 'http://localhost:8080'
}

var stoneHeader = {
  loginUrl: urlObj.baseUrl + '/userInfo/login',
  logined: false,
  userInfo: null,
  $userName: null,
  $pwd: null,
  $exit: null,
  $resetUserName: null,
  $reset_pwd: null,
  $reset_s_pwd: null,
  $reg_userName: null,
  $reg_pwd: null,
  $reg_s_pwd: null,
  $reg_nickName: null,
  $reg_email: null,
  $search_input_content: null,
  init: function (current) {
    stoneHeader.appendCommon(current)
    stoneHeader.getUserInfo()
    stoneHeader.showSerchDefault()
  },

  getUserInfo: function (id) {
    var uId = window.localStorage.getItem('user_id')

    if (uId == null || uId == undefined) {
      stoneHeader.logined = false
      stoneHeader.userInfo = null
      stoneHeader.appendUser()
      stoneHeader.addEvent()
      return
    }
    $.ajax({
      type: 'GET',
      url: urlObj.baseUrl + '/userInfo/get/' + window.localStorage.getItem('user_id'),
      dataType: 'json',
      jsonp: 'callback',
      success: function (res) {
        if (res.code == 200) {
          stoneHeader.logined = true
          stoneHeader.userInfo = res.data
        }
        stoneHeader.appendUser()
        stoneHeader.addEvent()
      }
    })
  },

  // 娣诲姞澶撮儴鍏叡
  appendCommon: function (current) {
    var $header = $('#stone_header'),
      $innerHtml

    $innerHtml = $('<div class="stone_header">\
                    <div class="stone_container stone_heder_container">\
                      <img src="">\
                      <div class="stone_heaer_cont">\
                        <ul class="stone_header_menu">\
                          <li><a href="#/" id="circle">美食圈子</a></li>\
                        </ul>\
                        <div class="stone_serch">\
                           <div class="stone_serch_input">\
                              <input type="text" class="serch_input" id="serch_input" placeholder="美食搜索"/>\
                              <span class="serch_btn" id="serch_btn"></span>\
                           </div>\
                        </div>\
                      </div>\
                      <div class="stone_heder_top">\
                        <div class="stone_header_user">\
                          <div class="stone_user_info"></div>\
                        </div>\
                      </div>\
                  </div>\
                  <div class="login_pop" id="login_pop" style="top: 50px;">\
                    <div class="login_pop_outer">\
                      <i class="login_pop_cancle"></i>\
                      <div class="login_pop_title"><img src="http://www.iplaystone.com/static/common/images/loginPic.png"/></div>\
                      <div class="login_pop_input"><input id="userName" placeholder="用户名" />\
                        <i class="login_pop_icon login_pop_user"></i>\
                        <div class="login_pop_error"></div>\
                      </div>\
                      <div class="login_pop_input"><input type="password" id="pwd" placeholder="密码" />\
                        <i class="login_pop_icon login_pop_pwd"></i>\
                        <div class="login_pop_error"></div>\
                      </div>\
                      <div class="login_pop_btn"><button id="submit">登录</button></div>\
                      <div class="login_pop_box"><a href="#" id="resetPwd" class="login_pop_forget">忘记密码</a></div>\
                    </div>\
                  </div>\
                  <div class="login_pop" id="reg_pop" style="top: 50px;">\
                    <div class="login_pop_outer">\
                      <i class="login_pop_cancle"></i>\
                      <div class="login_pop_title"><img src="http://www.iplaystone.com/static/common/images/loginPic.png"/></div>\
                      <div class="login_pop_input"><input id="reg_userName" placeholder="用户名" />\
                          <i class="login_pop_icon login_pop_user"></i>\
                         <div class="login_pop_error"></div>\
                      </div>\
                      <div class="login_pop_input"><input id="reg_nickName" placeholder="昵称" />\
                      <i class="login_pop_icon login_pop_user"></i>\
                      <div class="login_pop_error"></div>\
                      </div>\
                      <div class="login_pop_input"><input type="password" id="reg_pwd" placeholder="密码" />\
                      <i class="login_pop_icon login_pop_pwd"></i>\
                      <div class="login_pop_error"></div>\
                      </div>\
                      <div class="login_pop_input"><input type="password" id="reg_s_pwd" placeholder="确认密码" />\
                        <i class="login_pop_icon login_pop_pwd"></i>\
                        <div class="login_pop_error"></div>\
                        </div>\
                        <div class="login_pop_input"><input type="text" id="reg_email" placeholder="邮箱" />\
                          <i class="login_pop_icon login_pop_user"></i>\
                          <div class="login_pop_error"></div>\
                          </div>\
                      <div class="login_pop_btn"><button id="submit_reg">注册</button></div>\
                    </div>\
                    </div>\
                    <div class="login_pop" id="restpwd_pop" style="top: 50px;">\
                      <div class="login_pop_outer">\
                      <i class="login_pop_cancle"></i>\
                      <div class="login_pop_title"><img src="http://www.iplaystone.com/static/common/images/loginPic.png"/></div>\
                      <div class="login_pop_input"><input id="reset_userName" placeholder="用户名" />\
                      <i class="login_pop_icon login_pop_user"></i>\
                      <div class="login_pop_error"></div>\
                      </div>\
                      <div class="login_pop_input"><input type="password" id="reset_pwd" placeholder="密码" />\
                      <i class="login_pop_icon login_pop_pwd"></i>\
                      <div class="login_pop_error"></div>\
                      </div>\
                        <div class="login_pop_input"><input type="password" id="reset_s_pwd" placeholder="确认密码" />\
                        <i class="login_pop_icon login_pop_pwd"></i>\
                        <div class="login_pop_error"></div>\
                        </div>\
                      <div class="login_pop_btn"><button id="resetPwdSubmit">重置密码</button></div>\
                    </div>\
                    </div>\
                  <div class="serch_mask"></div>\
                  <div class="stone_mask" id="stone_mask">\
                  </div>')
    $header.append($innerHtml)
    $('.stone_header .stone_header_menu > li').eq(current).addClass('current')
  },
  // 娣诲姞澶撮儴淇℃伅
  appendUser: function () {
    var $user = $('#stone_header .stone_user_info'),
      $userInfo,
      userInfo = stoneHeader.userInfo
    if (stoneHeader.logined) {
      userInfo.nickname = userInfo.nickname || userInfo.username
      var photoUrl = userInfo.avatar ? userInfo.avatar : 'http://www.iplaystone.com/static/common/images/defalt.png'
      $userInfo = $('<div class="stone_info_logined">\
                      <span class="stone_nickname" title="' + userInfo.nickname + '">' + userInfo.nickname + '</span>\
                      <i class="stone_arrow rotate"></i>\
                      <div class="stone_user_dropdown">\
                        <span class="stone_info_img"><img src=' + photoUrl + '></span>\
                        <div class="stone_no_hover" title="' + userInfo.nickname + '">' + userInfo.nickname + '</div>\
                        <div id="eixt">退出</div>\
                      </div>\
                   </div>')
    } else {
      $userInfo = $('<div class="stone_info_unlogined"><span id="login" @click="detailLogin()">登录</span><span  id="register" @ class="margin_left_10">注册</span></div>')
    }

    $user.empty().append($userInfo)

    $('#login').click(function () {
      document.getElementById('login_pop').style.display = 'block'
      document.getElementById('stone_mask').style.display = 'block'
    })

    $('#register').click(function () {
      document.getElementById('reg_pop').style.display = 'block'
      document.getElementById('stone_mask').style.display = 'block'
    })

    $('#resetPwd').click(function () {
      document.getElementById('login_pop').style.display = 'none'
      document.getElementById('restpwd_pop').style.display = 'block'
      document.getElementById('stone_mask').style.display = 'block'
    })

    $('#eixt').click(function () {
      stoneHeader.logOut()
    })
  },
  logOut: function () {
    dataGetter.get(stoneHeader.logOutUrl, function (res) {
      if (res.code == 200) {
        stoneHeader.logined = false
        stoneHeader.userInfo = null
        stoneHeader.appendUser()
        window.localStorage.removeItem('user_id')
        window.location.href = 'http://localhost:8080'
      }
    })
  },

  // 鐩戝惉浜嬩欢
  addEvent: function () {
    var $login = $('#login'),
      $register = $('#register'),
      $cancle = $('.login_pop_cancle'),
      $submit = $('#submit'),
      $resetPwdSubmit = $('#resetPwdSubmit'),
      $regSubmit = $('#submit_reg'),
      $allGames = $('#allGames'),
      $serchInput = $('#serch_input'),
      $serchBtn = $('#serch_btn'),
      $serchMask = $('.serch_mask')

    stoneHeader.$userName = $('#userName')
    stoneHeader.$pwd = $('#pwd')

    stoneHeader.$resetUserName = $('#reset_userName')

    stoneHeader.$reset_pwd = $('#reset_pwd')
    stoneHeader.$reset_s_pwd = $('#reset_s_pwd')

    stoneHeader.$reg_userName = $('#reg_userName')
    stoneHeader.$reg_pwd = $('#reg_pwd')
    stoneHeader.$reg_s_pwd = $('#reg_s_pwd')
    stoneHeader.$reg_nickName = $('#reg_nickName')
    stoneHeader.$reg_email = $('#reg_email')
    stoneHeader.$search_input_content = $('#serch_input')

    $register.click(function () {

    })

    $cancle.click(function () {
      stoneHeader.hidePop()
    })

    $submit.click(function () {
      stoneHeader.doLogin()
    })

    $resetPwdSubmit.click(function () {
      stoneHeader.doReset()
    })

    $regSubmit.click(function () {
      stoneHeader.doRegister()
    })
    stoneHeader.$userName.focus(function () {
      stoneCommon.hideError($(this))
    }).blur(function () {
      stoneHeader.checkUser()
    })

    stoneHeader.$pwd.focus(function () {
      stoneCommon.hideError($(this))
    }).blur(function () {
      stoneHeader.checkPwd()
    })

    $allGames.click(function () {
      stoneCommon.delCookie('cookie')
    })

    $('#eixt').click(function () {
      window.localStorage.removeItem('user_id')
      window.location.href = urlObj.indexUrl
    })

    $serchMask.click(function () {
      $('.stone_serch_recommend,.stone_serch_list').addClass('none')
      $serchMask.hide()
    })

    $('#serch_btn').click(function () {
      var search_content = stoneHeader.$search_input_content.val()

      window.localStorage.setItem('search_content', search_content)

      console.log(window.localStorage.getItem('search_content'))

      window.location.href = urlObj.indexUrl
    })
  },
  // 鏄剧ず鐧诲綍寮规
  showPop: function () {
    var $loginPop = $('.login_pop'),
      $mark = $('.stone_mask')
    $mark.show()
    $loginPop.fadeIn()
  },
  // 闅愯棌鐧诲綍寮规
  hidePop: function () {
    var $loginPop = $('.login_pop'),
      $mark = $('.stone_mask')
    $mark.hide()
    $loginPop.fadeOut()
  },
  doRegister: function () {
    var nickname = stoneHeader.$reg_nickName.val()
    var username = stoneHeader.$reg_userName.val()
    var pwd = stoneHeader.$reg_pwd.val()
    var s_pwd = stoneHeader.$reg_s_pwd.val()
    var email = stoneHeader.$reg_email.val()

    if (username == '' || username == null) {
      alert('用户名不能为空')
      return
    }
    if (pwd == '' || pwd == null) {
      alert('密码不能为空')
      return
    }
    if (nickname == '' || nickname == null) {
      alert('昵称不能为空')
      return
    }
    if (s_pwd == '' || s_pwd == null) {
      alert('确认密码不能为空')
      return
    }
    if (email == '' || email == null) {
      alert('邮箱不能为空')
      return
    }
    if (pwd != s_pwd) {
      alert('两次密码不一致')
      return
    }

    $.ajax({
      type: 'POST',
      url: urlObj.baseUrl + '/userInfo/register',
      dataType: 'json',
      data: {'username': username, 'password': pwd, 'nickname': nickname, 'email': email},
      success: function (res) {
        if (res.code == 200) {
          alert('注册成功')
          window.location.href = urlObj.indexUrl
        } else {
          alert(res.msg)
        }
      }
    })
  },
  doReset: function () {
    var username = stoneHeader.$resetUserName.val()
    var password = stoneHeader.$reset_pwd.val()
    var sPassword = stoneHeader.$reset_s_pwd.val()

    if (username == '' || username == null) {
      alert('用户名不能为空')
      return
    }
    if (password == '' || password == null) {
      alert('密码不能为空')
      return
    }
    if (sPassword == '') {
      alert('确认密码不能为空')
      return
    }

    if (password != sPassword) {
      alert('两次密码不一致')
      return
    }

    $.ajax({
      type: 'POST',
      url: urlObj.baseUrl + '/userInfo/updatePwd',
      dataType: 'json',
      data: {'username': username, 'password': password},
      success: function (res) {
        if (res.code == 200) {
          alert('重置成功')
          window.location.href = 'http://localhost:8080'
        } else {
          alert(res.msg)
        }
      }
    })
  },
  // 鐧诲綍
  doLogin: function () {
    dataGetter.post(stoneHeader.loginUrl, {
      username: stoneHeader.$userName.val(),
      password: stoneHeader.$pwd.val()
    }, function (res) {
      console.log(res.data)
      if (res.code == 200) {
        stoneHeader.logined = true
        // stoneHeader.getUserInfo()
        $.ajax({
          type: 'GET',
          url: urlObj.baseUrl + '/userInfo/get/' + res.data.id,
          dataType: 'json',
          jsonp: 'callback',
          success: function (res) {
            if (res.code == 200) {
              console.log(res)
              stoneHeader.logined = true
              stoneHeader.userInfo = res.data
            } else {
              $('.login_pop_error').append(res.msg)
            }

            console.log(stoneHeader.userInfo)
            stoneHeader.appendUser()
            stoneHeader.addEvent()
          }
        })
        stoneHeader.hidePop()

        window.localStorage.setItem('user_id', res.data.id)
        window.location.href = urlObj.indexUrl
      } else {
        stoneCommon.showError(stoneHeader.$pwd, '密码错误')
      }
    })
  },
  // 楠岃瘉鐢ㄦ埛淇℃伅
  checkUser: function () {
    var userName = stoneHeader.$userName.val()
    if (userName) {
      stoneCommon.hideError(stoneHeader.$userName)
    } else {
      stoneCommon.showError(stoneHeader.$userName, '用户名不能为空')
    }
  },
  // 楠岃瘉瀵嗙爜
  checkPwd: function () {
    var pwdVal = stoneHeader.$pwd.val()
    if (pwdVal) {
      stoneCommon.hideError(stoneHeader.$pwd)
    } else {
      stoneCommon.showError(stoneHeader.$pwd, '密码不能为空')
    }
  },

  refreshCurrentPage: function () {
    location.reload()
  }

}
