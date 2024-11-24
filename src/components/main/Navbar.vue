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
      <v-btn text class="nav-btn" @click="router.push('/')" variant="plain" style="height: 100%;">HOME</v-btn>
      <v-btn text class="nav-btn" @click="router.push('/write')" variant="plain" style="height: 100%;">Write</v-btn>
      <v-btn text class="nav-btn" @click="router.push('/community')" variant="plain" style="height: 100%;">Community</v-btn>
      <v-btn text class="nav-btn" @click="router.push('/admin')" variant="plain" style="height: 100%;">Admin</v-btn>
    </div>
    <v-spacer></v-spacer>
    <v-btn v-if="!userStore.isLogined" class="login-btn mr-5" @click="goToLogin" outlined>LOG IN</v-btn>
    <div v-else class="my-info">
      <v-row class="my-info-row">
        <p class="color-blue" align="center">{{ userNn }}</p>님
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-avatar class="ml-3" v-bind="props">
              <v-img
              :src="profile ? profile : defaultProfileImg"
              alt="프로필 사진"
              />
            </v-avatar>
          </template>
          <v-list>
            <v-list-item @click="goToProfile">
              <v-list-item-title>나의 프로필</v-list-item-title>
            </v-list-item>
            <v-list-item @click="openAdminDialog">
              <v-list-item-title>관리자에게 요청</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goToMain">
              <v-list-item-title>로그아웃</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!--관리자 요청 Dialog-->
        <v-dialog v-model="adminDialog" class="admin-dialog" centered>
          <AdminDialogCard @close-dialog="closeDialog"/>
        </v-dialog>
        
      </v-row>
    </div>

  </v-app-bar>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

import imgSrc from '@/assets/profile.png';
import AdminDialogCard from './AdminDialogCard.vue';

// 로컬 이미지 경로를 import로 불러오기
import logo from '@/assets/logo.png';
import defaultProfileImg from '@/assets/profile.png';

const router = useRouter();
const userStore = useUserStore();

const profile = ref(null);
const userNn = computed(() => userStore.userNn);
const adminDialog = ref(false);

const goToLogin = () => {
  router.push('/login')
}

const openAdminDialog = () => {
  adminDialog.value = true;
}

const closeDialog = () => {
  adminDialog.value = false;
}

// 로컬 이미지 경로를 ref로 저장
const logoSrc = ref(logo);
const goToMain = () => {
  userStore.logout();
}

const goToProfile = () => {
  router.push('/profile');
}

onMounted(() => {
  userNn.value = sessionStorage.getItem("nickname");
  
})
</script>

<style scoped>
.admin-dialog{
  max-width: 80vh;
  justify-items: center;
  align-items: center;
}

.my-info-row{
  align-items: center;
}

.my-info{
  margin-right: 3%;
}

.v-toolbar-title {
  color: #000;
}

.color-blue{
  color: #7FC8F8;
}

.login-btn{
  background-color: #7FC8F8;
  color: white;
}
</style>
