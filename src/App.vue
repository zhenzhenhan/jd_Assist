<template>
  <div>
    <router-view v-slot="{ Component }" v-wechat-title="$route.meta.title">
      <transition :name="transitionName">
        <component :is="Component" />
      </transition>
    </router-view>

    <div style="height: 4rem"></div>

    <van-tabbar v-if="!$route.meta.showNav" route>
      <van-tabbar-item replace to="/" icon="wechat"
        >WxPusher推送</van-tabbar-item
      >
      <van-tabbar-item replace to="/jdteam" icon="friends-o">
        京东组队
      </van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o"> 我的 </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: '',
    }
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      if (from.name) {
        if (from.name === 'WxPush' && to.name === 'JdTeam') {
          this.transitionName = 'fold-left'
        } else if (from.name === 'JdTeam' && to.name === 'User') {
          this.transitionName = 'fold-left'
        } else if (from.name === 'WxPush' && to.name === 'User') {
          this.transitionName = 'fold-left'
        } else if (from.name === 'Login' && to.name === 'SignUp') {
          this.transitionName = 'fold-left'
        } else if (from.name === 'Login' && to.name === 'Forget') {
          this.transitionName = 'fold-left'
        } else if (from.name === 'SignUp' && to.name === 'Login') {
          this.transitionName = 'fold-right'
        } else {
          this.transitionName = 'fold-right'
        }
      }
      // console.log($router)
    },
  },
}
</script>

<style scoped>
@import './assets/style.less';
</style>
