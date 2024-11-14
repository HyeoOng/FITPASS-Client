<template>
  <div>
    <Navbar/>
    <Statistics />
    <div class="map-wrapper">
      <KakaoMap />
    </div>
    <Post />
  </div>
</template>

<script setup>
import Navbar from '@/components/common/Navbar.vue';
import Statistics from '@/components/myhome/Statistics.vue';
import KakaoMap from '@/components/myhome/KakaoMap.vue';
import Post from '@/components/myhome/Post.vue';

</script>

<style scoped>
.map-wrapper {
  margin-top: 0px;  /* Adjust the space between Statistics and KakaoMap */
}
</style>