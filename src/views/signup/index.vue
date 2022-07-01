<template>
  <div class="login">
    <div class="login-logo">
      <img src="~@/assets/imags/logo.png" />
      <p style="font-size: 26px">SignUp</p>
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
          <van-field
            clearable
            required
            colon
            v-model="agPassword"
            type="password"
            name="password"
            label="确认密码"
            placeholder="请再次输入密码"
            @blur="checkAgPassword"
            :error-message="errAgPassword"
          />
          <van-field
            clearable
            required
            colon
            v-model="name"
            name="name"
            label="用户名"
            placeholder="请输入用户名"
            @blur="checkName"
            :error-message="errName"
          />
          <van-field
            clearable
            required
            colon
            v-model="email"
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            @blur="checkEmail"
            :error-message="errEmail"
          >
            <template #button>
              <van-button
                :loading="codeLoading"
                :disabled="codeDisabled"
                size="small"
                type="primary"
                @click="sendCode"
              >
                {{ showTimer ? timer : '获取验证码' }}
              </van-button>
            </template>
          </van-field>
          <van-field
            clearable
            required
            colon
            v-model="code"
            name="code"
            label="验证码"
            placeholder="请输入验证码"
            maxlength="6"
            @blur="checkCode"
            :error-message="errCode"
          />
        </van-cell-group>
        <div class="login-btn">
          <van-button
            round
            block
            type="primary"
            :disabled="
              !username || !password || !agPassword || !name || !email || !code
            "
            :loading="signupLoading"
            native-type="submit"
          >
            注册
          </van-button>
        </div>
      </van-form>
    </div>
    <div class="register">
      <span>
        已有账号？
        <span class="jump-login" @click="jumpLogin"> 前往登录 </span>
      </span>
    </div>
    <Vcode :show="codeShow" @success="onSuccess" @close="onClose" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { hRequest } from '@/lib'
import Vcode from 'vue3-puzzle-vcode'

const router = useRouter()
const username = ref()
const password = ref()
const agPassword = ref()
const name = ref()
const email = ref()
const code = ref()
const errUsername = ref()
const errPassword = ref()
const errAgPassword = ref()
const errName = ref()
const errEmail = ref()
const errCode = ref()
const confirmUserName = ref(false)
const confirmEmail = ref(false)
const timer = ref(60)
const showTimer = ref(false)
const codeLoading = ref(false)
const codeDisabled = ref(false)
const signupLoading = ref(false)
const codeShow = ref(false)

const checkUsername = () => {
  const reg = /^[a-zA-Z0-9]{3,12}$/
  if (reg.test(username.value)) {
    errUsername.value = ''
    confirmUserName.value = true
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

const checkAgPassword = () => {
  if (agPassword.value !== password.value) {
    errAgPassword.value = '两次输入密码不一致'
  } else {
    errAgPassword.value = ''
  }
}

const checkName = () => {
  const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]{2,8}$/
  if (reg.test(name.value)) {
    errName.value = ''
  } else {
    errName.value = '请输入2-8位用户名'
  }
}

const checkEmail = () => {
  const reg =
    /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
  if (reg.test(email.value)) {
    errEmail.value = ''
    confirmEmail.value = true
  } else {
    errEmail.value = '请输入正确的邮箱地址'
  }
}

const checkCode = () => {
  const reg = /^[0-9]{6}$/
  if (reg.test(code.value)) {
    errCode.value = ''
  } else {
    errCode.value = '请输入6位数字验证码'
  }
}

const sendCode = async () => {
  if (confirmEmail.value && confirmUserName.value) {
    codeLoading.value = true
    codeDisabled.value = true
    showTimer.value = true
    const res = await hRequest.post({
      url: 'sendCode',
      data: {
        email: email.value,
        username: username.value,
      },
    })
    if (res.code === 200) {
      codeLoading.value = false
      Toast.success({
        message: res.msg,
        className: 'fail-toast',
      })
    } else {
      codeLoading.value = false
      Toast.fail({
        message: res.msg,
        className: 'fail-toast',
      })
    }
    const authTimer = setInterval(() => {
      if (timer.value > 0) {
        timer.value--
      } else {
        clearInterval(authTimer)
        timer.value = 60
        showTimer.value = false
        codeDisabled.value = false
      }
    }, 1000)
  } else if (!confirmEmail.value) {
    errEmail.value = '请输入正确的邮箱地址'
  } else if (!confirmUserName.value) {
    errUsername.value = '请输入3-12位数字或字母'
  } else {
    errEmail.value = '请输入正确的邮箱地址'
    errUsername.value = '请输入3-12位数字或字母'
  }
}

const onSubmit = () => {
  if (
    errUsername.value == '' &&
    errPassword.value == '' &&
    errAgPassword.value == '' &&
    errName.value == '' &&
    errEmail.value == '' &&
    errCode.value == ''
  ) {
    codeShow.value = true
  } else {
    Toast.fail({
      message: '请按要求填写注册信息！',
      className: 'fail-toast',
    })
  }
}

const onSuccess = async () => {
  onClose()
  signupLoading.value = true
  const res = await hRequest.post({
    url: 'signup',
    data: {
      username: username.value,
      password: password.value,
      name: name.value,
      email: email.value,
      code: code.value,
    },
  })
  if (res.code === 200) {
    signupLoading.value = false
    Toast.success({
      message: res.msg,
      className: 'fail-toast',
    })
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } else {
    signupLoading.value = false
    Toast.fail({
      message: res.msg,
      className: 'fail-toast',
    })
  }
}

const onClose = () => {
  codeShow.value = false
}

const jumpLogin = () => {
  router.push('/login')
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
  bottom: -50px;
  display: flex;
  justify-content: center;
}

.jump-login {
  color: #1890ff;
  cursor: pointer;
}
</style>
