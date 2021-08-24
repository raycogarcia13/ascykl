<template>
  <v-app>
    <navigation app color="secondary" :flat="true" />
    <bar-nav />
    <v-main class="mt-5">
      <v-row no-gutters>
        <v-col cols="12" md="3">
         <filters :category="category" :subcategory="subcategory" />
        </v-col>
        <v-col md="9" cols="12">
            <!-- component products -->
            <products :products="products"/>
            <!-- pagination -->
            <template v-if="products.length>10">
              <v-divider></v-divider>
              <div class="text-center my-5">
                  <v-pagination
                    v-model="page"
                    :length="4"
                    circle
                  ></v-pagination>
                <v-divider class="mt-5"></v-divider>
              </div>
            </template>

        </v-col>
      </v-row>
    </v-main>
    <foote />
  </v-app>
</template>

<script>
import navigation from "../components/store/Navigation";
import products from "../components/store/Products.vue";
import foote from "../components/home/Footer";
import BarNav from '../components/store/barNav.vue';
import Filters from '../components/store/filters.vue';

export default {
  name: "App",
  props:['category','subcategory'],

  components: {
    navigation,
    products,
    foote,
    BarNav,
    Filters
  },

  data: () => ({
    fab: null,
    color: "",
    flat: null,
    page:1,
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
  async mounted() {
    this.toTop();
    this.loadProducts()
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
    category(){
      this.loadProducts();
    },
    subcategory(){
      this.loadProducts();
    }
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
