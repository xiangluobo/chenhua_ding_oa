<template>
  <section class="mod-processDetail">
    <dl class="infomation">
      <dt>流程信息 <span style="padding-left:10px">{{bpmState_dictText}}</span></dt>
      <dd>
        <div class="application" v-for="(item, index) in applicationList" :key="index">
          <div class="application-key">{{item.name}}</div>
          <div v-if="item.name == '报销明细'" class="application-val">
            <div v-for="(o, i) in item.value" :key="`Reimbursement${i}`">
              <div class="line">
                <span style="padding-right:5px" class="key">{{o[0]}} :</span>
                <span style="padding-right:8px">{{o[1]}}</span>
                <span>( {{o[2]}} )</span>
              </div>
            </div>
          </div>
          <div v-else-if="item.name == '相关文件'" class="application-val">
            <span v-for="(image, k) in item.value" :key="k" style="display:block; padding-bottom:10px">
              <a v-if="image.indexOf('png') > -1 || image.indexOf('jpg') > -1  || image.indexOf('jpeg') > -1  || image.indexOf('bmp') > -1 " @click="sceneImg(`http://101.37.159.72:8080/chenhuaoa/sys/common/static/${image}`)">图片附件{{k+1}},点击查看</a>
              <!--<img v-if="image.indexOf('png') > -1 || image.indexOf('jpg') > -1  || image.indexOf('jpeg') > -1  || image.indexOf('bmp') > -1 " :src="`http://101.37.159.72:8080/chenhuaoa/sys/common/static/${image}`" @click="sceneImg(`http://101.37.159.72:8080/chenhuaoa/sys/common/static/${image}`)">-->
              <!--<a v-else :href="`http://101.37.159.72:8080/chenhuaoa/sys/common/static/${image}`">{{ image.substring(6) }}</a>-->
              <a v-else-if="image != ''" :href="`http://101.37.159.72:8080/chenhuaoa/sys/common/static/${image}`">其他附件{{k+1}},点击下载</a>
            </span>
          </div>
          <div v-else class="application-val">
            {{item.value}}
          </div>
        </div>
      </dd>
    </dl>
    <div v-if="flowType_dictText=='费用报销申请' || flowType_dictText=='营销费用报销申请'">
      <div class="mod-explanation">追加说明</div>
      <div v-if="list.length">
        <div class="explanation" v-for="(item, index) in list" :key="index">
          <div class="title">{{ item.userName }} {{ item.createTime }}</div>
          <div class="content">
            {{ item.content }}
          </div>
        </div>
      </div>
      <div class="mod-input">
        <van-field
          v-model="content"
          clearable
          label=""
          placeholder="请输入追加说明"
        >
          <template #button>
            <van-button size="small" @click="onSubmitDesc" color="#000">提交</van-button>
          </template>
        </van-field>
      </div>
    </div>

    <dl class="audit-process">
      <dt>审核过程</dt>
      <dd>
        <div class="header">
          <div class="th">流程节点</div>
          <div class="th">办理人</div>
          <div class="th">办理时间</div>
          <div class="th">审批意见</div>
        </div>
        <div class="header ctn" v-for="(audit, index) in auditList" :key="`audit${index}`" >
          <div v-if="audit.actName != null">
            <div class="th">{{audit.actName}}</div>
            <div class="th">{{audit.assignee}}</div>
            <div class="th">{{audit.endTime}}</div>
            <div class="th">{{audit.varText}}</div>
          </div>
        </div>
      </dd>
    </dl>
    <dl class="audit-process">
      <dt>流程图</dt>
      <dd>
        <img :src="image">
      </dd>
    </dl>
    <div style="margin: 10px" v-if="busiId && bpmState != 3 && bpmState != 5">
      <van-button style="width:40%; cursor:pointer" type="info" @touchstart="onEdit">编辑</van-button>
      <van-button style="width:40%; margin-left:10px; cursor:pointer" type="warning" @touchstart="onInvalid">作废</van-button>
    </div>
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
    <van-button v-if="taskId!='null' && Id" @touchstart="onAudit" style="width:90%; margin-top:30px; cursor:pointer" type="primary" color="#000" size="normal">去审核</van-button>
  </section>
</template>

