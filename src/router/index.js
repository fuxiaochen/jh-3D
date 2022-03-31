import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/home.vue'

Vue.use(Router)
const router = new Router({
    mode: "history",
    routes: [{
            path: "/",
            name: "Home",
            component: () => import ("../views/home/home")
        },
        {
            path: "/fighting",
            name: "Test",
            component: () => import ("../views/home/fighting")
        }
    ]
});

// // 判断是否需要登录权限 以及是否登录
// router.beforeEach((to, from, next) => {
// 	if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
// 		if (localStorage.getItem('user')) {// 判断是否登录
// 			next()
// 		} else {// 没登录则跳转到登录界面
// 			next({
// 				path: '/login'
// 			})
// 		}
// 	} else {
// 		next()
// 	}
// })

export default router
