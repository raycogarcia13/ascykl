<template>
  <v-app>
      <v-main class="fill-height align-center">
          <v-card flat class="mx-auto text-center align-center justify-center" :width="boxSize">
            <v-card-text>
              <v-avatar size="80" @click="()=>$router.push('/')">
                <v-img :src="require('@/assets/images/logo.jpg')" />
              </v-avatar>
            </v-card-text>
            
            <v-card-text class="px-15">
              <v-text-field
                solo
                light
                rounded
                dense
                autocomplete
                v-model="name"
                name="ascykl.name"
                :label="$t('register.name')"
                append-icon="mdi-pencil"
              ></v-text-field>
              <v-text-field
                solo
                light
                rounded
                dense
                v-model="email"
                name="ascykl.email"
                :label="$t('register.email')"
                append-icon="mdi-email"
              ></v-text-field>
              <v-text-field
                solo
                type="password"
                light
                rounded
                dense
                v-model="password"
                autocomplete="false"
                :label="$t('register.password')"
                append-icon="mdi-lock"
              ></v-text-field>
              <v-text-field
                solo
                type="password"
                light
                name="ascykl.pass"
                rounded
                dense
                v-model="repeat_password"
                autocomplete="false"
                :label="$t('register.repeat_password')"
                append-icon="mdi-lock"
              ></v-text-field>

                <v-checkbox v-model="accept" :label="$t('register.conditions')"/>

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
              <v-btn rounded small block color="primary" @click="sendRegister">
                Registarse
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

  components: {
  },

  data: () => ({
    email:'',
    name:'',
    password:'',
    repeat_password:'',
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
    sendRegister(){
      let uri = 'register';
      this.$axios.post(uri,{
          name:this.name,
          email:this.email,
          password:this.password,
          lang:this.$i18n.locale
        }).then(res=>{
          this.$router.push(`/verify/${res.data.data._id}`)
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
