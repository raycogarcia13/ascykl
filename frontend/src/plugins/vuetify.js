import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
     theme: {
        themes: {
            light: {
                primary: "#119DA4",
                secondary: "#171b34",
                // secondary: "#ff0000",
                accent: "#3D87E4"
            }
        }
    }
});
