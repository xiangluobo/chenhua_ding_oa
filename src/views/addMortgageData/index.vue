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
      <div class="subtitle">{{ `${index+1}` | convert }}</div>
      <div class="mod-form">
        <div class="verify">
          <label for="username">*全款</label>
          <input class="verify-input" v-model="item.fullPayNum" placeholder="请输入数量" type="text" name="username">数
          <input class="verify-input" v-model="item.fullPayAmount" placeholder="请输入金额" type="text" name="username">万元
        </div>
        <div class="verify">
          <label for="username">*待借合同</label>
          <input class="verify-input" v-model="item.waitBorrowNum" placeholder="请输入数量" type="text" name="username">数
          <input class="verify-input" v-model="item.waitBorrowAmount" placeholder="请输入金额" type="text" name="username">万元
        </div>
        <div class="verify">
          <label for="username">*已放款</label>
          <input class="verify-input" v-model="item.releasedNum" placeholder="请输入数量" type="text" name="username">数
          <input class="verify-input" v-model="item.releasedAmount" placeholder="请输入金额" type="text" name="username">万元
        </div>
        <div class="verify">
          <label for="username">*待放款</label>
          <input class="verify-input" v-model="item.waitReleaseNum" placeholder="请输入数量" type="text" name="username">数
          <input class="verify-input" v-model="item.waitReleaseAmount" placeholder="请输入金额" type="text" name="username">万元
        </div>
      </div>
    </div>
    <van-button type="default" @click="onAdd" style="margin: 30px 0px 100px 200px">新增期数</van-button>
    <div style="margin: 16px;">
      <van-button square block type="info" color="#000" native-type="submit">
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
  </section>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Popup, Picker, Button, field, Toast } from 'vant'
import { NoToChinese } from '../../utils'
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Button)
Vue.use(field)
Vue.use(Toast)
export default {
  data() {
    return {
      departName: '',
      orgCode: '',
      showPicker: false,
      columns: [],
      reportAnjieItemList: [
        {
          fullPayAmount: '', // 全款金额
          fullPayNum: '', // 全款数量
          releasedAmount: '', // 已放款金额
          releasedNum: '', // 已放款数
          waitBorrowAmount: '', // 待借合同金额
          waitBorrowNum: '', // 待借合同数
          waitReleaseAmount: '', // 待放款金额
          waitReleaseNum: '' // 待放款数
        }
      ],
      id: 0
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
    if (this.id) { // 编辑
      this.getEditedData()
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    getEditedData () {
      this.$http.get('/report/anjieData/queryById', {
        params: {
          id: this.id
        }
      }).then(res => {

      })
    },
    onAdd () {
      this.reportAnjieItemList.push({
        fullPayAmount: '', // 全款金额
        fullPayNum: '', // 全款数量
        releasedAmount: '', // 已放款金额
        releasedNum: '', // 已放款数
        waitBorrowAmount: '', // 待借合同金额
        waitBorrowNum: '', // 待借合同数
        waitReleaseAmount: '', // 待放款金额
        waitReleaseNum: '' // 待放款数
      })
    },
    getMyProjectList() {
      this.$http.get('/sys/sysDepart/queryMyProjectList').then(res => {
        this.columns = res.result
      })
    },
    onConfirm(item) {
      this.departName = item.departName
      this.orgCode = item.orgCode
      this.showPicker = false
    },
    onSubmit() {
      if (this.id) {
        this.$http.put('/report/anjieData/add', {
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
