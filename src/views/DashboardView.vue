<template>
<v-app>
  <Navbar />  
  <v-main class="mx-4 my-2">
    <!-- <v-container fluid> -->
      <router-view/>
    <!-- </v-container> -->
  </v-main>
</v-app>
</template>

<script>
import Navbar from '@/components/Navbar';
export default {
name: 'DashboardView',
components: { Navbar }
}
</script>

<style>

</style>