import localStorageUtil from "../../utils/storageUtil"
export default  {
    namespaced: true,
    state: {
        windowS:{ 
            width: window.innerWidth,
            height: window.innerHeight
        },
        auth:false,
        user:{},
        token:''
    },
    mutations: {
       
    },

    actions: {
      initWindows({state},sizes){
        state.windowS = sizes
      },
      login({state},response){
          if(response.data.status == 'success'){
            state.auth = true;
            state.user = response.data.user;
            localStorageUtil.setSecure(state.user,'user')
          }
      },
      logout({state}){
        state.auth = false;
        state.user = null;
        localStorageUtil.clear('user');
      },
      initApp({state}){
          let user = localStorageUtil.getSecure('user');
          if(user){
            state.auth = true;
            state.user = user
          }
      },
    }
}