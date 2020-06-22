<template>
  <section class="mod-create">
    <div class="block">
      <div class="mod-title">流程管理</div>
      <van-cell-group>
        <van-cell v-for="(item, index) in list" :key="`block-${index}`" :title="item.appMenuName" is-link @click="toApplication(item)" />
      </van-cell-group>
    </div>
    <div class="block">
      <div class="mod-title">日报管理</div>
      <van-cell title="按揭数据添加" is-link to="/addMortgageData" />
      <van-cell title="销售数据添加" is-link to="/addSalesData" />
    </div>
    <div class="block">
      <div class="mod-title">日程管理</div>
      <van-cell title="新建日程" is-link to="/createSchedule" />
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
