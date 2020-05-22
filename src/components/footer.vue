<template>
  <div class="mod-nav">
    <dl class="report">
      <dt><img src="~@/assets/images/report.png"></dt>
      <dd>报表</dd>
    </dl>
    <div class="chengyun"><img src="~@/assets/images/middle.png"></div>
    <dl class="report sec">
      <dt><img src="~@/assets/images/mine.png"></dt>
      <dd>我的</dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.mod-nav{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: rgb(89, 58, 34);
  overflow: hidden;
  .report{
    float: left;
    width: 33%;
    height: 60px;
    padding-left: 20px;
    box-sizing: border-box;
    &.sec{
      position: relative;
      left: -20px;
    }
    dt{
      width: 24px;
      margin:8px auto 4px;
      img{
        display: block;
        width: 100%;
      }
    }
    dd{
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #fff;
    }
  }
  .chengyun{
    float: left;
    width: 33%;
    img{
      display: block;
      width: 45px;
      margin: 8px auto
    }
  }
}
</style>
