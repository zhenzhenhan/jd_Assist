<template>
  <div>
    <van-nav-bar class="title-text" title="京东豆车积分车组队" />

    <van-notice-bar
      left-icon="volume-o"
      text="请仔细查看本条信息！组队分为两种组队，第一种为jd_cjhy组队，第二种为jd_zdjr组队，两种不同，运行的脚本也不同。请在组队之前查看好口令解析出来的参数，在指定的位置添置好参数，点击提交！"
    />

    <h2 class="block_firstTitle">组队普通车位状态</h2>
    <div style="height: 3.4375rem">
      <div class="status-box">
        <div style="padding-right: 10px">
          <span style="font-size: 14px">车位1:</span>
          <van-tag style="margin-left: 5px" :type="carOneCjTag">
            CJ-{{ carOneCjTxt }}
          </van-tag>
          <van-tag style="margin-left: 5px" :type="carOneZdTag">
            ZD-{{ carOneZdTxt }}
          </van-tag>
        </div>
        <div style="padding-right: 10px">
          <span style="font-size: 14px">车位2:</span>
          <van-tag style="margin-left: 5px" :type="carTwoCjTag">
            CJ-{{ carTwoCjTxt }}
          </van-tag>
          <van-tag style="margin-left: 5px" :type="carTwoZdTag">
            ZD-{{ carTwoZdTxt }}
          </van-tag>
        </div>
      </div>
      <div class="status-box-item">
        <div style="padding-right: 10px">
          <span style="font-size: 14px">车位3:</span>
          <van-tag style="margin-left: 5px" :type="carThreeCjTag">
            CJ-{{ carThreeCjTxt }}
          </van-tag>
          <van-tag style="margin-left: 5px" :type="carThreeZdTag">
            ZD-{{ carThreeZdTxt }}
          </van-tag>
        </div>
      </div>
    </div>

    <h2 class="block_firstTitle">组队VIP车位状态</h2>
    <div style="height: 3.4375rem">
      <div class="status-box">
        <div style="padding-right: 10px">
          <span style="font-size: 14px">车位4:</span>
          <van-tag style="margin-left: 5px" :type="carFourCjTag">
            CJ-{{ carFourCjTxt }}
          </van-tag>
          <van-tag style="margin-left: 5px" :type="carFourZdTag">
            ZD-{{ carFourZdTxt }}
          </van-tag>
        </div>
        <div style="padding-right: 10px">
          <span style="font-size: 14px">车位5:</span>
          <van-tag style="margin-left: 5px" :type="carFiveCjTag">
            CJ-{{ carFiveCjTxt }}
          </van-tag>
          <van-tag style="margin-left: 5px" :type="carFiveZdTag">
            ZD-{{ carFiveZdTxt }}
          </van-tag>
        </div>
      </div>
      <div class="status-box-item">
        <div style="padding-right: 10px">
          <span style="font-size: 14px">车位6:</span>
          <van-tag style="margin-left: 5px" :type="carSexCjTag">
            CJ-{{ carSexCjTxt }}
          </van-tag>
          <van-tag style="margin-left: 5px" :type="carSexZdTag">
            ZD-{{ carSexZdTxt }}
          </van-tag>
        </div>
      </div>
    </div>

    <h2 class="block_title">口令解析</h2>
    <div class="resolve-box">
      <van-cell-group inset>
        <van-field
          v-model="command"
          colon
          clearable
          required
          center
          label="口令"
          placeholder="请输入京东口令"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          :disabled="!command"
          :loading="pasLoading"
          @click="check"
        >
          解析
        </van-button>
      </div>
    </div>

    <h2 class="block_title">
      <span style="color: red; font-size: 16px">CJ组队：</span
      >请填写相关参数，点击提交即可
    </h2>
    <div class="resolve-box">
      <div style="padding-top: 16px">
        <van-cell-group inset>
          <van-field
            v-model="jdName"
            is-link
            readonly
            colon
            required
            label="京东用户名"
            placeholder="选择您的京东账号"
            @click="showCjJd = true"
          />
          <van-field
            v-model="jdCj"
            colon
            clearable
            required
            center
            label="CJID"
            placeholder="请输入CJID"
          />
          <van-field
            v-model="cjCarTxt"
            is-link
            readonly
            colon
            required
            label="车位"
            placeholder="选择您要跑脚本的服务器"
            @click="showCjPicker = true"
          />
        </van-cell-group>
      </div>
      <van-popup v-model:show="showCjPicker" round position="bottom">
        <van-picker
          :columns="Columns"
          @cancel="showCjPicker = false"
          @confirm="cjConfirm"
        />
      </van-popup>
      <van-popup v-model:show="showCjJd" round position="bottom">
        <van-picker
          :columns="JdNames"
          @cancel="showCjJd = false"
          @confirm="cjJdConfirm"
        />
      </van-popup>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          :disabled="!jdName || !jdCj || !cjCarTxt"
          :loading="cjLoading"
          @click="cjSubmit"
        >
          提交
        </van-button>
      </div>
    </div>

    <h2 class="block_title">
      <span style="color: red; font-size: 16px">ZD组队：</span
      >请填写相关参数，点击提交即可
    </h2>
    <div class="resolve-box">
      <div style="padding-top: 16px">
        <van-cell-group inset>
          <van-field
            v-model="jdName2"
            is-link
            readonly
            colon
            required
            label="京东用户名"
            placeholder="选择您的京东账号"
            @click="showZdJd = true"
          />
          <van-field
            v-model="jdZd"
            colon
            clearable
            required
            center
            label="ZDID"
            placeholder="请输入ZDID"
          />
          <van-field
            v-model="zdCarTxt"
            is-link
            readonly
            colon
            required
            label="车位"
            placeholder="选择您要跑脚本的服务器"
            @click="showZdPicker = true"
          />
          <!-- <van-field
            v-model="jdVender"
            colon
            clearable
            center
            label="VenderID"
            placeholder="请输入VenderId，没有可不填！"
          /> -->
        </van-cell-group>
      </div>
      <van-popup v-model:show="showZdPicker" round position="bottom">
        <van-picker
          :columns="Columns"
          @cancel="showZdPicker = false"
          @confirm="zdConfirm"
        />
      </van-popup>
      <van-popup v-model:show="showZdJd" round position="bottom">
        <van-picker
          :columns="JdNames"
          @cancel="showZdJd = false"
          @confirm="zdJdConfirm"
        />
      </van-popup>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          :disabled="!jdName2 || !jdZd || !zdCarTxt"
          :loading="zdLoading"
          @click="zdSubmit"
        >
          提交
        </van-button>
        <!-- <van-button
          style="margin-top: 10px"
          round
          block
          type="primary"
          native-type="submit"
          @click="venExplain"
        >
          VenderID使用说明
        </van-button> -->
      </div>
    </div>

    <!-- <van-dialog
      v-model:show="dialogShow"
      width="95%"
      title="VenderID使用说明"
      theme="round-button"
      confirmButtonText="我已知晓"
    >
      <div class="dialog-box">
        <div class="dialog-title">请仔细阅读</div>
        <div class="dialog-content">
          <div style="font-size: 18px; text-align: center; margin-bottom: 10px">
            Zd组队脚本因为不会自动开卡，所以需要配合VenderID来使用。如果嫌麻烦，也可以不使用VenderID，但是不保证一定组队成功。
          </div>
          <span class="dialog-text"
            >第一步：先进入想要组队的界面，查看组队店铺名字。</span
          >
          <div class="dialog-img">
            <img src="~@/assets/imags/course1.png" alt="" />
          </div>
          <span class="dialog-text">
            第二步：搜索该店铺，并进入店铺里面，点击右上角三个小点，然后复制链接。
          </span>
          <div class="dialog-img">
            <img src="~@/assets/imags/course2.png" alt="" />
          </div>
          <span class="dialog-text">
            第三步：打开您手机上的任意浏览器，粘贴您复制的链接，进入店铺，然后点击右下角店铺会员。
          </span>
          <div class="dialog-img">
            <img src="~@/assets/imags/course3.png" alt="" />
          </div>
          <span class="dialog-text"> 第四步：点击浏览器链接 </span>
          <div class="dialog-img">
            <img src="~@/assets/imags/course4.png" alt="" />
          </div>
          <span class="dialog-text">
            第五步：在链接中找到venderId，然后复制后面的数字，把它填入到VenderID里面，这样就可以百分百组队成功了。
          </span>
          <div class="dialog-img">
            <img src="~@/assets/imags/course5.png" alt="" />
          </div>
        </div>
      </div>
    </van-dialog> -->
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { hRequest, api1, api2, api3, api4, api5, api6, jdCodeApi } from '@/lib'
import { Toast, Notify, Dialog } from 'vant'
import useStatus from '@/lib/useStatus'

