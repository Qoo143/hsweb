<template>
    <div class="common-layout">
        <el-container>
            <el-header class="header-wrapped">
                <div class="header-content">
                    <h3>通用後台管理系統</h3>
                    <span class="welcome">歡迎您的登錄</span>
                </div>
            </el-header>
            <el-main>
                <div class="login-wrapped">
                    <el-card class="box-card">
                        <el-tabs v-model="activeName" class="demo-tabs">
                            <el-tab-pane label="User" name="first">User</el-tab-pane>
                            <el-tab-pane label="Config" name="second">Config</el-tab-pane>
                        </el-tabs>
                    </el-card>
                </div>
            </el-main>
            <el-footer>
                <div class="footer-wrapped">
                    <div class="footer-content">
                        <div class="title">
                            <span>劍湖山</span>|
                            <span>劍湖山</span>|
                            <span>劍湖山</span>
                        </div>
                    </div>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
//此處activeName可以指定一開始的指向(指向name = first)
const activeName = ref('first')
</script>

<style lang="scss" scoped>
.header-wrapped {
    .header-content {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .welcome {
            font-size: 13px;
        }
    }
}

.el-main {
    background-image: url('../../assets/images/whiteLight.png');
    height: 600px;

    .login-wrapped {
        width: 1200px;
        height: 600px;
        margin: 0 auto;
        --el-main-padding: 0px;

        .box-card {
            width: 350px;
            height: 375px;
            float: right;
            position: relative;
            top: 14%;
        }
    }
}

.footer-wrapped {
    margin-top: 10;

    .footer-content {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;

        .title {
            font-size: 12px;

        }

        span {
            color: #666;
            font-size: 12px;
        }
    }
}
</style>
