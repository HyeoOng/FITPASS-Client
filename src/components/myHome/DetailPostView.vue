<template>
  <div class="close-modal mt-0 pt-0">
    <h1
      class="text-white font-weight-black"
      @click="close"
      style="cursor: pointer"
    >
      X
    </h1>
  </div>
  <!-- <div class="card-container"> -->
  <v-card class="main-div" rounded="lg" max-height="75%">
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
    <v-row justify="end" class="ml-1 mt-0 mb-3">
      <v-col cols="6" class="pl-3 left-col">
        <div class="left-div">
          <v-img
            :src="photoUrl"
            lazy-src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
            aspect-ratio="4/3"
            contain
            width="100%"
            height="70%"
            class="custom-img"
          />
          <div class="place-info">
            <v-icon icon="mdi-map-marker" class="mr-5"></v-icon>
            {{ placeName }} <br />
            <div class="mt-2">
              <v-icon icon="mdi-dumbbell" class="mr-5"></v-icon>
              <span class="mr-10 ml-1">{{ sportName }}</span>
              <span>{{ post.exerciseDuration }}분</span>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="5" class="pl-2 pr-10 content-div">
        <h2 class="font-weight-black">{{ post.title }}</h2>
        <div class="post-calender">
          <v-icon icon="mdi-calendar"></v-icon>
          <span class="ml-3">{{ formattedDate }}</span>
        </div>
        <br />
        <p class="text-subtitle-1">{{ post.content }}</p>
        <br />
        <hr />
        <br />
        <!--댓글 영역-->
        <div class="comment-div">
          <div
            v-for="c in comments"
            :key="c.commentId"
            class="py-5 comment pl-8"
          >
            <v-row class="comment-detail" justify="space-between">
              <div class="d-flex">
                <v-avatar
                  size="30"
                  color="surface-variant"
                  class="mr-5"
                ></v-avatar>
                <p>{{ c.comment }}</p>
              </div>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    icon="mdi-dots-vertical"
                    variant="text"
                    v-bind="props"
                  ></v-btn>
                </template>
                <v-list v-if="userStore.userId === c.userId">
                  <v-list-item>
                    <v-list-item-title>수정</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>삭제</v-list-item-title>
                  </v-list-item>
                </v-list>
                <v-list v-else>
                  <v-list-item>
                    <v-list-item-title>신고</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-row>
          </div>
        </div>
        <!--댓글 입력-->
        <br />
        <hr />
        <br />
        <div>
          <v-row class="pl-7">
            <v-text-field
              v-model="comment.comment"
              variant="outlined"
              rounded="lg"
              label="댓글 입력"
              density="compact"
              @keydown.enter="registCmt"
            ></v-text-field>
            <v-btn
              variant="plain"
              color="primary"
              class="pt-1"
              @click="registCmt"
              >입력</v-btn
            >
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-card>
  <!-- </div> -->
</template>

<script setup>
import {
  defineProps,
  watch,
  ref,
  onMounted,
  computed,
  defineEmits,
  toRaw,
} from "vue";
import { usePosts } from "@/util/usePosts";
import { useSportStore } from "@/stores/sport";
import { usePlaceStore } from "@/stores/place";
import { useCommentStore } from "@/stores/comment";
import { useUserStore } from "@/stores/user";

const emit = defineEmits(["close"]);

const { loadImageOne } = usePosts();

const sportStore = useSportStore();
const placeStore = usePlaceStore();
const cmtStore = useCommentStore();
const userStore = useUserStore();

const props = defineProps({
  post: {
    type: Object,
    default: () => ({}), // 빈 객체
  },
});

const placeName = ref("");
const photoUrl = ref("");
const comments = ref([]);
const comment = ref({
  userId: sessionStorage.getItem("userId"),
  postId: props.post.postId,
  comment: "",
});

