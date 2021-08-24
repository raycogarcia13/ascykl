<template>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
      offset-y
      :disabled="!countItems"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark rounded text v-bind="attrs" v-on="on">
            <v-badge color="error" overlap :content="countItems" :value="countItems">
                <v-icon v-text="countItems?'mdi-cart':'mdi-cart-off'"></v-icon>
            </v-badge>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Productos en carrito</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                :class="fav ? 'red--text' : ''"
                icon
                @click="fav = !fav"
              >
            <v-chip color="primary">{{countItems}}</v-chip>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>

        <v-list>
          <v-list-item v-for="(item) in items" :key="item.product">
            <v-list-item-avatar>
              <v-img
                :src="item.picture"
                alt="John"
              >
              <template v-slot:placeholder>
                    <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                    >
                    <v-icon>mdi-image-off</v-icon>
                    </v-row>
                </template>
              </v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{item.name}}</v-list-item-title>
              <v-list-item-subtitle>{{` $${item.price} x ${item.quantity} = $${item.quantity * item.price}`}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                class="red--text"
                icon
                @click="removeOverlay(item)"
              >
                <v-icon>mdi-cart-remove</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-fade-transition>
                <v-overlay
                absolute
                :value="overlay == item.product"
                opacity=".8"
                class="text-center"
                >
                    <v-card-subtitle class="pa-0 mb-1">
                        Desea eliminar el producto del carrito
                    </v-card-subtitle>
                    <v-btn
                        color="red"
                        @click="removeItemFromCart(item)"
                        small
                        class="mr-5"
                    >
                        Remove
                    </v-btn>

                    <v-btn
                        color="success"
                        @click="overlay = false"
                        small
                    >
                        Cancel
                    </v-btn>

                </v-overlay>
            </v-fade-transition>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="font-weight-bold">Total: ${{total}}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn fab small color="primary">
                        <v-icon>mdi-cart-check</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
</template>

<script>
  export default {
    props:["items"],
    data: () => ({
      fav: true,
      menu: false,
      message: false,
      hints: true,
      overlay: false
    }),
    computed: {
        countItems(){
            return this.items.length
        },
        total(){
            let t = 0;
            this.items.forEach(it=>{
                t+=it.quantity*it.price
            })
            return t;
        }
    },
    methods: {
        removeItemFromCart(item){
            this.items.splice(this.items.findIndex(el=>el.product == item.product),1)
        },
        removeOverlay(item){
            this.overlay = item.product
        }
    },
  }
</script>