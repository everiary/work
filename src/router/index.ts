import { createRouter, createWebHistory } from 'vue-router'
/*const _isMobile = () => {
  const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag;
}*/
const pcr = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/homework',
    name: 'homework',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/MainView.vue')
  }
]
/*const mbr = [
  {
    path: '/',
    name: 'home',
    component: () => import('../MobileApp.vue')
  }
]*/

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: pcr
})
  //routes: _isMobile() ? mbr : pcr

export default router
