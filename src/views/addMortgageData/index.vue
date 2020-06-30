<template>
  <section class="mod-addMortgageData">
    <div class="application">
      <div class="person">创建人</div>
      <div class="role">{{userInfo.realname}}</div>
    </div>
    <van-field
      readonly
      clickable
      class="mod-field"
      name="picker"
      :value="departName"
      label="*所在项目部"
      :rules="[{ required: true, message: '请选择项目部' }]"
      right-icon="arrow"
      placeholder="请选择项目部"
      @click="showPicker = true"
    />
    <div class="mod-module" v-for="(item, index) in reportAnjieItemList" :key="index">
      <div class="subtitle">{{ item.periodNum | convert }}</div>
      <div class="mod-form">
        <div class="verify">
          <label for="username">*全款</label>
          <input class="verify-input"  v-model="item.fullPayNum" placeholder="请输入数量" type="number" name="username">数
          <input class="verify-input" v-model="item.fullPayAmount" placeholder="请输入金额" type="number" name="username">万元
        </div>
        <div class="verify">
          <label for="username">*待借合同</label>
          <input class="verify-input" v-model="item.waitBorrowNum" placeholder="请输入数量" type="number" name="username">数
          <input class="verify-input" v-model="item.waitBorrowAmount" placeholder="请输入金额" type="number" name="username">万元
        </div>
        <div class="verify">
          <label for="username">*已放款</label>
          <input class="verify-input" v-model="item.releasedNum" placeholder="请输入数量" type="number" name="username">数
          <input class="verify-input" v-model="item.releasedAmount" placeholder="请输入金额" type="number" name="username">万元
        </div>
        <div class="verify">
          <label for="username">*待放款</label>
          <input class="verify-input" v-model="item.waitReleaseNum" placeholder="请输入数量" type="number" name="username">数
          <input class="verify-input" v-model="item.waitReleaseAmount" placeholder="请输入金额" type="number" name="username">万元
        </div>
      </div>
    </div>
    <van-button type="default" @click="onAdd" style="margin: 30px 0px 100px 200px">新增期数</van-button>
    <div style="margin: 16px;">
      <van-button square block type="info" color="#000" @click="onSubmit" >
        提交
      </van-button>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        value-key="departName"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <van-dialog v-model="addMortageData" @confirm='confirmPeriodNum' title="请输入新增期数" show-cancel-button>
      <van-field v-model="periodNum" type="number" label="新增期数" placeholder="请输入第几期数" />
    </van-dialog>
  </section>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Popup, Picker, Button, field, Toast, Dialog } from 'vant'
import { NoToChinese } from '../../utils'
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Button)
Vue.use(field)
Vue.use(Toast)
Vue.use(Dialog)
export default {
  data() {
    return {
      periodNum: '',
      addMortageData: false,
      departName: '',
      orgCode: '',
      showPicker: false,
      columns: [],
      reportAnjieItemList: [
        // {
        //   periodNum: 1,
        //   fullPayAmount: '', // 全款金额
        //   fullPayNum: '', // 全款数量
        //   releasedAmount: '', // 已放款金额
        //   releasedNum: '', // 已放款数
        //   waitBorrowAmount: '', // 待借合同金额
        //   waitBorrowNum: '', // 待借合同数
        //   waitReleaseAmount: '', // 待放款金额
        //   waitReleaseNum: '' // 待放款数
        // }
      ],
      id: 0,
      projectCode: ''
    }
  },
  filters: {
    convert(v) {
      return `${NoToChinese(v)} 期`
    }
  },
  created() {
    this.getMyProjectList()
    this.id = this.$route.query.id
    this.projectCode = this.$route.query.projectCode
    if (this.id) { // 编辑
      this.getEditedData()
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    getEditedData () {
      this.$http.get('/report/anjieData/queryReportAnjieItemByMainId', {
        params: {
          id: this.id
        }
      }).then(res => {
        this.reportAnjieItemList = res.result || []
      })
    },
    onAdd () {
      this.addMortageData = true
    },
    getMyProjectList() {
      this.$http.get('/sys/sysDepart/queryMyProjectList').then(res => {
        this.columns = res.result
        if (this.projectCode) {
          this.columns.forEach(v => {
            if (v.orgCode === this.projectCode) {
              this.departName = v.departName
              this.orgCode = v.orgCode
            }
          })
        }
      })
    },
    onConfirm(item) {
      this.departName = item.departName
      this.orgCode = item.orgCode
      this.showPicker = false
    },
    confirmPeriodNum () {
      if (this.periodNum) {
        if (this.reportAnjieItemList.some(v => +v.periodNum === +this.periodNum)) {
          Toast.fail('请不要输入相同的期数')
          return
        }
        this.reportAnjieItemList.push({
          periodNum: this.periodNum,
          fullPayAmount: '', // 全款金额
          fullPayNum: '', // 全款数量
          releasedAmount: '', // 已放款金额
          releasedNum: '', // 已放款数
          waitBorrowAmount: '', // 待借合同金额
          waitBorrowNum: '', // 待借合同数
          waitReleaseAmount: '', // 待放款金额
          waitReleaseNum: '' // 待放款数
        })
        this.periodNum = ''
      }
    },
    onSubmit() {
      if (this.id) {
        this.$http.put('/report/anjieData/edit', {
          id: this.id,
          projectCode: this.orgCode,
          reportAnjieItemList: this.reportAnjieItemList
        }).then(res => {
          if (res.success) {
            Toast.success('保存成功')
            this.$router.push('/')
          } else {
            Toast.fail(res.message)
          }
        })
      } else {
        this.$http.post('/report/anjieData/add', {
          projectCode: this.orgCode,
          reportAnjieItemList: this.reportAnjieItemList
        }).then(res => {
          if (res.success) {
            Toast.success('保存成功')
            this.$router.push('/')
          } else {
            Toast.fail(res.message)
          }
        })
      }
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
