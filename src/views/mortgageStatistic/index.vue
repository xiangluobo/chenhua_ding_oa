<template>
  <section class='mod-expense'>
    <van-form @submit='onSubmit'>
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
      <div id='main' style='width: 100%;height:400px; background:#fff'></div>
      <!-- <ve-pie :data='chartData' :settings='chartSettings'></ve-pie> -->
      <div style='margin: 16px;'>
        <van-button square block type='info' color='#000' native-type='submit'>提交</van-button>
      </div>
    </van-form>
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
  Loading
} from 'vant'
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Button)
Vue.use(Form)
Vue.use(field)
Vue.use(Toast)
Vue.use(Loading)
var echarts = require('echarts')
export default {
  data() {
    return {
      orgCode: '',
      departName: '',
      showPicker: false,
      columns: []
    };
  },
  mounted() {
    this.getMyProjectList();
    var myChart = echarts.init(document.getElementById('main'));
    // // 绘制图表
    myChart.setOption({
      title: {
        text: '按揭统计',
        left: 'left'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        y: 30,
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
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
    onConfirm(item) {
      this.departName = item.departName;
      this.orgCode = item.orgCode;
      this.showPicker = false;
    },
    onSubmit() {
      this.$http
        .post('/ggpay/flowGgPay/add', {
          projectCode: this.orgCode,
          departName: this.departName
        })
        .then(res => {
          if (res.success) {
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
