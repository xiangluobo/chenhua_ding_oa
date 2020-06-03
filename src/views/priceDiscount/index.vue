<template>
  <section class="mod-expense">
    <div class="application">
      <div class="person">申请人</div>
      <div class="role">{{userInfo.realname}}</div>
    </div>
    <van-form @submit="onSubmit">
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
      <van-field
        v-model="houseNo"
        label="*房号"
        class="mod-field"
        placeholder="请输入房号"
        :rules="[{ required: true, message: '请输入房号' }]"
      />
      <div class="mod-select">
        <div class="mod-label">*优惠经手人</div>
        <el-select v-model="handler" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.username"
            :label="item.realname"
            :value="item.username">
          </el-option>
        </el-select>
      </div>
      <van-field
        v-model="houseArea"
        label="*面积"
        class="mod-field"
        placeholder="请输入面积"
        :rules="[{ required: true, message: '请输入面积' }]"
      />
      <van-field
        v-model="oriSinglePrice"
        label="*原单价"
        class="mod-field"
        placeholder="请输入原单价"
        :rules="[{ required: true, message: '请输入原单价' }]"
      />
      <van-field
        v-model="oriTotalPrice"
        label="原总价"
        class="mod-field"
        placeholder="请输入原总价"
      />
      <van-field
        v-model="disTotalPrice"
        label="*折后总价"
        class="mod-field"
        placeholder="请输入折后总价"
        :rules="[{ required: true, message: '请输入折后总价' }]"
      />
      <van-field
        v-model="disSinglePrice"
        label="折后单价"
        class="mod-field"
        placeholder="请输入折后单价"
      />
      <van-field
        v-model="disPrice"
        label="*折扣信息"
        class="mod-field"
        placeholder="请输入折扣信息"
      />
      <van-field
        v-model="description"
        label="情况说明"
        class="mod-field"
        placeholder="请输入情况说明"
      />
      <div style="margin: 16px;">
        <van-button square block type="info" color="#000" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
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
import { Popup, Picker, Button, Form, field, Uploader, Toast, Loading } from 'vant'
import { Select, Option } from 'element-ui';
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Button)
Vue.use(Form)
Vue.use(Uploader)
Vue.use(field)
Vue.use(Toast)
Vue.use(Loading)
Vue.use(Select)
Vue.use(Option)
export default {
  data() {
    return {
      projectCode: '',
      departName: '',
      houseNo: '',
      handler: '',
      houseArea: '',
      oriSinglePrice: '',
      oriTotalPrice: '',
      disTotalPrice: '',
      disSinglePrice: '',
      disPrice: '',
      description: '',
      showPicker: false,
      columns: [],
      options: [],
      loading: false
    }
  },
  created() {
    this.getMyProjectList()
    this.getlist()
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    getMyProjectList() {
      this.$http.get('/sys/sysDepart/queryMyProjectList').then(res => {
        this.columns = res.result
      })
    },
    getlist() {
      this.$http.get('/sys/user/appUserList', {
        params: {
          pageNo: 1,
          pageSize: 1000,
          keyword: ''
        }
      }).then(res => {
        console.log(res, 77)
        this.options = res.result.records
      })
    },
    onConfirm(item) {
      this.departName = item.departName
      this.projectCode = item.id
      this.showPicker = false
    },
    onSubmit() {
      this.$http.post('/discount/flowPriceDiscount/add', {
        projectCode: this.projectCode,
        houseNo: this.houseNo,
        handler: this.handler,
        houseArea: this.houseArea,
        oriSinglePrice: this.oriSinglePrice,
        oriTotalPrice: this.oriTotalPrice,
        disTotalPrice: this.disTotalPrice,
        disSinglePrice: this.disSinglePrice,
        disPrice: this.disPrice,
        description: this.description
      }).then(res => {
        console.log(res, 333)
      })
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
