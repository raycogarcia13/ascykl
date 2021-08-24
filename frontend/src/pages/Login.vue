<template>
  <v-app>
      <v-main class="fill-height align-center">
          <v-card flat class="mx-auto text-center align-center justify-center" :width="boxSize">
            <v-card-text>
              <v-avatar size="80" @click="()=>$router.go('-1')">
                <v-img :src="require('@/assets/images/logo.jpg')" />
              </v-avatar>
            </v-card-text>
            
            <v-divider></v-divider>

            <v-card-text class="px-15">
              <v-text-field
                solo
                light
                rounded
                dense
                autocomplete
                v-model="email"
                name="ascykl.email"
                :label="$t('login.email')"
                append-icon="mdi-email"
              ></v-text-field>
              <v-text-field
                solo
                type="password"
                light
                name="ascykl.pass"
                rounded
                dense
                v-model="password"
                autocomplete="false"
                :label="$t('login.password')"
                append-icon="mdi-lock"
              ></v-text-field>

               <v-alert
                  color="red lighten-2"
                  dark
                  dense
                  class="rounded-xl"
                  type="error"
                  v-if="error"
                  transition="scale-transition"
                >
                  {{$t(error)}}
                </v-alert>

              <span class="text-caption font-italic red--text">Al entrar acepta las condiciones de uso y políticas de privacidad de la aplicación</span>

              <v-btn rounded small block color="primary" @click="sendLogin">
                Entrar
              </v-btn>
            </v-card-text>

            <v-divider class="mb-5"></v-divider>

            <v-card-subtitle class="">Aun no estás registrado</v-card-subtitle>
            <v-btn text rounded small block color="primary" to="/register">
              Registarse
            </v-btn>
          </v-card>
      </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: "App",

  components: {
  },

  data: () => ({
    email:'',
    password:'',
    hash:null,
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
    sendLogin(){
      let uri = 'login';
      this.$axios.post(uri,{email:this.email,password:this.password}).then(res=>{
        this.login(res);
        if(res.data.user.role == 'Admin')
          this.$router.push('/admin')  
        else
          this.$router.go(-1)
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
