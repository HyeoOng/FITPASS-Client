<template>
  <div>
    <HeaderSection />
    <FeaturesSection v-if="!userStore.isLogined" />
    <MyPageView v-else />
  </div>
</template>

<script setup>
import HeaderSection from '@/components/main/HeaderSection.vue';
import FeaturesSection from '@/components/main/FeaturesSection.vue';
import MyPageView from '../myHome/MyPageView.vue';

import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<style scoped>

</style>