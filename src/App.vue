<template>
  <v-app id="app"> 
    <router-view></router-view>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue';
import { useUserStore } from './stores/user';

const userStore = useUserStore();

onMounted(() => {
  userStore.getCurrentUser();
})
</script>

<style>
body {
  font-family: 'Noto Sans KR', sans-serif;
}
#app{
  margin: 0px;
  padding: 0px;
  display: contents;
  width: 100%;
}
</style>
