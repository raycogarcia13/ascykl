<template>
      <v-item-group>
           <v-container>
              <v-row>
                <v-col
                  v-for="n in 9"
                  :key="n"
                  cols="12"
                  md="4"
                >
                  <product />
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
