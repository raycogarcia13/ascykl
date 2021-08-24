<template>
  <router-view></router-view>
</template>

<script>

import { mapState, mapActions } from 'vuex'; 
export default {
  name: 'App',
  computed: {
    ...mapState('app',['windowS'])
    
  },
  methods: {
    ...mapActions('app',['initWindows'])
  },
  mounted() {
    if(!this.windwowS)
    {
      const size = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      this.initWindows(size)
    }
  },
};
</script>
<style>
  a{
    text-decoration: none;
    color:#ffffff !important;
  }
  
ul li::before{
  display: none;
}

</style>
