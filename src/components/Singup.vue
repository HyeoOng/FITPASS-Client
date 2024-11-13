<template>
  <NaviView />
  <div class="signupDiv">
    
    <!--상단 이미지 div-->
    <div class="signup-img">
      <h1 class="font-weight-black">SIGN UP</h1>
    </div>

    <div class="signup-form pt-10 pb-10">
      <v-form ref="signupForm" class="signup-form">

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
          label="프로필 사진 등록"
          placeholder="프로필 사진을 등록해 보세요!"
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
          label="이름"
          v-model="formData.name"
          :rules="[(v) => !!v || '이름을 입력해 주세요']"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          label="이메일"
          v-model="formData.email"
          :rules="[
            (v) => !!v || '이메일을 입력해 주세요',
            (v) => /.+@.+\..+/.test(v) || '유효한 이메일을 입력해 주세요',
          ]"
          variant="outlined"
        ></v-text-field>
        <v-btn @click="checkEmailDuplication" color="primary"
          >중복<br>확인</v-btn
        >

        <v-text-field
          label="비밀번호"
          type="password"
          v-model="formData.password"
          :rules="[
            (v) => !!v || '비밀번호를 입력해 주세요',
            (v) => v.length >= 6 || '6자 이상이어야 합니다',
          ]"
          hint="8자 이상, 대/소문자, 숫자, 특수기호를 모두 포함하여 작성해주세요."
          variant="outlined"
        ></v-text-field>

        <v-text-field
          label="닉네임"
          v-model="formData.nickname"
          :rules="[(v) => !!v || '닉네임을 입력해 주세요']"
          variant="outlined"
        ></v-text-field>
        <v-btn @click="checkNicknameDuplication" color="primary"
          >닉네임 중복 확인</v-btn
        >

        <v-menu
          v-model="birthDateMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="생년월일"
              v-model="formData.birthDate"
              readonly
              v-bind="attrs"
              v-on="on"
              variant="outlined"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="formData.birthDate"
            no-title
            @input="birthDateMenu = false"
          ></v-date-picker>
        </v-menu>

        <v-radio-group v-model="formData.gender" row>
          <v-radio label="남성" value="male"></v-radio>
          <v-radio label="여성" value="female"></v-radio>
        </v-radio-group>

        <v-btn @click="submitForm" color="primary">회원가입</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import defaultProfileImg from '@/assets/profile.png';
import NaviView from "@/components/main/Navbar.vue";

const formData = ref({
  profilePicture: null,
  name: "",
  email: "",
  password: "",
  nickname: "",
  birthDate: "",
  gender: "",
});

const birthDateMenu = ref(false);

function checkEmailDuplication() {
  alert("이메일 중복 확인");
}

function checkNicknameDuplication() {
  alert("닉네임 중복 확인");
}

function submitForm() {
  alert("회원가입 제출", formData.value);
}
</script>

<style scoped>

.profile-img-container {
  display: flex;
  justify-content: center; /* 가로로 중앙 정렬 */
  align-items: center; /* 세로로 중앙 정렬 */
  margin-bottom: 10px;
}

.profileImg{
  width: 25vw;
  margin-bottom: 10px;
}

.signupDiv {
  margin-top: 90px;
  justify-items: center;
  align-items: center;
}

.signup-form {
  max-width: 550px; /* 폼 너비를 고정 */
  margin: 0 auto;
}

.signup-img {
  width: 100%;
  height: 10em;
  justify-items: center;
  align-content: center;
  position: relative;
}

.signup-img::before {
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
