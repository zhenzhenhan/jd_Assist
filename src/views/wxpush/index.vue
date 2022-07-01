<template>
  <div>
    <van-nav-bar class="title-text" title="京东WxPusher一对一推送" />
    <van-notice-bar
      left-icon="volume-o"
      text="注意查看下方步骤，请严格按照步骤进行操作！微信扫码关注WxPusher之后，请打开消息提示！在公众号右下角 我的->消息开关。不打开消息开关，无法收到推送！提交之后，每天上午的9点30分和晚上的9点30分进行推送。请不要重复提交！京东用户名可以在京东客户端设置里面进行查看！"
    />

    <h2 class="block_firstTitle">
      <span style="color: red; font-size: 16px">第一步：</span>
      扫描二维码关注，关注完请点击按钮
    </h2>
    <div class="resolve-box">
      <img
        class="wxImg"
        :src="wxPushImage"
        alt="WxPusher二维码"
        @click="refurbishImg"
      />

      <div style="margin: 5px 30px 0 30px; padding-bottom: 10px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          :loading="wxBtnLoading"
          @click="getWxUid"
        >
          扫码之后请点击我获取Uid哦！
        </van-button>
      </div>
      <span>{{ wxMsg }}</span>
    </div>

    <h2 class="block_title">
      <span style="color: red; font-size: 16px">第二步：</span
      >查询自己账号在哪个车位
    </h2>
    <div class="form-box">
      <van-cell-group inset>
        <van-field
          v-model="queryJdName"
          colon
          clearable
          required
          center
          label="京东用户名"
          placeholder="请输入京东用户名"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          :disabled="!queryJdName"
          :loading="queryLoading"
          @click="queryName"
        >
          查询
        </van-button>
      </div>
    </div>

    <h2 class="block_title">
      <span style="color: red; font-size: 16px">第三步：</span
      >输入京东用户名和WxUid
    </h2>
    <div class="form-box">
      <van-cell-group inset>
        <van-field
          v-model="jdName"
          colon
          clearable
          required
          center
          label="京东用户名"
          placeholder="请输入京东用户名"
        />
        <van-field
          v-model="wxUid"
          colon
          clearable
          required
          center
          label="WXUID"
          placeholder="请输入wxUid，点击上方按钮获取！"
        />
        <van-field
          v-model="wxCarTxt"
          is-link
          readonly
          colon
          required
          label="车位"
          placeholder="选择您账号所在车位"
          @click="showWxPicker = true"
        />
      </van-cell-group>
      <van-popup v-model:show="showWxPicker" round position="bottom">
        <van-picker
          :columns="Columns"
          @cancel="showWxPicker = false"
          @confirm="wxConfirm"
        />
      </van-popup>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          :disabled="!jdName || !wxUid || !carList"
          :loading="comBtnLoading"
          @click="comWx"
        >
          提交
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { api1, api2, api3, api4, api5 } from '@/lib'
import { Toast, Notify } from 'vant'

const wxPushImage = ref()
const wxCode = ref()
const wxMsg = ref()
const wxUid = ref()
const wxBtnLoading = ref(false)
const jdName = ref()
const carList = ref()
const comBtnLoading = ref(false)
const queryJdName = ref()
const queryLoading = ref(false)
const wxCarTxt = ref()
const showWxPicker = ref(false)
const Columns = ['车位1', '车位2', '车位3', '车位4']

onMounted(async () => {
  const { data } = await axios.post(
    'http://wxpusher.zjiecode.com/api/fun/create/qrcode',
    {
      appToken: 'AT_vlV5VqhzsyNfkOLRiXnhTGvykBBfswWL',
      extra: '64',
    }
  )
  wxPushImage.value = data.data.shortUrl
  wxCode.value = data.data.code
})

const wxConfirm = (value, index) => {
  wxCarTxt.value = value
  carList.value = index + 1
  showWxPicker.value = false
}

const refurbishImg = async () => {
  const { data } = await axios.post(
    'http://wxpusher.zjiecode.com/api/fun/create/qrcode',
    {
      appToken: 'AT_vlV5VqhzsyNfkOLRiXnhTGvykBBfswWL',
      extra: '64',
    }
  )
  wxPushImage.value = data.data.shortUrl
  wxCode.value = data.data.code
}

const getWxUid = async () => {
  wxBtnLoading.value = true
  const { data } = await axios.get(
    `https://wxpusher.zjiecode.com/api/fun/scan-qrcode-uid?code=${wxCode.value}`
  )
  if (data.code === 1000) {
    wxBtnLoading.value = false
    wxMsg.value = data.data
    wxUid.value = data.data
  } else {
    wxBtnLoading.value = false
    wxMsg.value = data.msg
  }
}

