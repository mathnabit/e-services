<template>
  <v-app id="home-page">
    <v-container fluid fill-height  style="padding: 0px">
      <v-row align="center" justify="center" >
        <v-col cols="6" class="blue lighten-1" style="border-bottom-right-radius: 300px; height: 720px">
          <!-- <v-main class="mt-0 p-6">  -->
            <v-card-text class="white--text" >
              <h2 class="text-center">Bienvenu chez SMART KIOSK !</h2>
              <h4 class="text-center pt-4">
                Notre plateforme contient un ensemble de services à fournir<br>  Exploitez vous !
              </h4>
            </v-card-text>
            <v-img 
              class="mx-auto"
              alt="Vuetify Logo"
              src="@/assets/business-management.png"
              width="500px"
              height="520px"
            />
          <!-- </v-main> -->
        </v-col>
        <v-col cols="6" >
          <v-main class="mt-0 p-6">  
            <v-img 
              class="mx-auto"
              alt="Vuetify Logo"
              src="@/assets/smartkiosk.png"
              width="200px"
              height="100px"
            />              
            <v-card width="400" class="mx-auto mt-0" elevation="0">
              <v-card-title align="center">
                <h4 class="subtitle-2 grey--text">Se connecter à votre compte</h4>
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="submit">
                  <v-text-field
                    label="email"
                    outlined
                    prepend-inner-icon="mdi-account-circle"
                    v-model="form.email"
                  >
                  </v-text-field>
                  <v-text-field
                    label="password"
                    type="password"
                    outlined
                    prepend-inner-icon="mdi-lock"
                    v-model="form.password"
                  >
                  </v-text-field>
                  <span class="caption blue--text">Mot de passe oublié !</span>
                  <v-spacer></v-spacer>
                  <!-- <router-link to="/dashboard" style="text-decoration: none;"> -->
                    <v-btn type="submit" color="blue" dark block tile class="mt-4"> 
                      Se connecter
                    </v-btn>
                  <!-- </router-link> -->
                </v-form>
              </v-card-text>
            </v-card>
            <v-card
              flat
              class="py-12"
            >
              <v-card-text>
                <v-row
                  align="center"
                  justify="center"
                >
                  <v-col cols="12">
                    <p class="text-center">
                      Suivez nous !
                    </p>
                  </v-col>
                  <v-btn-toggle
                    rounded
                  >
                    <v-btn>
                      <v-icon color="blue darken-2">mdi-facebook</v-icon>
                    </v-btn>
                    <v-btn>
                      <v-icon color="purple darken-2">mdi-instagram</v-icon>
                    </v-btn>
                    <v-btn>
                      <v-icon color="blue lighten-1">mdi-twitter</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </v-row>
              </v-card-text>
            </v-card>
          </v-main>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
//import axios from 'axios';
import {mapActions} from 'vuex';

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      login: 'login',
    }),
    submit() {
      this.login(this.form); 
    }
  }
}
</script>

<style scoped>
#home-page {
  background-color: #FFF;
}

#col-login {
  background-color: aliceblue;
}
</style>