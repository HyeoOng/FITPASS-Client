<template>
  <div class="profileDiv">
    <!-- 상단 이미지 div -->
    <div class="profile-img">
      <h1 class="font-weight-black">회원정보 수정</h1>
    </div>

    <div class="profile-form pt-10 pb-10">
      <v-form ref="profileForm" class="profile-form">

        <!-- 프로필 사진 미리보기 -->
        <div class="profile-img-container">
          <img
            :src="formData.profilePicture ? formData.profilePicture : defaultProfileImg"
            alt="프로필 사진 미리보기"
            class="profileImg"
          />
        </div>

        <v-file-input
          v-model="formData.profilePicture"
          :show-size="1000"
          label="프로필 사진 변경"
          placeholder="프로필 사진을 변경해 보세요!"
          prepend-icon="mdi-paperclip"
          accept="image/*"
          variant="outlined"
        >
          <template v-slot:selection="{ fileNames }">
            <v-chip
              v-if="fileNames.length > 0"
              class="me-2"
              color="deep-purple-accent-4"
              size="small"
              label
            >
              {{ fileNames[0] }}
            </v-chip>
          </template>
        </v-file-input>

        <v-text-field
          v-model="formData.name"
          label="이름"
          placeholder="이름을 입력해 주세요"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="formData.nickname"
          label="닉네임"
          placeholder="닉네임을 입력해 주세요"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="formData.email"
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          variant="outlined"
        ></v-text-field>

        <div class="button-group">
          <v-btn @click="cancelUpdate" color="error">취소</v-btn>
          <v-btn @click="submitForm" color="primary">저장</v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import defaultProfileImg from '@/assets/profile.png';

const formData = ref({
  profilePicture: null,
  name: '나혜원',
  nickname: '',
  email: 'heyhey@example.com', // 기본 이메일 값 추가
});

const router = useRouter();

function cancelUpdate() {
  router.push("/profile");
}

function submitForm() {
  alert('프로필 저장:', formData.value);
  router.push("/profile");
}
</script>

<style scoped>
.profile-img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.profileImg {
  width: 25vw;
  margin-bottom: 10px;
  text-align: center;
}

.profileDiv {
  margin-top: 75px;
  justify-items: center;
  align-items: center;
}

.profile-form {
  max-width: 550px;
  margin: 0 auto;
}

.profile-img {
  width: 100%;
  height: 10em;
  display: flex; /* 추가: 중앙 정렬을 위한 Flexbox */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  position: relative;
  text-align: center; /* 텍스트 정렬 */
}

.profile-img h1 {
  z-index: 1; /* 배경 위로 텍스트 표시 */
}

.profile-img::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("@/assets/map.jpg"); /* 배경 이미지 경로 */
  background-size: cover;
  background-position: center;
  opacity: 0.15;
  z-index: 0; /* 배경 이미지 아래로 */
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