const VanDialog = Dialog.Component
const jdName = ref()
const jdCj = ref()
const cjCarTxt = ref()
const cjCar = ref()
const showCjPicker = ref(false)
const Columns = ['车位1', '车位2', '车位3', '车位4', '车位5', '车位6']
const JdNames = ref([])
const cjLoading = ref(false)
const jdName2 = ref()
const jdZd = ref()
const jdVender = ref()
const zdCarTxt = ref()
const zdCar = ref()
const showZdPicker = ref(false)
const zdLoading = ref(false)
const dialogShow = ref(false)
const showCjJd = ref(false)
const showZdJd = ref(false)

let carOneCjTag = ref()
let carOneCjTxt = ref()
let carTwoCjTag = ref()
let carTwoCjTxt = ref()
let carThreeCjTag = ref()
let carThreeCjTxt = ref()
let carFourCjTag = ref()
let carFourCjTxt = ref()
let carFiveCjTag = ref()
let carFiveCjTxt = ref()
let carSexCjTag = ref()
let carSexCjTxt = ref()

let carOneZdTag = ref()
let carOneZdTxt = ref()
let carTwoZdTag = ref()
let carTwoZdTxt = ref()
let carThreeZdTag = ref()
let carThreeZdTxt = ref()
let carFourZdTag = ref()
let carFourZdTxt = ref()
let carFiveZdTag = ref()
let carFiveZdTxt = ref()
let carSexZdTag = ref()
let carSexZdTxt = ref()

