<template>
  <section class='mod-expense'>
    <van-field
      readonly
      clickable
      class='mod-field'
      name='picker'
      :value='departName'
      label='*所在项目部'
      :rules="[{ required: true, message: '请选择项目部'}]"
      right-icon='arrow'
      placeholder='请选择项目部'
      @click='showPicker = true'
    />
    <van-field
      readonly
      clickable
      name="calendar"
      class="mod-field"
      :value="begin"
      label="查询时间"
      right-icon="calender-o"
      placeholder="请输入开始时间"
      @click="showCalendar = true"
    />
    <van-field
      readonly
      clickable
      class="mod-field"
      name="calendar"
      :value="end"
      label="查询时间"
      right-icon="calender-o"
      placeholder="请输入开始时间"
      @click="showCalendar2 = true"
    />
    <div id='main' style='width: 100%;height:400px; background:#fff; margin-top:20px; padding-top:10px'></div>
    <van-calendar v-model="showCalendar" @confirm="onConfirm" />
    <van-calendar v-model="showCalendar2" @confirm="onConfirm2" />
    <van-popup v-model='showPicker' position='bottom'>
      <van-picker
        show-toolbar
        value-key='departName'
        :columns='columns'
        @confirm='onConfirm'
        @cancel='showPicker = false'
      />
    </van-popup>
  </section>
</template>

<script>
import Vue from 'vue'
import {
  Popup,
  Picker,
  Button,
  Form,
  field,
  Toast,
  Loading,
  Calendar
} from 'vant'
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Button)
Vue.use(Form)
Vue.use(field)
Vue.use(Toast)
Vue.use(Loading)
Vue.use(Calendar)
var echarts = require('echarts')
export default {
  data() {
    return {
      orgCode: '',
      departName: '',
      showPicker: false,
      columns: [],
      showCalendar: false,
      showCalendar2: false,
      begin: '',
      end: ''
    };
  },
  mounted() {
    this.getMyProjectList();
    var myChart = echarts.init(document.getElementById('main'));
    // // 绘制图表
    myChart.setOption({
      title: {
        text: '按揭统计',
        left: 10,
        top: 0
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        top: 30,
        data: [
          {
            name: '全款',
            icon: 'circle'
          },
          {
            name: '待借合同',
            icon: 'circle'
          },
          {
            name: '已放款',
            icon: 'circle'
          },
          {
            name: '待放款',
            icon: 'circle'
          }
        ]
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'inner',
                formatter: '{d}%' // 自定义显示格式(b:name, c:value, d:百分比)
              }
            }
          },
          data: [
            { value: 577, name: '全款' },
            { value: 870, name: '待借合同' },
            { value: 263, name: '已放款' },
            { value: 956, name: '待放款' }
          ]
        }
      ]
    });
  },
  methods: {
    getMyProjectList() {
      this.$http.get('/sys/sysDepart/queryMyProjectList').then(res => {
        this.columns = res.result;
      });
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      this.showCalendar = false
      this.begin = this.formatDate(date)
    },
    onConfirm2(date) {
      this.showCalendar2 = false
      this.end = this.formatDate(date)
    },
    onSubmit() {
      this.$http
        .post('/ggpay/flowGgPay/add', {
          projectCode: this.orgCode,
          departName: this.departName
        })
        .then(res => {
          if (res.success) {
            Toast.success('保存成功')
            this.$router.push('/')
          } else {
            Toast.fail(res.message)
          }
        });
    }
  }
};
</script>

<style lang='less' rel='stylesheet/less' >
@import './style.less';
</style>
