<template>
  <div class="mb-5">
    <v-sheet class="mx-auto" >
      <v-slide-group
        multiple
        show-arrows
      >
        <v-slide-item
          v-for="(item,i) in items"
          :key="i"
          v-slot="{ active, toggle }"
        >
          <v-btn
            class="mx-2"
            :input-value="active"
            active-class="primary white--text"
            depressed
            rounded
            @click="toggle"
          >
            <v-icon>{{item.icon}}</v-icon>
            {{item.text}}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
            
    <!-- <v-card flat class="ma-0 pa-0 d-none d-md-flex flex-column">
        <v-card-text class="scroll-y-categories">
            <v-list rounded>
                  <v-list-item-group
                      multiple
                      v-model="selectedItem"
                      color="primary"
                  >
                      <v-list-item
                      dense
                      v-for="(item, i) in items"
                      :key="i"
                      >
                      <v-list-item-icon>
                          <v-icon v-text="item.icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                          <v-list-item-title v-text="item.text"></v-list-item-title>
                      </v-list-item-content>
                      </v-list-item>
                  </v-list-item-group>
              </v-list>
        </v-card-text>
    </v-card> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: [],
      items: [
        { text: 'Transporte', icon: 'mdi-car' },
        { text: 'Comestibles', icon: 'mdi-account' },
        { text: 'Hogar', icon: 'mdi-flag' },
        { text: 'Electrodomésticos', icon: 'mdi-cog' },
        { text: 'Otros', icon: 'mdi-clock' },
      ],
    };
  },

  methods: {
  }
};
</script>

<style scoped>
</style>
