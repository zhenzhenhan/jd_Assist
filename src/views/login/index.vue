<template>
  <div class="login">
    <div class="login-logo">
      <img src="~@/assets/imags/logo.png" />
      <p style="font-size: 26px">Login</p>
    </div>
    <div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            clearable
            required
            colon
            v-model="username"
            name="username"
            label="账号"
            placeholder="请输入账号"
            @blur="checkUsername"
            :error-message="errUsername"
          />
          <van-field
            clearable
            required
            colon
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            @blur="checkPassword"
            :error-message="errPassword"
          />
        </van-cell-group>
        <div class="login-btn">
          <van-button
            round
            block
            type="primary"
            :disabled="!username || !password"
            :loading="loginLoading"
            native-type="submit"
          >
            登录
          </van-button>
        </div>
      </van-form>
    </div>
    <div class="register">
      <div style="margin-bottom: 40px">
        <span class="jump-login" @click="jumpForget">忘记密码？</span>
      </div>
      <div>
        <span>
          暂无账号？
          <span class="jump-login" @click="jumpRegister"> 前往创建 </span>
        </span>
      </div>
    </div>
    <Vcode :show="codeShow" @success="onSuccess" @close="onClose" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { hRequest } from '@/lib'
import LocalCache from '@/lib/cache'
import Vcode from 'vue3-puzzle-vcode'

const router = useRouter()
const username = ref()
const password = ref()
const errUsername = ref()
const errPassword = ref()
const loginLoading = ref(false)
const codeShow = ref(false)

const checkUsername = () => {
  const reg = /^[a-zA-Z0-9]{3,12}$/
  if (reg.test(username.value)) {
    errUsername.value = ''
  } else {
    errUsername.value = '请输入3-12位数字或字母'
  }
}

const checkPassword = () => {
  const reg = /^[a-zA-Z0-9]{6,16}$/
  if (!reg.test(password.value)) {
    errPassword.value = '请输入6-16位数字或字母'
  } else {
    errPassword.value = ''
  }
}

const onSubmit = () => {
  if (errUsername.value == '' && errPassword.value == '') {
    codeShow.value = true
  } else {
    Toast.fail({
      message: '请按要求填写登录信息！',
      className: 'fail-toast',
    })
  }
}

const onSuccess = async () => {
  onClose()
  loginLoading.value = true
  const res = await hRequest.post({
    url: 'login',
    data: {
      username: username.value,
      password: password.value,
    },
  })
  if (res.code === 200) {
    loginLoading.value = false
    LocalCache.setCache('JD_TOKEN', res.data.token)
    Toast.success({
      message: '登录成功，即将跳转主界面！',
      className: 'fail-toast',
    })
    setTimeout(() => {
      router.push('/')
    }, 2000)
  } else {
    loginLoading.value = false
    Toast.fail({
      message: res.msg,
      className: 'fail-toast',
    })
  }
}

const onClose = () => {
  codeShow.value = false
}

const jumpRegister = () => {
  router.push('/signup')
}

const jumpForget = () => {
  router.push('/forget')
}
</script>

<style scoped>
.login-logo {
  text-align: center;
  margin: 3.125rem 0 2.5rem 0;
}

.login-logo img {
  width: 6.25rem;
}

.login-btn {
  margin: 1.875rem;
}

.register {
  position: relative;
  bottom: -80px;
  /* display: flex; */
  /* justify-content: center; */
  text-align: center;
}

.jump-login {
  color: #1890ff;
  cursor: pointer;
}
</style>
