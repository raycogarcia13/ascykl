<template>
  <v-app>
    <navigation app color="secondary" :flat="true" />
    <v-main class="ma-5 fill-height">
      <v-row class="fill-height">
        <v-col cols="12" md="6" class="d-flex flex-column align-center justify-center">
          <v-card class="text-justify mb-5">
            <v-card-title>
              <input type="file" @change="handleImage" accept="image/*" >
              Producto único nombre
              <v-spacer></v-spacer> 
              $67.89
            </v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente rem praesentium sint aspernatur esse, voluptatum expedita suscipit libero dolorem iste! Porro aspernatur qui a enim laudantium? Architecto dolorem quisquam velit?
              </v-card-text>
              <v-card-text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dolorum repellat dolorem consequuntur non fuga quibusdam aperiam est amet sapiente blanditiis, odio perferendis rem maiores quasi sunt, voluptas libero voluptatum.
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
         
           <v-img :height="'30vh'" :src="require('@/'+images[imageSelected])" cover
            class="d-flex align-center"
           >
           <v-app-bar dense elevation="0" color="rgba(255,255,255,0)">
             <v-btn icon color="white" @click="prevPicture">
               <v-icon>mdi-arrow-left</v-icon>
             </v-btn>
             <v-spacer></v-spacer>
             <v-btn icon color="white" @click="nextPicture">
               <v-icon>mdi-arrow-right</v-icon>
             </v-btn>
           </v-app-bar>
           </v-img>
           <v-card flat tile class="mt-5 d-flex justify-space-between">
             <v-card :width="widthImage" class="pa-2"  flat v-for="(item,i) in images" :key="i" @click="imageSelected = i" >
                <v-img 
                  :src="require('@/'+item)" 
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

  components: {
    navigation,
    foote
  },

  data: () => ({
    fab: null,
    color: "",
    flat: null,
    page:1,
    images:[
      "assets/img/bghero1.jpg",
      "assets/img/bgHero.jpg",
      "assets/img/bgDrawer.jpg"
    ],
    imageSelected:0,
    newImage:''
  }),
  computed: {
    ...mapState('app',['searched']),
    widthImage(){
      console.log(100/this.images.lenght+'%')
      return 100/this.images.length+'%';
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

    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 60;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
    prevPicture(){
      if(this.imageSelected-1 >= 0)
        this.imageSelected--
      else
        this.imageSelected = this.images.length-1
    },
    nextPicture(){
      if(this.imageSelected+1 < this.images.length)
        this.imageSelected++
      else
        this.imageSelected = 0
    },
    handleImage(e){
      const selImage = e.target.files[0];
      this.createBase64Image(selImage)
      // console.log(selImage);
    },
    createBase64Image(fileObject){
      const reader = new FileReader();
      reader.onload = (e) =>{
        this.newImage = e.target.result

        // axios.post('http://localhost:3000/api/v1/product',{image:this.newImage}).then(res=>{
        //   console.log(res.data)
        // })
        console.log(this.newImage)
      };

      reader.readAsDataURL(fileObject);
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
