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
  mounted() {
    let readFlag = this.announcement[this.num].readFlag // 0 未读  1 已读
    let anntId = this.announcement[this.num].anntId
    if (+readFlag === 0) {
      this.$http.put('/sys/sysAnnouncementSend/editByAnntIdAndUserId', {
        anntId: anntId
      }).then(res => {
        console.log(res, 888)
      })
    }
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
