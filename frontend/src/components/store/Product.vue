<template>
      <v-card>
        <v-card-text class="d-flex jutify-center pa-0 text-center">
            <v-img height="150" :src="image" cover />
        </v-card-text>
        <v-card-title class="mt-n2">{{this.textI18(this.product).name}}</v-card-title>
        <v-card-text class="text-justify mt-n3">
          {{descriptio}}
        </v-card-text>
        <v-card-actions class="primary">
            <v-btn text small dark :to="`/product/${product._id}`">
              {{$t('store.more')}}
            </v-btn>
            <v-btn v-if="auth" icon dark small>
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
            dense
            half-increments
            hover
            size="10"
          ></v-rating>
        </v-card-actions>
      </v-card>
</template>

<script>
import { mapState } from 'vuex';
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
    textI18(item){
      let curr = this.$i18n.locale;
      return item.texts.find(it=>it.lang == curr)
    },
  }
};
</script>