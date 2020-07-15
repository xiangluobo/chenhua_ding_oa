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
      <van-field
        v-model="realname"
        label="*优惠经手人"
        class="mod-field"
        placeholder="请输入优惠经手人"
        :rules="[{ required: true, message: '请输入优惠经手人' }]"
      />
      <van-field
        v-model="houseArea"
        label="*面积"
        class="mod-field"
        placeholder="请输入面积"
        type="number"
        :rules="[{ required: true, message: '请输入面积' }]"
      />
      <van-field
        v-model="oriTotalPrice"
        label="*原总价"
        class="mod-field"
        type="number"
        placeholder="请输入原总价"
        :rules="[{ required: true, message: '请输入原总价s' }]"
      />
      <van-field
        v-model="oriSinglePrice"
        label="原单价"
        class="mod-field"
        readonly
        placeholder="自动计算,无需填写"
        type="number"
      />
      <van-field
        v-model="disTotalPrice"
        label="*折后总价"
        type="number"
        class="mod-field"
        placeholder="请输入折后总价"
        :rules="[{ required: true, message: '请输入折后总价' }]"
      />
      <van-field
        readonly
        v-model="disSinglePrice"
        label="折后单价"
        type="number"
        class="mod-field"
        placeholder="自动计算,无需填写"
      />
      <van-field
        readonly
        v-model="disPrice"
        label="折扣信息"
        type="number"
        class="mod-field"
        placeholder="自动计算,无需填写"
      />
      <van-field
        v-model="description"
        label="情况说明"
        class="mod-field"
        placeholder="请输入情况说明"
      />
      <div class="mod-select">
        <div class="mod-label">抄送给</div>
        <el-select @click.native="showChaotoDialog" multiple v-model="chaoto" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.username"
            :label="item.realname"
            :value="item.username">
          </el-option>
        </el-select>
      </div>
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
      departName: '',
      houseNo: '',
      handler: '',
      realname: '',
      chaoto: [],
      houseArea: '',
      oriTotalPrice: '',
      disTotalPrice: '',
      description: '',
      showPicker: false,
      columns: [],
      options: [],
      loading: false,
      busiId: 0,
      id: 0,
      procInstId: 0,
      projectCode: 0,
      formData: {}
    }
  },
  created() {
    this.getMyProjectList()
    this.getlist()
    this.busiId = this.$route.query.busiId || 0
    if (this.busiId) {
      setTimeout(() => {
        this.getDetail()
      }, 500)
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      this.onHidden()
    }, false)
  },
  computed: {
    ...mapGetters(['userInfo']),
    oriSinglePrice() {
      if (this.oriTotalPrice && this.houseArea) {
        return Math.round(this.oriTotalPrice / this.houseArea)
      }
      return ''
    },
    disSinglePrice() {
      if (this.disTotalPrice && this.houseArea) {
        return Math.round(this.disTotalPrice / this.houseArea)
      }
      return ''
    },
    disPrice() {
      if (this.oriTotalPrice && this.disTotalPrice) {
        return this.oriTotalPrice - this.disTotalPrice
      }
      return ''
    }
  },
  methods: {
    getDetail () {
      this.$http.get('/discount/flowPriceDiscount/queryById', {
        params: {
          id: this.busiId
        }
      }).then(res => {
        let result = res.result
        this.formData = result;
        this.id = result.id
        this.projectCode = result.projectCode
        this.houseNo = result.houseNo
        this.handler = result.handler
        this.realname = this.options.find(v => v.username === this.handler).realname
        this.chaoto = result.chaoto.split(',')
        this.houseArea = result.houseArea
        this.oriTotalPrice = result.oriTotalPrice
        this.disTotalPrice = result.disTotalPrice
        this.description = result.description
        this.departName = this.columns.find(v => v.orgCode === this.projectCode).departName
        this.procInstId = result.procInstId
        this.projectCode = result.projectCode
      })
    },
    onHidden () {
      let dropdowns = document.querySelectorAll('.el-select-dropdown')
      for (let i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i]) {
          dropdowns[i].style.display = 'none'
        }
      }
    },
    showChaotoDialog () {
      this.onHidden()
      document.querySelectorAll('.el-select-dropdown')[0].style.display = 'block'
    },
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
        this.options = res.result.records
      })
    },
    onConfirm(item) {
      this.departName = item.departName
      this.projectCode = item.orgCode
      this.showPicker = false
    },
    onSubmit() {
      let person = this.options.find(v => v.realname === this.realname)
      if (!person) {
        Toast.fail('指定核审人不存在，请重新填写')
        this.realname = ''
        return
      }
      if (this.id) {
        this.formData.projectCode = this.projectCode;
        this.formData.houseNo = this.houseNo;
        this.formData.handler = person.username
        this.formData.chaoto = this.chaoto.join(',');
        this.formData.houseArea = this.houseArea;
        this.formData.oriSinglePrice = this.oriSinglePrice;
        this.formData.oriTotalPrice = this.oriTotalPrice;
        this.formData.disTotalPrice = this.disTotalPrice;
        this.formData.disSinglePrice = this.disSinglePrice;
        this.formData.disPrice = Number(this.disPrice);
        this.formData.description = this.description;
        this.$http.put('/discount/flowPriceDiscount/edit', this.formData).then(res => {
          if (res.success) {
            Toast.success('保存成功')
            this.$router.push('/')
          } else {
            Toast.fail(res.message)
          }
        })
      } else {
        this.$http.post('/discount/flowPriceDiscount/add', {
          projectCode: this.projectCode,
          houseNo: this.houseNo,
          handler: person.username,
          chaoto: this.chaoto.join(','),
          houseArea: this.houseArea,
          oriSinglePrice: this.oriSinglePrice,
          oriTotalPrice: this.oriTotalPrice,
          disTotalPrice: this.disTotalPrice,
          disSinglePrice: this.disSinglePrice,
          disPrice: this.disPrice,
          description: this.description
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
