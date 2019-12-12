<template>
  <div class="PeoInfo bgWhite" id="PeoInfo" style="">
    <div class="onLogin">
      <div class="PeoInfo-Hd">
        <img :src="info.url"/>
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
      }
    },
    methods: {
      handlePublish: function () {
        this.$router.push({path: '/SocialPost/new'})
      }
    },
    created: function () {
      const vm = this
      const userId = window.localStorage.getItem('user_id')
      if (userId === null || userId === undefined) {
        this.isLogin = false
        this.info.url = 'http://www.iplaystone.com/static/common/images/loginPic.png'
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
          this.info = res.data.data
          console.log(this.info)
          this.isLogin = true
          console.log(res)
        })
      }
    }
  }
</script>
<style scoped>
  @import '../sass/stylesheets/SocialPeoInfo.css'


</style>
