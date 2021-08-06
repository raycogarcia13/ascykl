<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      dark
      src="@/assets/img/bgDrawer.jpg"
    >
      <v-list>
        <v-list-item class="text-center">
          <v-list-item-avatar>
            <!-- <img src="@/assets/img/logo.png" alt="Logo" /> -->
            <img src="@/assets/images/logo.jpg" alt="Logo" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">ASCYKL</v-list-item-title>
            <v-list-item-subtitle class="text-wrap text-center">Service & Représentation International</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense>
        <v-list-item
          v-for="([icon, text, link], i) in items"
          :key="i"
          link
          @click="$vuetify.goTo(link)"
        >
          <v-list-item-icon class="justify-center">
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">{{
              text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      :color="color"
      :flat="flat"
      dark
      :class="{ expand: false }"
    >
    <router-link to="/">
      <v-toolbar-title>
        <v-avatar class="elevation-2">
          <v-img src="@/assets/images/logo.jpg" max-width="50px" />
        </v-avatar>
        {{$t('name')}}
      </v-toolbar-title>
    </router-link>
          <v-spacer></v-spacer>
      <template v-if="isMd()">
          <v-slide-x-reverse-transition> 
             <v-text-field
              solo
              rounded
              light
              hide-details
              dense
              style="max-width:30%"
              v-if="searched"
              color="purple darken-2"
              :label="$t('search')"
              append-icon="mdi-send"
              @click:append="search"
            ></v-text-field>
          </v-slide-x-reverse-transition>
            <v-btn icon @click="TOGGLE_SEARCH">
              <v-icon>mdi-search-web</v-icon>
            </v-btn>
      </template>
      <div  v-if="!isXs">
        <v-btn rounded text to="/">
          <span>{{$t('nav.home')}}</span>
        </v-btn>
        <v-btn rounded icon @click="()=>{alert('si')}">
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </div>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="mr-4"
        v-if="isXs"
      />
    </v-app-bar>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'

export default {
  data: () => ({
    drawer: null,
    isXs: false,
    items: [
      ["mdi-home-outline", "Home", "#hero"],
      ["mdi-information-outline", "Sobre", "#features"],
      ["mdi-email-outline", "Contatos", "#contact"],
    ],
    // searched:false
  }),
  computed: {
    ...mapState('app',['searched'])
  },
  props: {
    color: String,
    flat: Boolean,
  },
  methods: {
    ...mapMutations('app',['TOGGLE_SEARCH']),

    onResize() {
      this.isXs = window.innerWidth < 850;
    },
    search(){
      alert('a bsucarr')
    },

    isMd(){
      return window.innerWidth >= 960
    }
  },

  watch: {
    isXs(value) {
      if (!value) {
        if (this.drawer) {
          this.drawer = false;
        }
      }
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
};
</script>

<style scoped>
.v-toolbar {
  transition: 0.6s;
}

.expand {
  height: 80px !important;
  padding-top: 10px;
}
</style>