const sportName = computed(() => {
  const sport = sportStore.sports.find(
    (s) => s.sportCode === props.post.sportCode
  );
  return sport ? sport.sportName : "알 수 없음";
});

const registCmt = async () => {
  const resp = await cmtStore.registComment(comment.value);
  console.log("댓글 등록 결과: ", resp);
  if (resp) {
    // 댓글 목록 재로드
    loadComments(props.post.postId)
    comment.value.comment = "";
    // alert("성공");
  } else {
    alert(`댓글 등록에 실패하였습니다.
    잠시 후 다시 시도해주세요.`);
  }
};

const loadComments = async (postId) => {
  comments.value = [...(await cmtStore.getComments(postId))];
}

// post 변경 감지
const watchPost = watch(
  () => props.post, // post를 감시
  async (newValue) => {
    console.log("Updated post:", newValue);
    photoUrl.value = await loadImageOne(newValue.photoUrl);
    placeName.value = await placeStore.getPlaceName(newValue.placeId);

    // 댓글 불러오기..
    loadComments(newValue.postId);
    // comments.value = toRaw(comments.value)
    console.log("댓글: ", comments.value);
    console.log("현재 로그인된 사용자 ID: ", userStore.userId)
    
  },
  { immediate: true } // 컴포넌트 초기화 시에도 즉시 실행
);

// 날짜 형식 변환
const formattedDate = computed(() => {
  if (!props.post || !props.post.createdAt) return ""; // post나 createdAt이 없으면 빈 문자열 반환

  // UTC 시간 생성
  const utcDate = new Date(props.post.createdAt);

  // KST 시간 계산 (UTC+9=KST)
  const KST_OFFSET = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
  const kstDate = new Date(utcDate.getTime() - KST_OFFSET);

  // 포맷팅
  const year = kstDate.getFullYear();
  const month = String(kstDate.getMonth() + 1).padStart(2, "0");
  const day = String(kstDate.getDate()).padStart(2, "0");
  const hours = String(kstDate.getHours()).padStart(2, "0");
  const minutes = String(kstDate.getMinutes()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
});

const close = () => {
  emit("close");
};
</script>

<style scoped>
.close-modal {
  justify-items: end;
}

.left-col {
  align-content: center;
}

.main-div {
  padding: 30px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.main-div::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

.left-div {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  width: 75%; /* 부모 크기에 맞춤 */
  height: 85%; /* 부모 크기에 맞춤 */
}

.custom-img {
  height: 70%;
  width: auto;
  object-fit: contain;
}

.img-div {
  align-items: center;
  align-content: center;
}

.image-container v-img img {
  object-fit: contain; /* 이미지 크기를 컨테이너에 맞춤 */
}

.comment-div {
  overflow-y: auto; /* 세로 스크롤 추가 */
  max-height: 300px;
  padding: 1%;
  margin-top: 1%;
}

.comment {
  width: 90%;
}

.content-div {
  overflow-y: auto; /* 세로 스크롤 추가 */
  max-height: 100vh; /* 필요에 따라 적절히 조정 */
  scrollbar-width: thin; /* Firefox용 스크롤바 최소화 */
  -ms-overflow-style: none; /* IE용 스크롤바 제거 */
  margin-top: 2em;
}

/* Chrome, Safari, Edge에서 스크롤바 숨기기 */
.content-div::-webkit-scrollbar {
  display: none;
}

.comment-detail {
  align-items: center;
}

.place-info {
  padding-top: 1%;
  color: darkgrey;
  margin-left: 5%;
}

.post-calender {
  color: darkgray;
  margin-top: 1%;
}
</style>
<style>
/* v-dialog 내부 스타일 덮어쓰기 */
.v-dialog > .v-overlay__content {
  overflow-y: visible !important; /* 강제로 스크롤 제거 */
}

.v-dialog > .v-overlay__content > .v-card {
  overflow-y: visible !important; /* 카드 내부 스크롤 제거 */
}
</style>
