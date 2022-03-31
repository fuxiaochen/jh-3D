<template>
  <div class="Process">
    <div class="itemGD leak">
      <div class="title">流程进度</div>
      <div class="conter"> 
        <div class="author" v-show="dataList.peopledata">1.人员通报</div>
        <div class="author">{{dataList.peopledata }}</div>
        <div class="author" v-show="dataList.systemdata">2.系统Alarm</div>
        <div class="author">{{dataList.systemdata }}</div>
        <div class="author" v-show="dataList.videoCenter">3.监控中心</div>
        <div class="author">{{dataList.videoCenter }}</div>
        <div class="author" v-show="dataList.confirm">4.现场确认</div>
        <div class="author">{{dataList.confirm }}</div>
        <div class="author" v-show="dataList.strain">5.初期应变</div>
        <div class="author">{{dataList.strain }}</div>
        <div class="author" v-show="dataList.evacuating">6.人员疏散</div>
        <div class="author">{{dataList.evacuating }}</div>
        <div class="author" v-show="dataList.notice">7.通报</div>
        <div class="author">{{dataList.notice }}</div>
        <div class="author" v-show="dataList.ert">8.成立部门ERT</div>
        <div class="author">{{dataList.ert }}</div>
        <div class="author" v-show="dataList.department">9.部门ERT抢救</div>
        <div class="author">{{dataList.department }}</div>
        <div class="author" v-show="dataList.region">10.成立区域ERT</div>
        <div class="author">{{dataList.region }}</div>
        <div class="author" v-show="dataList.rescue">11.区域ERT抢救</div>
        <div class="author">{{dataList.rescue }}</div>
        <div class="author" v-show="dataList.establishERT">12.成立全厂ERT</div>
        <div class="author">{{dataList.establishERT }}</div>
        <div class="author" v-show="dataList.involution">13.复归</div>
        <div class="author">{{dataList.involution }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Process",
  components: {},
  data() {
    return {
      dataList:this.$store.state.process,
    };
  },
  
  watch:{
    "$store.state.process":{
      deep:true,
      handler:function(newval,oldval) {
        this.dataList = newval
      }
    }
  },
};
</script>

<style lang="stylus" scoped>
.Process {
  display: flex;
  color: #FFFFFF;
  width: 100%;
  height: 100%;

  .itemGD {
    width: 100%;
    height: 231px;
    padding-right:10px;
    position: relative;

    .title {
      position: absolute;
      top: -14px;
      left: 25px;
      font-size: 22px;
      font-weight: bold;
      color: #36ECFF;
    }
  }

  .leak {
    background-image: url('./img/框.png');
    background-size: 100% 100%;
	  background-repeat: no-repeat;

    .conter {
      width: 100%;
      height: 195px;
      padding-right:15px;
      margin: 25px 20px 0 20px;
      overflow: auto;
      .author {
        font-size: 16px;
        text-align: left;
        font-weight: bold;
        color: #fff;
      }
    }
    .conter::-webkit-scrollbar { width: 0 !important }
  }
}
</style>
