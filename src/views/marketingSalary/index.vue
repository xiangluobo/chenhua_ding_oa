<template>
  <section class='mod-expense'>
    <div class='application'>
      <div class='person'>申请人</div>
      <div class='role'>{{userInfo.realname}}</div>
    </div>
    <van-form @submit='onSubmit'>
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
        class='mod-field'
        readonly
        clickable
        name='calendar'
        :value='salaryTime'
        label='*发放日期'
        placeholder='点击发放日期'
        @click='showCalendar = true'
      />
      <van-field
        v-model='salaryPersonCount'
        label='*发放人数'
        type="number"
        class='mod-field'
        placeholder='请输入发放人数'
        :rules="[{ required: true, message: '请输入发放人数' }]"
      />
      <van-field
        v-model='salaryAmount'
        label='*总金额'
        type="number"
        class='mod-field'
        placeholder='请输入总金额'
        :rules="[{ required: true, message: '请输入总金额'}]"
      />
      <van-field name='uploader' class='mod-field' label='相关文件'>
        <template #input>
          <van-uploader accept=".xlsx,.xls,.docx,.doc,.png,.jpg,.jpeg,.bmp" :before-delete="uploadDelete" :after-read='afterRead' v-model='fileList' />
        </template>
      </van-field>
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
    <van-calendar
      :min-date='minDate'
      :max-date='maxDate'
      v-model='showCalendar'
      @confirm='onDateConfirm'
    />
  </section>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import {
  Popup,
  Picker,
  Button,
  Form,
  field,
  Uploader,
  Calendar,
  Toast
} from 'vant';
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Uploader);
Vue.use(Calendar);
Vue.use(Button);
Vue.use(Form);
Vue.use(field);
Vue.use(Toast);
export default {
  data() {
    return {
      departName: '',
      salaryTime: this.ChangeDateFormat(new Date()),
      salaryPersonCount: '',
      salaryAmount: '',
      uploader: [],
      relatedFile: [],
      showPicker: false,
      showCalendar: false,
      minDate: new Date(2019, 0, 1),
      maxDate: new Date(2030, 0, 31),
      columns: [],
      busiId: 0,
      id: 0,
      formData: {},
      fileList: []
    };
  },
  created() {
    this.getMyProjectList()
    this.busiId = this.$route.query.busiId || 0
    if (this.busiId) {
      setTimeout(() => {
        this.getDetail()
      }, 500)
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    getDetail () {
      this.$http.get('/yxsalary/flowYxSalary/queryById', {
        params: {
          id: this.busiId
        }
      }).then(res => {
        let result = res.result
        this.formData = result;
        this.id = result.id
        this.projectCode = result.projectCode
        this.departName = this.columns.find(v => v.orgCode === this.projectCode).departName
        this.salaryTime = result.salaryTime
        this.salaryPersonCount = result.salaryPersonCount
        this.salaryAmount = result.salaryAmount
        if (result.relatedFile) {
          this.relatedFile = result.relatedFile.split(',')
          let fileList = this.relatedFile.map(v => {
            return {
              url: `http://127.0.0.1:8080/chenhuaoa/sys/common/static/${v}`
            }
          })
          this.fileList = fileList
        }
      })
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
    getMyProjectList() {
      this.$http.get('/sys/sysDepart/queryMyProjectList').then(res => {
        this.columns = res.result;
      });
    },
    onDateConfirm(date) {
      this.salaryTime = this.ChangeDateFormat(date)
      this.showCalendar = false;
    },
    onConfirm(item) {
      this.departName = item.departName;
      this.projectCode = item.orgCode;
      this.showPicker = false;
    },
    uploadDelete (item) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].url === item.url) {
          this.fileList.splice(i, 1)
          break
        }
      }
      this.relatedFile = this.fileList.map(v => v.url.replace(/http:\/\/127.0.0.1:8080\/chenhuaoa\/sys\/common\/static\//g, ''))
    },
    onSubmit() {
      if (this.id) {
        this.formData.projectCode = this.projectCode
        this.formData.salaryTime = this.salaryTime
        this.formData.salaryPersonCount = this.salaryPersonCount
        this.formData.salaryAmount = this.salaryAmount
        this.formData.relatedFile = this.relatedFile.join(',')
        this.$http.put('/yxsalary/flowYxSalary/edit', this.formData).then(res => {
          if (res.success) {
            Toast.success('保存成功')
            this.$router.push('/')
          } else {
            Toast.fail(res.message)
          }
        })
      } else {
        this.$http
          .post('/yxsalary/flowYxSalary/add', {
            projectCode: this.projectCode,
            salaryTime: this.salaryTime,
            salaryPersonCount: this.salaryPersonCount,
            salaryAmount: this.salaryAmount,
            relatedFile: this.relatedFile.join(',')
          })
          .then(res => {
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

<style lang='less' rel='stylesheet/less' >
@import './style.less';
</style>
