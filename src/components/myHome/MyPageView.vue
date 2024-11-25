<template>
  <div>
    <MyRecordsView :posts="myPosts" :places="myPlaces" />
    <KaKaoMapView :posts="myPosts" :places="myPlaces" />
    <MyPostsView />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useSportStore } from '@/stores/sport';
import { usePostStore } from '@/stores/post';
import { usePlaceStore } from '@/stores/place'

import KaKaoMapView from './KaKaoMapView.vue';
import MyPostsView from './MyPostsView.vue';
import MyRecordsView from './MyRecordsView.vue';

const sportStore = useSportStore();
const postStore = usePostStore();
const placeStore = usePlaceStore();

const myPosts = ref([]);
const myPlaces = ref([]);

const loadMyAllPosts = async () => {
  myPosts.value = await postStore.getMyAllPosts();
}

onMounted(async () => {
  const userId = sessionStorage.getItem("userId");
  if(userId){
    await sportStore.getSportsArr(); // 앱 로딩 시 sports 배열 초기화
  }
  
  await loadMyAllPosts();
});

// post 변경 감지
const watchPost = watch(
  () => myPosts.value, // post를 감시
  async (newValue) => {
    // console.log("new posts value: ", newValue)
    myPlaces.value = await placeStore.getCity(newValue.value);
  },
  { immediate: true } // 컴포넌트 초기화 시에도 즉시 실행
);
</script>

<style lang="scss" scoped>

</style>