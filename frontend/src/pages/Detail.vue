<template>
  <v-app>
    <navigation app color="secondary" :flat="true" />
    <bar-nav />
    <v-main class="mx-5">
      <v-row class="">
        <v-col cols="12" md="6" class="d-flex flex-column align-center justify-center">
          <v-card flat class="text-justify mb-5" width="100%">
            <v-card-title>
              {{textI18(product).name}}
              <v-spacer></v-spacer> 
            </v-card-title>
            <v-card-text>
              <v-app-bar flat color="rgba(255,255,255,0)">
                <v-rating
                    v-model="product.ratings"
                    background-color="yellow"
                    color="yellow accent-4"
                    dense
                    half-increments
                    hover
                    size="20"
                  ></v-rating>
              </v-app-bar>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text :class="{'d-flex justify-space-around':!$vuetify.breakpoint.mobile}">
              <v-card flat :width="$vuetify.breakpoint.mobile?'':'50%'">
                <v-list dense>
                    <v-list-item>
                      <v-list-item-title>
                        {{$t('store.price')}}:
                      </v-list-item-title>
                      <v-list-item-action>
                        ${{product.price}}
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-item-title>
                        {{$t('store.stock')}}:
                      </v-list-item-title>
                      <v-list-item-action>
                        {{product.stock}}
                      </v-list-item-action>
                    </v-list-item>
                </v-list>
              </v-card>
              <v-card flat :width="$vuetify.breakpoint.mobile?'':'50%'">
                <v-list dense>
                    <v-list-item>
                      <v-list-item-title>
                        <v-btn x-small @click="()=>{if(this.cant<product.stock)this.cant++}" color="success">
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        <span class="mx-5">
                          {{cant}}
                        </span>
                        <v-btn @click="()=>{if(this.cant>1)this.cant--}" x-small color="error">
                          <v-icon>mdi-minus</v-icon>
                        </v-btn>
                      </v-list-item-title>
                      <v-list-item-action>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn small rounded color="primary" dark v-bind="attrs" v-on="on" @click="addToCartAct" class="ml-5" >
                                {{$t('store.cart.add')}}
                              </v-btn>
                          </template>
                          <span>{{$t('store.cart.add_to_cart')}}</span>
                        </v-tooltip>
                      </v-list-item-action>
                    </v-list-item>
                </v-list>
              </v-card>
            </v-card-text>
            <v-card-text v-html="textI18(product).description" />
          </v-card>
        </v-col>
        <v-col cols="12" md="6" :class="{'mt-5':product.images.length&&!$vuetify.breakpoint.mobile}" class="d-flex flex-column justify-center align-center">
           <v-img  :max-height="product.images.length>1?'30vh':'50vh'" v-if="product.images.length" :src="`${$uri}/products/${product.images[imageSelected].image_src}`" cover
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
import { mapState, mapMutations, mapActions } from 'vuex'
import BarNav from '../components/store/barNav.vue';
// import axios from "axios"

export default {
  name: "App",
  props:[
    'id'
  ],
  components: {
    navigation,
    foote,
    BarNav
  },

  data: () => ({
    product:{
      images:[]
    },
    cant:1,
    imageSelected:0,
  }),
  computed: {
    ...mapState('app',['searched']),
    widthImage(){
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
    ...mapActions('cart',['addToCart']),
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
      })
    },
    textI18(item){
      if(!item.texts)
        return ''
      let curr = this.$i18n.locale;
      return item.texts.find(it=>it.lang == curr)
    },
    addToCartAct(){
      let t= {
        name: this.product.name,
        quantity:this.cant,
        image: `${this.$uri}/products/${this.product.images[0].image_src}`,
        price: this.product.price,
        product: this.product._id
      }
      console.log(t);
      this.addToCart(t);
    }
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
