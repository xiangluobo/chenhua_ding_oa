<template>
  <section class="mod-create">
    <div class="block">
      <div class="mod-title">流程管理</div>
        <van-cell-group>
          <van-cell v-for="(item, index) in list" :key="`block-${index}`" :title="item.appMenuName" is-link @click="toApplication(item)" />
        </van-cell-group>
      </div>
  </section>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { CellGroup, Cell } from 'vant'
Vue.use(Cell)
Vue.use(CellGroup)

export default {
  data() {
    return {
      list: []
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  created() {
    this.getUserAppPermission()
  },
  methods: {
    // get请求
    getUserAppPermission() {
      this.$http.get('/sys/permission/getUserAppPermissionByToken', {
        params: {
          token: this.token
        }
      }).then(res => {
        this.list = res.result.filter(v => v.parentId)
      })
    },
    toApplication(item) {
      let router = item.appMenuRouter
      if (router.indexOf(';') > -1) {
        this.$router.push(router.split(';')[1])
      }
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
