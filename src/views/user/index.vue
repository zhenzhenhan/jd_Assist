<template>
  <div>
    <div class="header">
      <div class="header-clear"></div>
      <div class="userinfo">
        <div>
          <img
            class="userinfo-avatar"
            style="border: none"
            src="~@/assets/imags/touxiang.jpg"
          />
          <div class="my-set">
            <div class="userinfo-nickname">
              <span>{{ name }}</span>
            </div>
          </div>
          <div class="user-data">
            <div class="data-item">
              <span class="data-num">{{ point }}</span>
              <span class="data-name">积分</span>
            </div>
            <div class="data-item">
              <span class="data-num">{{ jdNumber }}</span>
              <span class="data-name">京东账号</span>
            </div>
            <div class="data-item">
              <span class="data-num">{{ taskNumber }}</span>
              <span class="data-name">提交任务总次数</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="modelShow" class="model">
      <div class="model-box">
        <div class="model-item" @click="signIn">
          <img class="model-img" src="~@/assets/imags/qiandao.png" />
          <div class="model-name">签到</div>
        </div>
        <div class="model-item" @click="jdUser">
          <img class="model-img" src="~@/assets/imags/jd.png" />
          <div class="model-name">京东账号</div>
        </div>
        <div class="model-item" @click="pointLog">
          <img class="model-img" src="~@/assets/imags/detail.png" />
          <div class="model-name">积分明细</div>
        </div>
        <div class="model-item">
          <img class="model-img" src="~@/assets/imags/kaifazhong.png" />
          <div class="model-name">敬请期待</div>
        </div>
      </div>
    </div>

    <div v-show="modelShow" class="model">
      <div class="model-title">更多功能</div>
      <div class="model-box">
        <div class="model-item" @click="Logout">
          <img class="model-img" src="~@/assets/imags/tuichu.png" />
          <div class="model-name">退出登录</div>
        </div>
      </div>
    </div>

    <div v-show="jdShow" class="model" style="height: 400px">
      <div v-if="jdListShow" class="model-title">京东账号列表</div>
      <div v-if="jdListShow" style="margin: 10px">
        <van-swipe-cell v-for="(item, index) in jdList" :key="index">
          <van-cell
            :border="false"
            :title="'京东账号' + (index + 1) + '：'"
            :value="item"
          />
          <template #right>
            <van-button
              square
              type="danger"
              text="删除"
              @click="removeJd(item)"
            />
          </template>
        </van-swipe-cell>
      </div>
      <div v-if="jdListShow" class="jdBtn">
        <van-button
          round
          size="small"
          type="primary"
          style="margin-right: 30px"
          @click="showJd"
        >
          新增京东账号
        </van-button>
        <van-button round size="small" type="success" @click="jdGoBack"
          >返回上一级</van-button
        >
      </div>
      <van-skeleton v-if="!jdListShow" style="padding: 20px" title :row="12" />
      <div v-if="jdNameNone" class="none">
        <span style="margin-top: 20px">暂无账号</span>
      </div>
    </div>

    <div v-if="pointShow" class="model" style="height: 25rem">
      <div v-if="pointListShow" class="model-title">积分明细</div>

      <van-list
        v-if="pointListShow"
        class="point-bigBox"
        v-model:loading="listLoading"
        :finished="listFinished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="point-box"
          v-for="(item, index) in pointLogArr"
          :key="index"
        >
          <div>
            <p class="point-text">{{ item.logTxt }}</p>
            <p class="point-time">{{ new Date(item.time).toLocaleString() }}</p>
          </div>
          <p class="point-number">{{ item.pointTxt }}</p>
        </div>
      </van-list>
      <div v-if="pointListShow" class="pointBtn">
        <van-button round size="small" type="success" @click="pointGoBack"
          >返回上一级</van-button
        >
      </div>
      <van-skeleton
        v-if="!pointListShow"
        style="padding: 20px"
        title
        :row="12"
      />
      <div
        v-if="pointLogNone"
        class="none"
        style="
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translate(-50%, -50%);
        "
      >
        <span style="margin-top: 20px">暂无日志</span>
      </div>
    </div>

    <van-dialog
      v-model:show="dialogShow"
      title="新增京东账号"
      show-cancel-button
      @confirm="addJd"
    >
      <van-cell-group inset style="margin: 10px">
        <van-field
          v-model="jdUsername"
          label="京东用户名"
          colon
          clearable
          center
          required
          placeholder="请输入京东用户名"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Toast, Dialog } from 'vant'
import {
  getUserInfo,
  userSignIn,
  jdName,
  addJdUsername,
  removeJdName,
  getPointLog,
} from '@/api/user'
import LocalCache from '@/lib/cache'

const router = useRouter()
const VanDialog = Dialog.Component
const name = ref('')
const point = ref(0)
const jdNumber = ref(0)
const taskNumber = ref(0)
const modelShow = ref(true)
const jdShow = ref(false)
const pointShow = ref(false)
const dialogShow = ref(false)
const jdList = ref([])
const jdNameNone = ref(true)
const jdListShow = ref(false)
const jdUsername = ref('')
const pointLogArr = ref([])
const pointLogNone = ref(false)
const pointListShow = ref(false)
let pointOffset = ref(1)
const pointLimit = ref(10)
const listLoading = ref(false)
const listFinished = ref(false)