onMounted(async () => {
  // 获取京东用户名
  const nameRes = await hRequest.get({
    url: 'users/getJdName',
  })
  if (nameRes.code === 200) {
    JdNames.value = nameRes.jdnames
  }

  setTimeout(async () => {
    const resCjOne = await useStatus('/api1/wx/getCjStatus')
    carOneCjTag.value = resCjOne.carTag
    carOneCjTxt.value = resCjOne.carTxt
  }, 0)
  setTimeout(async () => {
    const resZdOne = await useStatus('/api1/wx/getZdStatus')
    carOneZdTag.value = resZdOne.carTag
    carOneZdTxt.value = resZdOne.carTxt
  }, 0)
  setTimeout(async () => {
    const resCjTwo = await useStatus('/api2/wx/getCjStatus')
    carTwoCjTag.value = resCjTwo.carTag
    carTwoCjTxt.value = resCjTwo.carTxt
  }, 0)
  setTimeout(async () => {
    const resZdTwo = await useStatus('/api2/wx/getZdStatus')
    carTwoZdTag.value = resZdTwo.carTag
    carTwoZdTxt.value = resZdTwo.carTxt
  }, 0)
  setTimeout(async () => {
    const resCjThree = await useStatus('/api3/wx/getCjStatus')
    carThreeCjTag.value = resCjThree.carTag
    carThreeCjTxt.value = resCjThree.carTxt
  }, 0)
  setTimeout(async () => {
    const resZdThree = await useStatus('/api3/wx/getZdStatus')
    carThreeZdTag.value = resZdThree.carTag
    carThreeZdTxt.value = resZdThree.carTxt
  }, 0)
  setTimeout(async () => {
    const resCjFour = await useStatus('/api4/wx/getCjStatus')
    carFourCjTag.value = resCjFour.carTag
    carFourCjTxt.value = resCjFour.carTxt
  }, 0)
  setTimeout(async () => {
    const resZdFour = await useStatus('/api4/wx/getZdStatus')
    carFourZdTag.value = resZdFour.carTag
    carFourZdTxt.value = resZdFour.carTxt
  }, 0)
  setTimeout(async () => {
    const resCjFour = await useStatus('/api5/wx/getCjStatus')
    carFiveCjTag.value = resCjFour.carTag
    carFiveCjTxt.value = resCjFour.carTxt
  }, 0)
  setTimeout(async () => {
    const resZdFour = await useStatus('/api5/wx/getZdStatus')
    carFiveZdTag.value = resZdFour.carTag
    carFiveZdTxt.value = resZdFour.carTxt
  }, 0)
  setTimeout(async () => {
    const resCjFour = await useStatus('/api6/wx/getCjStatus')
    carSexCjTag.value = resCjFour.carTag
    carSexCjTxt.value = resCjFour.carTxt
  }, 0)
  setTimeout(async () => {
    const resZdFour = await useStatus('/api6/wx/getZdStatus')
    carSexZdTag.value = resZdFour.carTag
    carSexZdTxt.value = resZdFour.carTxt
  }, 0)
})

