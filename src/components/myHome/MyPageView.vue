<template>
  <div>
    <MyRecordsView />
    <KaKaoMapView />
    <MyPostsView />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useSportStore } from '@/stores/sport';



import KaKaoMapView from './KaKaoMapView.vue';
import MyPostsView from './MyPostsView.vue';
import MyRecordsView from './MyRecordsView.vue';

const sportStore = useSportStore();

onMounted(async () => {
  const userId = sessionStorage.getItem("userId");
  if(userId){
    await sportStore.getSportsArr(); // 앱 로딩 시 sports 배열 초기화
  }
});
</script>

<style lang="scss" scoped>

</style>