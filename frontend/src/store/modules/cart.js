import localStorageUtil from "../../utils/storageUtil"
export default  {
    namespaced: true,
    state: {
      items:[]
    },

    mutations: {
     
    },

    actions: {
      load_storage_cart({state}){
        let all = localStorageUtil.get('cart');
        if(all)
          state.items = all;
      },
      countItems({state}){
        return state.items.length
      },
      totalPrice({state}){
        let t = state.items.reduce((old,ne)=>old+ne.price*ne.quantity, 0)
        return t;
      },
      addToCart({state,dispatch},val){
         let i = state.items.findIndex(el=>el.product == val.product)
        if(i!=-1)
          state.items[i].quantity+=val.quantity;
        else
          state.items.push(val)
        localStorageUtil.set(state.items, 'cart')

        dispatch('toast/launchToast',{
          text:'store.cart.product_added',
          color:'primary'
        },{root:true});
      },
      removeToCart({state, dispatch},val){
       let i = state.items.findIndex(el=>el.product == val.product)
        if(i!=-1){
          state.items.splice(state.items.findIndex(el=>el.product == val.product),1)
          localStorageUtil.set(state.items, 'cart')

           dispatch('toast/launchToast',{
            text:'store.cart.product_remove',
            color:'error'
          },{root:true});
        }
      },
      remove_one({state,dispatch},product){
        let i = state.items.findIndex(el=>el.product == product.product);
        if(i!=-1){
          state.items[i].quantity --;
          
          if(state.items[i].quantity ==0){
            state.items.splice(i,1)
          }
          localStorageUtil.set(state.items, 'cart')
           dispatch('toast/launchToast',{
            text:'store.cart.product_remove',
            color:'error'
          },{root:true});
        }
      }
    },
}