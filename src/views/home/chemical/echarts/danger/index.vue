<template>
  <div class="specialorder">
    <div class="concentration-text">位置：
      <span style="color: #ffffff;">A区-3栋-1层-A柱B柱之间</span>
    </div>
    <div class="concentration-one">
      <div class="concentration-left">
      <img src="./img/灭火器.png" alt="">
      <img src="./img/医药箱.png" alt="" style="margin:20px 0">
      <img src="./img/氧气瓶.png" alt="">
    </div>
    <div class="concentration-two"> 
      <Closed />
      <Closed1 />
      <Closed2 />
    </div>
    <div class="concentration-three"> 
      <div class="three-text">正常</div>
      <div class="three-text" style="color:#FF8F40;">故障 </div>
      <div class="three-text">正常</div>
    </div>
    </div>
  </div>
</template>

<script>
import Closed from "./closed";
import Closed1 from "./closed1";
import Closed2 from "./closed2";
export default {
  name: "index",
  components: {
    Closed,Closed1,Closed2
  },
  data() {
    return {
      pointerBtn: 1,
    };
  },
  methods: {
    solidBtnN1() {
      this.pointerBtn = 1;
    },
    solidBtnN2() {
      this.pointerBtn = 2;
    },
  },
};
</script>


<style lang="stylus" scoped>
.specialorder {
  font-family: 'MicrosoftYaHei-Bold';
  font-weight: bold;
  width: 100%;
  height: 278px;
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .concentration-text{
    width: 590px;
    padding: 50px 0 30px 0 ;
    height: 40px;
    font-size: 22px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #36ECFF;
  }
  .concentration-one {
    display: flex;
    justify-content: flex-start;
    padding: 30px 0 0 15px;
    .concentration-left {
      width: 80px;
      height: 190px;
    }
  }
  .concentration-two {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 425px;
    height: 180px;
  }
  .concentration-three {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    width: 80px;
    height: 190px;
    .three-text{
      font-size: 19px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #36ECFF;
    }
  }


}
</style>
