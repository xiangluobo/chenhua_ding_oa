<template>
  <section class="mod-expense">
    <div class="application">
      <div class="person">申请人</div>
      <div class="role">{{userInfo.realname}}</div>
    </div>
    <van-form>
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
        v-model="expenseTotal"
        name="validator"
        label="报销合计"
        class="mod-field"
        placeholder="无需填写自动计算"
        readonly
      />
      <van-field name='uploader' class='mod-field' label='相关文件'>
        <template #input>
          <van-uploader :after-read='afterRead' v-model='uploader' />
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
          <div class="report" v-for="(item, index) in flowGgExpenseItemsList" :key="index">
            <van-checkbox @change="onChange(item.checked)" v-model="item.checked"></van-checkbox>
            <el-select v-model="item.expenseType" filterable placeholder="请输入报销项目">
              <el-option
                v-for="item in options"
                :key="item.text"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>
            <van-field v-model="item.expenseRemark" label="" placeholder="请输入摘要" />
            <van-field v-model="item.expenseAmount" label="" placeholder="请输入报销金额" />
          </div>
        </div>
      </dd>
    </dl>
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
import { mapGetters } from 'vuex'
import { Popup, Picker, Button, Form, field, Uploader, Checkbox, Toast } from 'vant'
import { Select, Option } from 'element-ui'
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Button)
Vue.use(Form)
Vue.use(Uploader)
Vue.use(field)
Vue.use(Checkbox)
Vue.use(Toast)
Vue.use(Select)
Vue.use(Option)
export default {
  data() {
    return {
      orgCode: '',
      departName: '',
      uploader: [],
      relatedFile: [],
      columns: [],
      options: [],
      showPicker: false,
      flowGgExpenseItemsList: [
        {
          checked: false,
          expenseType: '',
          expenseRemark: '',
          expenseAmount: ''
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    expenseTotal() {
      let val = 0
      this.flowGgExpenseItemsList.forEach(v => {
        val += Number(v.expenseAmount) || 0
      })
      return val
    }
  },
  created() {
    this.getMyProjectList()
    this.getlist()
  },
  methods: {
    getlist() {
      this.$http.get('/sys/dict/getDictItems/oa_expense_type').then(res => {
        this.options = res.result
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
      if (!this.departName) {
        Toast.fail('请选择项目部')
        return false
      }
      if (this.flowGgExpenseItemsList.some(v => !v.expenseType || !v.expenseRemark || !v.expenseAmount)) {
        Toast.fail('报销明细填写有问题，请仔细检查')
        return false
      }
      this.$http
        .post('/expense/flowGgExpense/add', {
          expenseTotal: this.expenseTotal,
          projectCode: this.orgCode,
          relatedFile: this.relatedFile.join(','),
          flowGgExpenseItemsList: this.flowGgExpenseItemsList
        })
        .then(res => {
          if (res.success) {
            this.$router.push('/')
          } else {
            Toast.fail(res.message)
          }
        })
    },
    onAdd() {
      let newObj = {
        checked: false,
        expenseType: '',
        expenseRemark: '',
        expenseAmount: ''
      }
      this.flowGgExpenseItemsList.push(newObj)
    },
    onDelete() {
      this.flowGgExpenseItemsList = this.flowGgExpenseItemsList.filter(v => !v.checked) || []
    },
    onChange (checked, index) {
      // this.list[index].checked = checked
      console.log(checked, this.flowGgExpenseItemsList)
    },
    afterRead(file) {
      file.status = 'uploading';
      file.message = '上传中...';
      let formData = new FormData();
      formData.append('file', file.file);
      formData.append('biz', 'ggpay');
      this.$http
        .post('/sys/common/upload', formData)
        .then(res => {
          file.status = 'success';
          file.message = '上传成功';
          this.relatedFile.push(res.message);
        })
        .catch(err => {
          console.log(err);
          file.status = 'failed';
          file.message = '上传失败';
        });
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
