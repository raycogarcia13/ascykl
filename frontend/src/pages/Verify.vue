<template>
  <v-app>
      <v-main class="fill-height align-center">
          <v-card color="rgba(255,255,255,0)" flat class="mx-auto text-center align-center justify-center" :width="boxSize">
            <v-card-text>
              <v-avatar size="80" @click="()=>$router.push('/')">
                <v-img :src="require('@/assets/images/logo.jpg')" />
              </v-avatar>
            </v-card-text>
            <v-card-text class="px-15">
            <h3>Inserte el pin enviado por correo</h3>
              <v-text-field
                solo
                light
                dense
                rounded
                autocomplete
                placeholder="000000"
                v-model="pin"
                name="ascykl.name"
                :label="$t('verify.pin')"
              ></v-text-field>


               <v-alert
                  color="red lighten-2"
                  dark
                  dense
                  type="error"
                  v-if="error"
                  transition="scale-transition"
                >
                  {{$t(error)}}
                </v-alert>

              <v-divider class="mb-5"></v-divider>
              <v-btn rounded small block color="primary" @click="verify">
                Validar
              </v-btn>
            </v-card-text>


          </v-card>
      </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: "App",

  props:[
    "id"
  ],
  components: {
  },

  data: () => ({
    pin:'',
    hash:null,
    accept:false,
    error:null
  }),
  computed: {
     ...mapState('app',['windowS','auth']),
     
     boxSize(){
       return this.windowS.width>='960'?'30vw':'80vw'
     }
  },

  methods: {
    ...mapActions('app', ['login','logout']),
    verify(){
      let uri = 'verify';
      this.$axios.post(uri,{
        user:this.id,
        pin:this.pin
        }).then(res=>{
          this.login(res);
        if(res.data.user.role == 'Admin')
          this.$router.push('/admin')  
        else
          this.$router.push('/store')
      }).catch(err => {
        this.error = err.response.data.error
      })
    }
  },
  mounted() {
    if(this.auth){
      this.$router.push('/store')
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
