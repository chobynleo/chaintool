import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 普通路由
const commonRoutes = [
    {
        path: '/login',
        name: 'login',
        meta: { title: '登录' },
        component: () => import('../components/Login.vue'),
    },
    {
        path: '/unitConvert', // 点击侧边栏跳到一个单独的路由页面，需要定义，层级和其他顶级路由一样
        name: 'unitconvert',
        meta: { title: '单位换算' },
        component: () => import('../views/UintConvert.vue'),
    },
    {
        path: '/abi', 
        name: 'abi',
        meta: { title: 'abi图形化工具' },
        component: () => import('../components/ABI.vue'),
    },
    {
        path: '/traceview', 
        name: 'traceview',
        meta: { title: '交易分析' },
        component: () => import('../views/TraceView.vue'),
    },
    {
        path: '/404',
        name: '404',
        meta: { title: '404' },
        component: () => import('../components/404.vue'),
    },
    { path: '/', redirect: '/home' },
]

// 本地所有的页面 需要配合后台返回的数据生成页面
export const asyncRoutes = {
    home: {
        path: 'home',
        name: 'home',
        meta: { title: '主页' },
        component: () => import('../views/Home.vue'),
    },
    password: {
        path: 'password',
        name: 'password',
        meta: { title: '修改密码' },
        component: () => import('../views/Password.vue'),
    },
    msg: {
        path: 'msg',
        name: 'msg',
        meta: { title: '通知消息' },
        component: () => import('../views/Msg.vue'),
    },
    userinfo: {
        path: 'userinfo',
        name: 'userinfo',
        meta: { title: '用户信息' },
        component: () => import('../views/UserInfo.vue'),
    },
    bulkquery: {
        path: '/bulkQuery',
        name: 'bulkquery',
        meta: { title: '批量查询' },
        component: () => import('../views/BulkQuery.vue'),
    },
    bulktransfer: {
        path: '/bulkTransfer',
        name: 'bulktransfer',
        meta: { title: '批量转账' },
        component: () => import('../views/BulkTransfer.vue'),
    },
}

const createRouter = () => new Router({
    routes: commonRoutes,
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router