<template>
      <v-item-group>
           <v-container>
              <v-row>
                <v-col
                  v-for="item in products"
                  :key="item._id"
                  cols="12"
                  md="3"
                >
                  <product :product="item"/>
                </v-col>
              </v-row>
           </v-container>
      </v-item-group>
</template>

<script>
import product from "./Product.vue";
export default {
  components:{
    product
  },
  props:[
    "products"
  ],
  data() {
    return {
    };
  },

  methods: {
  }
};
</script>

<style scoped>
</style>