const comWx = async () => {
  comBtnLoading.value = true
  let res
  let queryRes
  switch (carList.value) {
    case 1:
      if (wxUid.value.slice(0, 3) === 'UID') {
        queryRes = await api1.get({
          url: `wx/getCar?pt_pin=${jdName.value}`,
        })
        if (queryRes.code === 200) {
          res = await api1.post({
            url: 'wx/commit',
            data: {
              pt_pin: jdName.value,
              Uid: wxUid.value,
            },
          })
          if (res.code === 200) {
            comBtnLoading.value = false
            Toast.success(res.msg)
          } else {
            comBtnLoading.value = false
            Toast.fail({
              message: res.msg,
              className: 'fail-toast',
            })
          }
        } else if (queryRes.code !== 401) {
          comBtnLoading.value = false
          Toast.fail({
            message: '没有查询到该用户在此车位，禁止提交！',
            className: 'fail-toast',
          })
        }
      } else {
        comBtnLoading.value = false
        Toast.fail({
          message: 'WxUid格式错误，请重新扫码获取！',
          className: 'fail-toast',
        })
      }

      break
    case 2:
      if (wxUid.value.slice(0, 3) === 'UID') {
        queryRes = await api2.get({
          url: `wx/getCar?pt_pin=${jdName.value}`,
        })
        if (queryRes.code === 200) {
          res = await api2.post({
            url: 'wx/commit',
            data: {
              pt_pin: jdName.value,
              Uid: wxUid.value,
            },
          })
          if (res.code === 200) {
            comBtnLoading.value = false
            Toast.success(res.msg)
          } else {
            comBtnLoading.value = false
            Toast.fail({
              message: res.msg,
              className: 'fail-toast',
            })
          }
        } else if (queryRes.code !== 401) {
          comBtnLoading.value = false
          Toast.fail({
            message: '没有查询到该用户在此车位，禁止提交！',
            className: 'fail-toast',
          })
        }
      } else {
        comBtnLoading.value = false
        Toast.fail({
          message: 'WxUid格式错误，请重新扫码获取！',
          className: 'fail-toast',
        })
      }

      break
    case 3:
      if (wxUid.value.slice(0, 3) === 'UID') {
        queryRes = await api3.get({
          url: `wx/getCar?pt_pin=${jdName.value}`,
        })
        if (queryRes.code === 200) {
          res = await api3.post({
            url: 'wx/commit',
            data: {
              pt_pin: jdName.value,
              Uid: wxUid.value,
            },
          })
          if (res.code === 200) {
            comBtnLoading.value = false
            Toast.success(res.msg)
          } else {
            comBtnLoading.value = false
            Toast.fail({
              message: res.msg,
              className: 'fail-toast',
            })
          }
        } else if (queryRes.code !== 401) {
          comBtnLoading.value = false
          Toast.fail({
            message: '没有查询到该用户在此车位，禁止提交！',
            className: 'fail-toast',
          })
        }
      } else {
        comBtnLoading.value = false
        Toast.fail({
          message: 'WxUid格式错误，请重新扫码获取！',
          className: 'fail-toast',
        })
      }

      break
    case 4:
      if (wxUid.value.slice(0, 3) === 'UID') {
        queryRes = await api4.get({
          url: `wx/getCar?pt_pin=${jdName.value}`,
        })
        if (queryRes.code === 200) {
          res = await api4.post({
            url: 'wx/commit',
            data: { pt_pin: jdName.value, Uid: wxUid.value },
          })
          if (res.code === 200) {
            comBtnLoading.value = false
            Toast.success(res.msg)
          } else {
            comBtnLoading.value = false
            Toast.fail({
              message: res.msg,
              className: 'fail-toast',
            })
          }
        } else if (queryRes.code !== 401) {
          comBtnLoading.value = false
          Toast.fail({
            message: '没有查询到该用户在此车位，禁止提交！',
            className: 'fail-toast',
          })
        }
      } else {
        comBtnLoading.value = false
        Toast.fail({
          message: 'WxUid格式错误，请重新扫码获取！',
          className: 'fail-toast',
        })
      }

      break

    default:
      break
  }
}

const queryName = async () => {
  const query = queryJdName.value
  queryLoading.value = true
  const data = await api1.get({
    url: `/wx/getCar?pt_pin=${query}`,
  })
  if (data.code === 200) {
    queryLoading.value = false
    Notify({ type: 'success', message: '您的账号在车位1！' })
  } else if (data.code !== 401) {
    queryLoading.value = false
    const data = await api2.get({
      url: `wx/getCar?pt_pin=${query}`,
    })
    if (data.code === 200) {
      queryLoading.value = false
      Notify({ type: 'success', message: '您的账号在车位2！' })
    } else {
      queryLoading.value = false
      const data = await api3.get({
        url: `wx/getCar?pt_pin=${query}`,
      })
      if (data.code === 200) {
        queryLoading.value = false
        Notify({ type: 'success', message: '您的账号在车位3！' })
      } else {
        queryLoading.value = false
        const data = await api4.get({
          url: `wx/getCar?pt_pin=${query}`,
        })
        if (data.code === 200) {
          queryLoading.value = false
          Notify({ type: 'success', message: '您的账号在车位4！' })
        } else {
          queryLoading.value = false
          Notify({
            type: 'danger',
            message: '没有查询到此账号，请核对京东用户名！',
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.title {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
}

.title-text {
  width: 100%;
  font-size: 20px;
  font-weight: bold;
}

.resolve-box {
  width: 100%;
  align-items: center;
  text-align: center;
}

.wxImg {
  width: 200px;
  height: 200px;
}

.comBtn {
  width: 100%;
  display: flex;
  margin-top: 15px;
  justify-content: center;
}

.form-box {
  width: 100%;
  align-items: center;
}

.warn-text {
  color: red;
  align-items: center;
  text-align: center;
  font-size: 18px;
  margin-top: 10px;
}
</style>
