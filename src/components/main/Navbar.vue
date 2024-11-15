<template>
  <v-app-bar :elevation="0" class="navi-bar">
    <v-toolbar-title class="text-h5 font-weight-bold">
      <v-img
      :width="80"
      aspect-ratio="16/9"
      cover
      :src="logoSrc"
      @click="router.push('/')"
      ></v-img> 
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="userStore.isLogined" class="naviBtnClass">
      <v-btn text class="nav-btn" @click="router.push('/')">HOME</v-btn>
      <v-btn text class="nav-btn" @click="router.push('/write')">Write</v-btn>
      <v-btn text class="nav-btn" @click="router.push('/community')">Community</v-btn>
      <v-btn text class="nav-btn" @click="router.push('/admin')">Admin</v-btn>
    </div>
    <v-spacer></v-spacer>
    <v-btn v-if="!userStore.isLogined" class="login-btn mr-5" @click="goToLogin" outlined>LOG IN</v-btn>
    <v-btn v-else class="login-btn mr-5" @click="goToMain" outlined>LOG OUT</v-btn>
    <!-- v-avator로 바꾸기 프로필로!-->
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();

const goToLogin = () => {
  router.push('/login')
}

// 로컬 이미지 경로를 import로 불러오기
import logo from '@/assets/logo.png';

// 로컬 이미지 경로를 ref로 저장
const logoSrc = ref(logo);
const goToMain = () => {
  userStore.logOut();
  router.push('/');
}
</script>

<style scoped>

.v-toolbar-title {
  color: #000;
}

.login-btn{
  background-color: #7FC8F8;
  color: white;
}
</style>
