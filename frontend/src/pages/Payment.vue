<template>
  <v-app>
    <navigation app color="secondary" :flat="true" />
    <bar-nav />
    <v-main class="mx-5">
        <v-card>
          <v-card-title>Pago a ver q hay</v-card-title>
          <v-card-text>
            
          </v-card-text>
        </v-card>
    </v-main>
    <foote />
  </v-app>
</template>

<script>
import navigation from "../components/store/Navigation";
import foote from "../components/home/Footer";
import { mapState, mapMutations } from 'vuex'
import BarNav from '../components/store/barNav.vue';
// import axios from "axios"

export default {
  name: "App",
  components: {
    navigation,
    foote,
    BarNav
  },

  data: () => ({
    
  }),
  computed: {
    ...mapState('app',['searched']),
    ...mapState('cart',['items']),
 
  },

  created() {
 
  },

  methods: {
    ...mapMutations('app',['TOGGLE_SEARCH']),
    textI18(item){
      if(!item.texts)
        return ''
      let curr = this.$i18n.locale;
      return item.texts.find(it=>it.lang == curr)
    },
  },
};
</script>

<style scoped>
.v-main {
  background-image: url("~@/assets/img/bgMain.png");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>
