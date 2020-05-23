<template>
  <section class="mod-processDetail">
    <dl class="infomation">
      <dt>流程信息 处理中</dt>
      <dd>
        <div class="application">
          <div class="application-key">申请人</div>
          <div class="application-val">管理员</div>
        </div>
        <div class="application">
          <div class="application-key">所在项目部</div>
          <div class="application-val">文字</div>
        </div>
        <div class="application">
          <div class="application-key">所在项目部</div>
          <div class="application-val">文字</div>
        </div>
        <div class="application">
          <div class="application-key">所在项目部</div>
          <div class="application-val">文字</div>
        </div>
      </dd>
    </dl>
    <dl class="audit-process">
      <dt>审核过程</dt>
      <dd>
        <div class="header">
          <div class="th">流程节点</div>
          <div class="th">办理人</div>
          <div class="th">办理时间</div>
          <div class="th">审批意见</div>
        </div>
        <div class="header ctn">
          <div class="th">文字</div>
          <div class="th">文字</div>
          <div class="th">2020-05-22</div>
          <div class="th">文字</div>
        </div>
        <div class="header ctn">
          <div class="th">文字</div>
          <div class="th">文字</div>
          <div class="th">2020-05-22</div>
          <div class="th">文字</div>
        </div>
        <div class="header ctn">
          <div class="th">文字</div>
          <div class="th">文字</div>
          <div class="th">2020-05-22</div>
          <div class="th">文字</div>
        </div>
      </dd>
    </dl>
    <dl class="audit-process">
      <dt>流程图</dt>
      <dd>
        <img src="">
      </dd>
    </dl>
    <van-popup v-model="show" position="bottom" :style="{ height: '38%', paddingTop: '10px'}">
      <van-field
        v-model="message"
        rows="1"
        autosize
        label="审核意见"
        type="textarea"
        placeholder="请输入审核意见"
      />
      <div class="mod-btns">
        <div class="btn" @touchstart="onAgree">同意</div>
        <div class="btn" @touchstart="onReject">拒绝</div>
      </div>
    </van-popup>
    <van-button @touchstart="onAudit" style="width:90%; margin-top:30px" type="primary" color="#000" size="normal">去审核</van-button>
  </section>
</template>

<script>
import Vue from 'vue'
import { Button, Field, Popup } from 'vant'
Vue.use(Popup)
Vue.use(Button)
Vue.use(Field)
export default {
  data() {
    return {
      show: false,
      message: ''
    }
  },
  created() {
    console.log(process.env.VUE_APP_ERUDA, '====', process.env.VUE_APP_TEXT)
  },
  methods: {
    onAudit() {
      this.show = true
    },
    onAgree() {},
    onReject() {}
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