const signIn = async () => {
  const res = await userSignIn('users/signIn')
  if (res.code === 200) {
    Toast.success({
      message: res.msg,
      className: 'fail-toast',
    })
    const user = await getUserInfo('users/getUserInfo')
    if (user.code === 200) {
      name.value = user.userInfo.name
      if (user.userInfo.points > 2000) {
        point.value = '无限制'
      } else {
        point.value = user.userInfo.points
      }
      jdNumber.value = user.userInfo.jdNumber
      taskNumber.value = user.userInfo.tasknumber
    }
  } else if (res.code !== 401) {
    Toast.fail({
      message: res.msg,
      className: 'fail-toast',
    })
  }
}

const jdUser = async () => {
  jdShow.value = true
  modelShow.value = false
  const res = await jdName('users/getJdName')
  if (res.code === 200) {
    jdListShow.value = true
    jdNameNone.value = false
    jdList.value = res.jdnames
  } else if (res.code === -200) {
    jdListShow.value = true
  } else if (res.code !== 401) {
    Toast.fail({
      message: '获取京东账号失败！',
      className: 'fail-toast',
    })
  }
}

const showJd = () => {
  dialogShow.value = true
}

const addJd = async () => {
  if (jdUsername.value === '') {
    Toast.fail({
      message: '京东用户名不能为空！',
      className: 'fail-toast',
    })
  } else {
    const res = await addJdUsername('users/addJdName', {
      jdname: jdUsername.value,
    })
    if (res.code === 200) {
      Toast.success({
        message: res.msg,
        className: 'fail-toast',
      })
      jdListShow.value = false
      const jdRes = await jdName('users/getJdName')
      if (jdRes.code === 200) {
        jdListShow.value = true
        jdNameNone.value = false
        jdList.value = jdRes.jdnames
      } else if (jdRes.code === -200) {
        jdListShow.value = true
      } else if (jdRes.code !== 401) {
        Toast.fail({
          message: '获取京东账号失败！',
          className: 'fail-toast',
        })
      }
      const user = await getUserInfo('users/getUserInfo')
      if (user.code === 200) {
        name.value = user.userInfo.name
        if (user.userInfo.points > 2000) {
          point.value = '无限制'
        } else {
          point.value = user.userInfo.points
        }
        jdNumber.value = user.userInfo.jdNumber
        taskNumber.value = user.userInfo.tasknumber
      }
    } else if (res.code !== 401) {
      Toast.fail({
        message: res.msg,
        className: 'fail-toast',
      })
    }
  }
}

const removeJd = async (item) => {
  const res = await removeJdName('users/removeJdName', {
    jdname: item,
  })
  if (res.code === 200) {
    Toast.success({
      message: res.msg,
      className: 'fail-toast',
    })
    jdListShow.value = false
    const jdRes = await jdName('users/getJdName')
    if (jdRes.code === 200) {
      jdListShow.value = true
      jdNameNone.value = false
      jdList.value = jdRes.jdnames
    } else if (jdRes.code === -200) {
      jdListShow.value = true
      jdNameNone.value = true
      jdList.value = []
    } else if (jdRes.code !== 401) {
      Toast.fail({
        message: '获取京东账号失败！',
        className: 'fail-toast',
      })
    }
    const user = await getUserInfo('users/getUserInfo')
    if (user.code === 200) {
      name.value = user.userInfo.name
      if (user.userInfo.points > 2000) {
        point.value = '无限制'
      } else {
        point.value = user.userInfo.points
      }
      jdNumber.value = user.userInfo.jdNumber
      taskNumber.value = user.userInfo.tasknumber
    }
  } else if (res.code !== 401) {
    Toast.fail({
      message: res.msg,
      className: 'fail-toast',
    })
  }
}

const jdGoBack = () => {
  jdShow.value = false
  modelShow.value = true
}

const pointLog = async () => {
  pointShow.value = true
  modelShow.value = false
  listFinished.value = false
  pointOffset.value = 0
  const res = await getPointLog('users/getPointLog', {
    offset: pointOffset.value,
    limit: pointLimit.value,
  })
  if (res.code === 200) {
    pointListShow.value = true
    pointLogArr.value = res.pointLog
    if (pointLogArr.value.length === 0) {
      pointLogNone.value = true
    }
  } else if (res.code !== 401) {
    pointLogNone.value = false
    Toast.fail({
      message: '获取日志失败！',
      className: 'fail-toast',
    })
  }
}

const onLoad = () => {
  if (pointLogArr.value.length === 0) {
    listLoading.value = false
  } else {
    pointOffset.value += 10
    setTimeout(async () => {
      const res = await getPointLog('users/getPointLog', {
        offset: pointOffset.value,
        limit: pointLimit.value,
      })
      if (res.code === 200) {
        listLoading.value = false
        if (res.pointLog.length !== 0) {
          pointLogArr.value.push(...res.pointLog)
        } else {
          listFinished.value = true
        }
      }
    }, 1000)
  }
}

const pointGoBack = () => {
  pointShow.value = false
  modelShow.value = true
}

const Logout = () => {
  LocalCache.deleteCache('JD_TOKEN')
  Toast.success({
    message: '退出登录成功！',
    className: 'fail-toast',
  })
  setTimeout(() => {
    router.push('/login')
  }, 2000)
}

onMounted(async () => {
  const res = await getUserInfo('users/getUserInfo')
  if (res.code === 200) {
    name.value = res.userInfo.name
    if (res.userInfo.points > 2000) {
      point.value = '无限制'
    } else {
      point.value = res.userInfo.points
    }
    jdNumber.value = res.userInfo.jdNumber
    taskNumber.value = res.userInfo.tasknumber
  }
})
</script>

<style scoped>
@import url('./index.css');
</style>
