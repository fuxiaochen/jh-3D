import Vue from 'vue'
import { message } from 'ant-design-vue'
const myMessage = (type,text) =>{
	if(type === 'success'){
		message.success(text);
	}else if(type === 'error'){
		message.error(text);
	}
}
Vue.prototype.$message = myMessage
