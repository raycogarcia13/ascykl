<template>
    <div>
        <v-app-bar dense flat height="40rem">
            <v-btn plain @click.stop="drawer = !drawer">
                <v-icon>mdi-menu</v-icon>
                Todo
            </v-btn>
            
            <v-spacer></v-spacer>
             <v-slide-x-reverse-transition>
                <v-text-field
                  solo
                  rounded
                  light
                  hide-details
                  dense
                  v-if="searched"
                  color="primary darken-2"
                  :label="$t('search')"
                  append-icon="mdi-send"
                  class="d-flex d-md-none"
                ></v-text-field>
               </v-slide-x-reverse-transition>
            <v-spacer></v-spacer>
            <v-btn  class="d-flex d-md-none" icon :color="searched?'primary':''" @click.stop="TOGGLE_SEARCH">
              <v-icon>mdi-search-web</v-icon>
            </v-btn>

        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            temporary
            absolute
            dark
            >
            <!-- src="@/assets/img/bgDrawer.jpg" -->
      <v-list>
        <v-list-item class="text-center" :to="to">
            <v-list-item-title v-html="name" />
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense>
        <v-list-item to="/store">
          <v-list-item-icon class="justify-center">
            <v-icon>mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">Tienda</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            drawer: false,
            categories:[]
        }
    },
    computed: {
        ...mapState('app',['searched',"user","auth"]),
        
        name(){
            let authenticated;
            if(this.auth)
                authenticated = `${this.user.name}`;
            let login = `Hola Identifícate`;
            return this.auth?authenticated:login
        },
        to(){
            return this.auth?'/profile':'/login'
        }
    },
    methods: {
        ...mapMutations('app',['TOGGLE_SEARCH']),
        
    },
    mounted() {
        
    },
}
</script>