import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
//導入路由
import router from './router/index';
//引入element plus
import ElementPlus from 'element-plus'
//引入element plus icon
// if you're using CDN, please remove this line.
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
//引入element plus 國際化
import zhCn from 'element-plus/es/locale/lang/zh-cn'

//創建實例
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router).use(ElementPlus).use(ElementPlus, {
    locale: zhCn,
}).mount('#app')