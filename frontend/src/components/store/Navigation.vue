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
          :to="link"
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
      :color="color"
      :flat="flat"
      dark
      :class="{ expand: false }"
    >
    <router-link to="/">
      <v-toolbar-title>
        <v-avatar v-if="!isXs" class="elevation-2">
          <v-img src="@/assets/images/logo.jpg" max-width="50px" />
        </v-avatar>
        {{$t('name')}}
      </v-toolbar-title>
    </router-link>
          <v-spacer></v-spacer>
      <template v-if="isMd()">
             <v-text-field
              solo
              rounded
              light
              hide-details
              v-model="searchValue"
              dense
              style="max-width:30%"
              color="purple darken-2"
              :label="$t('search')"
              append-icon="mdi-send"
              @click:append="goSearch"
              v-on:keyup.enter="goSearch"
            ></v-text-field>
      </template>
      <v-spacer></v-spacer>
      <div  v-if="!isXs">
         <v-menu open-on-hover bottom :offset-y="true" :offset-x="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn rounded text v-on="on" v-bind="attrs">
                 <v-img class="mr-1" max-width="20" :src="require(`@/assets/i18n/${$i18n.locale}.png`)" />
                    <v-icon small class="ml-1">mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list dense>
                <v-list-item v-for="(item,i) in $i18n.availableLocales" :key="i" class="cursor" @click="changeLocale(item)">
                    <v-list-item-title width="10px" class="pointer">
                        <v-img class="float-left mr-2" max-width="20" :src="require(`@/assets/i18n/${item}.png`)" />
                    </v-list-item-title>
                          <span class="caption">{{item.toUpperCase()}}</span>
                        <v-list-item-action>
                          <v-icon size="10" class="primary--text" v-if="item==$i18n.locale">mdi-check</v-icon>
                        </v-list-item-action>
                </v-list-item>
            </v-list>
        </v-menu>
      </div>
        <menuCart v-if="auth" />
        <login-btn />
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="mr-4"
        v-if="isXs"
      />
    </v-app-bar>
      <v-snackbar
        v-model="toastValue"
        :timeout="time_toast"
        :color="color_toast"
        dark
      >
        {{ $t(text_toast) }}

        <template v-slot:action="{ attrs }">
          <v-btn
            text
            v-bind="attrs"
            @click="toastValue = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
  </div>
</template>

<script>
import menuCart from "./CartMenu.vue"
import {mapState,mapMutations, mapActions} from 'vuex'
import LoginBtn from '../home/LoginBtn.vue';

export default {
  components:{
    menuCart,
    LoginBtn
  },
  data: () => ({
    drawer: null,
    isXs: false,
    items: [
      ["mdi-home-outline", "Home", "/"],
    ],
  }),
  computed: {
    ...mapState('app',['auth']),
    ...mapState('products',['searched','search']),
    ...mapState('toast',['toast','text_toast','time_toast','color_toast']),
    searchValue:{
      get(){
        return this.search;
      },
      set(newValue){
        return this.$store.dispatch('products/setSearchValue',newValue)
      }
    },
    toastValue:{
      get(){
        return this.toast;
      },
      set(newValue){
        return this.$store.dispatch('toast/setToast',newValue)
      }
    }
  },
  props: {
    color: String,
    flat: Boolean,
  },
  methods: {
    ...mapMutations('products',['TOGGLE_SEARCH','SET_SEARCH','SET_SUBCATEGORY','SET_CATEGORY']),
    ...mapActions('products',['findProducts']),
    changeLocale(item){
      this.$i18n.locale = item;
      localStorage.setItem('lang',item);
    },
    onResize() {
      this.isXs = window.innerWidth < 850;
    },
    goSearch(){
      
      if(this.$router.name != 'Category')
        this.$router.push(`/products?keyword=${this.search}`);
      
      this.SET_SUBCATEGORY(''),
      this.SET_CATEGORY(''),

      this.findProducts()
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
