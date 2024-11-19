<template>
  <div class="background-img">
    <h1 class="font-weight-black py-5">글쓰기</h1>
  </div>
  <div class="main-div">
    <v-card class="mx-auto pa-5 card" max-width="100%" elevation="0">
      <v-card-title>
        <h3 class="font-weight-black pb-3">제목</h3>
        <v-text-field
          v-model="post.title"
          label="title"
          placeholder="제목을 입력하세요"
          variant="outlined"
          color="primary"
        ></v-text-field>
      </v-card-title>

      <v-card-subtitle>
        <h4 class="font-weight-bold pb-3">Exercise</h4>
        <v-row>
          <v-col cols="7">
            <v-select
              v-model="post.sportCode"
              :items="sportStore.sports"
              item-text="sportName"
              item-value="sportCode"
              label="운동 종목"
              placeholder="운동 종목을 선택하세요"
              variant="outlined"
              color="primary"
            ></v-select>
          </v-col>
          <v-col cols="5">
            <v-select
              v-model="post.exerciseDuration"
              :items="durations"
              item-title="text" 
              item-value="value"
              label="운동 시간"
              placeholder="운동 시간을 선택하세요"
              variant="outlined"
              color="primary"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-subtitle>

      <v-card-text>
        <v-textarea
          v-model="post.content"
          label="글 내용"
          placeholder="내용을 입력하세요"
          variant="outlined"
          rows="10"
          color="primary"
        ></v-textarea>
        
        <KakaoPlaceRegistView @select-place="setPlace" />

        <v-file-input
          v-model="file"
          label="사진을 업로드하세요"
          accept="image/*"
          variant="outlined"
          prepend-icon="mdi-camera"
          color="primary"
          @change="onFileChange"
          class="pt-3"
        ></v-file-input>

        <!-- 사진 미리보기 -->
        <div v-if="file" class="photo-preview">
          <h3 class="mt-3 mb-3">미리보기</h3>
          <img :src="photoUrl" alt="업로드된 사진" class="preview-image" />
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-row justify="end">
          <v-col cols="4">
            <v-select
              v-model="post.isPublic"
              :items="publicSelect"
              item-title="text" 
              item-value="value"
              label="공개 여부"
              variant="outlined"
              density="compact"
              color="primary"
            ></v-select>
          </v-col>
          <v-col cols="3" align-items="end">
            <v-btn color="primary" variant="contained" @click="submitForm">
              작성 완료
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useSportStore } from '@/stores/sport';

import KakaoPlaceRegistView from "@/components/write/KakaoPlaceRegistView.vue";

const sportStore = useSportStore();

const photoUrl = ref(null); // 사진 미리보기 용 변수

const post = ref({
  title: null,
  content: null,
  userId: sessionStorage.getItem("userId"),
  sportCode: null,
  exerciseDuration: 30,
  isPublic: 0
});

const file = ref(null); // 서버 전송을 위한 변수

const place = ref({}) // 서버 전송을 위한 함수 -> 카카오에서 전달..
// place 선택 함수
const setPlace = (selectPlace) => {
  place.value = selectPlace;
}



// 사진 미리보기를 위한 함수
const onFileChange = (event) => {
  const files = event.target?.files || [];
  if (files.length === 0) {
    alert('사진 파일을 선택해주세요.')
    console.error("파일이 선택되지 않았습니다.");
    return;
  }
  const selectedFile = files[0]; // 첫 번째 파일 가져오기
  // 기존 미리보기 URL 해제
  if (photoUrl.value) {
    URL.revokeObjectURL(photoUrl.value);
  }
  // 파일이 이미지인 경우에만 처리
  if (selectedFile && selectedFile.type.startsWith('image/')) {
    file.value = selectedFile;  // 사진 파일 저장
    photoUrl.value = URL.createObjectURL(selectedFile);  // 미리보기 URL 생성
  } else {
    alert('이미지 파일만 업로드 가능합니다.');
    console.error("유효하지 않은 파일:", file);
    file.value = null;
    photoUrl.value = null;
  }
}

// 글 등록하기 버튼
const submitForm = () => {
  if(!validateObj(post, "post") || !validateObj(place, "place") || !file.value){
    if(!file.value){
      alert("파일을 선택해주세요!");
    }
    return
  }
  const formData = new FormData();
  formData.append("post", new Blob([JSON.stringify(post)],{
    type: "application/json"}));
  formData.append("place", new Blob([JSON.stringify(place)], {
    type: "application/json"
  }));
  formData.append("file", file.value);
  console.log("작성 내용 : ", formData.value);
};
////////////////////////

const validateObj = (obj, objName) => {
  for (const [key, value] of Object.entries(obj.value)) {
    // 필드 이름을 더 친숙하게 변환
    const displayName = {
      title: "제목",
      content: "내용",
      sportCode: "운동 종목",
      exerciseDuration: "운동 시간",
      isPublic: "공개 여부"
    }[key] || key;

    if (value === null || value === "") {
      alert(`${displayName} 항목을 입력해주세요.`);
      return false; // 검증 실패
    }
  }
  
  // place 객체 검증 (null일 경우 "장소를 클릭해주세요" 메시지 표시)
  if (objName === "place" && (!obj.value || Object.keys(obj.value).length === 0)) {
    alert("장소를 클릭해주세요.");
    return false;
  }

  return true; // 검증 성공
};

///////////////////////////////////////////computed///////////////////
// 운동 시간 select에 표시하는 computed 메서드
const durations = ref([
  {text: "30분", value: 30},
  {text: "60분", value: 60},
  {text: "90분", value: 90},
  {text: "120분", value: 120},
  {text: "150분", value: 150},
  {text: "180분", value: 180},
]);

const publicSelect = ref([
  {text: "전체 공개", value: 0},
  {text: "친구 공개", value: 1},
  {text: "나만 보기", value: 2},
]);

</script>

<style scoped>
.main-div {
  padding-left: 5vw;
  padding-right: 5vw;
}

.write-page {
  background-color: #f5f5f5;
  /* padding: 20px; */
}

.v-card-title {
  font-weight: bold;
  font-size: 1.25rem;
  color: #333;
}

.v-btn {
  color: white;
}

.background-img{
  margin-top: 64px;
  width: 100%;
  height: 7em;
  justify-items: center;
  align-content: center;
  position: relative;
}
.background-img::before{
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

.photo-preview {
  margin-top: 20px;
  justify-content: center;
}

.preview-image {
  max-width: 300px;
  max-height: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  object-fit: cover;
}
</style>
