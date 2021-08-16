<template>
  <v-app>
    <navigation app color="secondary" :flat="true" />
    <v-main class="mt-5">
      <!-- buscador en movil -->
      <v-row class="d-flex d-md-none mb-3">
        <v-col cols="12">
          <v-app-bar dense elevation="0" color="rgba(255,255,255,0)">
            <v-spacer></v-spacer>
             <v-slide-x-reverse-transition>
                <v-text-field
                  solo
                  rounded
                  light
                  hide-details
                  dense
                  v-if="searched"
                  color="primary darken-2"
                  :label="$t('search')"
                  append-icon="mdi-send"
                ></v-text-field>
               </v-slide-x-reverse-transition>
            <v-spacer></v-spacer>
            <v-btn icon :color="searched?'primary':''" @click.stop="TOGGLE_SEARCH">
              <v-icon>mdi-search-web</v-icon>
            </v-btn>
          </v-app-bar>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <!-- categorias en sm to lg -->
        <v-col cols="12" md="12">
            <categories />
        </v-col>
        <v-col md="12" cols="12">
            <!-- component products -->
            <products />
            <!-- pagination -->
            <div class="text-center my-5">
              <v-pagination
                v-model="page"
                :length="4"
                circle
              ></v-pagination>

            </div>
        </v-col>
      </v-row>
    </v-main>
    <foote />
  </v-app>
</template>

<script>
import categories from "../components/store/Categories.vue";
import navigation from "../components/store/Navigation";
import products from "../components/store/Products.vue";
import foote from "../components/home/Footer";
import { mapState, mapMutations } from 'vuex'

export default {
  name: "App",

  components: {
    navigation,
    categories,
    products,
    foote
  },

  data: () => ({
    fab: null,
    color: "",
    flat: null,
    page:1,
  }),
  computed: {
    ...mapState('app',['searched'])
  },

  created() {
    const top = window.pageYOffset || 0;
    if (top <= 60) {
      this.color = "transparent";
      this.flat = true;
    }
  },

  watch: {
    fab(value) {
      if (value) {
        this.color = "secondary";
        this.flat = false;
      } else {
        this.color = "transparent";
        this.flat = true;
      }
    },
  },

  methods: {
    ...mapMutations('app',['TOGGLE_SEARCH']),

    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 60;
    },
    toTop() {
      this.$vuetify.goTo(0);
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
