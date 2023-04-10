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
    <RouterLink :to="`folders/${data[index-1]}`" class="linkless">
      <v-img class="file-icon" src="../assets/folder.png" alt="folder image" />
      <p class="file-subtitle">{{ data[index-1] }}</p>
    </RouterLink>
  </ListWrapper>
</template>

<style scoped>
.file-icon {
  width: 120px;
  margin: 0 auto 5px;
}
</style>