<template>
  <!-- 
    C'est mieux d'afficher ici le component HomeView comme le start page de l'application
    et passer le router-view vers un component Dashboard qui va paqueter les autres components
    de fonctionnalités. fausse, we need nested routes !!
  -->
  <router-view />
</template>

<script>
export default {
name: 'App'
}
</script>
