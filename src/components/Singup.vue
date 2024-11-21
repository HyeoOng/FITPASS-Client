<template>
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
            :src="formData.profile ? formData.profile : defaultProfileImg"
            alt="프로필 사진 미리보기"
            class="profileImg"
          />
        </div>

        <v-file-input
          v-model="formData.profile"
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

        <div class="check">
          <v-text-field
          label="이메일"
          v-model="formData.email"
          :rules="[
            (v) => !!v || '이메일을 입력해 주세요',
            (v) => /.+@.+\..+/.test(v) || '유효한 이메일을 입력해 주세요',
          ]"
          variant="outlined"></v-text-field>
          <v-btn @click="checkEmailDuplication(formData.email)" color="primary"
            >중복<br>확인</v-btn
          >
        </div>

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

        <div class="check">
          <v-text-field
          label="닉네임"
          v-model="formData.nn"
          :rules="[(v) => !!v || '닉네임을 입력해 주세요']"
          variant="outlined"
        ></v-text-field>
        <v-btn @click="checkNicknameDuplication(formData.nn)" color="primary"
          >중복<br>확인</v-btn
        >
        </div>


        <v-btn @click="submitForm" color="primary" :disabled="!isFormValid">회원가입</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import defaultProfileImg from '@/assets/profile.png';

const router = useRouter();
const userStore = useUserStore();

const isFormValid = computed(() => {
  return formData.value.name &&
          formData.value.email &&
          formData.value.password &&
          formData.value.nn;
})

const formData = ref({
  name: "",
  email: "",
  password: "",
  nn: "",
  profile: null,

});


const checkEmailDuplication = async (email) => {
  try {
    console.log("email, ", email);
    const response = await userStore.emailCheck(email);

    if (response.msg == "fail2") {
      alert("중복된 이메일입니다. 다른 이메일을 입력해주세요.");
      formData.value.email = ''; // 중복된 이메일을 입력 칸에서 지우기
    } else if (response.msg == "fail1") {
      alert("이메일은 공백일 수 없습니다.")
    } 
    else {
      alert("등록 가능한 이메일입니다.");
    }
  } catch (error) {
    console.error("이메일 중복 체크 중 오류 발생: ", error);

  }
}

const checkNicknameDuplication = async (nn) => {
  try {
    console.log("nn, ", nn);
    const response = await userStore.nnCheck(nn);

    if (response.msg == "fail2") {
      alert("중복된 닉네임입니다. 다른 닉네임을 입력해주세요.");
      formData.value.nn = ''; // 중복된 닉네임을 입력 칸에서 지우기
    } else if (response.msg == "fail1") {
      alert("닉네임은 공백일 수 없습니다.")
    } 
    else {
      alert("등록 가능한 닉네임입니다.");
    }
  } catch (error) {
    console.error("닉네임 중복 체크 중 오류 발생: ", error);
  }
}

function submitForm() {
  alert("회원가입 제출", formData.value);
  userStore.signup(formData.value);
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
  margin-top: 75px;
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
  text-align: center;
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

.check {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.check .v-text-field {
  width: 90%;
  height: 56px; /* Set fixed height */
}

.check .v-btn {
  width: 10%;
  margin-left: 10px;
  height: 56px; /* Set same height as the input field */
  display: flex;
  align-items: center; /* Center the text vertically */
  justify-content: center; /* Center the text horizontally */
}

</style>
