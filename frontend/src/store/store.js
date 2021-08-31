import Vue from 'vue'
import Vuex from 'vuex'

//  MODULOS IMPORTADOS
import app from './modules/app'
import products from './modules/products'
import loading from './modules/loading'
import cart from './modules/cart'
import toast from './modules/toast'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      app,
      products,
      loading,
      toast,
      cart
    },
})