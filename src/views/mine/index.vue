<template>
  <section class="mod-mine">
    <div class="mine">
      <div class="avatar"><img src="~@/assets/images/avatar.png"></div>
      <dl class="ctn">
        <dt>姓名</dt>
        <dd>部门 | 职位</dd>
      </dl>
    </div>
    <ul class="mod-application">
      <li>
        <span>我的所有申请</span>
        <i class="iconfont arrow">&#xe7e3;</i>
      </li>
      <li>
        <span>经我处理的申请</span>
        <i class="iconfont arrow">&#xe7e3;</i>
      </li>
      <li>
        <span>抄送给我的申请</span>
        <i class="iconfont arrow">&#xe7e3;</i>
      </li>
    </ul>
    <ul class="mod-application">
      <li>
        <span>切换账号</span>
        <i class="iconfont arrow">&#xe7e3;</i>
      </li>
    </ul>
    <ul class="mod-application">
      <li>
        <span>修改密码</span>
        <i class="iconfont arrow">&#xe7e3;</i>
      </li>
    </ul>
  </section>
</template>

<script type="text/babel">
export default {
  data() {
    return {
    }
  },
  created() {
    console.log(process.env.VUE_APP_ERUDA, '====', process.env.VUE_APP_TEXT)
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
