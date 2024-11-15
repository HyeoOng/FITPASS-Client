<template>
  <div class="main-parent-content">
    <!-- Main Content Section -->
    <v-container class="main-content">
      <v-row justify="center" align="center">
        <v-col v-for="(feature, index) in features" :key="index" cols="12" md="3" class="text-center">
          <v-card class="feature-card rounded-lg">
            <v-card-title>
              <v-icon color="primary" size="50">{{ feature.icon }}</v-icon>
            </v-card-title>
            <h3 class="text-h6 font-weight-bold mt-1">{{ feature.title }}</h3>
            <p v-html="feature.description" class="mb-2"></p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const features = ref([
  { icon: 'mdi-map', title: '방문 지역', description: '4' },
  { icon: 'mdi-clock', title: '운동한 총 시간', description: '23시간' },
  { icon: 'mdi-calendar', title: '가입 일수', description: '53일' },
  { icon: 'mdi-robot', title: '모은 뱃지', description: '6개' }
]);

</script>

<style scoped>
/* v-card의 스타일을 추가로 커스터마이징 */
.feature-card {
  background-color: rgba(255, 255, 255, 1); /* 카드의 배경을 반투명하게 설정 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 카드에 그림자 추가 */
  border: 2px solid rgba(138, 182, 225, 0.1); /* 테두리 색을 파란색(#1976D2)으로 설정, 두께는 2px */
}

.main-parent-content{
  position: relative;
  justify-content: center;
  height: 8vh;
  width: 100%;
}

.main-content{
  max-width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  position: absolute;
  z-index: 1;
  top: -100px;
}
</style>