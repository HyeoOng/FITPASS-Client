<template>
  <div class="main-div mt-10 ml-25 mr-25">
    <h2 class="font-weight-black">내가 작성한 글</h2>
    <br>
    <v-container class="posts-container">
      <v-row class="mb-4 d-flex flex-wrap" :key="currentPage">
        <!-- 각 카드를 5개씩 표시 -->
        <v-col v-for="(post, index) in currentPosts" :key="post.postId" cols="3" md="3" sm="6">
          <v-hover v-slot="{ isHovering, props }">
            <v-card class="mx-auto" max-width="350" v-bind="props">
              <v-img src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg" />
              <v-overlay :model-value="!!isHovering" class="align-center justify-center text-white pa-5" contained>
                <h3>{{ post.title.length > 10 ? post.title.slice(0, 10) + '...' : post.title }}</h3>
                <br>
                <v-btn variant="text">Show Details</v-btn>
              </v-overlay>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <!-- Pagination -->
      <v-pagination v-model="currentPage" :length="totalPages" :total-visible="5" circle></v-pagination>
    </v-container>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const posts = ref([
  { postId: 1, title: "카우링 스타아", content: "내용1", userId: 1, placeId: 1, photoId: 2, exerciseDuration: 30, isPublic: 0, photoUrl: "@/assets/login.png" },
  { postId: 2, title: "밤 하늘의 벼어얼", content: "내용2", userId: 1, placeId: 2, photoId: 2, exerciseDuration: 30, isPublic: 0, photoUrl: "@/assets/login.png" },
  { postId: 3, title: "배럴댄열루이비똥 루이비또옹ㅇㅇㅇㅇㅇㅇㅇㅇㅇ", content: "내용3", userId: 1, placeId: 3, photoId: 2, exerciseDuration: 30, isPublic: 0, photoUrl: "@/assets/login.png" },
  { postId: 4, title: "카우링 스타아 스타아", content: "내용4", userId: 1, placeId: 4, photoId: 2, exerciseDuration: 30, isPublic: 0, photoUrl: "@/assets/login.png" },
  { postId: 5, title: "팜하늘의 벼어어엉ㄹ", content: "내용5", userId: 1, placeId: 5, photoId: 2, exerciseDuration: 30, isPublic: 0, photoUrl: "@/assets/login.png" },
  { postId: 6, title: "제목6", content: "내용6", userId: 1, placeId: 6, photoId: 2, exerciseDuration: 30, isPublic: 0, photoUrl: "@/assets/login.png" },
  { postId: 7, title: "제목7", content: "내용7", userId: 1, placeId: 7, photoId: 2, exerciseDuration: 30, isPublic: 0, photoUrl: "@/assets/login.png" },
  { postId: 8, title: "제목8", content: "내용8", userId: 1, placeId: 8, photoId: 2, exerciseDuration: 30, isPublic: 0, photoUrl: "@/assets/login.png" },
  { postId: 9, title: "제목9", content: "내용9", userId: 1, placeId: 9, photoId: 2, exerciseDuration: 30, isPublic: 0, photoUrl: "@/assets/login.png" },
  { postId: 10, title: "제목10", content: "내용10", userId: 1, placeId: 10, photoId: 2, exerciseDuration: 30, isPublic: 0, photoUrl: "@/assets/login.png" },
  { postId: 11, title: "제목11", content: "내용10", userId: 1, placeId: 10, photoId: 2, exerciseDuration: 30, isPublic: 0, photoUrl: "@/assets/login.png" },
  { postId: 12, title: "제목12", content: "내용10", userId: 1, placeId: 10, photoId: 2, exerciseDuration: 30, isPublic: 0, photoUrl: "@/assets/login.png" },
  { postId: 13, title: "제목13", content: "내용10", userId: 1, placeId: 10, photoId: 2, exerciseDuration: 30, isPublic: 0, photoUrl: "@/assets/login.png" },
  { postId: 14, title: "제목14", content: "내용10", userId: 1, placeId: 10, photoId: 2, exerciseDuration: 30, isPublic: 0, photoUrl: "@/assets/login.png" },
  { postId: 15, title: "제목15", content: "내용10", userId: 1, placeId: 10, photoId: 2, exerciseDuration: 30, isPublic: 0, photoUrl: "@/assets/login.png" },
  { postId: 16, title: "제목16", content: "내용10", userId: 1, placeId: 10, photoId: 2, exerciseDuration: 30, isPublic: 0, photoUrl: "@/assets/login.png" },
  { postId: 17, title: "제목17", content: "내용10", userId: 1, placeId: 10, photoId: 2, exerciseDuration: 30, isPublic: 0, photoUrl: "@/assets/login.png" },
  { postId: 18, title: "제목18", content: "내용10", userId: 1, placeId: 10, photoId: 2, exerciseDuration: 30, isPublic: 0, photoUrl: "@/assets/login.png" },
]);

const currentPage = ref(1);
const postsPerPage = 8;
const totalPages = computed(() => Math.ceil(posts.value.length / postsPerPage));

// 현재 페이지에 해당하는 글들만 가져오기
const currentPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return posts.value.slice(start, end);
});
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