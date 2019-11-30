<template>
  <div id="SocialDetail" class="SocialDetail">
    <div class="MainList fl" id="MainList">

      <div class="ListCont">
        <div class="Jtitle bgWhite" id="Jtitle">
          <h5 class="textOverFlow" :data-tzId="DetailLandlord.id" :title="DetailLandlord.title">
            {{DetailLandlord.title}}</h5>
          <div class="Jtitle-Moudle fr">
            <!-- <span @click="onLandlord(1)" :class="{onLandlord:DetailLandlord.onLandlord === true}">只看楼主</span>-->
            <span @click="goBottom()"><img src="./images/icon6.png"/>我说一句</span>
          </div>
        </div>
        <ul class="ListContUl">
          <li :class="['clearfix bgWhite ListContUlLi',{'isSelf':DetailLandlord.is_self === true}]" v-show="isOne"
              :data-id="DetailLandlord.id">
            <img src="./images/lz.png" class="user-lz"/>
            <div class="Jitems">
              <div class="JitemsLeft fl">
                <div class="J-UserInfo">
                  <div class="J-UserInfo-Pic"><img :src="DetailLandlord.user_photo" :alt="DetailLandlord.nickName"/>
                  </div>
                  <span class="J-UserInfo-Name textOverFlow" :title="DetailLandlord.nickName">{{DetailLandlord.nickName}}</span>
                  <span class="J-UserInfo-adminCall" v-show="DetailLandlord.is_post_by_admin">管理员</span>
                </div>
              </div>
              <div class="JitemsRight fr">
                <div class="J-TextCont" v-html="DetailLandlord.content"></div>
                <!--<div v-for="(img, index) in DetailLandlord.imageArray">
                  <img :src="img" style="width: 450px; height: 250px;"/>
                </div>-->
                <div :class="['J-ClickUp',{'J-On' : DetailLandlord.is_voted === true}]"
                     @click="ListVote(DetailLandlord.id)" wn_tj_click_href wn_tj_click_gameId
                     wn_tj_click_excel="praise_starter" :wn_tj_click_id="DetailLandlord.id">
                  <p></p>
                  <p>{{DetailLandlord.praise}}</p>
                </div>
                <div class="J-Modle clearfix">
                  <div class="J-Modle-Hd">
                    <div class="Hd-Floor fl"><span>楼主</span>{{DetailLandlord.createTime}}</div>
                    <div class="Hd-Moudle fr">
                      <ol>
                        <li @click="goBottom()"><span class="Hd-Moudle-Reply">我说一句</span></li>
                        <li @click="doDelete(DetailLandlord.id)" v-if="loginUserId == DetailLandlord.userId">
                          <span>删除</span></li>
                        <li @click="doEditFood(DetailLandlord.id)" v-if="loginUserId == DetailLandlord.userId">
                          <span>修改</span></li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li :class="['clearfix bgWhite ListContUlLi',{'isSelf':list.is_self === true}]"
              v-for="(list , temp) in DetailList" :data-listId="list.id" :name="list.id">
            <a :name="list.id"></a>
            <img src="./images/lz.png" class="user-lz" v-show="list.is_owner"/>
            <div class="Jitems">
              <div class="JitemsLeft fl">
                <div class="J-UserInfo">
                  <div class="J-UserInfo-Pic"><img src="http://www.iplaystone.com/static/common/images/loginPic.png"
                                                   :alt="list.nickName"/></div>
                  <span class="J-UserInfo-Name textOverFlow" :title="list.nickName" :data-userid="list.user_id">{{list.nickName}}</span>
                  <span class="J-UserInfo-adminCall" v-show="list.is_post_by_admin">管理员</span>
                </div>
              </div>
              <div class="JitemsRight fr">
                <div class="J-TextCont" v-html="list.content"></div>
                <div class="J-Modle clearfix">
                  <div class="J-Modle-Hd">
                    <div class="Hd-Floor fl"><span>{{temp+1}}楼</span>{{list.createTime}}</div>
                    <div class="Hd-Moudle fr">
                      <ol>
                        <li v-show="list.delete_private" @click="isAdmin(3, list.id)"><span
                          class="Hd-Moudle-Del">删除</span></li>
                        <li v-show="!list.delete_private" v-if="false"><span class="Hd-Moudle-Report">举报</span></li>
                        <li v-if="true">
                          <span class="Hd-Moudle-Reply" @click="ShowMoudleList(temp, list.reply_num, list.userId)">回复<b
                            v-if="list.reply_num > 0">（{{list.reply_num}}）</b></span>
                          <!--
                                                                    <span class="Hd-Moudle-Reply" v-show="!list.isReplay" @click="HideMoudleList(temp)">收起回复<b v-if="list.reply_num > 0">（{{list.reply_num}}）</b></span>
                          -->
                        </li>
                        <li><span :class="['Hd-Moudle-Praise',{'Hd-Moudle-Praise-On' : list.is_voted === true}]"
                                  @click="CommentVote(list.id, temp, list.is_voted)" wn_tj_click_href wn_tj_click_gameId
                                  wn_tj_click_excel="praise_responder" :wn_tj_click_id="DetailLandlord.id">{{list.like_num}}</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div class="J-Moudle-List" v-show="list.replyArray.length >= 0">
                    <div class="J-Moudle-List-Cont clearfix">
                      <ul class="J-Moudle-List-Cont-Ul" v-if="list.replyArray.length > 0">
                        <li class="J-Moudle-List-Cont-Li" v-for="(Mlist, Mtemp) in list.replyArray"
                            :data-repliesId="Mlist.id">
                          <div class="Jmoude-items clearfix">
                            <div class="Jmoude-items-Pic fl"><img
                              src="http://www.iplaystone.com/static/common/images/loginPic.png" :alt="Mlist.nickName"/>
                            </div>
                            <div class="Jmoude-items-Cont fr">
                              <div class="Jmoudle-items-h5">
                                <span><a href="javascript:;" :data-hfrId="Mlist.user_id">{{Mlist.nickName}}：</a><b
                                  style="float:left">{{ Mlist.to_user_id !== Mlist.comment_user_id ? '回复' : '' }} </b><a
                                  href="javascript:;" v-if="Mlist.to_user_id != Mlist.comment_user_id"
                                  :data-atrId="Mlist.to_user_id" class="twouser">{{Mlist.to_user_nickname}}：</a>{{Mlist.content}}</span>
                              </div>
                              <div class="Jmoudle-items-info">
                                <span class="fl">{{Mlist.created_at}}</span>
                                <span class="fr cur" :data-userId="(Mlist.user_id)"
                                      :data-commentUserId="(Mlist.comment_user_id)"
                                      @click="JMoudleReply(Mlist.id, Mlist.comment_id, Mlist.user_nickname, temp, $event, list.id)">回复</span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div class="J-Moudle-List-Cont-Jet">
                        <span class="J-Moudle-List-More fl cur" v-show="list.reply_num > 5 && list.more === true"
                              @click="showMore(list.id, 1, 10, temp)">查看更多</span>
                        <div class="J-Moudle-Mebtn fr cur" :data-listId="list.id" :data-listUserId="list.user_id"
                             @click="JReply(list.id, temp)">我也说一句
                        </div>
                      </div>
                    </div>
                    <div class="J-Moudle-List-Input"> <!--v-show="list.isMoudleListInput"-->
                      <div class="J-Moudle-List-Input-Box">
                        <input type="text" :id="'J'+list.id" maxLength="150"
                               autofocus="autofocus"/>
                      </div>
                      <div class="J-Moudle-List-Input-Set">
                        <div class="J-M-l-I-S-Icon cur fl" v-if="false">
                          <img src="./images/icon13.png"/>
                          <div class="Icon-List none"></div>
                        </div>
                        <span class="J-M-L-Btn cur fr" @click="postComment(list.id, temp,DetailLandlord.id)"
                              wn_tj_click_href
                              wn_tj_click_gameId wn_tj_click_excel="reply_responder" :wn_tj_click_id="list.id">发表</span>
                      </div>
                      <!--Login Mask-->
                      <div class="loginMask" v-if="!isLogin">
                        <div class="loginMaskBox">
                          <a href="javascript:;" @click="detailLogin()">登录</a>
                          <a href="javascript:;" class="loginMaskBoxline"></a>
                          <a href="http://www.iplaystone.com/static/web/register.html">注册</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--  <div class="ListPage Page-Bootom">
            <pagination :cur.sync="cur" :all.sync="all" :isJump.sync="isJump"  @listen="monitor"></pagination>

            <router-link class="goBack cur"  :to="{ name: 'circleIdircle', params: {'circleId':circleId}}" wn_tj_click_href wn_tj_click_gameId wn_tj_click_excel="previous_page" wn_tj_click_id><img src="./images/icon14.png"/>返回{{HdInfoData.name}}</router-link>

        </div>-->
      <div class="ListPage Page-Bootom"></div>
      <div class="LidtEditor bgWhite" id="LidtEditor">
        <div class="Editor">
          <div id="editorElem" style="text-align:left">
          </div>
          <span class="errts" id="postErrts" v-show="iSerrts"></span>
          <span class="PostHtml cur" @click="" wn_tj_click_href wn_tj_click_gameId wn_tj_click_excel="reply_starter"
                :wn_tj_click_id="DetailLandlord.id" id="PostHtml">发表</span>
        </div>
        <div class="loginMask" v-if="!isLogin">
          <p>游客不能回复哦~</p>
          <div class="loginMaskBox">
            <a href="javascript:;" @click="detailLogin()">登录</a>
            <a href="javascript:;" class="loginMaskBoxline"></a>
            <a href="http://www.iplaystone.com/static/web/register.html">注册</a>
          </div>
        </div>
      </div>
    </div>
    <div class="MainMoudle fr" id="MainMoudle">

      <PeoInfo :showMoreMyCircle.sync="showMoreMyCircle"></PeoInfo>
      <SocialIndexHot></SocialIndexHot>
      <!--<SocialIndexRecommend id ="SocialIndexRecommend"></SocialIndexRecommend>-->
      <span class="goTop cur" v-show="isGoTop" @click="goTop()"></span>
    </div>
    <!-- <rulePop :isPopInfo="isPopInfo" :DetailLandlord="DetailLandlord" :cur="cur" @abc="delComment"></rulePop>-->
    <div class="divmask a" v-show="isPostManageMask" @click="closeMask"></div>
  </div>

