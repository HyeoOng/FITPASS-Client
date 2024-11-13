<template>
  <!-- 상단 고정 로고 -->
  <v-container fluid class="logoContainer">
    <v-img
      class="logo"
      :src="logoImg"
      max-width="80"
      cover
    ></v-img>
  </v-container>
</template>

<script setup>
import logoImg from '@/assets/logo.png';
</script>

<style scoped>
.logoContainer{
  justify-content: flex-end;
  display: flex;
  padding: 3em;
  padding-bottom: 0;
}
</style>