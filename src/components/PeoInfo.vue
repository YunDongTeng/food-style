<template>
  <div class="PeoInfo bgWhite" id="PeoInfo" style="">
    <div class="onLogin">
      <div class="PeoInfo-Hd">
        <img src='http://www.iplaystone.com/static/common/images/loginPic.png'/>
      </div>
      <a href="javascript:;" class="PeoInfo-Name" :title="info.nickname">{{isLogin === true ? info.nickname : '游客'}}</a>
      <h6 :title="info.nickName" v-if="isLogin">{{info.nickName}} </h6>
      <h6 :title="info.email" v-if="isLogin">{{info.email}} </h6>
      <div style="text-align: center">
        <button
          style="background-color: #00aaff;border: none; color: white; padding: 10px 30px; text-decoration: none;display: inline-block"
          @click="handlePublish">美食发布
        </button>
      </div>
      <div style="text-align: center;margin-top: 15px;margin-bottom: 10px;">
        <!--
                <button style="background-color: #00aaff;border: none; color: white; padding: 10px 30px; text-decoration: none;display: inline-block">我发布的</button>
        -->
      </div>
      <div class="span" v-if="false">
        <a class="home cur" href="javascript:;">
          <span></span>
          <span>主页</span>
        </a>
        <a class="collection cur" href="javascript:;">
          <span></span>
          <span>收藏</span>
        </a>
        <a class="qz cur" href="javascript:;">
          <span></span>
          <span>圈子</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'PeoInfo',
    props: ['showMoreMyCircle'],
    data: function () {
      return {
        info: {},
        isLogin: false,
        myCircleListDetail: []
        // showMoreMyCircle: true
      }
    },
    methods: {
      showMoreMyCircleBtn: function () {
        this.showMoreMyCircle = false
      },
      handlePublish: function () {
        this.$router.push({path: '/SocialPost/new'})
      }
    },
    created: function () {
      const vm = this
      const userId = window.localStorage.getItem('user_id')
      if (userId === null || userId === undefined) {
        this.isLogin = false
      } else {
        vm.$http({
          url: 'http://localhost:8081/userInfo/get/' + userId,
          method: 'get',
          jsonp: 'callback',
          emulateJSON: true,
          headers: {
            'Content-Type': 'x-www-from-urlencoded'
          }
        }).then(function (res) {
          console.log('PeopleInfo:')
          console.log(res.data)
          if (res.data.code === 200) {
            this.info = res.data.data
            this.isLogin = true
          }
        })
      }
      vm.$http({
        url: '//moment.snail.com/api/v1/user/my-circles',
        method: 'jsonp',
        jsonp: 'callback',
        emulateJSON: true,
        headers: {
          'Content-Type': 'x-www-from-urlencoded'
        }
      }).then(function (res) {
        if (res.data.code === 200) {
          this.myCircleListDetail = res.data.list
          if (res.data.list.length < 7) {
            document.getElementById('showMoreMyCircle').style.display = 'none'
            document.getElementById('myCircleList').style.height = 'auto'
          }
        }
      })
    }
  }
</script>
<style scoped>
  @import '../sass/stylesheets/SocialPeoInfo.css'


</style>
