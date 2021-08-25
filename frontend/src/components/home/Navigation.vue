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
        <v-list-item
         to="/store"
        >
          <v-list-item-icon class="justify-center">
            <v-icon>mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">{{$t('nav.store')}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item v-if="!auth" to="/login">
          <v-list-item-icon class="justify-center">
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">{{$t('nav.login')}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      :color="color"
      :flat="flat"
      dark
      class="px-1"
      :class="{ expand: flat }"
    >
      <v-toolbar-title>
        <v-avatar v-if="!isXs" class="elevation-2">
          <v-img src="@/assets/images/logo.jpg" max-width="50px" />
        </v-avatar>
        {{$t('name')}}
      </v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="mr-4"
        v-if="isXs"
      />
      <div v-if="!isXs">
       
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
       
        <v-btn rounded text @click="$vuetify.goTo('#hero')">
          <span class="mr-2">{{$t('nav.home')}}</span>
        </v-btn>
        <v-btn rounded text @click="$vuetify.goTo('#features')">
          <span class="mr-2">{{$t('nav.about')}}</span>
        </v-btn>
        <v-btn rounded text to="/store">
          <span class="mr-2">{{$t('nav.store')}}</span>
        </v-btn>
        <v-btn rounded outlined text @click="$vuetify.goTo('#contact')">
          <span class="mr-2">{{$t('nav.contact')}}</span>
        </v-btn>
      </div>
      <login-btn />
    </v-app-bar>
  </div>
</template>

<style scoped>
.v-toolbar {
  transition: 0.6s;
}

.expand {
  height: 80px !important;
  padding-top: 10px;
}
</style>

<script>
import {mapState} from 'vuex'
import LoginBtn from './LoginBtn.vue';
export default {
  components: { LoginBtn },
  data: () => ({
    drawer: null,
    isXs: false,
    items: [
      ["mdi-home-outline", "Home", "#hero"],
      ["mdi-information-outline", "Sobre", "#features"],
      ["mdi-email-outline", "Contatos", "#contact"],
    ],
  }),
  props: {
    color: String,
    flat: Boolean,
  },
  computed: {
    ...mapState('app',['auth'])
  },
  methods: {
    onResize() {
      this.isXs = window.innerWidth < 850;
    },

   changeLocale(item){
      this.$i18n.locale = item;
      localStorage.setItem('lang',item);
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
