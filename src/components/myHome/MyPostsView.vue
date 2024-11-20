<template>
  <div class="main-div mt-10 ml-25 mr-25">
    <h2 class="font-weight-black">내가 작성한 글</h2>
    <br>
    <v-container class="posts-container" v-if="posts.length > 0">
      <v-row class="mb-4 d-flex flex-wrap" :key="currentPage">
        <!-- 각 카드를 5개씩 표시 -->
        <v-col v-for="(post, index) in currentPosts" :key="post.postId" cols="3" md="3" sm="6">
          <v-hover v-slot="{ isHovering, props }">
            <v-card class="mx-auto" max-width="350" v-bind="props">
              <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg" /> -->
              <v-img :src="photoStore.getPhoto(post.photoUrl)" aspect-ratio="16/9" />
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
    <v-container v-else class="posts-container text-center w-full">
      아직 작성된 글이 없습니다. <br>
      글을 작성해주세요!
    </v-container>
    <v-dialog 
      v-model="showDetail"
      max-width="80%"
      max-height="75%"
    >
      <DetailPostView v-if="showDetail && selectedPost" :post="selectedPost" />
    </v-dialog>

  </div>
</template>

<script setup>
import { ref, computed, toRaw, onMounted, watch } from 'vue';
import { useRouter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';
import DetailPostView from './DetailPostView.vue';
import { usePostStore } from '@/stores/post';
import { usePhotoStore } from '@/stores/photo';

const router = useRouter();
const postStore = usePostStore();
const photoStore = usePhotoStore();

const posts = ref([])

const selectedPost = ref({});
const currentPage = ref(1);
const postsPerPage = 8;
const showDetail = ref(false);

const totalPages = computed(() => Math.ceil(posts.value.length / postsPerPage) || 1);

// 현재 페이지에 해당하는 글들만 가져오기
const currentPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return Array.isArray(posts.value) ? posts.value.slice(start, end) : [];
});

const showDetailPost = (post) => {
  selectedPost.value = post;
  showDetail.value = true;
}

// 글을 불러오는 함수
const loadPosts = async () => {
  try {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      const resp = await postStore.getMyPosts(userId);
      if (!resp?.value || !Array.isArray(resp.value)) {
        console.warn("서버에서 예상치 못한 응답을 받았습니다.");
        posts.value = [];
      } else {
        posts.value = toRaw(resp.value);
      }
    } else {
      alert("로그인 먼저 해주세요!");
      router.push("/login");
    }
  } catch (error) {
    console.error("posts 불러오는 중 에러 만남 : ", error);
  }
};
loadPosts();

onMounted(() => {
  loadPosts();
})

onBeforeRouteUpdate(async (to, from, next) => {
  await loadPosts().then(() => {
    next(); // 데이터가 로드된 후에 페이지를 이동
  });
});

watch(posts, (newPosts, oldPosts) => {
  if (newPosts !== oldPosts) {
    console.log("posts가 갱신되었습니다", newPosts);
    // 갱신된 posts로 필요한 추가 작업을 수행할 수 있습니다.
  }
});

onBeforeRouteLeave(() => {
  loadPosts();
})

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