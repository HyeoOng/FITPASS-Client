<template>
  <div class="banner-img">
    <h1 class="font-weight-black">community</h1>
  </div>
  <div class="main-div">
    <FriendListView />
    <PostsView />
  </div>
</template>

<script setup>
import FriendListView from './FriendListView.vue';
import PostsView from './CommunityPostsView.vue';


</script>

<style scoped>
.banner-img {
  width: 100%;
  height: 5em;
  justify-items: center;
  align-content: center;
  position: relative;
  margin-top: 64px;
}

.banner-img::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("@/assets/map.jpg"); /* 배경 이미지 경로 */
  background-size: cover;
  background-position: center;
  opacity: 0.15; /* 배경 이미지에만 적용되는 투명도 */
  z-index: -1;
}

</style>