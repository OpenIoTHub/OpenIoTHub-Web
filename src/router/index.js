import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/novnc',
      name: 'novnc',
      component: resolve => require(['@/components/vnc/novnc'], resolve),
      meta: {title: 'VNCScr'}
    },
    {
      path: '/',
      component: resolve => require(['@/components/common/index'], resolve),
      redirect: 'session',
      meta: {title: '管理平台'},
      children: [
        {
          path: '/session',
          name: 'session',
          component: resolve => require(['@/components/session/session'], resolve),
          meta: {title: '会话'}
        },
        {
          path: '/tcp',
          name: 'tcp',
          component: resolve => require(['@/components/tcp/tcp'], resolve),
          meta: {title: 'Tcp'}
        },
        {
          path: '/udp',
          name: 'udp',
          component: resolve => require(['@/components/udp/udp'], resolve),
          meta: {title: 'Udp'}
        },
        {
          path: '/http',
          name: 'http',
          component: resolve => require(['@/components/http/http'], resolve),
          meta: {title: 'Http'}
        },
        {
          path: '/ftp',
          name: 'ftp',
          component: resolve => require(['@/components/ftp/ftp'], resolve),
          meta: {title: 'Ftp'}
        },
        {
          path: '/ssh',
          name: 'ssh',
          component: resolve => require(['@/components/ssh/ssh'], resolve),
          meta: {title: 'SSH'}
        },
        {
          path: '/vnc',
          name: 'vnc',
          component: resolve => require(['@/components/vnc/vnc'], resolve),
          meta: {title: 'VNC'}
        },
        {
          path: '/setting',
          name: 'setting',
          component: resolve => require(['@/components/setting/setting'], resolve),
          meta: {title: '设置'}
        },
      ]
    },
  ]
})
