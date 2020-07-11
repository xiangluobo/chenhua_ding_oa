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
      <van-field
        v-model='handler'
        label='*指定审核人'
        class='mod-field'
        placeholder='请输入指定审核人'
        :rules="[{ required: true, message: '请输入指定审核人' }]"
      />
      <!-- <div class="mod-select">
        <div class="mod-label">*指定审核人</div>
        <el-select @click.native="showDialog" multiple v-model="handler" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.username"
            :label="item.realname"
            :value="item.username">
          </el-option>
        </el-select>
      </div> -->
      <van-field
        v-model='content'
        label='*审核内容'
        rows="3"
        autosize
        type="textarea"
        class='mod-field'
        placeholder='请输入审核内容'
        :rules="[{ required: true, message: '请输入审核内容'}]"
      />
      <van-field name='uploader' class='mod-field' label='相关文件'>
        <template #input>
          <van-uploader accept=".xlsx,.xls,.docx,.doc,.png,.jpg,.jpeg,.bmp" :before-delete="uploadDelete" :after-read='afterRead' v-model='fileList' />
        </template>
      </van-field>
      <div class="mod-select">
        <div class="mod-label">抄送给</div>
        <el-select @click.native="showChaotoDialog" multiple v-model="chaoto" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.username"
            :label="item.realname"
            :value="item.username">
          </el-option>
        </el-select>
      </div>
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
      orgCode: '',
      departName: '',
      title: '',
      handler: '',
      chaoto: [],
      content: '',
      relatedFile: [],
      showPicker: false,
      columns: [],
      options: [],
      busiId: 0,
      id: 0,
      formData: {},
      fileList: []
    };
  },
  created() {
    this.getMyProjectList()
    this.getlist()
    this.busiId = this.$route.query.busiId || 0
    if (this.busiId) {
      setTimeout(() => {
        this.getDetail()
      }, 500)
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      this.onHidden()
    }, false)
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    getDetail () {
      this.$http.get('/common/flowGgComm/queryById', {
        params: {
          id: this.busiId
        }
      }).then(res => {
        let result = res.result
        this.formData = result;
        this.id = result.id
        this.orgCode = result.sysOrgCode
        this.departName = this.columns.find(v => v.orgCode === this.orgCode).departName
        this.projectCode = result.projectCode
        this.handler = result.handler
        this.title = result.title
        this.content = result.content
        this.chaoto = result.chaoto.split(',')
        this.relatedFile = result.relatedFile.split(',')
        let fileList = this.relatedFile.map(v => {
          return {
            url: `http://101.37.159.72:8080/chenhuaoa/sys/common/static/${v}`
          }
        })
        this.fileList = fileList
      })
    },
    uploadDelete (item) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].url === item.url) {
          this.fileList.splice(i, 1)
          break
        }
      }
      this.relatedFile = this.fileList.map(v => v.url.replace(/http:\/\/101.37.159.72:8080\/chenhuaoa\/sys\/common\/static\//g, ''))
    },
    onHidden () {
      let dropdowns = document.querySelectorAll('.el-select-dropdown')
      for (let i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i]) {
          dropdowns[i].style.display = 'none'
        }
      }
    },
    showChaotoDialog () {
      this.onHidden()
      document.querySelectorAll('.el-select-dropdown')[0].style.display = 'block'
    },
    // showDialog () {
    //   this.onHidden()
    //   document.querySelectorAll('.el-select-dropdown')[0].style.display = 'block'
    // },
    getlist() {
      this.$http.get('/sys/user/appUserList', {
        params: {
          pageNo: 1,
          pageSize: 1000,
          keyword: ''
        }
      }).then(res => {
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
      this.orgCode = item.orgCode;
      this.showPicker = false;
    },
    onSubmit() {
      if (this.id) {
        this.formData.projectCode = this.orgCode
        this.formData.title = this.title
        this.formData.content = this.content
        this.formData.handler = this.handler
        this.formData.chaoto = this.chaoto.join(',')
        this.formData.relatedFile = this.relatedFile.join(',')
        this.$http.put('/common/flowGgComm/edit', this.formData).then(res => {
          if (res.success) {
            Toast.success('保存成功')
            this.$router.push('/')
          } else {
            Toast.fail(res.message)
          }
        })
      } else {
        this.$http
          .post('/common/flowGgComm/add', {
            title: this.title,
            handler: this.handler,
            content: this.content,
            chaoto: this.chaoto.join(','),
            projectCode: this.orgCode,
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
