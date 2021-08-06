
export default  {
    namespaced: true,
    state: {
        searched:false,
    },

    mutations: {
        TOGGLE_SEARCH(state) {
            state.searched = !state.searched
        }
    },

    actions: {
      
    },

    getters: {

    }

}