<template>
    <v-card flat color="rgba(255,255,255,0)">
        <v-list-group v-if="actuales.length" :value="!menu" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{$t('store.subcategories')}}</v-list-item-title>
            </v-list-item-content>
          </template>
            <v-list-item v-for="(item) in actuales" :key="`cat${item._id}`"  
                :class="{'text--primary':!menu}" :to="`/products/${category}/${item._id}`">
                <v-list-item-content>
                    <v-list-item-title v-text="textI18(item.texts).name"/>
                </v-list-item-content>
            </v-list-item>
        </v-list-group>
        <v-list-group :value="!menu" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{$t('store.categories')}}</v-list-item-title>
            </v-list-item-content>
          </template>
            <v-list-item v-for="(item) in categories" :key="`${item._id}`"  
                :class="{'text--primary':!menu}" :to="`/products/${item._id}`">
                <v-list-item-content>
                    <v-list-item-title v-text="textI18(item.texts).name"/>
                </v-list-item-content>
            </v-list-item>
        </v-list-group>

        <v-divider></v-divider>
        <v-card-title>{{$t('store.filters.title')}}</v-card-title>
        <v-card-text>
            <v-list dense>
                <v-list-item>
                    <v-list-item-content>
                        <v-checkbox v-model="stockValue" :label="$t('store.filters.only_stock')"
                            ></v-checkbox>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    props:['category','subcategory','menu'],
    data() {
        return {
            subcategories:[],
            categories:[],
        }
    },
    computed: {
        ...mapState('products',['stock']),
        actuales(){
            if(!this.category)
                return [];
            
            let ac =[];
            this.subcategories.forEach(it=>{
                if(it.category._id == this.category)
                    ac.push(it)
            })
            return ac;
        },
        stockValue:{
            get(){
                return this.stock;
            },
            set(newValue){
                return this.TOGGLE_STOCK(newValue)
            }
        }
    },
    methods: {
        ...mapMutations('products',['TOGGLE_STOCK']),
        loadData(){
            this.loadSubCategories();
            this.loadCategories();
        },
        loadSubCategories(){
            let uri = '/subcategories';
            this.$axios.get(uri).then(res=>{
                this.subcategories = res.data.data;
            })
        },
        loadCategories(){
            let uri = '/categories';
            this.$axios.get(uri).then(res=>{
                this.categories = res.data.data;
            })
        },
        textI18(item){
            let curr = this.$i18n.locale;
            return item.find(it=>it.lang == curr)
        },
    },
    mounted() {
        this.loadData();
    },
}
</script>