<template>
  <div class="mb-5">
    <v-sheet class="mx-auto d-md-none" >
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
            
    <v-card flat class="ma-0 pa-0 d-none d-md-flex flex-column">
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
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: [],
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' }
      ],
    };
  },

  methods: {
  }
};
</script>

<style scoped>
</style>
