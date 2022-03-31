<template>
  <div class="solid">
    <div class="one">
      <img src="./img/fire.png" alt style="width:75px; height:67px" />
      <div style="padding-top: 8px;">
        <div class="one-text">火灾</div>
        <div class="one-text">20</div>
      </div>
    </div>
    <div class="one">
      <img src="./img/Chemical.png" alt style="width:75px; height:67px" />
      <div style="padding-top: 8px;">
        <div class="one-text">化灾</div>
        <div class="one-text">15</div>
      </div>
    </div>
    <div class="one">
      <img src="./img/Peculiar.png" alt style="width:75px; height:67px" />
      <div style="padding-top: 8px;">
        <div class="one-text">异味</div>
        <div class="one-text">13</div>
      </div>
    </div>
    <div class="one">
      <img src="./img/earthquake.png" alt style="width:75px; height:67px" />
      <div style="padding-top: 8px;">
        <div class="one-text">地震</div>
        <div class="one-text">13</div>
      </div>
    </div>
    <div class="one">
      <img src="./img/failure.png" alt style="width:75px; height:67px" />
      <div style="padding-top: 8px;">
        <div class="one-text">停电</div>
        <div class="one-text">36</div>
      </div>
    </div>
    <div class="two">
      <img src="./img/trapped.png" alt style="width:75px; height:67px" />
      <div style="padding-top: 8px;">
        <div class="one-text" style="width: 68px;">电梯困人</div>
        <div class="one-text">04</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  components: {},
  data() {
    return {
      pointerBtn: 1,
    };
  },
  methods: {},
};
</script>


<style lang="stylus" scoped>
.solid {
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
  padding: 49px 0 0 0;

  .one {
    width: 25%;
    height: 50%;
    margin: 0 28px 0 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background-image: url('./img/bottom.png');
    background-color: 100% 100%;
    background-repeat: no-repeat;

    .one-text {
      width: 40px;
      color: #36ECFF;
      font-size: 17px;
      font-weight: bold;
    }
  }
  .two {
    width: 30%;
    height: 50%;
    margin: 0 0 0 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background-image: url('./img/bottom.png');
    background-color: 100% 100%;
    background-repeat: no-repeat;

    .one-text {
      width: 40px;
      color: #36ECFF;
      font-size: 17px;
      font-weight: bold;
    }
  }
}
</style>
