<template>
  <div>
    <Navbar />
    <HeaderSection />
    <FeaturesSection v-if="!userStore.isLogined" />
    <MyPageView v-else />
  </div>
</template>

<script setup>
import Navbar from '@/components/main/Navbar.vue';
import HeaderSection from '@/components/main/HeaderSection.vue';
import FeaturesSection from '@/components/main/FeaturesSection.vue';

import { useUserStore } from '@/stores/user';
import MyPageView from '../myHome/MyPageView.vue';

const userStore = useUserStore();
</script>

<style scoped>

</style>