</template>

<script>
  import SocialIndexHeader from './components/SocialIndexHeader.vue'
  import SocialIndexAdmin from './components/SocialIndexAdmin.vue'
  import SocialIndexHot from './components/SocialIndexHot.vue'
  import PeoInfo from './components/PeoInfo.vue'
  import SocialIndexDetail from './components/SocialIndexDetail.vue'
  import SocialIndexRecommend from './components/SocialIndexRecommend.vue'
  import pagination from './components/pagination.vue'
  import rulePop from './components/rulePop.vue'
  import E from 'wangeditor'
  // import statistics from 'http://static.snail.com/js/stone/v2/statistics_ty_v2.source.js'
  // import Store from 'Store'

  export default {
    name: 'SocialDetail',
    components: {
      SocialIndexHeader: SocialIndexHeader,
      SocialIndexAdmin: SocialIndexAdmin,
      PeoInfo: PeoInfo,
      SocialIndexHot: SocialIndexHot,
      SocialIndexDetail: SocialIndexDetail,
      SocialIndexRecommend: SocialIndexRecommend,
      pagination: pagination,
      rulePop: rulePop
      // Store: Store
      // statistics: statistics
    },
    watch: {
      DetailList: {
        handler: function (val, oldval) {
          // console.log(val)
        }
      },
      cur: {
        handler: function (val, oldval) {
          this.cur = val
          console.log(this.cur)
        }
      },
      editorContent: {
        handler: function (val, oldval) {
          console.log(val, 'val')
        }
      }
    },
    ready () {
      this.requestData()
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    },
    data () {
      return {
        circleId: '',
        isZan: false,
        postId: '',
        HdInfoData: {},
        DetailLandlord: [],
        DetailList: [],
        isSiH: false,
        cur: '',
        all: 1,
        Pagesize: 10,
        isJump: true,
        listId: '',
        userId: '',
        content: '',
        username: '',
        isOne: true,
        isOnLandlord: 0,
        editorContent: '',
        scrolled: '',
        isGoTop: false,
        isPostManage: false,
        isPostManageMask: false,
        iSerrts: false,
        isPopInfo: {
          isPopShow: false,
          isPopTsShow: 0,
          isMaskShow: false,
          commentId: ''
        },
        isLogin: false,
        loginUserId: ''
      }
    },
    methods: {
      ShowLoginPop: function () {
        document.getElementById('login_pop').style.display = 'block'
        document.getElementById('stone_mask').style.display = 'block'
      },
      detailLogin: function () {
        if (document.getElementById('pdLogin').value === 'true') {
          this.ShowLoginPop()
        } else {
          this.ShowLoginPop()
        }
      },
      doDelete: function (foodId) {
        console.log(foodId)

        var vm = this
        vm.$http({
          url: 'http://192.168.103.195:8081/food/delete/' + foodId,
          method: 'post',
          /* jsonp: 'callback', */
          emulateJSON: true,
          headers: {
            'Content-Type': 'x-www-from-urlencoded'
          }
        }).then(function (res) {
          console.log(res.data)
          if (res.data.code === 200) {
            window.location.href = 'http://localhost:8080'
          }
        })
      },
      doEditFood: function (foodId) {
        console.log(foodId)
        this.$router.push({path: '/SocialPost/' + foodId, params: {'id': foodId}})
      },
      isAdmin: function (temp, data) { // 删除 置顶 加精
        this.isPopInfo.isMaskShow = true
        this.isPopInfo.isPopShow = true
        this.isPostManageMask = false
        this.isPostManage = false
        if (temp === 0) { // 置顶
          this.isPopInfo.isPopTsShow = 0
        } else if (temp === 1) { // 加精
          this.isPopInfo.isPopTsShow = 1
        } else if (temp === 2) { // 删除主贴
          this.isPopInfo.isPopTsShow = 2
        } else if (temp === 3) { // 删除评论
          this.isPopInfo.isPopTsShow = 3
          this.isPopInfo.commentId = data
        } else if (temp === 4) { // 官方贴
          this.isPopInfo.isPopTsShow = 4
        } else if (temp === 5) { // FAQ贴
          this.isPopInfo.isPopTsShow = 5
        }
      },
      closeMask: function () {
        this.isPostManage = false
        this.isPostManageMask = false
      },
      showPostManage: function () { // 显示管理列表
        if (this.isPostManage === false) {
          this.isPostManage = true
          this.isPostManageMask = true
        } else {
          this.isPostManage = false
          this.isPostManageMask = false
        }
      },
      handleScroll: function () {
        const windheight = window.innerHeight
        this.scrolled = window.scrollY
        // console.log(this.scrolled, windheight)
        if (this.scrolled > windheight - windheight / 2) {
          document.getElementById('Jtitle').style.position = 'fixed'
        } else {
          document.getElementById('Jtitle').style.position = 'static'
        }
        if (this.scrolled > windheight + 250) {
          this.isShow = true
          this.isGoTop = true
          document.getElementById('SocialIndexRecommend').classList.add('fixed2')
          document.getElementById('MainMoudle').children[0].classList.add('hfixed')
        } else if (this.scrolled < 800) {
          document.getElementById('MainMoudle').children[0].classList.remove('hfixed')
          document.getElementById('SocialIndexRecommend').classList.remove('fixed2')
          this.isShow = false
          this.isGoTop = false
        }
        if (document.documentElement.clientHeight < 700) {
          this.isGoTop = false
        }
      },
      delComment: function (commentId) { // 删除评论
        this.monitor(this.cur)
      },
      getContent: function (text) { // 发送评论
        var _this = this
        document.getElementsByClassName('w-e-text')[0].blur()
        if (text !== '') {
          _this.postHtml(_this.postId, text)
        }
      },
      postHtml: function (postId, editorContent) {
        const userId = window.localStorage.getItem('user_id')

        var vm = this

        vm.$http.post('http://localhost:8081/comment/save', {
          foodId: postId,
          content: editorContent,
          fromUser: userId
        },
          {emulateJSON: true}).then((res) => {
            if (res.data.code === 200) {
              this.editorContent = 'no'

              vm.$http({
                url: 'http://192.168.103.195:8081/food/detail/' + this.postId,
                method: 'get',
              /* jsonp: 'callback', */
                emulateJSON: true,
                headers: {
                  'Content-Type': 'x-www-from-urlencoded'
                }
              }).then(function (res) {
                console.log(res.data)
                if (res.data.code === 200) {
                  this.DetailLandlord = res.data.data
                  this.DetailLandlord['onLandlord'] = false
                  this.DetailLandlord.user_photo = 'http://www.iplaystone.com/static/common/images/loginPic.png'

                  this.DetailList = res.data.data.commentVoList

                  this.DetailList.user_photo = 'http://www.iplaystone.com/static/common/images/loginPic.png'

                  document.getElementById('postErrts').style.display = 'none'
                  document.getElementsByClassName('w-e-text')[0].innerHTML = '<p><br/></p>'
                } else if (res.data.code === 404) {
                /* var url = 'http://stone.snail.com/error/404.html?from=circle&type=1&circleId=' + this.circleId
                 window.location.href = url */
                }
              })
            } else {
              document.getElementById('postErrts').style.display = 'inline-block'
              document.getElementById('postErrts').innerHTML = res.data.message
            }
          }, (error) => {
            console.log(error)
          })
      },
      goBottom: function () {
        const windheight = document.documentElement.scrollHeight
        const gotoTop = function () {
          var currentPosition = document.documentElement.scrollTop || document.body.scrollTop
          currentPosition += 120
          if (currentPosition < windheight - 1600) {
            window.scrollTo(0, currentPosition)
          } else {
            window.scrollTo(0, windheight)
            clearInterval(timer)
            timer = null
          }
        }
        var timer = setInterval(gotoTop, 20)
      },
      goTop: function () {
        const gotoTop = function () {
          var currentPosition1 = document.documentElement.scrollTop || document.body.scrollTop
          currentPosition1 -= 80
          if (currentPosition1 > 0) {
            window.scrollTo(0, currentPosition1)
          } else {
            window.scrollTo(0, 0)
            clearInterval(timer)
            timer = null
          }
        }
        var timer = setInterval(gotoTop, 50)
      },
      onLandlord: function (flag) { // 只看楼主
        if (this.DetailLandlord['onLandlord'] === true) {
          this.DetailLandlord['onLandlord'] = false // 全部
          this.isOnLandlord = 0 // 只看楼主按钮标识
          this.cur = 1  // 切换分页为第一页
          this.isOne = true // 将楼主信息显示
          this.LoadHtml(1, 0)
        } else { // 只看楼主
          this.DetailLandlord['onLandlord'] = true
          this.isOnLandlord = 1
          this.cur = 1
          this.isOne = true
          this.LoadHtml(1, 1)
        }
      },
      monitor: function (data) { // 分页
        this.cur = data
        this.LoadHtml(data, this.isOnLandlord)
        if (data > 1) {
          this.isOne = false // 第二页 楼主不现实
        } else {
          this.isOne = true
        }
      },
      ShowMoudleList: function (temp, num, commentUserId) { // 显示评论列表
        this.DetailList[temp]['isMoudleListInput'] = true
        this.DetailList[temp]['isReplay'] = false
        this.DetailList[temp]['UserNickName'] = ''
        this.DetailList[temp]['listId'] = commentUserId
        this.DetailList[temp]['userId'] = ''
      },
      HideMoudleList: function (temp) { // 关闭评论列表
        this.DetailList[temp]['isReplay'] = true
        this.DetailList[temp]['UserNickName'] = ''
        this.DetailList[temp]['isMoudleListInput'] = false
      },
      JMoudleReply: function (userId, commentUserId, userNickName, temp, event, id) { // 回复
        if (document.getElementById('pdLogin').value === 'true') {
          this.DetailList[temp]['isMoudleListInput'] = true
          this.DetailList[temp]['UserNickName'] = '回复：' + userNickName
          this.DetailList[temp]['listId'] = commentUserId
          this.DetailList[temp]['userId'] = userId
          setTimeout(function () {
            document.getElementById('J' + id).focus()
          }, 200)
        } else {
          this.ShowLoginPop()
        }
      },
      JReply: function (commentUserId, temp) { // 我也说一句
        this.DetailList[temp]['isMoudleListInput'] = true
        this.DetailList[temp]['UserNickName'] = ''
        this.DetailList[temp]['listId'] = commentUserId
        this.DetailList[temp]['userId'] = ''
        setTimeout(function () {
          document.getElementById('J' + commentUserId).focus()
        }, 200)
      },
      CommentVote: function (commentId, temp, isVote) { // 评论投票
        if (document.getElementById('pdLogin').value === 'true') {
          var vm = this
          vm.$http({
            url: '//moment.snail.com/api/v1/comment/vote',
            method: 'jsonp',
            params: {
              'comment_id': commentId
            },
            jsonp: 'callback',
            emulateJSON: true,
            headers: {
              'Content-Type': 'x-www-from-urlencoded'
            }
          }).then(function (res) {
            if (res.body.operation === 'minus') {
              this.DetailList[temp]['is_voted'] = false
              this.DetailList[temp]['like_num'] = this.DetailList[temp]['like_num'] - 1
            } else if (res.body.operation === 'plus') {
              this.DetailList[temp]['is_voted'] = true
              this.DetailList[temp]['like_num'] = this.DetailList[temp]['like_num'] + 1
            }
          })
        } else {
          this.ShowLoginPop()
        }
      },
      ListVote: function (foodId) { // 楼主贴投票
        console.log(this.isZan)
        if (this.isZan === true) {
          alert('你已经点过赞了，不能重复点赞')
          return
        }
        if (window.localStorage.getItem('user_id') !== null) {
          this.DetailLandlord.praise = this.DetailLandlord.praise + 1
          var vm = this
          vm.$http({
            url: 'http://192.168.103.195:8081/food/zan',
            method: 'jsonp',
            params: {
              'id': foodId
            },
            jsonp: 'callback',
            emulateJSON: true,
            headers: {
              'Content-Type': 'x-www-from-urlencoded'
            }
          }).then(function (res) {
            this.isZan = true

            this.DetailLandlord.praise = this.DetailLandlord.praise + 1
          })
        } else {
          this.ShowLoginPop()
        }
      },
      LoadHtml: function (data, flag) { // 刷新HTML 只看楼主
        var vm = this
        vm.$http({
          url: '//moment.snail.com/api/v1/comment/list',
          method: 'jsonp',
          params: {
            'post_id': this.postId,
            'page': data,
            'only_owner': flag
          },
          jsonp: 'callback',
          emulateJSON: true,
          headers: {
            'Content-Type': 'x-www-from-urlencoded'
          }
        }).then(function (res) {
          for (var i in res.data.list) {
            res.data.list[i]['UserNickName'] = ''
            res.data.list[i]['isMoudleListInput'] = false
            res.data.list[i]['more'] = true
            if (res.data.list[i].reply_num > 0) {
              res.data.list[i]['isReplay'] = false
            } else {
              res.data.list[i]['isReplay'] = true
            }
            if (res.data.list[i].replies !== undefined) {
              if (res.data.list[i].replies.length > 0) {
                res.data.list[i].replies = res.data.list[i].replies.splice(0, 5)
              }
            }
          }
          this.DetailList = res.data.list
          this.all = res.data.totalPage
          if (res.data.totalPage === 0) {
            this.all = 1
          }
        })
      },
      /* RefreshHdInfo: function () { // 刷新楼主投票
         var vm = this
         vm.$http({
           url: '//moment.snail.com/api/v1/post/detail-of-circle-post',
           method: 'jsonp',
           params: {
             'post_id': this.postId
           },
           jsonp: 'callback',
           emulateJSON: true,
           headers: {
             'Content-Type': 'x-www-from-urlencoded'
           }
         }).then(function (res) {
           if (res.data.code === 200) {
             this.DetailLandlord = res.data.info
             this.DetailLandlord['onLandlord'] = false
           } else if (res.data.code === 404) {
             var url = 'http://stone.snail.com/error/404.html?from=circle&type=1&circleId=' + this.circleId
             window.location.href = url
           }
         })
       }, */
      showMore: function (commentid, page, pagesize, temp) { // 显示评论列表
        var _this = this
        _this.$http({
          url: '//moment.snail.com/api/v1/reply/list',
          method: 'jsonp',
          params: {
            'comment_id': commentid,
            'page': page,
            'pagesize': pagesize
          },
          jsonp: 'callback',
          emulateJSON: true,
          headers: {
            'Content-Type': 'x-www-from-urlencoded'
          }
        }).then(function (res) {
          if (res.body.code === 200) {
            _this.DetailList[temp]['replies'] = res.body.list
            _this.DetailList[temp]['current'] = page
            _this.DetailList[temp]['more'] = false
            _this.DetailList[temp]['allpage'] = res.body.totalPage
          }
        })
      },
      // 页码点击事件
      btnClick: function (current, index, postId) {
        if (current < 1) return
        if (current !== this.DetailList[index].current) {
          this.DetailList[index].current = current
          this.showMore(postId, current, 10, index)
        }
      },
      // 下一页
      nextPage: function (current, allpage, postId, index) {
        if (current >= allpage) return
        this.btnClick(current + 1, index, postId)
      },
      // 上一页
      prvePage: function (current, postId, index) {
        if (current <= 1) return
        this.btnClick(current - 1, index, postId)
      },
      // 设置按钮禁用样式
      setButtonClass: function (isNextButton, index) {
        if (isNextButton) {
          return this.DetailList[index].current >= this.DetailList[index].allpage ? 'page-button-disabled' : ''
        } else {
          return this.DetailList[index].current <= 1 ? 'page-button-disabled' : ''
        }
      },
      postComment: function (id, temp, foodId) { // 发表评论
        var content = document.getElementById('J' + id).value
        if (!content) return
        console.log(content, id, foodId)

        var vm = this
        vm.$http.post('http://192.168.103.195:8081/comment/save', {
          foodId: foodId,
          content: content,
          cId: id,
          fromUser: window.localStorage.getItem('user_id')
        },
          {emulateJSON: true}).then((res) => {
            if (res.data.code === 200) {
              this.editorContent = 'no'

              vm.$http({
              /* url: '//moment.snail.com/api/v1/post/detail-of-circle-post', */
                url: 'http://192.168.103.195:8081/food/detail/' + this.postId,
                method: 'get',
              /* jsonp: 'callback', */
                emulateJSON: true,
                headers: {
                  'Content-Type': 'x-www-from-urlencoded'
                }
              }).then(function (res) {
                console.log(res.data)
                if (res.data.code === 200) {
                /* this.DetailLandlord = res.data
                this.DetailLandlord['onLandlord'] = false */
                  this.DetailLandlord = res.data.data
                  this.DetailLandlord['onLandlord'] = false
                  this.DetailLandlord.user_photo = 'http://www.iplaystone.com/static/common/images/loginPic.png'

                  this.DetailList = res.data.data.commentVoList

                  this.DetailList.user_photo = 'http://www.iplaystone.com/static/common/images/loginPic.png'

                  document.getElementById('postErrts').style.display = 'none'
                  document.getElementsByClassName('w-e-text')[0].innerHTML = '<p><br/></p>'
                } else if (res.data.code === 404) {
                }
              })
            } else {
              document.getElementById('postErrts').style.display = 'inline-block'
              document.getElementById('postErrts').innerHTML = res.data.message
            }
          }, (error) => {
            console.log(error)
          })
      }
    },
    computed: {
      indexs: function () {
        var left = 1
        var right = this.all
        var ar = []
        if (this.all >= 11) {
          if (this.curIndex > 5 && this.curIndex < this.all - 4) {
            left = this.curIndex - 5
            right = this.curIndex + 4
          } else {
            if (this.curIndex <= 5) {
              left = 1
              right = 10
            } else {
              right = this.all
              left = this.all - 9
            }
          }
        }
        while (left <= right) {
          ar.push(left)
          left++
        }
        if (ar[ar.length - 1] < this.all) {
          ar[ar.length - 1] = this.all
          ar[ar.length - 2] = 0
        }
        return ar
      }
    },
    created: function () {
      this.postId = this.$route.params.id
      this.cur = this.$route.params.onPage
      window.addEventListener('scroll', this.handleScroll)
      var vm = this

      const userId = window.localStorage.getItem('user_id')
      if (userId === null || userId === undefined) {
        this.isLogin = false
      } else {
        vm.$http({
          url: 'http://192.168.103.195:8081/userInfo/get/' + userId,
          method: 'get',
          jsonp: 'callback',
          emulateJSON: true,
          headers: {
            'Content-Type': 'x-www-from-urlencoded'
          }
        }).then(function (res) {
          if (res.data.code === 200) {
            this.isLogin = true
            this.loginUserId = userId
          }
        })
      }
      vm.$http({
        /* url: '//moment.snail.com/api/v1/post/detail-of-circle-post', */
        url: 'http://192.168.103.195:8081/food/detail/' + this.postId,
        method: 'get',
        /* jsonp: 'callback', */
        emulateJSON: true,
        headers: {
          'Content-Type': 'x-www-from-urlencoded'
        }
      }).then(function (res) {
        console.log(res.data)
        if (res.data.code === 200) {
          this.DetailLandlord = res.data.data
          this.DetailLandlord['onLandlord'] = false
          this.DetailLandlord.user_photo = 'http://www.iplaystone.com/static/common/images/loginPic.png'

          this.DetailList = res.data.data.commentVoList

          this.DetailList.user_photo = 'http://www.iplaystone.com/static/common/images/loginPic.png'

          for (var i in this.DetailList) {
            this.DetailList[i]['isMoudleListInput'] = false
            this.DetailList[i]['more'] = true
          }
        } else if (res.data.code === 404) {
        }
      })
    },
    mounted: function () {
      const s = document.createElement('script')
      s.type = 'text/javascript'
      s.src = '//static.snail.com/js/stone/v2/statistics_ty_v2.source.js'
      document.body.appendChild(s)
      var editor = new E('#editorElem')
      // editor.customConfig.onchange = (html) => {
      //   this.editorContent = html
      // }
      editor.customConfig.menus = []
      // editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
      editor.customConfig.pasteFilterStyle = true
      editor.customConfig.uploadImgServer = '//moment.snail.com/api/v1/upload/image'  // 上传图片到服务器
      editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024
      editor.customConfig.uploadImgMaxLength = 50
      editor.customConfig.withCredentials = true
      editor.customConfig.uploadImgParams = {
        from: 'comment'   // 属性值会自动进行 encode ，此处无需 encode
      }
      editor.customConfig.uploadFileName = 'file'
      editor.customConfig.uploadImgHeaders = {
        'Accept': 'text/x-json'
      }
      editor.customConfig.customAlert = function (info) {
        // info 是需要提示的内容
        // alert('info')
        document.getElementById('postErrts').style.display = 'inline-block'
        document.getElementById('postErrts').innerHTML = '图片过大，请上传小于2M的图片'
        // console.log(info)
      }
      editor.customConfig.uploadImgHooks = {
        fail: function (xhr, editor, result) {
          // 图片上传并返回结果，但图片插入错误时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          document.getElementById('postErrts').style.display = 'inline-block'
          document.getElementById('postErrts').innerHTML = '图片插入错误，请重新选择图片'
        },
        error: function (xhr, editor) {
          // 图片上传出错时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
          document.getElementById('postErrts').style.display = 'inline-block'
          document.getElementById('postErrts').innerHTML = '图片上传错误，请重新选择图片'
        },
        customInsert: function (insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          if (result.code === 200) {
            document.getElementById('postErrts').style.display = 'none'
            var url = result.url
            insertImg(url)
          } else {
            document.getElementById('postErrts').style.display = 'inline-block'
            document.getElementById('postErrts').innerHTML = result.message
          }
          // console.log(result)
          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      }
      editor.customConfig.linkImgCallback = function (url) {
        // console.log(url) // url 即插入图片的地址
      }
      editor.create()
      // editor.txt.html('<p style="font-size:12px;color:#aaa;">请输入内容(～￣▽￣)～</p>')
      var _this = this
      document.getElementById('PostHtml').addEventListener('click', function () {
        console.log(editor.txt)
        this.editorContent = editor.txt.text()
        _this.getContent(editor.txt.text())
        // console.log('1')
      })
    }
  }
</script>

<style>
  @import './sass/stylesheets/SocialDetail.css'
</style>
