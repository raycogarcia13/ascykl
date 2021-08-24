<template>
    <v-app>

 <v-app-bar
      color="secondary"
      flat
      app
      dark
      :class="{ expand: false }"
    >
      <v-spacer></v-spacer>
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
        <login-btn />
      </div>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="mr-4"
        v-if="isXs"
      />
    </v-app-bar>
    <v-main>
        <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        app
        dark
        class="secondary"
    >
      <v-list-item class="px-2 pt-2">
        <v-list-item-avatar @click="$router.push('/')">
           <v-img src="@/assets/images/logo.jpg" max-width="50px" />
        </v-list-item-avatar>

        <v-list-item-title>{{$t('name')}}</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link to="/admin/users">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/admin/products">
          <v-list-item-icon>
            <v-icon>mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Productos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/admin/category">
          <v-list-item-icon>
            <v-icon>mdi-pencil-box-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Categorias</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/admin/orders">
          <v-list-item-icon>
            <v-icon>mdi-file-document-edit</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Ordenes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/admin/delivered">
          <v-list-item-icon>
            <v-icon>mdi-truck-delivery-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Entregas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
        </v-navigation-drawer>
        <v-container>
            <router-view></router-view>
        </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>
<script>
import Footer from '../../components/home/Footer.vue'
import {mapState} from 'vuex'
import LoginBtn from '@/components/home/LoginBtn.vue';
export default {
  components: { 
        Footer,
        LoginBtn
    },
    data() {
        return {
            drawer: null,
            isXs: false,
            mini:true
        }
    },
    computed: {
    ...mapState('app',['searched','auth','user'])
  },
  methods: {
    onResize() {
      this.isXs = window.innerWidth < 850;
    },
    search(){
      alert('a bsucarr')
    },
    isMd(){
      return window.innerWidth >= 960
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
    if(!this.auth || this.user.role!='Admin'){
      this.$router.push('/login')
    }

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