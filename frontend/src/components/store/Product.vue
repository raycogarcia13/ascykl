<template>
      <v-card>
        <v-card-text class="d-flex jutify-center pa-0 text-center">
            <v-img height="200" src="../../assets/img/bghero1.jpg" cover />
        </v-card-text>
        <v-card-title class="mt-n2">Producto 1</v-card-title>
        <v-card-text class="text-justify mt-n3">
          {{descriptio}}
        </v-card-text>
        <v-card-actions class="primary">
            <v-btn text small dark to="/product/7897">
              {{$t('store.more')}}
            </v-btn>
            <v-btn icon dark>
              <v-icon>mdi-cart-plus</v-icon>
            </v-btn>
          <v-spacer></v-spacer>
          <span class="grey--text text--lighten-2 text-caption mr-2">
            ({{ rating }})
          </span>
         <v-rating
            v-model="rating"
            background-color="white"
            color="yellow accent-4"
            dense
            half-increments
            hover
            size="18"
          ></v-rating>
        </v-card-actions>
      </v-card>
</template>

<script>
export default {
  data() {
    return {
      rating:4,
      data:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis repudiandae molestias porro nemo, blanditiis doloremque quidem, in commodi eaque ab dolore ex facilis nisi atque quos et fuga recusandae illo?"
    };
  },
  computed: {
    descriptio(){
      let text = this.data.slice(0,100);
      text = text.substr(0, Math.min(text.length, text.lastIndexOf(" "))) 
      return text+'...'
    }
  },
  methods: {
  }
};
</script>