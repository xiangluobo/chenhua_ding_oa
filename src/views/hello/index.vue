<template>
  <section class="hello">
    <div class="app-name" ></div>
    <div class="text-overflow"></div>
    <h1>
      <div> hello world </div>
      <span class="iconfont recommend">&#xe7e6;</span>
    </h1>
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
