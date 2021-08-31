<template>
  <v-app>
    <navigation app color="secondary" :flat="true" />
    <bar-nav />
    <v-main class="mt-5">
      <v-row no-gutters>
        <v-col md="12" cols="12">
          <!-- <v-card flat color="rgba(255,255,255,0)" class="mb-n5 mt-n5">
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
          </v-card> -->

          <v-card flat color="rgba(255,255,255,0)" class="mb-n5">
            <v-card-title>{{$t('store.latestProducts')}}</v-card-title>
            <v-card-text>
              <v-slide-group
                  v-model="model3"
                  class="pa-1"
                  active-class="success"
                  :show-arrows="!$vuetify.breakpoint.mobile"
                >
                  <v-slide-item
                    v-for="(item) in latest"
                    :key="'lat'+item._id"
                  >
                   <v-card 
                          color="grey lighten-1"
                          class="ma-4 pa-1  "
                          :to="`/product/${item._id}`">
                        <v-img height="150" :width="$vuetify.breakpoint.mobile?'100':'200'" :src="image(item)" cover>
                        <v-row
                              class="fill-height"
                              align="end"
                              justify="center"
                            >
                              <v-app-bar dense color="rgba(255,255,255,0.5)" class="mt-n10">
                                  <span class="black--text subtitle-1 font-weight-black font-weight-bold" > {{textI18(item).name}}</span>
                                <v-spacer></v-spacer>
                                  <span class="black--text subtitle-2" >${{item.price}}</span>
                              </v-app-bar>
                          </v-row>
                        </v-img>
                   </v-card>
                  </v-slide-item>
                </v-slide-group>
            </v-card-text>
          </v-card>
          <v-card flat color="rgba(255,255,255,0)">
            <v-card-title>{{$t('store.categories')}}</v-card-title>
            <v-card-text>
                <v-slide-group
                    v-model="model2"
                    class="pa-1"
                    active-class="success"
                    :show-arrows="!$vuetify.breakpoint.mobile"
                  >
                    <v-slide-item v-slot="{ active, toggle }" v-for="(item) in categories" :key="item._id">
                      <v-card
                          color="grey lighten-1"
                          class="ma-4"
                          :to="`/products/${item._id}`"
                        >
                          <v-img :width="$vuetify.breakpoint.mobile?'100':'200'" :height="$vuetify.breakpoint.mobile?'100':'200'" contain  :src="`${$uri}categories/${item.image}`">
                          <v-row
                              class="fill-height"
                              align="end"
                              justify="center"
                            >
                              <v-app-bar dense color="rgba(255,255,255,0.5)">
                                <v-spacer></v-spacer>
                                  <span class="black--text subtitle-1 font-weight-black font-weight-bold" > {{textI18(item).name}}</span>
                                <v-spacer></v-spacer>
                              </v-app-bar>
                          </v-row>
                          </v-img>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
            </v-card-text>
            <v-card-title>{{$t('store.products')}}</v-card-title>
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
    model3: null,
    categories:[],
    products:[],
    latest:[],
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
    loadLatest(){
      let uri = `/products/latest`;
      this.$axios.get(uri).then(res=>{
        this.latest = res.data.data
      })
    },
    image(product){
      if(product.images.length){
        return `${this.$uri}/products/${product.images[0].image_src}`;
      }

      return  `${this.$uri}/site/noPicture.png`;
    },
    loadData(){
      this.loadCategories();
      this.loadProducts();
      this.loadLatest();
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
