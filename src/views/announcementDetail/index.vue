<template>
  <section class="mod-annoucementDetail">
    <div class="title">{{ announcement[num].titile }}</div>
    <div class="time">{{ announcement[num].sendTime }}</div>
    <div class="ctn" v-html="announcement[num].msgContent"></div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      titile: '',
      sendTime: '',
      msgContent: '',
      num: this.$route.query.num || 0
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
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
