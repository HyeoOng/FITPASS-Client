<template>
  <v-app id="app"> 
    <router-view></router-view>
  </v-app>
</template>

<script setup>
import { useSportStore } from './stores/sport';
import { onMounted } from 'vue';

const sportStore = useSportStore();

onMounted(async () => {
  await sportStore.getSportsArr(); // 앱 로딩 시 sports 배열 초기화
});
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
