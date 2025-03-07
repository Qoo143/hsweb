<template>
  <div class="common-layout">
    <el-container>
      <!-- 頭部 -->
      <el-header class="header-wrapped">
        <div class="header-content">
          <h3>通用後台管理系統</h3>
          <span class="welcome">歡迎您的登錄</span>
        </div>
      </el-header>
      <!-- 主體 -->
      <el-main>
        <div class="login-wrapped">
          <el-card class="box-card">
            <el-tabs v-model="activeName" class="demo-tabs" :stretch="true">
              <el-tab-pane label="登入" name="first">
                <!-- 表單登入 -->
                <el-form class="login-form" :model="loginData" label-width="auto" style="max-width: 600px">
                  <el-form-item label="帳號">
                    <el-input v-model="loginData.account" placeholder="請輸入帳號" />
                  </el-form-item>
                  <el-form-item label="密碼">
                    <el-input v-model="loginData.password" placeholder="請輸入密碼" />
                  </el-form-item>
                  <!-- 底部外殼 -->
                  <div class="footer-wrapped">
                    <div class="forget-password">
                      <span class="forget-password-button" @click="openForget">忘記密碼</span>
                    </div>
                    <div class="footer-button">
                      <el-button type="primary">登入</el-button>
                    </div>
                    <div class="footer-go-register">還沒有帳號<span class="go-register">馬上註冊</span></div>
                  </div>
                </el-form>
              </el-tab-pane>
              <!-- 表單註冊 -->

              <el-tab-pane label="註冊" name="second">
                <el-form class="login-form" :model="loginData" label-width="auto" style="max-width: 600px">
                  <el-form-item label="帳號">
                    <el-input v-model="registData.account" placeholder="帳號長度6-12位" />
                  </el-form-item>
                  <el-form-item label="密碼">
                    <el-input v-model="registData.password" placeholder="密碼需長度6-12位含字母數字" />
                  </el-form-item>
                  <el-form-item label="確認密碼">
                    <el-input v-model="registData.repassword" placeholder="請再次輸入密碼" />
                  </el-form-item>
                  <div class="footer-button">
                    <el-button type="primary">註冊</el-button>
                  </div>
                </el-form>
              </el-tab-pane>


            </el-tabs>
          </el-card>
        </div>
      </el-main>
      <!-- 腳部 -->
      <el-footer>
        <div class="footer-wrapped">
          <div class="footer-content">
            <div class="title">
              <span>劍湖山</span>| <span>劍湖山</span>|
              <span>劍湖山</span>
            </div>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
  <forget ref="forgetP"></forget>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import forget from './components/forget_password.vue';

//此處activeName可以指定一開始的指向(指向name = first)
const activeName = ref('first');

//定義表單接口
interface formData {
  account: number;
  password: string;
  repassword?: string;

}
//登入表單數據
const loginData: formData = reactive({
  account: null,
  password: '',

});

//註冊表單數據
const registData: formData = reactive({
  account: null,
  password: '',
  repassword: ''
})

const forgetP = ref()

const openForget = () => {
  forgetP.value.open()
}
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

      .login-form {
        .footer-wrapped {
          display: flex;
          flex-direction: column;

          .forget-password {
            display: flex;
            justify-content: flex-end;
            margin-top: 10px 0;

            .forget-password-button {
              font-size: 12;
              color: #409eff;
              cursor: pointer;
            }
          }

          .footer-button {
            width: 100%;
            display: flex;
            justify-content: center;
          }

          .footer-go-register {
            font-size: 12;
            margin: 12px 0;
            display: flex;
            justify-content: center;

            .go-register {
              color: #409eff;
              cursor: pointer;
            }
          }
        }
      }
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

// 樣式穿透設定
:deep(.el-tabs__item) {
  color: #333;
  font-size: 18px;
}

:deep(.el-button) {
  width: 300px;
  height: 45px;
  font-size: 16px;
}
</style>
