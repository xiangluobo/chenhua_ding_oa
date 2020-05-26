<template>
  <section class="mod-expense">
    <div class="application">
      <div class="person">申请人</div>
      <div class="role">管理员</div>
    </div>
    <van-form>
      <van-field
        readonly
        clickable
        class="mod-field"
        name="picker"
        :value="value"
        label="所在项目部"
        right-icon="arrow"
        placeholder="请选择项目部"
        @click="showPicker = true"
      />
      <van-field
        v-model="value2"
        name="validator"
        label="报销合计"
        class="mod-field"
        placeholder="无需填写自动计算"
        readonly
      />
      <van-field name="uploader" class="mod-field" label="文件上传">
        <template #input>
          <van-uploader :before-read="beforeRead" v-model="uploader" />
        </template>
      </van-field>
    </van-form>
    <dl class="mod-expsense-detail">
      <dt>
        <div class="name">报销明细</div>
        <div class="add">
          <van-button type="default" size="small" @click="onAdd">新增</van-button>
          <van-button style="margin-left:10px" size="small" type="default" @click="onDelete">删除</van-button>
        </div>
      </dt>
      <dd>
        <div class="mod-report">
          <div class="report">
            <div class="project">报销项目</div>
            <div class="summary">摘要</div>
            <div class="money">报销金额</div>
          </div>
          <div class="report" v-for="(item, index) in list" :key="index">
            <van-checkbox @change="onChange(checked, index)" v-model="item.checked"></van-checkbox>
            <van-field v-model="item.project" label="" placeholder="请输入报销项目" />
            <van-field v-model="item.summary" label="" placeholder="请输入摘要" />
            <van-field v-model="item.money" label="" placeholder="点击上传" />
          </div>
        </div>
      </dd>
    </dl>
    <van-loading style="margin-top:20px" size="24px" vertical>加载中...</van-loading>
    <div style="margin: 16px;">
      <van-button square block type="info" color="#000" @click="onSubmit">
        提交
      </van-button>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </section>
</template>

<script>
import Vue from 'vue'
import { Popup, Picker, Button, Form, field, Uploader, Checkbox, Toast, Loading } from 'vant'
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Button)
Vue.use(Form)
Vue.use(Uploader)
Vue.use(field)
Vue.use(Checkbox)
Vue.use(Toast)
Vue.use(Loading)
export default {
  data() {
    return {
      checked: false,
      value: '',
      uploader: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      showPicker: false,
      list: [
        {
          checked: false,
          project: '',
          summary: '',
          money: ''
        }
      ],
      loading: false
    }
  },
  computed: {
    value2() {
      let val = 0
      this.list.forEach(v => {
        val += Number(v.money) || 0
      })
      return val
    }
  },
  created() {
    console.log(process.env.VUE_APP_ERUDA, '====', process.env.VUE_APP_TEXT)
  },
  methods: {
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    onSubmit() {
      this.loading = false
      if (!this.value) {
        Toast.fail('请选择项目部')
        return false
      }
      if (this.list.some(v => !v.project || !v.summary || !v.money)) {
        Toast.fail('报销明细填写有问题，请仔细检查')
        return false
      }
      this.loading = true
    },
    onAdd() {
      let newObj = {
        checked: false,
        project: '',
        summary: '',
        money: ''
      }
      this.list.push(newObj)
    },
    onDelete() {
      this.list = this.list.filter(v => !v.checked) || []
    },
    onChange (checked, index) {
      // this.list[index].checked = checked
      console.log(this.list)
    },
    beforeRead(file) {
      console.log(file)
      if (file.type !== 'image/jpeg') {
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
