<template>
  <div class="pollutants">
    <div class="monitor">
      <div class="monitor-two">
        <img src="./img/左.png" alt style="width:12px; height:19px;margin-top: 33px;" />
      </div>
      <div class="monitor-img pm">
        <div class="monitor-text">268</div>
      </div>
      <div class="monitor-img DOMN">
        <div class="monitor-text">12</div>
      </div>
      <div class="monitor-img IDLE">
        <div class="monitor-text">68</div>
      </div>
      <div class="monitor-img RUN">
        <div class="monitor-text">546</div>
      </div>
      <div class="monitor-two">
        <img src="./img/右.png" alt style="width:12px; height:19px;margin-top: 33px;" />
      </div>
    </div>
      <div class="concentration-top">
<!--        <div class="concentration-btn"></div>-->
        <span style="font-size: 17px;color: #36ECFF;">机台PM数量</span>
        <div class="concentration-select">
          <a-select
            label-in-value
            :default-value="{ key: '1' }"
            style="width: 100px;height:20px;font-weight: bold;"
            @change="handleChange"
          >
            <a-select-option value="1">近七日</a-select-option>
            <a-select-option value="2">当月</a-select-option>
            <a-select-option value="3">近一年</a-select-option>
          </a-select>
        </div>
      </div>
        <div class="concentration-one">
          <Detect11 />
        </div>
    </div>
</template>

<script>
import Detect11 from "./detect11";
export default {
  name: "index",
  components: {
    Detect11,
  },
  data() {
    return {
      pointerBtn: 1,
    };
  },
  methods: {
    handleChange(value) {
    },
  },
};
</script>

<style scoped>
/deep/ .ant-select-selection{
  background-color: #000!important;
  color: #fff!important;
  border: 1px solid #36ECFF;
}
/deep/ .ant-select-arrow{
  color: #fff!important;
}
/deep/ .ant-select-selection--single {
    position: relative;
    height: 28px;
    cursor: pointer;
}
</style>

<style lang="stylus" scoped>
	.pollutants {
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

		.monitor {
			width: 100%;
			height: 100px;
			padding 20px 10px 10px
			display: flex;
			align-content: center;
			justify-content: flex-start;

			.monitor-text {
				position: relative;
				top: 45px;
				left: 0;
				font-size: 14px;
				font-family: 'MicrosoftYaHei-Bold';
				font-weight: bold;
				color: #ffffff;
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
				padding: 0 25px 0 35px;
			}

			.monitor-img {
				display: flex;
				width: 53px;
				height: 86px;
				margin: 0 30px;
				align-content: center;
				justify-content: center;
				background-size: 100% 100%;
				background-repeat: no-repeat;
			}

			.pm {
				background-image: url('./img/pm.png');
			}

			.DOMN {
				background-image: url('./img/down.png');
			}

			.IDLE {
				background-image: url('./img/idle.png');
			}

			.RUN {
				background-image: url('./img/run.png');
			}
		}

		.concentration {
			width: 100%;
			height: 100px;
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

		}

		.concentration-one {
			padding: 0 20px 10px 20px;
		}

		.concentration-top {
			width: 100%;
			padding 0 30px 0 20px
			height: 35px;
			display: flex;
			justify-content space-between
			align-content: center;
			flex-wrap: nowrap;
			background-color: #fffff;

			.concentration-btn {
				width: 20px;
				height: 20px;
				cursor: pointer;
			}

			.concentration-btn1 {
				width: 30px;
				height: 20px;
				cursor: pointer;
				margin: 0 10px 0 20px;
			}

			.concentration-select {
				margin-right 20px
				width: 70px;
				height: 20px;
				font-size: 14px;
			}
		}
	}
</style>
