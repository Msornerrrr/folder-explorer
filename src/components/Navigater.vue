<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const items = ref([])

watch(route, () => {
  const params = route.path.split('/');
  params.shift()

  const newItems = [{ title: "APP", to: '/' }];
  let link = "";
  for (const param of params) {
    link += '/' + param
    newItems.push({
      title: param,
      to: link
    })
  }
  items.value = newItems;
})

</script>

<template>
  <v-breadcrumbs :items="items">
    <template v-slot:prepend>
      <v-icon size="small" icon="mdi-vuetify"></v-icon>
    </template>
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
</template>