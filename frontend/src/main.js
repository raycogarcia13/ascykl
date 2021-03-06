import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import axios from '@/plugins/axios'
import store from './store/store'
import vuetify from './plugins/vuetify'
import VueI18n from "vue-i18n"  
import i18n from './lang/index'
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'

Vue.config.productionTip = false

Vue.use({
    install (Vue) {
      Vue.prototype.$axios = axios
      Vue.prototype.$uri = '/static'
  }
})

console.log(window.location.href);

Vue.use(VueI18n);

Vue.use(TiptapVuetifyPlugin, {
  vuetify, // same as "vuetify: vuetify"
  iconsGroup: 'mdi'
})

router.beforeEnter = (to, from, next)=>{
  if(to === from){
    window.location.reload()
  }
   return next()
}


store.dispatch('app/initApp');
store.dispatch('cart/load_storage_cart');

new Vue({
  vuetify,
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
