<template>
  <!-- 忘記密碼 -->
  <el-dialog v-model="state.forgetPasswordDialog" title="忘記密碼" width="500">
    <!-- 表單登入 -->
    <el-form class="login-form" :model="forgetData" label-width="auto" style="max-width: 600px" :rules="rules">
      <el-form-item label="輸入您的註冊帳號" prop="account">
        <el-input v-model="forgetData.account" placeholder="輸入您的註冊帳號" />
      </el-form-item>
      <el-form-item label="輸入您的個人郵箱" prop="email">
        <el-input v-model="forgetData.email" placeholder="輸入您的個人郵箱" />
      </el-form-item>
    </el-form>
    <!-- 底部內容 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.forgetPasswordDialog = false">取消</el-button>
        <el-button type="primary" @click="openChangePassword">
          下一步
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 修改密碼 -->
  <el-dialog v-model="state.changePasswordDialog" title="修改密碼" width="500">
    <!-- 表單登入 -->
    <el-form class="login-form" :model="forgetData" label-width="auto" style="max-width: 600px" :rules="rules">
      <el-form-item label="輸入您的新密碼" prop="password">
        <el-input v-model="forgetData.account" placeholder="輸入您的新密碼" />
      </el-form-item>
      <el-form-item label="再次輸入您的新密碼" prop="repassword">
        <el-input v-model="forgetData.email" placeholder="再次輸入您的新密碼" />
      </el-form-item>
    </el-form>
    <!-- 底部內容 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.changePasswordDialog = false">取消</el-button>
        <el-button type="primary">
          確定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const dialogVisible = ref(false)
const openChangePassword = () => {
  state.changePasswordDialog = true
  state.forgetPasswordDialog = false
}

//定義表單接口
interface forgetData {
  account: number;
  email: string;
  password: string;
  repassword: string;

}

//忘記密碼物件
const forgetData = reactive<forgetData>({
  account: null,
  email: '',
  password: '',
  repassword: '',
})

const rules = reactive({
  account: [
    { required: true, message: '請輸入你得註冊帳號', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '請輸入你得註冊郵箱', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '請輸入你得新密碼', trigger: 'blur' },
  ],
  repassword: [
    { required: true, message: '請再次輸入你得新密碼', trigger: 'blur' },
  ],
})

const state = reactive({
  forgetPasswordDialog: false,
  changePasswordDialog: false
})



//打開彈窗
const open = () => {
  state.forgetPasswordDialog = true
}

//向外暴露
defineExpose({
  open
})
</script>

<style scoped></style>