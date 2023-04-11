<script setup>
import { useRoute } from 'vue-router';
import ListWrapper from '../components/ListWrapper.vue';
import { useFetch } from '../hooks/fetch';

const route = useRoute();

const { data, error } = useFetch('/api' + route.path);

</script>

<template>
  <ListWrapper v-if="data" :data-list="data" v-slot="{ index }">
    <RouterLink :to="`${route.path}/${data[index - 1].slice(0, -4)}`" class="linkless">
      <v-img class="file-icon" src="../assets/pdf.png" alt="pdf image" />
      <p class="file-subtitle">{{ data[index - 1] }}</p>
    </RouterLink>
  </ListWrapper>
</template>

<style scoped>
.file-icon {
  width: 100px;
  margin: 0 auto 5px;
}
</style>