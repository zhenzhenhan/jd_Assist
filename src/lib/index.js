import YHRequest from './req'
import LocalCache from './cache'

// http://124.222.215.105:3333/
// 如果有不同的请求地址，就给它导出两个
const hRequest = new YHRequest({
  baseURL: '/api/',
  timeout: 60000,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = LocalCache.getCache('JD_TOKEN')

      if (token) {
        config.headers.Authorization = token
      }
      return config
    },
  },
})

const api1 = new YHRequest({
  baseURL: '/api1/',
  timeout: 60000,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = LocalCache.getCache('JD_TOKEN')

      if (token) {
        config.headers.Authorization = token
      }
      return config
    },
  },
})

const api2 = new YHRequest({
  baseURL: '/api2/',
  timeout: 60000,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = LocalCache.getCache('JD_TOKEN')

      if (token) {
        config.headers.Authorization = token
      }
      return config
    },
  },
})

const api3 = new YHRequest({
  baseURL: '/api3/',
  timeout: 60000,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = LocalCache.getCache('JD_TOKEN')

      if (token) {
        config.headers.Authorization = token
      }
      return config
    },
  },
})

const api4 = new YHRequest({
  baseURL: '/api4/',
  timeout: 60000,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = LocalCache.getCache('JD_TOKEN')

      if (token) {
        config.headers.Authorization = token
      }
      return config
    },
  },
})

const api5 = new YHRequest({
  baseURL: '/api5/',
  timeout: 60000,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = LocalCache.getCache('JD_TOKEN')

      if (token) {
        config.headers.Authorization = token
      }
      return config
    },
  },
})

const api6 = new YHRequest({
  baseURL: '/api6/',
  timeout: 60000,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = LocalCache.getCache('JD_TOKEN')

      if (token) {
        config.headers.Authorization = token
      }
      return config
    },
  },
})

const jdCodeApi = new YHRequest({
  baseURL: 'http://52.237.118.236:2333',
  timeout: 60000,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = LocalCache.getCache('JD_TOKEN')

      if (token) {
        config.headers.Authorization = token
      }
      return config
    },
  },
})

export { hRequest, api1, api2, api3, api4, api5, api6, jdCodeApi }
