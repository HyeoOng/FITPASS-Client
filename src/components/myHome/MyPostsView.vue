<template>
  <div class="main-div mt-10 ml-25 mr-25">
    <h2 class="font-weight-black">내가 작성한 글</h2>
    <br>
    <v-container class="posts-container" v-if="posts.length > 0">
      <v-row class="mb-4 d-flex flex-wrap" :key="currentPage" justify="center" align="center">
        <!-- 각 카드를 5개씩 표시 -->
        <v-col v-for="(post, index) in currentPosts" :key="post.postId" cols="3" md="3" sm="6">
          <v-hover v-slot="{ isHovering, props }">
            <v-card class="mx-auto" max-width="350" v-bind="props">
              <v-img :src="imageRefUrls[index]" 
              lazy-src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
              aspect-ratio="4/3" class="card-img" max-width="350" />
              <v-overlay :model-value="isHovering" class="align-center justify-center text-white pa-5" contained>
                <h3>{{ post.title.length > 10 ? post.title.slice(0, 10) + '...' : post.title }}</h3>
                <br>
                <v-btn variant="text" @click="showDetailPost(post)">Show Details</v-btn>
              </v-overlay>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <!-- Pagination -->
      <v-pagination v-model="currentPage" :length="totalPages" :total-visible="7"  @update:modelValue="handlePageChange" circle></v-pagination>
    </v-container>
    <v-container v-else class="posts-container text-center w-full">
      아직 작성된 글이 없습니다. <br>
      글을 작성해주세요!
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
//:photoUrl="selectedPostPhoto"

import { ref, computed, toRaw, onMounted, watch } from 'vue';
import { onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';
import DetailPostView from './DetailPostView.vue';
import { usePostStore } from '@/stores/post';
import { usePosts } from '@/util/usePosts';

const { posts, imageRefUrls, totalPages, loadPosts } = usePosts();

const postStore = usePostStore();

const selectedPost = ref({});

const currentPage = ref(1);
const postsPerPage = 8;

const showDetail = ref(false);

// 현재 페이지에 해당하는 글들만 가져오기
const currentPosts = computed(() => {
  return Array.isArray(posts.value) ? posts.value.slice(0, postsPerPage) : [];
});

const showDetailPost = (post) => {
  selectedPost.value = post;
  showDetail.value = true;
}

const handlePageChange = () => {
  loadPosts(
    (currentPage, postsPerPage) => postStore.getMyPosts(currentPage, postsPerPage),
    currentPage.value,
    postsPerPage
  );
};


onMounted(() => {
  // loadPosts();
  loadPosts(
    (currentPage, postsPerPage) => postStore.getMyPosts(currentPage, postsPerPage),
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
  padding-right: 5vw;
}

.posts-container {
  justify-content: center;
  /* border: 1px solid #000; */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);  /* 4px 아래로, 8px 흐림, 10% 투명도 */
  padding-top: 4vh;
  padding-bottom: 2vh;
  margin-bottom: 4vh;
}

.v-pagination {
  margin-top: 20px;
  text-align: center;
}

</style>