export default  {
    namespaced: true,
    state: {
       loading:false
    },

    mutations: {
      TOOGLE_LOADING({state}){
        state.loading = ! state.loading;
      }
    },

    actions: {
      async load({state}){
        state.loading = true;
      },
      async loadFinish({state}){
        state.loading = false;
      },
      async toogleLoading({commit}){
        commit('TOOGLE_LOADING')
      }
    },
}