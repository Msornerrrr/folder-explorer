<script setup>
import { computed } from '@vue/reactivity';

const props = defineProps(['dataList']);

const dataLen = computed(() => {
  return props.dataList.length;
})
</script>

<template>
<v-container>
  <v-row>
    <v-col v-for="index in dataLen" :key="index" cols="2" class="clickable">
      <slot :index="index"></slot>
    </v-col>
  </v-row>
</v-container>
</template>

<style>
.clickable {
  transition: .5s;
}

.clickable:hover {
  transform: scale(1.05);
}
</style>