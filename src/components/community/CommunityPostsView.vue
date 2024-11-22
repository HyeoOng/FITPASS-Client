<template>
  
  <div class="main-div mt-10 ml-25 mr-25">
    <h2 class="font-weight-black">게시글 보기</h2>
    <v-container class="posts-container">
      <v-tabs v-model="tab" align-tabs="end" color="blue-lighten-2" class="mb-3">
        <v-tab :value="'public'" @click="handlePageChange('public')">전체</v-tab>
        <v-tab :value="'friend'" @click="handlePageChange('friend')">친구</v-tab>
      </v-tabs>
      <v-row class="mb-4 d-flex flex-wrap" :key="currentPage">
        <!-- 각 카드를 4개씩 표시 -->
        <v-col v-for="(post, idx) in currentPosts" :key="post.postId" cols="3" md="3" sm="6">
          <v-hover v-slot="{ isHovering, props }">
            <v-card class="mx-auto" max-width="350" v-bind="props">
              <v-img :src="imageRefUrls[idx]" 
              lazy-src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
              aspect-ratio="4/3" class="card-img" 
              max-width="350"/>
              <v-overlay :model-value="!!isHovering" class="align-center justify-center text-white pa-5" contained>
                <h3>{{ post.title.length > 10 ? post.title.slice(0, 10) + '...' : post.title }}</h3>
                <br>
                <v-btn variant="text" @click="showDetailPost(post)">Show Details</v-btn>
              </v-overlay>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <!-- Pagination -->
      <v-pagination v-model="currentPage" :length="totalPages" :total-visible="5" circle></v-pagination>
    </v-container>

    <v-dialog 
      v-model="showDetail"
      max-width="80%"
      max-height="75%"
    >
      <DetailPostView v-if="showDetail && selectedPost" :post="selectedPost" @close="closeModal" />
    </v-dialog>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePosts } from '@/util/usePosts';
import { usePostStore } from '@/stores/post';

import DetailPostView from '../myHome/DetailPostView.vue';

const postStore = usePostStore();

const { posts, imageRefUrls, totalPages, loadPosts } = usePosts();

const tab = ref('public');

const currentPage = ref(1);
const postsPerPage = 16;

const showDetail = ref(false);
const selectedPost = ref({});

// 현재 페이지에 해당하는 글들만 가져오기
const currentPosts = computed(() => {
  // posts.value = tab.value === 'public' ? publicPosts.value : friendPosts.value;
  return posts.value.slice(0, postsPerPage);
});

const showDetailPost = (post) => {
  selectedPost.value = post;
  showDetail.value = true;
}

const handlePageChange = (tabVal) => {
  let fetchPostsFn;

  // tabVal에 따라 함수 결정
  if (tabVal === 'friend') {
    fetchPostsFn = (currentPage, postsPerPage) => postStore.getFriendsPosts(currentPage, postsPerPage);
  } else {
    // 기본값: 모든 사용자 글
    fetchPostsFn = (currentPage, postsPerPage) => postStore.getAllPosts(currentPage, postsPerPage);
  }


  loadPosts(fetchPostsFn, currentPage.value, postsPerPage);
};

onMounted(() => {
  loadPosts(
    (currentPage, postsPerPage) => postStore.getAllPosts(currentPage, postsPerPage),
    currentPage.value,
    postsPerPage
  );
})

const closeModal = () =>{
  showDetail.value = false;
}
</script>

<style scoped>
.main-div {
  padding-left: 5vw;
  /* padding-right: 5vw; */
}

.posts-container {
  justify-content: center;
  /* border: 1px solid #000; */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);  /* 4px 아래로, 8px 흐림, 10% 투명도 */
  padding-top: 1vh;
  padding-bottom: 2vh;
  margin-bottom: 4vh;
}

.v-pagination {
  margin-top: 20px;
  text-align: center;
}

.card-img{
  object-fit: cover;
  object-position: center
}
</style>