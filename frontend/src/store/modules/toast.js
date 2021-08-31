export default  {
    namespaced: true,
    state: {
      toast:false,
      text_toast:'',
      color_toast:'primary',
      time_toast:2000
    },

    mutations: {
     
    },

    actions: {
      launchToast({state},options){
        state.text_toast = options.text;
        if(options.color)
          state.color_toast = options.color;
        state.toast = true;
      },
      setToast({state},val){
        state.toast = val
      }

    },
}