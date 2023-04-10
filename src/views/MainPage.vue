<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <!-- Suppose to be website main page -->
  <!-- For now, it's just a button to the main folder -->
  <div class="round-btn" @click="router.push({ path:'folders' })">
    Open Folder
  </div>
</template>

<style scoped>
.round-btn {
  margin: 200px auto 0;
  width: 300px;
  height: 300px;
  text-align: center;
  line-height: 300px;
  font-size: 2rem;
  border-radius: 50%;
  background-color: whitesmoke;
  transition: .5s;
}

.round-btn:hover {
  background-color: aliceblue;
  transform: scale(1.05) rotate(15deg);
  cursor: pointer;
}
</style>