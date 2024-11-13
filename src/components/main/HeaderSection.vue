<template>
  <div class="header text-center">
    <div class="text-start">
      <h1 class="display-1 font-weight-bold">운동과 여행을 <br>하나로 연결하는 <span class="text-primary font-weight-black">FITPASS</span></h1>
      <p class="text-subtitle-1">활동 기록부터 여행지 추천까지, 여행의 순간을 남기고 친구들과 공유하세요.</p>

      <div class="logBtn pt-5">
        <v-btn class="mx-3 pink" @click="goToLogin" outlined>LOG IN</v-btn>
        <v-btn class="mx-3 pink" @click="goToSignup" outlined>SIGN UP</v-btn>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLogin = () => {
  router.push("/login")
}

const goToSignup = () => {
  router.push("/signup")
}
</script>

<style scoped>
.text-primary {
  color: #8AB6E1;
}

.pink{
  background-color: #FFB6B9;
  color: white;
}

.header {
  margin-top: 64px;
  position: relative;
  height: 35vh; /* 적당한 높이 설정 */
  width: 100%;
  z-index: 1; /* 텍스트가 배경 위에 오도록 설정 */
  padding: 5%;
  justify-items: start;
  align-content: center;

  /* 추가 */
  isolation: isolate;
}

.header::before {
  content: '';
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  position: absolute;
  background-image: url('@/assets/map.jpg');
  background-position: center center;
  background-size: cover;
  opacity: 0.15; /* 배경 이미지에만 투명도를 적용 */
  z-index: -1; /* 배경 이미지가 텍스트 아래에 오도록 설정 */
}
</style>
