<template>
  <section class="mod-processDetail">
    <dl class="infomation">
      <dt>流程信息 <span style="padding-left:10px">{{bpmState_dictText}}</span></dt>
      <dd>
        <div class="application" v-for="(item, index) in applicationList" :key="index">
          <div class="application-key">{{item.name}}</div>
          <div class="application-val">{{item.value}}</div>
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
        <div class="header ctn" v-for="(audit, index) in auditList" :key="`audit${index}`">
          <div class="th">{{audit.actName}}</div>
          <div class="th">{{audit.assignee}}</div>
          <div class="th">{{audit.endTime}}</div>
          <div class="th">{{audit.varText}}</div>
        </div>
      </dd>
    </dl>
    <dl class="audit-process">
      <dt>流程图</dt>
      <dd>
        <img :src="image">
      </dd>
    </dl>
    <van-popup v-model="show" position="bottom" :style="{ height: '38%', paddingTop: '10px'}">
      <van-field
        v-model="tips"
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
    <van-button v-if="taskId && Id" @touchstart="onAudit" style="width:90%; margin-top:30px" type="primary" color="#000" size="normal">去审核</van-button>
  </section>
</template>

<script>
import Vue from 'vue'
import { Button, Field, Popup } from 'vant'
// import { Loading } from 'element-ui'
// let loadingInstance1 = Loading.service({ fullscreen: true });
Vue.use(Popup)
Vue.use(Button)
Vue.use(Field)
export default {
  data() {
    return {
      show: false,
      procInstId: 0,
      Id: 0,
      taskId: 0,
      tips: '',
      opt: 0,
      resourceName: '流程图.png',
      applicationList: [],
      auditList: [],
      image: ''
    }
  },
  created() {
    this.procInstId = this.$route.query.procInstId
    this.Id = this.$route.query.id
    this.taskId = this.$route.query.taskId
    this.bpmState_dictText = this.$route.query.bpmState_dictText
    this.getProcess()
    this.getHistoryData()
    this.getViewTaskPic()
  },
  methods: {
    getProcess() {
      this.$http.get('/flow/getHiFormCheckProcess', {
        params: {
          procInstId: this.procInstId
        }
      }).then(res => {
        // 加载状态结束
        this.auditList = res.result
      })
    },
    getHistoryData() {
      this.$http.get('/flow/getHiFormData', {
        params: {
          procInstId: this.procInstId
        }
      }).then(res => {
        let result = JSON.parse(res.result)
        this.applicationList = result.map(v => {
          let o = {}
          o.name = v[0]
          o.value = v[1]
          return o
        })
      })
    },
    getViewTaskPic() {
      this.$http.post(`/flow/viewTaskPic?procInstId=${this.procInstId}&resourceName=${this.resourceName}`).then(res => {
        this.image = `http://101.37.159.72:8080/chenhuaoa/sys/common/static/flow/task/${this.resourceName}`
      })
    },
    onAudit() {
      this.show = true
    },
    onAgree() {
      this.opt = 1
      this.onSubmit()
    },
    onReject() {
      this.opt = 0
      this.onSubmit()
    },
    onSubmit() {
      this.$http
        .post(`/flow/dealMyTodoBussi?opt=${this.opt}&procInstId=${this.procInstId}&id=${Number(this.Id)}&taskId=${this.taskId}&tips=${this.tips}`)
        .then(res => {
          console.log(res)
        })
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
