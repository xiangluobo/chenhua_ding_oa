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
        v-model='title'
        label='*申请标题'
        class='mod-field'
        placeholder='请输入申请标题'
        :rules="[{ required: true, message: '请输入申请标题' }]"
      />
      <div class="mod-select">
        <div class="mod-label">*指定审核人</div>
        <el-select v-model="handler" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.username"
            :label="item.realname"
            :value="item.username">
          </el-option>
        </el-select>
      </div>
      <van-field
        v-model='content'
        label='*审核内容'
        class='mod-field'
        placeholder='请输入审核内容'
        :rules="[{ required: true, message: '请输入审核内容'}]"
      />
      <van-field name='uploader' class='mod-field' label='相关文件'>
        <template #input>
          <van-uploader :after-read='afterRead' v-model='uploader' />
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
  Toast
} from 'vant'
import { Select, Option } from 'element-ui'
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Uploader)
Vue.use(Button)
Vue.use(Form)
Vue.use(field)
Vue.use(Toast)
Vue.use(Select)
Vue.use(Option)
export default {
  data() {
    return {
      projectCode: '',
      departName: '',
      title: '',
      handler: '',
      content: '',
      uploader: [],
      relatedFile: [],
      showPicker: false,
      columns: [],
      options: []
    };
  },
  created() {
    this.getMyProjectList()
    this.getlist()
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    getlist() {
      this.$http.get('/sys/user/appUserList', {
        params: {
          pageNo: 1,
          pageSize: 1000,
          keyword: ''
        }
      }).then(res => {
        console.log(res, 77)
        this.options = res.result.records
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
    getMyProjectList() {
      this.$http.get('/sys/sysDepart/queryMyProjectList').then(res => {
        this.columns = res.result;
      });
    },
    onConfirm(item) {
      this.departName = item.departName;
      this.projectCode = item.id;
      this.showPicker = false;
    },
    onSubmit() {
      this.$http
        .post('/common/flowGgComm/add', {
          title: this.title,
          handler: this.handler,
          content: this.content,
          projectCode: this.projectCode,
          relatedFile: this.relatedFile.join(';')
        })
        .then(res => {
          console.log(res, 333);
        });
    }
  }
};
</script>

<style lang='less' rel='stylesheet/less' >
@import './style.less';
</style>