const time = setInterval(() => {
  setTimeout(async () => {
    const resCjOne = await useStatus('/api1/wx/getCjStatus')
    carOneCjTag.value = resCjOne.carTag
    carOneCjTxt.value = resCjOne.carTxt
  }, 0)
  setTimeout(async () => {
    const resZdOne = await useStatus('/api1/wx/getZdStatus')
    carOneZdTag.value = resZdOne.carTag
    carOneZdTxt.value = resZdOne.carTxt
  }, 0)
  setTimeout(async () => {
    const resCjTwo = await useStatus('/api2/wx/getCjStatus')
    carTwoCjTag.value = resCjTwo.carTag
    carTwoCjTxt.value = resCjTwo.carTxt
  }, 0)
  setTimeout(async () => {
    const resZdTwo = await useStatus('/api2/wx/getZdStatus')
    carTwoZdTag.value = resZdTwo.carTag
    carTwoZdTxt.value = resZdTwo.carTxt
  }, 0)
  setTimeout(async () => {
    const resCjThree = await useStatus('/api3/wx/getCjStatus')
    carThreeCjTag.value = resCjThree.carTag
    carThreeCjTxt.value = resCjThree.carTxt
  }, 0)
  setTimeout(async () => {
    const resZdThree = await useStatus('/api3/wx/getZdStatus')
    carThreeZdTag.value = resZdThree.carTag
    carThreeZdTxt.value = resZdThree.carTxt
  }, 0)
  setTimeout(async () => {
    const resCjFour = await useStatus('/api4/wx/getCjStatus')
    carFourCjTag.value = resCjFour.carTag
    carFourCjTxt.value = resCjFour.carTxt
  }, 0)
  setTimeout(async () => {
    const resZdFour = await useStatus('/api4/wx/getZdStatus')
    carFourZdTag.value = resZdFour.carTag
    carFourZdTxt.value = resZdFour.carTxt
  }, 0)
  setTimeout(async () => {
    const resCjFour = await useStatus('/api5/wx/getCjStatus')
    carFiveCjTag.value = resCjFour.carTag
    carFiveCjTxt.value = resCjFour.carTxt
  }, 0)
  setTimeout(async () => {
    const resZdFour = await useStatus('/api5/wx/getZdStatus')
    carFiveZdTag.value = resZdFour.carTag
    carFiveZdTxt.value = resZdFour.carTxt
  }, 0)
  setTimeout(async () => {
    const resCjFour = await useStatus('/api6/wx/getCjStatus')
    carSexCjTag.value = resCjFour.carTag
    carSexCjTxt.value = resCjFour.carTxt
  }, 0)
  setTimeout(async () => {
    const resZdFour = await useStatus('/api6/wx/getZdStatus')
    carSexZdTag.value = resZdFour.carTag
    carSexZdTxt.value = resZdFour.carTxt
  }, 0)
}, 5000)

