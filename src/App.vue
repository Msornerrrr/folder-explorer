<script setup>
import Navigater from './components/Navigater.vue';
</script>

<template>
  <v-app>
    <Navigater />
    <v-main class="bg-grey-lighten-2">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>