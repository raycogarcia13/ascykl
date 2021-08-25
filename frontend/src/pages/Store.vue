<template>
  <v-app>
    <navigation app color="secondary" :flat="true" />
    <bar-nav />
    <v-main class="mt-5">
      <v-row no-gutters>
        <v-col md="12" cols="12">
          <v-card flat color="rgba(255,255,255,0)" class="mb-n5 mt-n5">
            <v-card-title>Productos más vendidos</v-card-title>
            <v-card-text>
              <v-slide-group
                  v-model="model"
                  class="pa-1"
                  active-class="success"
                  :show-arrows="$vuetify.breakpoint.md"
                >
                  <v-slide-item
                    v-for="n in 15"
                    :key="n"
                    v-slot="{ active, toggle }" 
                  >
                    <v-card
                      :color="active ? undefined : 'grey lighten-1'"
                      class="ma-4"
                      height="150"
                      width="20vw"
                      @click="toggle"
                    >
                      <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                      >
                        <v-scale-transition>
                          <v-icon
                            v-if="active"
                            color="white"
                            size="48"
                            v-text="'mdi-close-circle-outline'"
                          ></v-icon>
                        </v-scale-transition>
                      </v-row>
                    </v-card>
                  </v-slide-item>
                </v-slide-group>
            </v-card-text>
          </v-card>

          <v-card flat color="rgba(255,255,255,0)" class="mb-n5">
            <v-card-title>Últimos Productos agregados</v-card-title>
            <v-card-text>
              <v-slide-group
                  v-model="model"
                  class="pa-1"
                  active-class="success"
                  :show-arrows="$vuetify.breakpoint.md"
                >
                  <v-slide-item
                    v-for="n in 15"
                    :key="n"
                    v-slot="{ active, toggle }"
                  >
                    <v-card
                      :color="active ? undefined : 'grey lighten-1'"
                      class="ma-4"
                      height="150"
                      width="20vw"
                      @click="toggle"
                    >
                      <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                      >
                        <v-scale-transition>
                          <v-icon
                            v-if="active"
                            color="white"
                            size="48"
                            v-text="'mdi-close-circle-outline'"
                          ></v-icon>
                        </v-scale-transition>
                      </v-row>
                    </v-card>
                  </v-slide-item>
                </v-slide-group>
            </v-card-text>
          </v-card>
          <v-card flat color="rgba(255,255,255,0)">
            <v-card-text>
              <!-- <v-row>
                <v-col cols="12" md="3" v-for="(item) in categories" :key="item._id">
                  <v-card
                          color="grey lighten-1"
                          class="ma-4"
                          :to="`/store/${item._id}`"
                        >

                          <v-img max-width="100%" height="200" contain  :src="`${$uri}categories/${item.image}`">
                           <v-row
                              class="fill-height"
                              align="end"
                              justify="center"
                            >
                              <v-app-bar dense color="rgba(255,255,255,0.5)">
                                <v-spacer></v-spacer>
                                  <span class="black--text subtitle-1 font-weight-black font-weight-bold" >{{textI18(item).name}}</span>
                                <v-spacer></v-spacer>
                              </v-app-bar>
                           </v-row>
                          </v-img>
                  </v-card>
                </v-col>
              </v-row> -->
                <v-slide-group
                    v-model="model2"
                    class="pa-1"
                    active-class="success"
                    :show-arrows="$vuetify.breakpoint.md"
                  >
                    <v-slide-item v-slot="{ active, toggle }" v-for="(item) in categories" :key="item._id">
                      <v-card
                          color="grey lighten-1"
                          class="ma-4"
                          :to="`/store/${item._id}`"
                        >
                          <v-img :width="$vuetify.breakpoint.md?'200':'100'" :height="$vuetify.breakpoint.md?'200':'100'" contain  :src="`${$uri}categories/${item.image}`">
                          <v-row
                              class="fill-height"
                              align="end"
                              justify="center"
                            >
                              <v-app-bar dense color="rgba(255,255,255,0.5)">
                                <v-spacer></v-spacer>
                                  <span class="black--text subtitle-1 font-weight-black font-weight-bold" >{{textI18(item).name}}</span>
                                <v-spacer></v-spacer>
                              </v-app-bar>
                          </v-row>
                          </v-img>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
            </v-card-text>
            <v-card-text class="pa-0">
              <products :products="products"/>
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>
    </v-main>
    <v-scale-transition>
      <v-btn
        fab
        v-show="fab"
        v-scroll="onScroll"
        dark
        fixed
        bottom
        right
        color="secondary"
        @click="toTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-scale-transition>
    <foote />
  </v-app>
</template>

<script>
import navigation from "../components/store/Navigation";
import foote from "../components/home/Footer";
import BarNav from '../components/store/barNav.vue';
import Products from '../components/store/Products.vue';

export default {
  name: "App",

  components: {
    navigation,
    foote,
    BarNav,
    Products
  },

  data: () => ({
    fab: null,
    color: "",
    flat: null,
    page:1,
    model: null,
    model2: null,
    categories:[],
    products:[],
  }),
  computed: {
  },

  created() {
    const top = window.pageYOffset || 0;
    if (top <= 60) {
      this.color = "transparent";
      this.flat = true;
    }
  },
  mounted() {
    this.loadData();
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
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 60;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },

    loadCategories(){
      let uri = '/categories';
      this.$axios.get(uri).then(res=>{
        this.categories = res.data.data;
      })
    },
    textI18(item){
      let curr = this.$i18n.locale;
      return item.texts.find(it=>it.lang == curr)
    },
    loadProducts(){
      let uri = `/products?page=${this.page}`;
      if(this.category)
        uri+=`&category=${this.category}`
      if(this.subcategory)
        uri+=`&subcategory=${this.subcategory}`
      
      // let uri = `/products/${this.category}/${this.subcategory}`
      this.$axios.get(uri).then(res=>{
        this.products = res.data.data
      })
    },
    loadData(){
      this.loadCategories();
      this.loadProducts();
    }
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
