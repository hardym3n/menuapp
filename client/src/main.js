import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './scss/main.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import DefaultLayout from './layouts/DefaultLayout.vue'


Vue.component('default-layout', DefaultLayout)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
