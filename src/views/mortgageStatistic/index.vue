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
      :value="beginTime"
      label="*开始时间"
      right-icon="calender-o"
      placeholder="请输入开始时间"
      @click="showCalendar = true"
    />
    <van-field
      readonly
      clickable
      class="mod-field"
      name="calendar"
      :value="endTime"
      label="*结束时间"
      right-icon="calender-o"
      placeholder="请输入开始时间"
      @click="showCalendar2 = true"
    />
    <van-button style="width:95%; margin-top:10px" type="default" @click="onSearch">查询</van-button>
    <div id='main' style='width: 100%;height:400px; background:#fff; margin-top:20px; padding-top:10px'></div>
    <van-calendar :min-date="minDate" v-model="showCalendar" @confirm="onConfirm" />
    <van-calendar :min-date="minDate" v-model="showCalendar2" @confirm="onConfirm2" />
    <van-popup v-model='showPicker' position='bottom'>
      <van-picker
        show-toolbar
        value-key='departName'
        :columns='columns'
        @confirm='onConfirm3'
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
      title1: '全款',
      title2: '待借合同',
      title3: '已放款',
      title4: '待放款',
      minDate: new Date(2016, 0, 1),
      orgCode: '',
      departName: '',
      showPicker: false,
      columns: [],
      showCalendar: false,
      showCalendar2: false,
      beginTime: this.ChangeDateFormat(new Date()),
      endTime: this.ChangeDateFormat(new Date()),
      list: []
    };
  },
  mounted() {
    this.getMyProjectList();
  },
  methods: {
    onSearch() {
      this.getSaleData()
    },
    renderPie() {
      var myChart = echarts.init(document.getElementById('main'));
      // 绘制图表
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
              name: this.title1,
              icon: 'circle'
            },
            {
              name: this.title2,
              icon: 'circle'
            },
            {
              name: this.title3,
              icon: 'circle'
            },
            {
              name: this.title4,
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
            data: this.list
          }
        ]
      })
    },
    getSaleData() {
      this.$http.post('/report/anjieData/analysis', {
        projectCode: this.orgCode,
        beginTime: this.beginTime,
        endTime: this.endTime
      }).then(res => {
        if (res.success) {
          if (!res.result) {
            Toast.fail('没有数据')
            return
          }
          let { fullPayAmountTotal, releasedAmountTotal, waitBorrowAmountTotal, waitReleaseAmountTotal } = res.result
          let { fullPayNumTotal, releasedNumTotal, waitBorrowNumTotal, waitReleaseNumTotal } = res.result
          this.title1 = '全款(' + fullPayNumTotal + ')'
          this.title2 = '待借合同(' + waitBorrowNumTotal + ')'
          this.title3 = '已放款(' + releasedNumTotal + ')'
          this.title4 = '待放款(' + waitReleaseNumTotal + ')'
          this.list = [
            { value: fullPayAmountTotal, name: this.title1 },
            { value: waitBorrowAmountTotal, name: this.title2 },
            { value: releasedAmountTotal, name: this.title3 },
            { value: waitReleaseAmountTotal, name: this.title4 }
          ]
          this.renderPie()
        } else {
          Toast.fail(res.message)
        }
      })
    },
    getMyProjectList() {
      this.$http.get('/sys/sysDepart/queryMyProjectList').then(res => {
        this.columns = res.result;
        if (res.result.length === 1) {
          this.departName = res.result[0].departName;
          this.orgCode = res.result[0].orgCode;
        }
        this.getSaleData();
      });
    },
    onConfirm3(item) {
      this.departName = item.departName;
      this.orgCode = item.orgCode;
      this.showPicker = false;
    },
    ChangeDateFormat(val) {
      if (val != null) {
        var year = val.getFullYear()
        var month = val.getMonth() + 1
        var date = val.getDate()
        if (month < 10) {
          month = '0' + month
        }
        if (date < 10) {
          date = '0' + date
        }
        var time =
          year +
          '-' +
          month +
          '-' +
          date;
        return time
      }
      return ''
    },
    onConfirm(date) {
      this.showCalendar = false
      this.beginTime = this.ChangeDateFormat(date)
    },
    onConfirm2(date) {
      this.showCalendar2 = false
      this.endTime = this.ChangeDateFormat(date)
    }
  }
};
</script>

<style lang='less' rel='stylesheet/less' >
@import './style.less';
</style>
