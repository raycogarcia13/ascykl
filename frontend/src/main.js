import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import axios from '@/plugins/axios'
import store from './store/store'
import vuetify from './plugins/vuetify'
import VueI18n from "vue-i18n"  
import i18n from './lang/index'

Vue.config.productionTip = false

Vue.use({
    install (Vue) {
      Vue.prototype.$axios = axios
      Vue.prototype.$uri = "http://localhost:3000/"
  }
})

Vue.use(VueI18n);

store.dispatch('app/initApp');

new Vue({
  vuetify,
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
