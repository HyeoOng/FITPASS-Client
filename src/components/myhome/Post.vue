<template>
  <v-container class="my-10">
    <h1>나의 글</h1>
    <v-row justify="center" class="pt-10 pb-10">
      <v-col v-for="(feature, index) in features" :key="index" cols="12" md="3" class="text-center pa-10">
        <v-card class="feature-card rounded-lg">
          <v-card-title><v-icon color="primary" size="56">{{ feature.icon }}</v-icon></v-card-title>
          <h3 class="text-h6 font-weight-bold mt-4">{{ feature.title }}</h3>
          <p v-html="feature.description"></p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const features = ref([
  { icon: 'mdi-map', title: '여행 중 운동 기록과 관리', description: '운동한 위치, 운동 종목 등을 <br>기록할 수 있습니다.' },
  { icon: 'mdi-account-group', title: '친구들과의 경험 공유', description: '사진, 텍스트, 위치 태그를 통해 <br> 친구들과 공유하고 소통할 수 있습니다.' },
  { icon: 'mdi-robot', title: 'AI 기반 맞춤 여행 추천', description: '운동 장소 주변의 <br>인기 여행지를 추천합니다.' },
  { icon: 'mdi-robot', title: 'AI 기반 맞춤 여행 추천', description: '운동 장소 주변의 <br>인기 여행지를 추천합니다.' }
]);
</script>

<style scoped>
.text-primary {
  color: #8AB6E1;
}

.feature-card{
  width: 18vw; /* 원하는 너비 설정 */
  height: 300px; /* 원하는 높이 설정 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 가운데 정렬 */
  align-items: center; /* 가로 가운데 정렬 */
}
</style>
