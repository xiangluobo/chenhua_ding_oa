<template>
  <section class="mod-salesStatistics">
    <van-field
      readonly
      clickable
      class='mod-field'
      name='picker'
      :value='departName'
      label='*所在项目部'
      :rules="[{ required: true, message: '请选择项目部' }]"
      right-icon='arrow'
      placeholder='请选择项目部'
      @click='showPicker = true'
    />
    <van-field
      readonly
      clickable
      class='mod-field'
      name="calendar"
      :value="queryTime"
      label="*查询时间"
      right-icon="calender-o"
      placeholder="请输入开始时间"
      @click="showCalendar = true"
    />
    <van-button style="width:95%; margin-top:10px" type="default" @click="onSearch">查询</van-button>
    <van-calendar :min-date="minDate" v-model="showCalendar" @confirm="onConfirm" />
    <dl class="mod-unit">
      <dt>来访情况</dt>
      <dd>
        <div class="ctn">
          <div class="unit">
            <div class="num">{{ todayVisit }}</div>
            <div class="name">今日来访</div>
          </div>
          <div class="unit">
            <div class="num">{{ weekVisit }}</div>
            <div class="name">本周来访</div>
          </div>
          <div class="unit">
            <div class="num">{{ monthVisit }}</div>
            <div class="name">本月来访</div>
          </div>
          <div class="unit">
            <div class="num">{{ totalVisit }}</div>
            <div class="name">累计总来访</div>
          </div>
        </div>
      </dd>
    </dl>
    <dl class="mod-unit">
      <dt>来电咨询</dt>
      <dd>
        <div class="ctn">
          <div class="unit">
            <div class="num">{{ todayCall }}</div>
            <div class="name">今日来电</div>
          </div>
          <div class="unit">
            <div class="num">{{ weekCall }}</div>
            <div class="name">本周来电</div>
          </div>
          <div class="unit">
            <div class="num">{{ monthCall }}</div>
            <div class="name">本月来电</div>
          </div>
          <div class="unit">
            <div class="num">{{ totalCall }}</div>
            <div class="name">累计总来电</div>
          </div>
        </div>
      </dd>
    </dl>
    <dl class="mod-unit">
      <dt>车位销售</dt>
      <dd>
        <div class="ctn">
          <div class="unit">
            <div class="num">{{ todayLotDeal }}</div>
            <div class="name">今日成交</div>
          </div>
          <div class="unit">
            <div class="num">{{ weekLotDeal }}</div>
            <div class="name">本周累计成交</div>
          </div>
          <div class="unit">
            <div class="num">{{ monthLotDeal }}</div>
            <div class="name">本月累计成交</div>
          </div>
          <div class="unit">
            <div class="num">{{ totalLotDeal }}</div>
            <div class="name">累计总成交</div>
          </div>
        </div>
      </dd>
    </dl>
    <dl class="mod-unit" v-for="(item, index) in reportXiaoshouItemRsp" :key="`sale-data-${index}`">
      <dt>{{ item.periodNum }}期销售</dt>
      <dd>
        <div class="subtitle">成交情况</div>
        <div class="ctn">
          <div class="unit">
            <div class="num">{{ item.todayDealNum }}</div>
            <div class="name">今日成交</div>
          </div>
          <div class="unit">
            <div class="num">{{ item.checkOutNum }}</div>
            <div class="name">调整退房</div>
          </div>
          <div class="unit">
            <div class="num">{{ item.weekDealNum }}</div>
            <div class="name">本周累计成交</div>
          </div>
          <div class="unit">
            <div class="num">{{ item.monthDealNum }}</div>
            <div class="name">本月累计成交</div>
          </div>
          <div class="unit">
            <div class="num">{{ item.totalDealNum }}</div>
            <div class="name">累计总成交</div>
          </div>
        </div>
      </dd>
      <dd>
        <div class="subtitle">签约情况</div>
        <div class="ctn">
          <div class="unit">
            <div class="num">{{ item.todaySignNum }}</div>
            <div class="name">今日签约</div>
          </div>
          <div class="unit">
            <div class="num">{{ item.weekSignNum }}</div>
            <div class="name">本周累计签约</div>
          </div>
          <div class="unit">
            <div class="num">{{ item.monthSignNum }}</div>
            <div class="name">本月累计签约</div>
          </div>
          <div class="unit">
            <div class="num">{{ item.totalSignNum }}</div>
            <div class="name">累计签约</div>
          </div>
        </div>
      </dd>
    </dl>
    <van-popup v-model='showPicker' position='bottom'>
      <van-picker
        show-toolbar
        value-key='departName'
        :columns='columns'
        @confirm='onConfirm1'
        @cancel='showPicker = false'
      />
    </van-popup>
  </section>
</template>

<script>
import Vue from 'vue'
import {
  Popup,
  field,
  Calendar,
  Picker,
  Button,
  Toast
} from 'vant'
Vue.use(Calendar)
Vue.use(field)
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Button)
Vue.use(Toast)
export default {
  data() {
    return {
      minDate: new Date(2016, 0, 1),
      todayVisit: 0,
      weekVisit: 0,
      monthVisit: 0,
      totalVisit: 0,
      todayCall: 0,
      weekCall: 0,
      monthCall: 0,
      totalCall: 0,
      todayLotDeal: 0,
      weekLotDeal: 0,
      monthLotDeal: 0,
      totalLotDeal: 0,
      reportXiaoshouItemRsp: [],
      orgCode: '',
      departName: '',
      queryTime: '',
      showCalendar: false,
      showPicker: false,
      columns: []
    }
  },
  created() {
    this.getMyProjectList()
  },
  methods: {
    getMyProjectList() {
      this.$http.get('/sys/sysDepart/queryMyProjectList').then(res => {
        this.columns = res.result;
      })
    },
    onConfirm1(item) {
      this.departName = item.departName;
      this.orgCode = item.orgCode;
      this.showPicker = false;
    },
    getSaleData() {
      this.$http.post('/report/xiaoshouData/analysis', {
        projectCode: this.orgCode,
        queryTime: this.queryTime
      }).then(res => {
        if (res.success) {
          if (!res.result) {
            Toast.fail('没有数据')
            return
          }
          let { reportXiaoshouItemRsp, totalLotDeal, monthLotDeal, weekLotDeal, todayVisit, weekVisit, monthVisit, totalVisit, todayCall, weekCall, monthCall, totalCall, todayLotDeal } = res.result
          this.todayVisit = todayVisit
          this.weekVisit = weekVisit
          this.monthVisit = monthVisit
          this.totalVisit = totalVisit
          this.todayCall = todayCall
          this.weekCall = weekCall
          this.monthCall = monthCall
          this.totalCall = totalCall
          this.todayLotDeal = todayLotDeal
          this.weekLotDeal = weekLotDeal
          this.monthLotDeal = monthLotDeal
          this.totalLotDeal = totalLotDeal
          this.reportXiaoshouItemRsp = reportXiaoshouItemRsp
        } else {
          Toast.fail(res.message)
        }
      })
    },
    goMorgageReport(path) {
      this.$router.push('/mortgageStatistic')
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
    onSearch() {
      this.getSaleData()
    },
    onConfirm(date) {
      this.showCalendar = false
      this.queryTime = this.ChangeDateFormat(date)
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