onBeforeUnmount(() => {
  clearInterval(time)
})

const venExplain = () => {
  dialogShow.value = true
}

const cjConfirm = (value, index) => {
  cjCarTxt.value = value
  cjCar.value = index + 1
  showCjPicker.value = false
}

const zdConfirm = (value, index) => {
  zdCarTxt.value = value
  zdCar.value = index + 1
  showZdPicker.value = false
}

const cjJdConfirm = (value, index) => {
  jdName.value = value
  showCjJd.value = false
}

const zdJdConfirm = (value, index) => {
  jdName2.value = value
  showZdJd.value = false
}

const cjSubmit = async () => {
  cjLoading.value = true
  switch (cjCar.value) {
    case 1:
      if (jdCj.value.length === 32) {
        const res = await api1.post({
          url: 'wx/getCj',
          data: {
            pt_pin: jdName.value,
            cjId: jdCj.value,
          },
        })
        if (res.code === 200) {
          Toast.success(res.msg)
          cjLoading.value = false
        } else if (res.code !== 401) {
          Toast.fail({
            message: res.msg,
            className: 'fail-toast',
          })
          cjLoading.value = false
        }
      } else {
        Toast.fail({
          message: 'CJID长度不正确',
          className: 'fail-toast',
        })
        cjLoading.value = false
      }
      break
    case 2:
      if (jdCj.value.length === 32) {
        const res = await api2.post({
          url: 'wx/getCj',
          data: {
            pt_pin: jdName.value,
            cjId: jdCj.value,
          },
        })
        if (res.code === 200) {
          Toast.success(res.msg)
          cjLoading.value = false
        } else if (res.code !== 401) {
          Toast.fail({
            message: res.msg,
            className: 'fail-toast',
          })
          cjLoading.value = false
        }
      } else {
        Toast.fail({
          message: 'CJID长度不正确',
          className: 'fail-toast',
        })
        cjLoading.value = false
      }
      break
    case 3:
      if (jdCj.value.length === 32) {
        const res = await api3.post({
          url: 'wx/getCj',
          data: {
            pt_pin: jdName.value,
            cjId: jdCj.value,
          },
        })
        if (res.code === 200) {
          Toast.success(res.msg)
          cjLoading.value = false
        } else if (res.code !== 401) {
          Toast.fail({
            message: res.msg,
            className: 'fail-toast',
          })
          cjLoading.value = false
        }
      } else {
        Toast.fail({
          message: 'CJID长度不正确',
          className: 'fail-toast',
        })
        cjLoading.value = false
      }
      break
    case 4:
      if (jdCj.value.length === 32) {
        const res = await api4.post({
          url: 'wx/getCj',
          data: {
            pt_pin: jdName.value,
            cjId: jdCj.value,
          },
        })
        if (res.code === 200) {
          Toast.success(res.msg)
          cjLoading.value = false
        } else if (res.code !== 401) {
          Toast.fail({
            message: res.msg,
            className: 'fail-toast',
          })
          cjLoading.value = false
        }
      } else {
        Toast.fail({
          message: 'CJID长度不正确',
          className: 'fail-toast',
        })
        cjLoading.value = false
      }
      break
    case 5:
      if (jdCj.value.length === 32) {
        const res = await api5.post({
          url: 'wx/getCj',
          data: {
            pt_pin: jdName.value,
            cjId: jdCj.value,
          },
        })
        if (res.code === 200) {
          Toast.success(res.msg)
          cjLoading.value = false
        } else if (res.code !== 401) {
          Toast.fail({
            message: res.msg,
            className: 'fail-toast',
          })
          cjLoading.value = false
        }
      } else {
        Toast.fail({
          message: 'CJID长度不正确',
          className: 'fail-toast',
        })
        cjLoading.value = false
      }
      break
    case 6:
      if (jdCj.value.length === 32) {
        const res = await api6.post({
          url: 'wx/getCj',
          data: {
            pt_pin: jdName.value,
            cjId: jdCj.value,
          },
        })
        if (res.code === 200) {
          Toast.success(res.msg)
          cjLoading.value = false
        } else if (res.code !== 401) {
          Toast.fail({
            message: res.msg,
            className: 'fail-toast',
          })
          cjLoading.value = false
        }
      } else {
        Toast.fail({
          message: 'CJID长度不正确',
          className: 'fail-toast',
        })
        cjLoading.value = false
      }
      break

    default:
      break
  }
}

