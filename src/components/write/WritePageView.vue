<template>
  <div class="background-img">
    <h1 class="font-weight-black py-5">글쓰기</h1>
  </div>
  <div class="main-div">
    <v-card class="mx-auto pa-5 card" max-width="100%" elevation="0">
      <v-card-title>
        <h3 class="font-weight-black pb-3">제목</h3>
        <v-text-field
          v-model="formData.title"
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
              v-model="formData.sport"
              :items="sports"
              label="운동 종목"
              placeholder="운동 종목을 선택하세요"
              variant="outlined"
              color="primary"
            ></v-select>
          </v-col>
          <v-col cols="5">
            <v-select
              v-model="formData.duration"
              :items="durations"
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
          v-model="formData.content"
          label="글 내용"
          placeholder="내용을 입력하세요"
          variant="outlined"
          rows="10"
          color="primary"
        ></v-textarea>
        
                <KakaoPlaceRegistView />

        <v-file-input
          v-model="formData.photo"
          label="사진을 업로드하세요"
          accept="image/*"
          variant="outlined"
          prepend-icon="mdi-camera"
          color="primary"
          @change="onFileChange"
          class="pt-3"
        ></v-file-input>

        <!-- 사진 미리보기 -->
        <div v-if="formData.photo" class="photo-preview">
          <h3 class="mt-3 mb-3">미리보기</h3>
          <img :src="photoUrl" alt="업로드된 사진" class="preview-image" />
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-row justify="end">
          <v-col cols="4">
            <v-select
              v-model="formData.isPublic"
              :items="publicSelect"
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
import { ref } from "vue";
import KakaoPlaceRegistView from "@/components/write/KakaoPlaceRegistView.vue";

const formData = ref({
  title: "",
  content: "",
  sport: null,
  exerciseDuration: null,
  photo: "",
  isPublic: "전체 공개",
});

const photoUrl = ref(null);

const sports = ref(["수영", "배구", "야구", "농구"]);
const durations = ref(["30분", "60분", "90분", "120분", "150분", "180분"]);
const publicSelect = ref(['전체 공개', '친구 공개', '나만 보기']);

const onFileChange = (event) => {
  const files = event.target?.files || [];
  if (files.length === 0) {
    alert('사진 파일을 선택해주세요.')
    console.error("파일이 선택되지 않았습니다.");
    return;
  }

  const file = files[0]; // 첫 번째 파일 가져오기

  // 파일이 이미지인 경우에만 처리
  if (file && file.type.startsWith('image/')) {
    formData.value.photo = file;  // 사진 파일 저장
    photoUrl.value = URL.createObjectURL(file);  // 미리보기 URL 생성
  } else {
    alert('이미지 파일만 업로드 가능합니다.');
    console.error("유효하지 않은 파일:", file);
  }
}

const submitForm = () => {
  console.log("작성 내용 : ", formData.value);
};

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
