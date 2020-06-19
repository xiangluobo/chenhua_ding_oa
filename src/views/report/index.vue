<template>
  <section class="mod-report">
    <ul class="mod-application">
      <li @click="goMorgageReport()">
        <span>按揭报表</span>
        <i class="iconfont arrow">&#xe7e3;</i>
      </li>
      <li @click="goSaleReport()">
        <span>销售报表</span>
        <i class="iconfont arrow">&#xe7e3;</i>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    goMorgageReport(path) {
      this.$router.push('/mortgageStatistic')
    },
    goSaleReport() {
      this.$router.push('/salesStatistics')
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
