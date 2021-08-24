<template>
  <div>
      <v-card>
        <v-card-title>
          {{$t('admin.category.title')}}
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
                              v-model="image"
                              accept="image/png, image/jpeg, image/bmp"
                              :label="$t('admin.products.images')"
                              @change="onFileChange"
                              prepend-icon="mdi-camera"
                            ></v-file-input>
                        </v-card-title>
                        <v-card-text class="d-flex">
                          <v-img width="25" :src="srcImages" />
                        </v-card-text>
                      </v-card>
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
          <v-dialog v-model="dialogSub" max-width="700px" persistent>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitleSub }}</span>
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
                          v-model="tabSub"
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
                        <v-tabs-items v-model="tabSub">
                            <v-tab-item
                              v-for="(item,i) in $i18n.availableLocales"
                            :key="item"
                            >
                              <v-card flat>
                                <v-card-text>
                                  <v-text-field
                                        v-model="editedSub.texts[i].name"
                                        :label="$t('admin.products.name') + ` (${item})`"
                                      ></v-text-field>
                                </v-card-text>
                              </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                      </v-card>
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
                  @click="cancelSub()"
                >
                  {{$t('cancel')}}
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="saveSub()"
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
          :items="category"
          item-key="_id"
          :loading="!category"
          :loading-text="$t('loading')"
          :search="search"
          show-expand
          single-expand
        >
          <template v-slot:item.texts="{item}">
            {{textI18(item).name}}
          </template>
          <template v-slot:item.image="{item}">
            <v-img width="50" max-height="50" :src="`${$uri}categories/${item.image}`"/>
          </template>
           <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length">
                    <v-card flat color="rgba(255,255,255,0)">
                      <v-card-title class="pb-0">
                          <v-spacer></v-spacer>
                          <v-btn fab color="primary" small @click="newCategory(item._id)">
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                      </v-card-title>
                      <v-card-text>
                         <v-simple-table dense>
                           <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">
                                    Name
                                  </th>
                                  <th class="text-center">
                                    Acciones
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(cat) in mySubCat(item._id)" :key="'subca'+cat._id">
                                  <td>{{textI18(cat).name}}</td>
                                  <td class="text-center">
                                    <v-icon small color="primary">mdi-pencil</v-icon>
                                    <v-icon small color="error">mdi-delete</v-icon>
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                        </v-simple-table>
                      </v-card-text>
                    </v-card>
                  </td>
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
      <v-snackbar v-model="snackbar">
        {{ messageSnack }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
  </div>
</template>
 <script>
 export default {
  data() {
    return {
      category:[],
      subcategory:[],
      search:null,
      snackbar:false,
      expanded:[],
      messageSnack:'',
      tab:'',
      tabSub:'',
      image:null,
      srcImages:null,
      headers:[
        {
          text: 'Name',
          align: 'start',
          value: 'texts',
        },
        {
          text: 'Imagen',
          value: 'image',
        },
        { text: 'Actions',align:'end', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {},
      editedSub: {},
      defaultItem:{},
      dialog: false,
      dialogSub: false,
      dialogDelete: false,
    }
  },
  computed: {
     formTitle () {
        return this.editedIndex === -1 ? this.$t('admin.category.new') : this.$t('admin.category.edit')
      },
     formTitleSub () {
        return this.editedIndex === -1 ? this.$t('admin.subcategory.new') : this.$t('admin.subcategory.edit')
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
     this.loadCategories();
     this.loadSubCategories();
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
    mySubCat(id){
      return this.subcategory.filter(it=>it.category._id==id);
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
          let newObj = {
            texts:this.editedItem.texts,
            image:this.srcImages,
          };
          this.$axios.post('/category',newObj).then(res=>{
            
            this.category.push(res.data.data)
            this.initItem();
            this.messageSnack = this.$t(res.data.message);
            this.snackbar = !this.snackbar
          }).catch(err=>{
            console.log(err.response)
            this.messageSnack = err.response.data;
            this.snackbar = !this.snackbar

          })
        }
        this.close()
      },
      initItem(){
        let ob =  {
            texts: [],
            images: null,
        };
        let ob2 =  {
            texts: [],
            category:''
        };
        this.$i18n.availableLocales.forEach(it=>{
          ob.texts.push({
            lang:it,
            name:'',
          }),
          ob2.texts.push({
            lang:it,
            name:'',
          })
        })
        this.editedItem = ob;
        this.editedSub = ob2;
        this.defaultItem = ob;
      },
      createImage(file) {
          const reader = new FileReader();
          reader.onload = e => {
            this.srcImages = e.target.result;
          };
          reader.readAsDataURL(file);
      },
      onFileChange(file) {
        if (!file) {
          return;
        }
        this.createImage(file);
      },
      textI18(item){
        let curr = this.$i18n.locale;
        return item.texts.find(it=>it.lang == curr)
      },
      cancelSub(){
        this.initItem();
        this.dialogSub = false;
      },
      newCategory(id){
        this.dialogSub = true;
        this.editedSub.category = id
      },
      saveSub(){
        let uri = '/subcategory';
        this.$axios.post(uri,this.editedSub).then(res=>{
          this.subcategory.push(res.data.data)
            this.initItem();
            this.loadData()
            this.messageSnack = this.$t(res.data.message);
            this.snackbar = !this.snackbar
          }).catch(err=>{
            console.log(err.response)
            this.messageSnack = err.response.data;
            this.snackbar = !this.snackbar
          })
          this.dialogSub = false;
      }
  },
  created() {
     this.initItem();
  },   
  mounted() {
    this.loadData();
  },
 }
 </script>