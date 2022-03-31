<template>
  <div class="specialorder">
    <div class="monitor">
      <div class="monitor-three">
        <Angry1 />
        <div class="three-df">
          <div class="monitor-text">设备总数</div>
          <div class="three-text" style="color:#36ECFF">{{dataList.Num}}</div>
        </div>
      </div>
      <div class="monitor-three">
        <Elevated1 />
        <div class="three-df">
          <div class="monitor-text">在线设备</div>
          <div class="three-text" style="color:#2FF86E">{{dataList.Num9}}</div>
        </div>
      </div>
      <div class="monitor-three">
        <Hanging1 />
        <div class="three-df">
          <div class="monitor-text">故障设备</div>
          <div class="three-text" style="color:#FEA931">{{dataList.Num2}}</div>
        </div>
      </div>
      <div class="monitor-three">
        <Lixian />
        <div class="three-df">
          <div class="monitor-text">离线设备</div>
          <div class="three-text" style="color:#999999">{{dataList.Num7}}</div>
        </div>
      </div>
    </div>

    <div class="concentration-top">
      <div class="concentration-btn"></div>
      <span style="font-size: 14px">设备总和</span>
      <div class="concentration-btn1"></div>
      <span style="font-size: 14px;">离线设备</span>
      <div class="concentration-select"></div>
    </div>
    <div class="concentration-one">
      <Closed />
    </div>
  </div>
</template>

<script>
import Angry1 from "./angry1";
import Hanging1 from "./hanging1";
import Elevated1 from "./elevated1";
import Lixian from "./lixian";
import Lixian1 from "./lixian1";
import Lixian2 from "./lixian2";
import Lixian3 from "./lixian3";
import Closed from "./closed";
export default {
  name: "index",
  components: {
    Angry1,
    Hanging1,
    Elevated1,
    Lixian,
    Lixian1,
    Lixian2,
    Lixian3,
    Closed,
  },
  data() {
    return {
      pointerBtn: 1,
      toggle: true,
      dataList: true,
    };
  },
  methods: {
    solidBtnN1() {
      this.pointerBtn = 1;
    },
    solidBtnN2() {
      this.pointerBtn = 2;
    },
    getData() {
          this.$http.post("/largeScreen/normalState/securityEquipmentTest").then(res => {
          this.dataList = res.data.data.staticData //父组件中直接调用 $refs
        });
    },
  },
  created(){
    this.getData()
  }
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

  .concentration-one {
    padding: 0 0 0 15px;
  }

  .concentration-top {
    width: 100%;
    height: 20px;
    display: flex;
    align-content: center;
    flex-wrap: nowrap;
    margin-bottom: 5px;

    .concentration-btn {
      width: 30px;
      height: 20px;
      background-image: url('./img/圆角.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      cursor: pointer;
      margin: 0 10px 0 50px;
    }

    .concentration-btn1 {
      width: 30px;
      height: 20px;
      background-image: url('./img/圆角2.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      cursor: pointer;
      margin: 0 10px 0 20px;
    }

    .concentration-select {
      width: 70px;
      height: 20px;
      margin: 0 10px 0 235px;
    }
  }

   .monitor {
    width: 100%;
    height: 80px;
    margin: 40px 0 0 23px;
    display: flex;
    align-content: center;
    justify-content: flex-start;

    .three-df {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      padding: 0 0 0 5px;

      .monitor-text {
        width: 72px;
        height: 20px;
        font-size: 16.5px;
        font-family: 'MicrosoftYaHei-Bold';
        font-weight: bold;
        color: #ffffff;
        margin-top: 18px;
      }

      .three-text {
        text-align: left;
        width: 72px;
        height: 20px;
        font-size: 18px;
        font-family: 'DS-Digital-Bold';
        font-weight: bold;
      }
    }

    .monitor-one {
      width: 17px;
      height: 67px;
      font-size: 16.5px;
      line-height: 17px;
      color: #36ECFF;
    }

    .monitor-two {
      display: flex;
      align-content: center;
      justify-content: center;
      padding: 0 15px 0 15px;
    }

    .monitor-three {
      display: flex;
      align-content: center;
      justify-content: center;
      padding: 0 2px;
    }
  }

  .concentration {
    width: 100%;
    height: 120px;
    margin: 0 0 0 23px;
    display: flex;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: nowrap;

    .concentration-text {
      width: 17px;
      height: 100px;
      font-size: 16.5px;
      line-height: 17px;
      color: #36ECFF;
      margin-top: 10px;
    }

    .concentration-title {
      width: 79px;
      height: 18px;
      display: flex;
      align-content: center;
      justify-content: center;
      font-size: 16.5px;
      line-height: 17px;
      color: #ffffff;
      margin: 10px 0 0 6px;
    }

    .concentration-one {
      padding: 0 0 0 10px;
    }
  }

  .right {
    width: 320px;
    height: 135px;
  }
}
</style>
