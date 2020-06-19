<template>
  <section class="mod-addSalesData">
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
    <dl class="unit">
      <dt>来访情况</dt>
      <dd>
        <van-field
          v-model="payAmount"
          label="*今日"
          class="mod-field"
          type="number"
          placeholder="请输入数量"
          :rules="[{ required: true, message: '请输入数量' }]"
        />
      </dd>
    </dl>
    <dl class="unit">
      <dt>来电咨询情况</dt>
      <dd>
        <van-field
          v-model="payAmount"
          label="*今日"
          class="mod-field"
          type="number"
          placeholder="请输入数量"
          :rules="[{ required: true, message: '请输入数量' }]"
        />
      </dd>
    </dl>
    <dl class="unit">
      <dt>车位成交情况</dt>
      <dd>
        <van-field
          v-model="payAmount"
          label="*今日"
          class="mod-field"
          type="number"
          placeholder="请输入数量"
          :rules="[{ required: true, message: '请输入数量' }]"
        />
      </dd>
    </dl>
    <dl class="unit" v-for="(item, index) in list" :key="index">
      <dt>{{ `${index+1}` | convert }}</dt>
      <dd>
        <van-field
          v-model="item.dealedNumber"
          label="*今日成交"
          class="mod-field"
          type="number"
          placeholder="请输入数量"
          :rules="[{ required: true, message: '请输入数量' }]"
        />
      </dd>
      <dd>
        <van-field
          v-model="item.backNumber"
          label="*调整退房"
          class="mod-field"
          type="number"
          placeholder="请输入数量"
          :rules="[{ required: true, message: '请输入数量' }]"
        />
      </dd>
      <dd>
        <van-field
          v-model="item.signNumber"
          label="*今日签约"
          class="mod-field"
          type="number"
          placeholder="请输入数量"
          :rules="[{ required: true, message: '请输入数量' }]"
        />
      </dd>
    </dl>
    <van-button @click="onAdd" type="default" style="display:block; margin: 30px 0px 100px 250px">新增期数</van-button>
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
import { Popup, Picker, Button, Form, field, Uploader, Toast } from 'vant'
import { mapGetters } from 'vuex'
import { NoToChinese } from '../../utils'
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Button)
Vue.use(Uploader)
Vue.use(Form)
Vue.use(field)
Vue.use(Toast)
export default {
  data() {
    return {
      orgCode: '',
      departName: '',
      showPicker: false,
      columns: [],
      payAmount: '',
      list: [
        {
          dealedNumber: '',
          backNumber: '',
          signNumber: '',
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
        dealedNumber: '',
        backNumber: '',
        signNumber: '',
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
      this.$http.post('/yxpay/flowYxPay/add', {
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