<script>
import Vue from 'vue'
import { Button, Field, Popup, Toast, ImagePreview } from 'vant'
Vue.use(Popup)
Vue.use(Button)
Vue.use(Field)
Vue.use(Toast)
export default {
  data() {
    return {
      show: false,
      procInstId: 0,
      Id: 0,
      taskId: 0,
      tips: '',
      opt: 0,
      bpmState: 0,
      busiId: 0,
      resourceName: '',
      applicationList: [],
      auditList: [],
      image: '',
      flowType_dictText: '',
      list: [],
      content: ''
    }
  },
  created() {
    this.procInstId = this.$route.query.procInstId
    this.Id = this.$route.query.id
    this.taskId = this.$route.query.taskId || ''
    this.bpmState_dictText = this.$route.query.bpmState_dictText
    this.bpmState = this.$route.query.bpmState
    this.flowType_dictText = this.$route.query.flowType_dictText
    this.busiId = this.$route.query.busiId
    this.resourceName = 'process_img_' + this.procInstId + '.png'
    this.getMoreDesc()
    this.getProcess()
    this.getHistoryData()
    this.getViewTaskPic()
  },
  methods: {
    getMoreDesc() {
      this.$http.get('/flow/flowAddDesc/list', {
        params: {
          flowId: this.busiId
        }
      }).then(res => {
        this.list = res.result.records
      })
    },
    onSubmitDesc() {
      if (this.content.trim() == '') {
        Toast.fail("请输入追加说明!");
        return;
      }
      this.$http.post('/flow/flowAddDesc/add', {
        content: this.content,
        flowId: this.busiId
      }).then(res => {
        this.content = ''
        if (res.success) {
          this.getMoreDesc()
          Toast.success('提交成功')
        } else {
          Toast.fail(res.message)
        }
      })
    },
    onInvalid () {
      this.$http.get('/flow/doCancelFlow', {
        params: {
          busiId: this.busiId
        }
      }).then(res => {
        if (res.success) {
          Toast.success(res.message)
          // this.$router.push('/')
        } else {
          Toast.fail(res.message)
        }
      })
    },
    onEdit () {
      switch (this.flowType_dictText) {
        case '价格优惠申请':
          this.$router.push(`/priceDiscount?busiId=${this.busiId}&bpmState=${this.bpmState}`)
          break;
        case '通用审批流程申请':
          this.$router.push(`/approvedProcess?busiId=${this.busiId}&bpmState=${this.bpmState}`)
          break;
        case '营销工资发放申请':
          this.$router.push(`/marketingSalary?busiId=${this.busiId}&bpmState=${this.bpmState}`)
          break;
        case '营销费用报销申请':
          this.$router.push(`/marketingExpense?busiId=${this.busiId}&bpmState=${this.bpmState}`)
          break;
        case '营销付款申请':
          this.$router.push(`/marketingPayment?busiId=${this.busiId}&bpmState=${this.bpmState}`)
          break;
        case '认筹退款申请':
          this.$router.push(`/pledgeRefund?busiId=${this.busiId}&bpmState=${this.bpmState}`)
          break;
        case '定金/房款退款申请':
          this.$router.push(`/depositRefund?busiId=${this.busiId}&bpmState=${this.bpmState}`)
          break;
        case '房产工资发放申请':
          this.$router.push(`/propertySalary?busiId=${this.busiId}&bpmState=${this.bpmState}`)
          break;
        case '费用报销申请':
          this.$router.push(`/expense?busiId=${this.busiId}&bpmState=${this.bpmState}`)
          break;
        case '付款申请':
          this.$router.push(`/paymentApplication?busiId=${this.busiId}&bpmState=${this.bpmState}`)
          break;
      }
    },
    sceneImg(image) {
      if (image) {
        ImagePreview({
          images: [image],
          showIndex: true,
          loop: false,
          startPosition: 0
        })
      }
    },
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
          if (v[0] === '报销明细') {
            let vv = JSON.parse(v[1])
            let arr = vv.map(item => {
              return [item.expenseTypeText, item.expenseAmount, item.expenseRemark]
            })
            o.value = arr
          } else {
            if (v[0] === '相关文件') {
              if (v[1] === null) {
                o.value = ''
              } else {
                o.value = v[1].split(',')
              }
            } else {
              o.value = v[1]
            }
          }
          return o
        })
      })
    },
    getViewTaskPic() {
      this.$http.post(`/flow/viewTaskPic?procInstId=${this.procInstId}&resourceName=${this.resourceName}`).then(res => {
        this.image = `http://101.37.159.72:8080/chenhuaoa/sys/common/static/flow/task/${this.resourceName}` + '?_t=' + Date.parse(new Date()) / 1000;
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
      if (!this.tips.trim()) {
        Toast.fail('拒绝时必须输入审核意见')
        return;
      }
      this.onSubmit()
    },
    onSubmit() {
      this.$http
        .post(`/flow/dealMyTodoBussi?opt=${this.opt}&procInstId=${this.procInstId}&id=${Number(this.Id)}&taskId=${this.taskId}&tips=${this.tips}`)
        .then(res => {
          if (res.success) {
            Toast.success('保存成功')
            this.$router.push('/')
          } else {
            Toast.fail(res.message)
          }
        })
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
