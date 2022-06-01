import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isShowLoading: false, // 全局 loading
        // 左侧菜单栏数据
        menuItems: [
            {
                name: 'home', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'md-home', // icon类型
                text: '主页', // 文本内容
            },
            {
                name: 'unitconvert',
                size: 18, 
                type: 'ios-egg-outline', 
                text: '单位换算', 
            },
            {
                name: 'bulkquery', 
                size: 18, 
                type: 'ios-search', 
                text: '批量查询', 
            },
            {
                name: 'bulktransfer', 
                size: 18, 
                type: 'ios-briefcase', 
                text: '批量转账', 
            },
            {
                name: 'traceview', 
                size: 18, 
                type: 'ios-eye', 
                text: '交易分析', 
            },
            {
                name: 'abi',
                size: 18, 
                type: 'ios-color-wand', 
                text: 'abi图形化', 
            },
            {
                text: '二级菜单',
                type: 'ios-paper',
                children: [
                    {
                        type: 'ios-notifications-outline',
                        name: 'msg',
                        text: '查看消息',
                    },
                    {
                        type: 'md-lock',
                        name: 'password',
                        text: '修改密码',
                    },
                    {
                        type: 'md-person',
                        name: 'userinfo',
                        text: '基本资料',
                    },
                ],
            },
        ],
    },
    mutations: {
        setMenus(state, items) {
            state.menuItems = [...items]
        },
        setLoading(state, isShowLoading) {
            state.isShowLoading = isShowLoading
        },
    },
})

export default store