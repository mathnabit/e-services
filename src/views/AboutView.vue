<template>
  <div>
    <h4 class=" subtitle-2 grey--text">A propos</h4>
    <v-container class="mt-6">
      <v-row justify="center">
        <v-col cols="5">
          <h2 class="text-center blue--text text--darken-2">
            <v-icon
            class="pb-2 pr-4"
              large
              color="blue darken-2"
            >
              mdi-card-account-phone-outline
            </v-icon>
            <span >Contact</span>
          </h2>
          <v-card
            class="mx-auto"
            max-width="400"
            tile
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-phone-in-talk-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>+212 655952133</v-list-item-title>
                <v-list-item-subtitle>Téléphone</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-email-fast-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>contact@eservices.ma</v-list-item-title>
                <v-list-item-subtitle>Email</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-map-marker-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>BD zyayda NR 102 Benslimane</v-list-item-title>
                <v-list-item-subtitle>Adresse</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col cols="7">
          <h2 class="text-center blue--text text--darken-2">
            <v-icon
            class="pb-2 pr-4"
              large
              color="blue darken-2"
            >
              mdi-chat-question-outline
            </v-icon>
            <span >FAQ</span>
          </h2>
          <v-expansion-panels accordion>
            <v-expansion-panel>
              <v-expansion-panel-header>C'est quoi E-Services ?</v-expansion-panel-header>
              <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>Comment utiliser ?</v-expansion-panel-header>
              <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                magna aliqua. 
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>Y a t-il des updates ?</v-expansion-panel-header>
              <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                magna aliqua. Ut enim ad minim veniam.
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>