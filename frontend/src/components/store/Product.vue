<template>
      <v-card>
        <v-card-text class="d-flex jutify-center pa-0 text-center pointer">
            <v-img height="150" :src="image" cover @click="()=>{$router.push(`/product/${product._id}`)}" />
        </v-card-text>
        <v-card-title class="pa-0 pl-2">{{this.textI18(this.product).name}}</v-card-title>
        <!-- <v-card-text class="text-justify mt-n3" v-text="descriptio"> -->
        <!-- <v-card-text class="text-justify mt-n3" v-html="product.description"> -->
        <!-- </v-card-text> -->
        <v-card-subtitle class="mt-2">${{product.price}}</v-card-subtitle>
        <v-card-actions class="primary">
            <v-btn text small dark :to="`/product/${product._id}`">
              {{$t('store.more')}}
            </v-btn>
            <v-btn v-if="auth" icon dark small @click="addToCartAct">
              <v-icon>mdi-cart-plus</v-icon>
            </v-btn>
          <v-spacer></v-spacer>
          <span class="grey--text text--lighten-2 text-caption mr-2">
            ({{ product.ratings }})
          </span>
         <v-rating
            v-model="product.ratings"
            background-color="white"
            color="yellow accent-4"
            readonly
            dense
            half-increments
            hover
            size="10"
          ></v-rating>
        </v-card-actions>
      </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  props:[
    "product"
  ],
  data() {
    return {
    };
  },
  computed: {
    ...mapState('app',['auth']),
    descriptio(){
      let description = this.textI18(this.product).description;
      let text = description.slice(0,100);
      if(description.length>100){
        text = text.substr(0, Math.min(text.length, text.lastIndexOf(" "))) 
        text+= '...';
      } 
      text = text.replace(/<[^>]+>/g, '');
      return text;
    },
    image(){
      if(this.product.images.length){
        return `${this.$uri}/products/${this.product.images[0].image_src}`;
      }

      return  `${this.$uri}/site/noPicture.png`;
    }
  },
  methods: {
    ...mapActions('cart',['addToCart']),
    textI18(item){
      let curr = this.$i18n.locale;
      return item.texts.find(it=>it.lang == curr)
    },
    addToCartAct(){
      let t= {
        name: this.product.name,
        quantity:1,
        image: this.image,
        price: this.product.price,
        product: this.product._id
      }
      this.addToCart(t);
    }
  }
};
</script>

<style scoped>
  .pointer{
    cursor: pointer;
  }
</style>