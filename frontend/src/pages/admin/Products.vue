<template>
  <div>
      <v-card>
        <v-card-title>
          {{$t('admin.products.title')}}
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            :label="$t('search')"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <!-- dialog for create or update -->
          <v-dialog v-model="dialog" max-width="700px" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                fab
                small
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="8"
                    >
                      <v-card>
                        <v-tabs
                          v-model="tab"
                          align-with-title
                        >
                          <v-tabs-slider color="primary"></v-tabs-slider>

                          <v-tab
                            v-for="(item) in $i18n.availableLocales"
                            :key="item"
                          >
                            {{ item }}
                          </v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="tab">
                            <v-tab-item
                              v-for="(item,i) in $i18n.availableLocales"
                            :key="item"
                            >
                              <v-card flat>
                                <v-card-text>
                                  <v-text-field
                                        v-model="editedItem.texts[i].name"
                                        :label="$t('admin.products.name') + ` (${item})`"
                                      ></v-text-field>
                                    <v-textarea
                                        v-model="editedItem.texts[i].description"
                                        :label="$t('admin.products.description') + ` (${item})`"
                                      ></v-textarea>
                                </v-card-text>
                              </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                      </v-card>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-card>
                        <v-card-title>
                           <v-file-input
                              v-model="images"
                              multiple
                              accept="image/png, image/jpeg, image/bmp"
                              :label="$t('admin.products.images')"
                              @change="onFileChange"
                              prepend-icon="mdi-camera"
                            ></v-file-input>
                        </v-card-title>
                        <v-card-text class="d-flex">
                          <v-img width="25" v-for="(item) in srcImages" :src="item" :key="item" />
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                    >
                      <v-text-field
                        dense
                        v-model="editedItem.price"
                        :label="$t('admin.products.price')"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                    >
                     <v-select
                        :items="categorySel"
                        dense
                        v-model="editedItem.category"
                        :label="$t('admin.products.category')"
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                    >
                     <v-select
                        :items="subcategorySel"
                        dense
                        v-model="editedItem.subcategory"
                        :label="$t('admin.products.subcategory')"
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                    >
                      <v-text-field
                        dense
                        v-model="editedItem.stock"
                        :label="$t('admin.products.stock')"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  {{$t('cancel')}}
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  {{$t('save')}}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="600px">
          <v-card>
            <v-card-title class="text-h5">{{$t('admin.user.delete')}}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        </v-card-title>
        <v-card-text>
          <v-data-table
          dense
          :headers="headers"
          :items="data"
          item-key="_id"
          :loading="!data"
          :loading-text="$t('loading')"
          :search="search"
        >
          <template v-slot:item.name="{ item }">
              {{textI18(item).name}}
          </template>
          <template v-slot:item.description="{ item }">
              {{textI18(item).description}}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              color="primary"
              class="mr-2"
              @click="deleteItem(item)"
            >
              mdi-lock
            </v-icon>
            <v-icon
              small
              color="red"
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            No data aviable
          </template>
        </v-data-table>
        </v-card-text>
      </v-card>
  </div>
</template>
 <script>
 export default {
  data() {
    return {
      data:[],
      category:[],
      subcategory:[],
      search:null,
      tab:'',
      images:null,
      srcImages:[],
      headers:[
        {
          text: 'Name',
          align: 'start',
          value: 'name',
        },
        { text: 'Description', value: 'description' },
        { text: 'Price', value: 'price' },
        { text: 'Existencia', value: 'stock' },
        { text: 'Rating', value: 'ratings' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {},
      defaultItem:{},
      dialog: false,
      dialogDelete: false,
    }
  },
  computed: {
     formTitle () {
        return this.editedIndex === -1 ? this.$t('admin.products.new') : this.$t('admin.products.edit')
      },
      categorySel(){
        let all=[];
        let curr = this.$i18n.locale;
        this.category.forEach(async item=>{
          all.push({
            text:item.texts.find(it=>it.lang == curr).name,
            value:item._id
          })
        })
        return all;
      },
      subcategorySel(){
        let all=[];
        let curr = this.$i18n.locale;
        let cat = this.editedItem.category;
        this.subcategory.forEach(async item=>{
          if(item.category._id == cat)
          all.push({
            text:item.texts.find(it=>it.lang == curr).name,
            value:item._id
          })
        })
        return all;
      }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  methods: {
    loadData(){
     this.loadProducts();
     this.loadCategories();
     this.loadSubCategories();
    },
    loadProducts(){
      let uri = '/products'
      this.$axios.get(uri).then(res=>{
        this.data = res.data.data
      })
    },
    loadCategories(){
      let uri = '/categories'
      this.$axios.get(uri).then(res=>{
        this.category = res.data.data
      })
    },
    loadSubCategories(){
      let uri = '/subcategories'
      this.$axios.get(uri).then(res=>{
        this.subcategory = res.data.data
      })
    },
    editItem (item) {
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.data.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.data[this.editedIndex], this.editedItem)
        } else {

          this.editedItem.images = [];

          this.srcImages.forEach(it=>{
            this.editedItem.images.push({
              data_url:it
            })
          });
          this.$axios.post('/product',this.editedItem).then(res=>{
            this.initItem();
            this.data.push(res.data.data)
          }).catch(err=>{
            console.log(err.response)
          })
          // this.data.push(this.editedItem)
        }
        this.close()
      },
      initItem(){
        let ob =  {
            texts: [],
            images: [],
            price:'',
            category:'',
            subcategory:'',
            stock:''
        };
        this.$i18n.availableLocales.forEach(it=>{
          ob.texts.push({
            lang:it,
            name:'',
            description:''
          })
        })
        this.editedItem = ob;
        this.defaultItem = ob;
      },
      createImage() {
        this.srcImages = [];
        this.images.forEach(item=>{
          const reader = new FileReader();
          reader.onload = e => {
            this.srcImages.push(e.target.result);
          };
          reader.readAsDataURL(item);
        })
      },
      onFileChange(file) {
        if (!file) {
          return;
        }
        this.createImage();
      },
      textI18(item){
        let curr = this.$i18n.locale;
        return item.texts.find(it=>it.lang == curr)
      },
  },
  created() {
     this.initItem();
  },   
  mounted() {
    this.loadData();
  },
 }
 </script>