const zdSubmit = async () => {
  zdLoading.value = true
  switch (zdCar.value) {
    case 1:
      if (jdZd.value.length === 32) {
        const res = await api1.post({
          url: 'wx/getZd',
          data: {
            pt_pin: jdName2.value,
            zdId: jdZd.value,
            venderId: jdVender.value,
          },
        })
        if (res.code === 200) {
          Toast.success(res.msg)
          zdLoading.value = false
        } else if (res.code !== 401) {
          Toast.fail({
            message: res.msg,
            className: 'fail-toast',
          })
          zdLoading.value = false
        }
      } else {
        Toast.fail({
          message: 'ZDID长度不正确',
          className: 'fail-toast',
        })
        zdLoading.value = false
      }
      break
    case 2:
      if (jdZd.value.length === 32) {
        const res = await api2.post({
          url: 'wx/getZd',
          data: {
            pt_pin: jdName2.value,
            zdId: jdZd.value,
            venderId: jdVender.value,
          },
        })
        if (res.code === 200) {
          Toast.success(res.msg)
          zdLoading.value = false
        } else if (res.code !== 401) {
          Toast.fail({
            message: res.msg,
            className: 'fail-toast',
          })
          zdLoading.value = false
        }
      } else {
        Toast.fail({
          message: 'ZDID长度不正确',
          className: 'fail-toast',
        })
        zdLoading.value = false
      }
      break
    case 3:
      if (jdZd.value.length === 32) {
        const res = await api3.post({
          url: 'wx/getZd',
          data: {
            pt_pin: jdName2.value,
            zdId: jdZd.value,
            venderId: jdVender.value,
          },
        })
        if (res.code === 200) {
          Toast.success(res.msg)
          zdLoading.value = false
        } else if (res.code !== 401) {
          Toast.fail({
            message: res.msg,
            className: 'fail-toast',
          })
          zdLoading.value = false
        }
      } else {
        Toast.fail({
          message: 'ZDID长度不正确',
          className: 'fail-toast',
        })
        zdLoading.value = false
      }
      break
    case 4:
      if (jdZd.value.length === 32) {
        const res = await api4.post({
          url: 'wx/getZd',
          data: {
            pt_pin: jdName2.value,
            zdId: jdZd.value,
            venderId: jdVender.value,
          },
        })
        if (res.code === 200) {
          Toast.success(res.msg)
          zdLoading.value = false
        } else if (res.code !== 401) {
          Toast.fail({
            message: res.msg,
            className: 'fail-toast',
          })
          zdLoading.value = false
        }
      } else {
        Toast.fail({
          message: 'ZDID长度不正确',
          className: 'fail-toast',
        })
        zdLoading.value = false
      }
      break
    case 5:
      if (jdZd.value.length === 32) {
        const res = await api5.post({
          url: 'wx/getZd',
          data: {
            pt_pin: jdName2.value,
            zdId: jdZd.value,
            venderId: jdVender.value,
          },
        })
        if (res.code === 200) {
          Toast.success(res.msg)
          zdLoading.value = false
        } else if (res.code !== 401) {
          Toast.fail({
            message: res.msg,
            className: 'fail-toast',
          })
          zdLoading.value = false
        }
      } else {
        Toast.fail({
          message: 'ZDID长度不正确',
          className: 'fail-toast',
        })
        zdLoading.value = false
      }
      break
    case 6:
      if (jdZd.value.length === 32) {
        const res = await api6.post({
          url: 'wx/getZd',
          data: {
            pt_pin: jdName2.value,
            zdId: jdZd.value,
            venderId: jdVender.value,
          },
        })
        if (res.code === 200) {
          Toast.success(res.msg)
          zdLoading.value = false
        } else if (res.code !== 401) {
          Toast.fail({
            message: res.msg,
            className: 'fail-toast',
          })
          zdLoading.value = false
        }
      } else {
        Toast.fail({
          message: 'ZDID长度不正确',
          className: 'fail-toast',
        })
        zdLoading.value = false
      }
      break
    default:
      break
  }
}

