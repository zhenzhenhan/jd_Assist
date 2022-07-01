import axios from 'axios'
import LocalCache from './cache'
import { Toast } from 'vant'

const DEFAULT_LOADING = false

class YHRequest {
  instance
  interceptors
  showLoading
  constructor(config) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 使用拦截器
    // 请求拦截
    this.instance.interceptors.request.use(
      this.interceptors.requestInterceptor,
      this.interceptors.requestInterceptorCatch
    )
    // 响应拦截
    this.instance.interceptors.response.use(
      this.interceptors.responseInterceptor,
      this.interceptors.responseInterceptorCatch
    )

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data
        if (data.code === 401) {
          // token过期，删除token，退出登录
          LocalCache.deleteCache('JD_TOKEN')
          Toast.fail('登录过期，请重新登录')
          // 跳转到登录页面
          setTimeout(() => {
            window.location.href = '/login'
          }, 2000)
        }
        return data
      },
      (err) => {
        return err
      }
    )
  }

  request(config) {
    return new Promise((resolve, reject) => {
      // 单独请求对config的处理
      // 给单独的请求加单独的拦截器
      if (config.interceptors) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 如果单独的请求传过来的showloading为false，则不显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      // 单独请求对数据的处理
      this.instance.request(config).then(
        (res) => {
          if (config.interceptors) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 将showloading设置为true，不会影响到下一个请求
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        },
        (err) => {
          // 将showloading设置为true，不会影响到下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        }
      )
    })
  }

  get(config) {
    return this.request({ ...config, method: 'GET' })
  }

  post(config) {
    return this.request({ ...config, method: 'POST' })
  }

  delete(config) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch(config) {
    return this.request({ ...config, method: 'PATCH' })
  }

  put(config) {
    return this.request({ ...config, method: 'PUT' })
  }
}

export default YHRequest
