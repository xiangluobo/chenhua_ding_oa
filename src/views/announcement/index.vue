<template>
  <ul class="mod-annoucement">
    <li @click="goToAnnoucementDetail(index)" v-for="(item, index) in announcement" :key="index">
      <div class="name">{{ item.titile }}</div>
      <i class="iconfont">&#xe76d;</i>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(['announcement'])
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    },
    goToAnnoucementDetail(index) {
      this.$router.push(`/announcementDetail?num=${index}`)
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
