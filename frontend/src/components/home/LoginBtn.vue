<template>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
          <v-btn v-if="!auth" rounded text to="/login">
            <v-icon>mdi-account</v-icon>
        </v-btn>
          <v-btn v-else rounded text v-on="on" v-bind="attrs">
            <v-avatar>
              <v-img
                  :src="user.avatar"
                  :alt="user.name"
                >
                <template v-slot:placeholder>
                    <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                    >
                      <v-icon>mdi-account-circle</v-icon>
                    </v-row>
                  </template>
                </v-img>
            </v-avatar>
        </v-btn>
      </template>

     <v-card v-if="auth">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
               <v-avatar>
                <v-img
                  :src="user.avatar"
                  :alt="user.name"
                >
                <template v-slot:placeholder>
                      <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                      >
                        <v-icon>mdi-account-circle</v-icon>
                      </v-row>
                  </template>
                </v-img>
               </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{user.name}}</v-list-item-title>
              <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon>
                <v-icon>mdi-lock</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item class="error--text" to="/admin" v-if="user.role=='Admin'">
            <v-list-item-avatar>
               <v-avatar>
                <v-icon>mdi-lock</v-icon>
               </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Zona de administración</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item @click="sendLogout">
            <v-list-item-action>
             <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
          <v-list-item-title>{{$t('nav.logout')}}</v-list-item-title>
          </v-list-item>
        </v-list>

      </v-card>
    </v-menu>
</template>

<script>
import { mapState, mapActions } from 'vuex'

  export default {
    data: () => ({
      menu:false
    }),
    computed: {
      ...mapState('app',['auth','user'])
    },
    methods: {
      ...mapActions('app',['logout']),
      sendLogout(){
        this.$axios.get('logout').then(()=>{
            this.logout();
            this.$router.push('/')
        })
      }
    }
  }
</script>