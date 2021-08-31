export default  {
    namespaced: true,
    state: {
      products:[],
      category:'',
      subcategory:'',
      categories:[],
      search:'',
      page:1,
      query:{},
      stock:false,
      searched:false
    },

    mutations: {
      TOGGLE_SEARCH(state) {
        state.searched = !state.searched
      },
      TOGGLE_STOCK(state) {
        state.stock = !state.stock
      },
      SET_SEARCH(state,val) {
        state.search = val
      },
      SET_QUERYVAL(state,val) {
        state.query[val.key] = val.value
      },
      SET_CATEGORY(state,val) {
        state.category = val
      },
      SET_SUBCATEGORY(state,val) {
        state.subcategory = val
      }
    },

    actions: {
      async findProducts({state}){

        let encodeQueryData = ()=> {
          let data = state.query
          const ret = [];
          for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
          return ret.join('&');
        }
        let uri = `/products?page=${state.page}`
        
        if(state.category || state.subcategory){
          if(state.category){
            uri+=`&category=${state.category}`
          }
          if(state.subcategory){
            uri+=`&subcategory=${state.subcategory}`
          }
        }
        else{
          uri+=`&${encodeQueryData()}`
        }

        if(state.stock){
          uri+=`&stock[gte]=1`
        }
        
        if(state.search){
          uri+=`&keyword=${state.search}`
        }
        this._vm.$axios.get(uri).then(res=>{
          state.products = res.data.data
          return state.products;
        }).catch(err=>{
          console.log(err)
          return err.response;
        })
      },
      setSearchValue({commit},val){
        commit('SET_SEARCH',val)
      }
    },
}