import {
    //創建路由
    createRouter,
    //創建路由歷史模式
    createWebHistory
} from 'vue-router';

//創建各分頁路由
const routes = [
    //設置重定向
    {
        path: '/',
        redirect: '/login'
    },
    //登陸頁面
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login/index.vue')
    }
]


//建立路由器 並有兩個配置項
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router