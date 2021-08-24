<template>
  <v-app>
    <navigation app color="secondary" :flat="true" />
    <v-main class="ma-5 fill-height">
      <v-row class="fill-height">
        <v-col cols="12" md="6" class="d-flex flex-column align-center justify-center">
          <v-card class="text-justify mb-5" width="100%">
            <v-card-title>
              {{textI18(product).name}}
              <v-spacer></v-spacer> 
              ${{product.price}}
            </v-card-title>
              <v-card-text>
                {{textI18(product).description}}
              </v-card-text>
              <v-divider></v-divider>
            <v-card-actions>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                   <v-btn icon color="red" v-bind="attrs" v-on="on" >
                      <v-icon>mdi-cash-check</v-icon>
                    </v-btn>
                </template>
                <span>Solicitar compra</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                   <v-btn icon color="primary" v-bind="attrs" v-on="on" >
                      <v-icon>mdi-cart-plus</v-icon>
                    </v-btn>
                </template>
                <span>Agregar al carrito</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
          <v-btn @click="$router.go(-1)">Atrás</v-btn>
        </v-col>
        <v-col cols="12" md="6" class="d-flex flex-column justify-center align-center">
         
           <v-img :class="{'mt-n15':product.images.length==1}" :max-height="product.images.length>1?'30vh':'50vh'" v-if="product.images.length" :src="`${$uri}/products/${product.images[imageSelected].image_src}`" cover
            class="d-flex align-center"
           >
           <v-app-bar v-if="product.images.length>1" dense elevation="0" color="rgba(255,255,255,0)">
             <v-btn icon color="white" @click="prevPicture">
               <v-icon>mdi-arrow-left</v-icon>
             </v-btn>
             <v-spacer></v-spacer>
             <v-btn icon color="white" @click="nextPicture">
               <v-icon>mdi-arrow-right</v-icon>
             </v-btn>
           </v-app-bar>
           </v-img>
           <v-card v-if="product.images.length>1" flat tile class="mt-5 d-flex justify-space-between">
             <v-card :width="widthImage" class="pa-2"  flat v-for="(item,i) in product.images" :key="i" @click="imageSelected = i" >
                <v-img 
                  :src="`${$uri}/products/${item.image_src}`" 
                  :height="'20vh'" 
                  cover 
                  :gradient="i!=imageSelected?'to bottom right, rgba(255,255,255,.60), rgba(0,0,0,.7)':''"
                  />
             </v-card>
           </v-card>
        </v-col>
      </v-row>
    </v-main>
    <foote />
  </v-app>
</template>

<script>
import navigation from "../components/store/Navigation";
import foote from "../components/home/Footer";
import { mapState, mapMutations } from 'vuex'
// import axios from "axios"

export default {
  name: "App",
  props:[
    'id'
  ],
  components: {
    navigation,
    foote
  },

  data: () => ({
    images:[
      "assets/img/bghero1.jpg",
      "assets/img/bgHero.jpg",
      "assets/img/bgDrawer.jpg"
    ],
    product:{
      images:[]
    },
    imageSelected:0,
  }),
  computed: {
    ...mapState('app',['searched']),
    widthImage(){
      console.log(100/this.product.images.lenght+'%')
      return 100/this.product.images.length+'%';
    }
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

    prevPicture(){
      if(!this.product.images)
        return

      if(this.imageSelected-1 >= 0)
        this.imageSelected--
      else
        this.imageSelected = this.picture.images.length-1
    },
    nextPicture(){
      if(!this.product.images)
        return

      if(this.imageSelected+1 < this.picture.images.length)
        this.imageSelected++
      else
        this.imageSelected = 0
    },
    loadProduct(){
      let uri = `/product/${this.id}`;
      this.$axios.get(uri).then(res=>{
        this.product = res.data.data
        console.log(this.product)
      })
    },
    textI18(item){
      let curr = this.$i18n.locale;
      return item.texts.find(it=>it.lang == curr)
    },
  },
  mounted() {
    this.loadProduct();
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
