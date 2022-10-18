<template>
  <div>
    <h4 class=" subtitle-2 grey--text">Home</h4>
    <v-container class="mt-6">
      <v-row class="justify-center">
        <v-col cols="3">
          <v-card shaped>
            <v-card-title>
              <v-badge
                bordered
                color="green darken-2"
                :content="countServices"
                overlap
              >
                <v-icon
                  large
                  color="green darken-2"
                >
                  mdi-toolbox-outline
                </v-icon>
              </v-badge>
              <v-spacer/>
              <v-chip
                color="green darken-2"
                label
                outlined
              >
                Services
              </v-chip>
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card shaped>
            <v-card-title>
              <v-badge
                bordered
                color="blue darken-2"
                :content="countCategories"
                overlap
              >
                <v-icon
                  large
                  color="blue darken-2"
                >
                  mdi-shape-outline
                </v-icon>
              </v-badge>
              <v-spacer/>
              <v-chip
                color="blue darken-2"
                label
                outlined
              >
                Catégories
              </v-chip>
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card shaped>
            <v-card-title>
              <v-badge
                bordered
                color="purple darken-2"
                content="85"
                overlap
              >
                <v-icon
                  large
                  color="purple darken-2"
                >
                  mdi-gesture-tap-button
                </v-icon>
              </v-badge>
              <v-spacer/>
              <v-chip
                color="purple darken-2"
                label
                outlined
              >
                Actions
              </v-chip>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
computed: {
  countServices() {
    return this.$store.getters.countServices;
  },
  countCategories() {
    return this.$store.getters.countCategories;
  }
  
}
}
</script>

<style>

</style>