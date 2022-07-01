<template>
  <div class="login">
    <div class="login-logo">
      <img src="~@/assets/imags/logo.png" />
      <p style="font-size: 26px">Forget</p>
    </div>
    <div>
      <div v-if="!showNext">
        <van-form @submit="nextStep">
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
          </van-cell-group>
          <div class="login-btn">
            <van-button
              round
              block
              type="primary"
              :disabled="!username"
              :loading="firstLoading"
              native-type="submit"
            >
              下一步
            </van-button>
          </div>
        </van-form>
      </div>

      <div v-else>
        <div style="text-align: center; margin-bottom: 10px">
          <span style="font-size: 15px; font-weight: bold">
            检测到账号绑定的邮箱为：{{ emailSSL }}
          </span>
        </div>
        <van-form @submit="updatePass">
          <van-cell-group inset>
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
              v-model="password"
              type="password"
              name="password"
              label="新密码"
              placeholder="请输入新密码"
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
          </van-cell-group>
          <div class="login-btn">
            <van-button
              round
              block
              type="primary"
              :disabled="!code || !password || !agPassword"
              :loading="updateLoading"
              native-type="submit"
            >
              修改密码
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
    <div class="register">
      <div>
        <span>
          记起来密码了？
          <span class="jump-login" @click="jumpLogin"> 前往登录 </span>
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
import Vcode from 'vue3-puzzle-vcode'

const router = useRouter()
const username = ref()
const password = ref()
const agPassword = ref()
const code = ref()
const errUsername = ref()
const errPassword = ref()
const errAgPassword = ref()
const errCode = ref()
const firstLoading = ref(false)
const updateLoading = ref(false)
const timer = ref(60)
const showTimer = ref(false)
const codeLoading = ref(false)
const codeDisabled = ref(false)
const codeShow = ref(false)
const emailSSL = ref()
const userEmail = ref()
const showNext = ref(false)

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

const checkAgPassword = () => {
  if (agPassword.value !== password.value) {
    errAgPassword.value = '两次输入密码不一致'
  } else {
    errAgPassword.value = ''
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

const nextStep = async () => {
  firstLoading.value = true
  const res = await hRequest.post({
    url: 'users/getUserName',
    data: {
      username: username.value,
    },
  })
  if (res.code === 200) {
    firstLoading.value = false
    userEmail.value = res.email
    const email = res.email.split('@')
    emailSSL.value =
      email[0].substr(0, email[0].length - 2) + '*****' + email[1].substr(2)
    showNext.value = true
  } else {
    firstLoading.value = false
    Toast.fail({
      message: res.msg,
      className: 'fail-toast',
    })
  }
}

const sendCode = async () => {
  codeLoading.value = true
  codeDisabled.value = true
  showTimer.value = true
  const res = await hRequest.post({
    url: 'users/verifyEmail',
    data: {
      username: username.value,
      email: userEmail.value,
    },
  })
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
}

const updatePass = () => {
  if (
    errCode.value == '' &&
    errPassword.value == '' &&
    errAgPassword.value == ''
  ) {
    codeShow.value = true
  } else {
    Toast.fail({
      message: '请按要求填写信息！',
      className: 'fail-toast',
    })
  }
}

const onSuccess = async () => {
  onClose()
  updateLoading.value = true
  const res = await hRequest.patch({
    url: 'users/backPassword',
    data: {
      username: username.value,
      password: password.value,
      code: code.value,
    },
  })
  if (res.code === 200) {
    updateLoading.value = false
    Toast.success({
      message: res.msg,
      className: 'fail-toast',
    })
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } else {
    updateLoading.value = false
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
  bottom: -120px;
  /* display: flex; */
  /* justify-content: center; */
  text-align: center;
}

.jump-login {
  color: #1890ff;
  cursor: pointer;
}
</style>
