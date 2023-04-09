<script setup>
import { useRoute } from 'vue-router';
import ListWrapper from '../components/ListWrapper.vue';
import { useFetch } from '../hooks/fetch';
import { ref } from 'vue';

const route = useRoute();
const baseUrl = "http://localhost:8080";
const relativeUrl = route.path;

const url = ref(baseUrl + relativeUrl);
const { data, error } = useFetch(url.value);

</script>

<template>
  <ListWrapper v-if="data" :data-list="data" v-slot="{ index }">
    <router-link :to="`${relativeUrl}/${data[index - 1].slice(0, -4)}`" class="linkless">
      <v-img class="file-icon" src="../assets/pdf.png" alt="pdf image" />
      <p class="subtitle">{{ data[index - 1] }}</p>
    </router-link>
  </ListWrapper>
  <!-- Only for long loading time -->
  <!-- <p v-else>loading</p> -->
</template>

<style scoped>
.file-icon {
  width: 100px;
  margin: 0 auto 5px;
}

.subtitle {
  text-align: center;
  font-size: large;
}
</style>