<template>
  <nav>
    <!-- La side barre flottante -->
    <v-navigation-drawer
      v-model="drawer"
      app
      dark
      class="blue darken-4"
    >
      <v-list-item class="justify-center mt-4">
        <v-avatar color="blue darken-2" size="100">
          <v-icon dark size="100">
            mdi-account-circle
          </v-icon>
        </v-avatar>
      </v-list-item>
      <v-list-item class="text-center">
        <v-list-item-content>
          <v-list-item-title>
            <v-btn plain>
              Saad Saad
            </v-btn>  
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list>
        <v-list-item 
          router :to="item.route"
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-banner
          elevation="2"
          icon="mdi-copyright"
          rounded
          sticky
        >
          Smart KIOSK <br> 2022 - Present
        </v-banner>
        </div>
      </template>
    </v-navigation-drawer>
    <!-- La top barre  -->
    <v-app-bar app clipped-right flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Smart </span>
        <span>Kiosk</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn plain>
        <span @click="signOut">Log out</span>
        <v-icon right>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>   
  </nav>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard', route: '/dashboard' },
        { title: 'Services', icon: 'mdi-toolbox', route: '/dashboard/services' },
        { title: 'Catégories', icon: 'mdi-shape', route: '/dashboard/categories' },
        { title: 'About', icon: 'mdi-information', route: '/dashboard/about' },

      ],
    }
  }, 
  methods: {
    // On récupère l'action logout avec le nom logOut
    ...mapActions ({
      'logOut': 'logout'
    }),
    // On déclenche l'action récupérée via le méthode signOut qui est
    // déclenchée en cliquant sur le button LogOut du Navbar, puis on
    // redirige l'utilisateur vers la page start du login
    signOut() {
      this.logOut().then(() => this.$router.push('/'));
    }
  }
}
</script>
