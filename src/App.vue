<template>
	<a-config-provider :locale="zh_CN">
		<div id="app">
			<transition>
				<router-view v-if="isRouter"/>
			</transition>
		</div>
	</a-config-provider>
</template>

<script>
	import moment from "moment"
	import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
	import SockJS from "sockjs-client";
	import Stomp from "stompjs";
	import 'moment/locale/zh-cn'
	moment.locale("zh-cn")

	export default {
		components: {
			zh_CN
		},
		name: 'App',
		provide(){
			return{
				reload: this.reload
			}
		},
		data(){
			return{
				zh_CN,
				isRouter:true
			}
		},
		methods: {
			reload(){
				this.isRouter = false;
				this.$nextTick(function(){
					this.isRouter = true;
				})
			},
			initWebSocket2() {
				let url = this.$socket_zjb;
				let socket = new SockJS(url + '/gs-guide-websocket', null, {timeout: 15000});
				try {
					this.stompClient = Stomp.over(socket);
					this.stompClient.connect({}, frame => {
						// 订阅服务端提供的某个topic---实时刷脸门禁
						this.stompClient.subscribe('/topic/accessDoor', msg => {
							this.$store.commit('updateFace',JSON.parse(msg.body))
						});
					  this.stompClient.subscribe('/topic/aiBaiduEvent', msg => {
						  if(msg){
							  let data = JSON.parse(msg.body);
							  let obj = {
								  photo:data.renderImage,
								  type:data.skillName,
								  time:data.createTime,
								  area:data.cameraLocation
							  };
							  this.$store.commit('updateAI',obj)
						  }
					  });
					})
				} catch (e) {
					console.log(e)
				}
			},
		},
		mounted() {
			this.initWebSocket2();
		}
	}
</script>

<style>
	@import './assets/fonts/font.css';

	* {
		margin: 0;
		padding: 0;
	}

	html, body {
		width: 3840px;
		height: 100%;
		/*background-image: url("./assets/bg.png");*/
		background-color: #030409 !important;
		background-size: 100% 100%;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #FFF;
	}
	.ant-message{
		position: fixed;
		width: 280px !important;
		text-align: left !important;
		left: 820px !important;
		top: 20px !important;
	}

</style>
