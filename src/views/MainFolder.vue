<script setup>
import ListWrapper from '../components/ListWrapper.vue';
import { useFetch } from '../hooks/fetch';
import { ref } from 'vue';

const baseUrl = "http://localhost:8080";
const url = ref(`${baseUrl}/folders`);
const { data, error } = useFetch(url.value);
</script>

<template>
  <ListWrapper v-if="data" :data-list="data" v-slot="{ index }">
    <router-link :to="`folders/${data[index-1]}`" class="linkless">
      <v-img class="file-icon" src="../assets/folder.png" alt="folder image" />
      <p class="subtitle">{{ data[index-1] }}</p>
    </router-link>
  </ListWrapper>
  <!-- Only for long loading time -->
  <!-- <p v-else>loading</p> -->
</template>

<style scoped>
.file-icon {
  width: 120px;
  margin: 0 auto 5px;
}

.subtitle {
  text-align: center;
  font-size: large;
}
</style>