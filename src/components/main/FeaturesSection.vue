<template>
  <v-container class="my-10">
    <h1 class="display-2 font-weight-bold text-center">여행 중 운동 기록, <span class="text-primary">FITPASS</span>와 함께 하세요.</h1>
    <p class="text-center text-subtitle-1 mb-8 mt-8">
      여행지에서의 운동을 기록하고, 친구들과 경험을 공유하는 디지털 여권 서비스, FITPASS. <br>
      운동 활동을 기록하고, 친구들과 운동 정보를 나누며, 더 건강한 여행 문화를 만들어가세요. <br>
      지금 가입하고 FITPASS와 함께 여행 중에도 건강을 챙기세요.
    </p>
    <v-row justify="center" class="pt-10 pb-10">
      <v-col v-for="(feature, index) in features" :key="index" cols="12" md="4" class="text-center pa-10">
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
