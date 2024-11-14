<template>
  <v-app>
    <!-- Nav Bar -->
    <v-app-bar :elevation="0" class="navi-bar">
      <v-toolbar-title class="text-h5 font-weight-bold">
        <v-img :width="80" aspect-ratio="16/9" cover :src="logoSrc"></v-img> 
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="naviBtnClass">
        <v-btn text class="nav-btn" @click="goToMyHome">HOME</v-btn>
        <v-btn text class="nav-btn">Write</v-btn>
        <v-btn text class="nav-btn">Community</v-btn>
        <v-btn text class="nav-btn">Admin</v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-btn class="login-btn mr-5" @click="goToLogin" outlined>LOG IN</v-btn>
    </v-app-bar>

    <!-- Main Content Section -->
    <v-container class="my-10 main-content">
      <v-row justify="center" class="pt-10 pb-10">
        <v-col v-for="(feature, index) in features" :key="index" cols="12" md="3" class="text-center pa-10">
          <v-card class="feature-card rounded-lg">
            <v-card-title>
              <v-icon color="primary" size="56">{{ feature.icon }}</v-icon>
            </v-card-title>
            <h3 class="text-h6 font-weight-bold mt-4">{{ feature.title }}</h3>
            <p v-html="feature.description"></p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLogin = () => {
  router.push('/login');
};

const goToMyHome = () => {
  router.push('/myhome');
};

// 로컬 이미지 경로를 import로 불러오기
import logo from '@/assets/logo.png';

const logoSrc = ref(logo);

const features = ref([
  { icon: 'mdi-map', title: '방문 지역', description: '4' },
  { icon: 'mdi-clock', title: '운동한 총 시간', description: '23시간' },
  { icon: 'mdi-calendar', title: '가입 일수', description: '53일' },
  { icon: 'mdi-robot', title: '모은 뱃지', description: '6개' }
]);
</script>

<style scoped lang="scss">
/* 배경 색상을 하늘색으로 적용 */
.main-content {
    background-image: url("@/assets/map.jpg");
    height: 20vh; /* 페이지 절반 이상의 높이를 차지 */
  padding-top: 40px; /* 이미지가 Nav Bar에 겹치지 않도록 여백 */
}

.navi-bar {
  background-color: #fff;
}

.login-btn {
  background-color: #7FC8F8;
  color: white;
}

/* v-card의 스타일을 추가로 커스터마이징 */
.feature-card {
  background-color: rgba(255, 255, 255, 0.8); /* 카드의 배경을 반투명하게 설정 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 카드에 그림자 추가 */
}
</style>
