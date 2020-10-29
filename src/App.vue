<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件，比如 Home！ -->
        </router-view>
      </keep-alive>
    </transition>

    <transition name="fade">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>

    <Footer v-if="showFooter"/>
  </div>
</template>

<script>
import Footer from '@/components/footer.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    Footer
  },
  computed: {
    ...mapGetters(['showFooter'])
  },
  data () {
    return {
      show: true
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @colorFont;
  font-size: @fontSizeH3;

  .fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