//口令解析
const command = ref()
const pasLoading = ref(false)

const check = async () => {
  pasLoading.value = true
  await jdCodeApi
    .post({
      url: '/token/jdcode',
      data: {
        code: command.value,
      },
    })
    .then((ResData) => {
      const resData = ResData.res
      if (resData.code === 200) {
        pasLoading.value = false
        if (
          resData.data.jumpUrl.slice(0, 32) ==
          'https://lzkjdz-isv.isvjcloud.com'
        ) {
          if (resData.data.jumpUrl.indexOf('activityId') != -1) {
            const str = resData.data.jumpUrl.match(/activityId=(\S*)/)[1]
            jdZd.value = str.slice(0, 32)
            Notify({
              type: 'success',
              message: '解析成功，已为您自动填写到ID中！',
            })
          } else {
            Toast.fail({
              message: '此口令不是组队口令，请核对后再试！',
              className: 'fail-toast',
            })
          }
        } else if (
          resData.data.jumpUrl.slice(0, 32) ==
          'https://cjhydz-isv.isvjcloud.com'
        ) {
          const str = resData.data.jumpUrl.match(/activityId=(\S*)/)[1]
          jdCj.value = str.slice(0, 32)
          Notify({
            type: 'success',
            message: '解析成功，已为您自动填写到ID中！',
          })
        } else {
          Toast.fail({
            message: '此口令不是组队口令，请核对后再试！',
            className: 'fail-toast',
          })
        }
      } else if (resData.code === 401) {
        pasLoading.value = false
        Toast.fail({
          message: resData.msg,
          className: 'fail-toast',
        })
      } else {
        pasLoading.value = false
        Toast.fail({
          message: '口令有误！请检查口令是否正确！',
          className: 'fail-toast',
        })
      }
    })
    .catch((err) => {
      pasLoading.value = false
      Toast.fail({
        message: '解析失败，接口异常或口令有误！',
        className: 'fail-toast',
      })
    })
}
</script>

<style scoped>
.title-text {
  width: 100%;
  font-size: 20px;
  font-weight: bold;
}

.resolve-box {
  width: 100%;
  height: 100%;
  background-color: #f7f8fa;
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

.status-box {
  width: 100%;
  display: flex;
  margin-bottom: 16px;
  justify-content: center;
}

.status-box-item {
  width: 80%;
  margin-bottom: 16px;
  margin-left: 28px;
}

.warn-text {
  color: red;
  align-items: center;
  text-align: center;
  font-size: 18px;
  margin-top: 10px;
}
.res-box {
  height: 170px;
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 20px 20px;
  /* margin: 20px 0; */
}

.res-title {
  width: 100%;
  height: 100%;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  word-break: break-all;
}

.float-box {
  padding-right: 5px;
  position: relative;
}

.float-span {
  float: left;
  height: 44px;
  font-size: 14px;
  line-height: 44px;
}

.status-tag-cj {
  margin-left: 2px;
  width: 50%;
}

.status-tag-zd {
  margin-left: 2px;
  width: 50%;
}

.dialog-box {
  width: 100%;
  height: 31.25rem;
  overflow-y: auto;
  background-color: #fff;
  align-items: center;
}

.dialog-title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
}

.dialog-content {
  margin: 15px;
}

.dialog-text {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.dialog-content img {
  width: 80%;
  height: 80%;
  margin-bottom: 20px;
}

.dialog-img {
  text-align: center;
}
</style>
