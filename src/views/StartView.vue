<template>
  <v-app id="home-page">
    <v-container fluid class="fill-height">
      <v-row>
        <v-col cols="7">
          <v-main class="mt-12 p-6">
              <h1>Welcome Back :)</h1>
              <p>Notre plateforme contient un ensemble de services à fourinir</p>
              <v-img
                src="@/assets/e-services.jpg"
                height="50%"
              />
          </v-main>
        </v-col>
        <v-col cols="5" id="col-login" >
          <v-main class="mt-16">
            
            <v-card width="400" class="mx-auto mt-2">
              <v-card-title>
                <v-img 
              class="mx-auto"
              alt="Vuetify Logo"
              src="@/assets/logo.png"
              width="40"
              height="50"
            />
              </v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field
                  label="username"
                  prepend-icon="mdi-account-circle"
                  >
                  </v-text-field>
                  <v-text-field
                  label="password"
                  type="password"
                  prepend-icon="mdi-lock"
                  >
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <router-link to="/dashboard">
                  <v-btn color="success">Se connecter</v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-main>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {

}
</script>

<style scoped>
#home-page {
  background-color: #FFF;
}

#col-login {
  background-color: aquamarine;
}
</style>