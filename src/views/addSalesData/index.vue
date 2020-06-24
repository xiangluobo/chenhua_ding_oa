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
          v-model="todayVisit"
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
          v-model="todayCall"
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
          v-model="todayLotDeal"
          label="*今日"
          class="mod-field"
          type="number"
          placeholder="请输入数量"
          :rules="[{ required: true, message: '请输入数量' }]"
        />
      </dd>
    </dl>
    <dl class="unit" v-for="(item, index) in reportXiaoshouItemList" :key="index">
      <dt>{{ `${index+1}` | convert }}</dt>
      <dd>
        <van-field
          v-model="item.todayDealNum"
          label="*今日成交"
          class="mod-field"
          type="number"
          placeholder="请输入数量"
          :rules="[{ required: true, message: '请输入数量' }]"
        />
      </dd>
      <dd>
        <van-field
          v-model="item.checkOutNum"
          label="*调整退房"
          class="mod-field"
          type="number"
          placeholder="请输入数量"
          :rules="[{ required: true, message: '请输入数量' }]"
        />
      </dd>
      <dd>
        <van-field
          v-model="item.todaySignNum"
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
      <van-button square block type="info" color="#000" @click="onSubmit">
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
      reportXiaoshouItemList: [
        {
          todayDealNum: '',
          checkOutNum: '',
          todaySignNum: ''
        }
      ],
      id: 0,
      todayVisit: '',
      todayCall: '',
      todayLotDeal: ''
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
    this.todayVisit = this.$route.query.todayVisit
    this.todayCall = this.$route.query.todayCall
    this.todayLotDeal = this.$route.query.todayLotDeal
    if (this.id) { // 编辑
      this.getEditedData()
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    getEditedData () {
      this.$http.get('/report/xiaoshouData/queryReportXiaoshouItemByMainId', {
        params: {
          id: this.id
        }
      }).then(res => {
        this.reportXiaoshouItemList = res.result || []
      })
    },
    onAdd () {
      this.reportXiaoshouItemList.push({
        todayDealNum: '',
        checkOutNum: '',
        todaySignNum: ''
      })
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

    onSubmit() {
      if (this.id) {
        this.$http.put('/report/xiaoshouData/edit', {
          id: this.id,
          projectCode: this.orgCode,
          reportXiaoshouItemList: this.reportXiaoshouItemList,
          todayVisit: this.todayVisit,
          todayCall: this.todayCall,
          todayLotDeal: this.todayLotDeal
        }).then(res => {
          if (res.success) {
            Toast.success('保存成功')
            this.$router.push('/')
          } else {
            Toast.fail(res.message)
          }
        })
      } else {
        this.$http.post('/report/xiaoshouData/add', {
          projectCode: this.orgCode,
          reportXiaoshouItemList: this.reportXiaoshouItemList,
          todayVisit: this.todayVisit,
          todayCall: this.todayCall,
          todayLotDeal: this.todayLotDeal
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
