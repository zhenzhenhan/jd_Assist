import { createRouter, createWebHistory } from 'vue-router'
import LocalCache from '@/lib/cache'

const WxPush = () => import('@/views/wxpush')
const JdTeam = () => import('@/views/jdteam')
const User = () => import('@/views/user')
const Login = () => import('@/views/login')
const SignUp = () => import('@/views/signup')
const Forget = () => import('@/views/forget')
const JdLogin = () => import('@/views/jdlogin')

const routes = [
  {
    path: '/',
    name: 'WxPush',
    component: WxPush,
    meta: { title: 'HanJDC-JDWxPush推送' },
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: { title: 'HanJDC-我的' },
  },
  {
    path: '/jdteam',
    name: 'JdTeam',
    component: JdTeam,
    meta: { title: 'HanJDC-JD组队' },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'HanJDC-登录',
      showNav: true,
    },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      title: 'HanJDC-注册',
      showNav: true,
    },
  },
  {
    path: '/forget',
    name: 'Forget',
    component: Forget,
    meta: {
      title: 'HanJDC-忘记密码',
      showNav: true,
    },
  },
  {
    path: '/jdlogin',
    name: 'JdLogin',
    component: JdLogin,
    meta: {
      title: 'HanJDC-JDLogin',
      showNav: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // 路由守卫
  const token = LocalCache.getCache('JD_TOKEN')
  if (to.path == '/login' && !token) {
    return next()
  }
  if (to.path == '/signup' && !token) {
    return next()
  }
  if (to.path == '/forget' && !token) {
    return next()
  }
  if (!token) {
    return next('/login')
  } else if (to.path == '/login' && token) {
    return next('/')
  }

  next()
})

export default router
