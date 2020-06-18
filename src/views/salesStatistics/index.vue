<template>
  <section class="mod-salesStatistics">
    <div class="mod-calendar">
      <van-field
        readonly
        clickable
        name="calendar"
        :value="value"
        label="查询时间"
        right-icon="calender-o"
        placeholder="请输入开始时间"
        @click="showCalendar = true"
      />
    </div>
    <van-calendar
      :min-date='minDate'
      :max-date='maxDate'
      v-model='showCalendar'
      @confirm='onDateConfirm'
    />
    <dl class="mod-unit">
      <dt>车位销售</dt>
      <dd>
        <div class="ctn">
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
        </div>
      </dd>
    </dl>

    <dl class="mod-unit">
      <dt>车位销售</dt>
      <dd>
        <div class="ctn">
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
        </div>
      </dd>
    </dl>

    <dl class="mod-unit">
      <dt>车位销售</dt>
      <dd>
        <div class="ctn">
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
        </div>
      </dd>
    </dl>

    <dl class="mod-unit">
      <dt>一期销售</dt>
      <dd>
        <div class="subtitle">成交情况</div>
        <div class="ctn">
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
        </div>
      </dd>
      <dd>
        <div class="subtitle">成交情况</div>
        <div class="ctn">
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
          <div class="unit">
            <div class="num">10</div>
            <div class="name">名称</div>
          </div>
        </div>
      </dd>
    </dl>
  </section>
</template>

<script>
import Vue from 'vue'
import {
  field,
  Calendar
} from 'vant'
Vue.use(Calendar)
Vue.use(field)
export default {
  data() {
    return {
      value: '',
      showCalendar: false,
      minDate: new Date(2019, 0, 1),
      maxDate: new Date(2030, 0, 31)
    }
  },
  created() {
  },
  methods: {
    goMorgageReport(path) {
      this.$router.push('/mortgageStatistic')
    },
    onDateConfirm(date) {
      // this.salaryTime = this.ChangeDateFormat(date)
      // this.showCalendar = false;
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
