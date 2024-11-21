<template>
  <v-card class="main-div" rounded="lg">
    <v-row justify="end">
      <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>수정</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>삭제</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
    </v-row>
    <v-row justify="end" class="mt-0">
      <v-col cols="6" class="pl-0 pr-3 post-img">
        <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"/>
         <!-- <v-img :src="photoUrl" /> -->
        <div class="place-info">
          <v-icon icon="mdi-map-marker" class="mr-5"></v-icon>
          {{ postDetails.placeId }} <br>
          <div class="mt-2">
            <v-icon icon="mdi-dumbbell" class="mr-5"></v-icon>
            <span class="mr-10 ml-1">{{ postDetails.sportCode }}</span>
            <span>{{ postDetails.exerciseDuration }}분</span>
          </div>
        </div>
      </v-col>
      <v-col cols="6" class="pl-10 content-div">
        <h2 class="font-weight-black">{{ postDetails.title }}</h2>
        <div class="post-calender">
          <v-icon icon="mdi-calendar"></v-icon>
          <span class="ml-3">{{ postDetails.createdAt }}분</span>
        </div>
        <br>
        <p class="text-subtitle-1">{{ postDetails.content }}</p>
        <br>
        <hr>
        <br>
        <!--댓글 영역-->
        <div class="comment-div">
          <div v-for="c in comments" :key="c.commentId" class="py-5 comment pl-8">
            <v-row class="comment-detail" justify="space-between">
              <div class="d-flex">
                <v-avatar size="30" color="surface-variant" class="mr-5"></v-avatar>
                <p>{{ c.comment }}</p>
              </div>
                <v-btn variant="plain">삭제</v-btn>
            </v-row>
          </div>
        </div>
        <!--댓글 입력-->
        <br>
        <hr>
        <br>
        <div>
          <v-row class="pl-7">
              <v-text-field variant="outlined" rounded="lg" label="댓글 입력" density="compact"></v-text-field>
              <v-btn variant="plain" color="primary" class="pt-1">입력</v-btn>
          </v-row>
      </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { defineProps, watch, ref } from 'vue';

const props = defineProps({
  // post: {
  //   type: Object,
  //   default: () => ({}), // 빈 객체
  // },
  // photoUrl: String,
  postDetails : Object,
})

// console.log("전달받은 URL: ",postDetails.value)

const comments = ref([
  {commentId: 1, comment: "안녕", userId: 2, postId: 2},
  {commentId: 2, comment: "반가워요", userId: 2, postId: 2},
  {commentId: 3, comment: "잘 보고갑니다.", userId: 2, postId: 2},
  {commentId: 4, comment: "저건 좀 아니지 않아..?", userId: 2, postId: 2},
  {commentId: 5, comment: "저건 좀 아니지 않아..?", userId: 2, postId: 2},
  {commentId: 6, comment: "저건 좀 아니지 않아..?", userId: 2, postId: 2},
  {commentId: 7, comment: "저건 좀 아니지 않아..?", userId: 2, postId: 2},
  {commentId: 8, comment: "저건 좀 아니지 않아..?", userId: 2, postId: 2},
])


// post 변경 감지
const watchPost = watch(
  () => props.post, // post를 감시
  (newValue) => {
    console.log('Updated post:', newValue);
  },
  { immediate: true } // 컴포넌트 초기화 시에도 즉시 실행
);

</script>

<style scoped>
.main-div{
  padding: 30px;
  
}

.comment-div::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

.post-img{
  justify-content: center;
  align-items: center;
  align-content: center;
}

.img-div{
  align-items: center;
  align-content: center;
}

.comment-div{
  overflow-y: auto; /* 세로 스크롤 추가 */
  max-height: 300px;
  padding: 1%;
  margin-top: 1%;
}

.comment{
  width: 90%;
}

.content-div{
  overflow-y: auto; /* 세로 스크롤 추가 */
    /* 스크롤바 숨기기 */
    scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.comment-detail{
  align-items: center;
}

.place-info{
  padding-top: 1%;
  padding-left: 5px;
  color:darkgrey;
  margin-left: 10%;
}

.post-calender{
  color: darkgray;
  margin-top: 1%;
}
</style>