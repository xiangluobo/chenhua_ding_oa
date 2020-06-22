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
    <div class="mod-module" v-for="(item, index) in list" :key="index">
      <div class="subtitle">{{ `${index+1}` | convert }}</div>
      <div class="mod-form">
        <div class="verify">
          <label for="username">*全款</label>
          <input class="verify-input" v-model="item.fullPaymentNumbers" placeholder="请输入数量" type="text" name="username">数
          <input class="verify-input" v-model="item.Money" placeholder="请输入金额" type="text" name="username">万元
        </div>
        <div class="verify">
          <label for="username">*待借合同</label>
          <input class="verify-input" v-model="item.fullPaymentNumbers" placeholder="请输入数量" type="text" name="username">数
          <input class="verify-input" v-model="item.Money" placeholder="请输入金额" type="text" name="username">万元
        </div>
        <div class="verify">
          <label for="username">*已放款</label>
          <input class="verify-input" v-model="item.fullPaymentNumbers" placeholder="请输入数量" type="text" name="username">数
          <input class="verify-input" v-model="item.Money" placeholder="请输入金额" type="text" name="username">万元
        </div>
        <div class="verify">
          <label for="username">*待放款</label>
          <input class="verify-input" v-model="item.fullPaymentNumbers" placeholder="请输入数量" type="text" name="username">数
          <input class="verify-input" v-model="item.Money" placeholder="请输入金额" type="text" name="username">万元
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
      list: [
        {
          fullPaymentNumbers: '',
          Money: ''
        }
      ]
    }
  },
  filters: {
    convert(v) {
      return `${NoToChinese(v)} 期`
    }
  },
  created() {
    this.getMyProjectList()
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    onAdd () {
      this.list.push({
        fullPaymentNumbers: '',
        Money: ''
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
      this.$http.post('/djfk/flowDjfkRefund/add', {
        projectCode: this.orgCode
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
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
