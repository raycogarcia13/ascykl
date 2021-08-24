<template>
    <v-card flat>
        <v-card-title v-if="actuales.length">Grupos</v-card-title>
        <v-card-text class="pa-0" v-if="actuales.length">
            <v-list dense rounded>
                <v-list-item v-for="(item) in actuales" :key="`cat${item._id}`"  
                    class="text--primary" :to="`/store/${category}/${item._id}`">
                    <v-list-item-content>
                        <v-list-item-title v-text="textI18(item.texts).name"/>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card-text>
        <v-card-title>Categorías</v-card-title>
        <v-card-text class="pa-0">
            <v-list dense rounded>
                <v-list-item v-for="(item) in categories" :key="`${item._id}`"  
                    class="text--primary" :to="`/store/${item._id}`">
                    <v-list-item-content>
                        <v-list-item-title v-text="textI18(item.texts).name"/>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-title>Filtros</v-card-title>
        <v-card-text>
            <v-list dense>
                <v-list-item>
                    <v-list-item-content>
                        <v-checkbox v-model="stock" :label="`Solo productos en Stock`"
                            ></v-checkbox>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props:['category','subcategory'],
    data() {
        return {
            subcategories:[],
            categories:[],
            stock:false
        }
    },
    computed: {
        actuales(){
            if(!this.category)
                return [];
            
            let ac =[];
            this.subcategories.forEach(it=>{
                if(it.category._id == this.category)
                    ac.push(it)
            })
            return ac;
        }
    },
    methods: {
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