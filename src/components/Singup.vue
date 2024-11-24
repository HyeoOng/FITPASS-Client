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
          <v-avatar class="profileImg" size="300">
            <v-img
              :src="profilePreview ? profilePreview : defaultProfileImg"
              alt="프로필 사진 미리보기"
            />
          </v-avatar>
        </div>

        <v-file-input
          v-model="profile"
          :show-size="1000"
          label="프로필 사진 등록"
          placeholder="프로필 사진을 등록해 보세요!"
          prepend-icon="mdi-paperclip"
          accept="image/*"
          variant="outlined"
          @change="onFileChange"
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
          v-model="user.name"
          :rules="[(v) => !!v || '이름을 입력해 주세요']"
          variant="outlined"
        ></v-text-field>

        <div class="check">
          <v-text-field
          label="이메일"
          v-model="user.email"
          :rules="[
            (v) => !!v || '이메일을 입력해 주세요',
            (v) => /.+@.+\..+/.test(v) || '유효한 이메일을 입력해 주세요',
          ]"
          variant="outlined"></v-text-field>
          <v-btn @click="checkEmailDuplication(user.email)" color="primary"
            >중복<br>확인</v-btn
          >
          <v-btn 
          :disabled="!user.email || isEmailSending" 
          @click="sendVerificationCode(user.email)"
          color="primary"
          >
            인증 코드 <br> 전송 
          </v-btn>
        </div>

        
        <div class="check">
            <v-text-field
            v-model="user.verificationCode"
            label="인증 코드"
            :rules="[(v) => !!v || '인증 코드를 입력해 주세요']"
            variant="outlined"
          >
          </v-text-field>

          <v-btn 
            :disabled="!user.verificationCode || isVerificationChecking" 
            @click="verifyCode(user.email, user.verificationCode)"
            color="success"
          >
            인증 확인
          </v-btn>
        </div>
        

        <v-text-field
          label="비밀번호"
          type="password"
          v-model="user.password"
          :rules="[
            (v) => !!v || '비밀번호를 입력해 주세요',
            (v) => v.length >= 6 || '6자 이상이어야 합니다',
            rules.password
          ]"
          hint="8자 이상, 대/소문자, 숫자, 특수기호를 모두 포함하여 작성해주세요."
          variant="outlined"
        ></v-text-field>

        <div class="check">
          <v-text-field
          label="닉네임"
          v-model="user.nn"
          :rules="[(v) => !!v || '닉네임을 입력해 주세요']"
          variant="outlined"
        ></v-text-field>
        <v-btn @click="checkNicknameDuplication(user.nn)" color="primary"
          >중복<br>확인</v-btn
        >
        </div>


        <v-btn @click="submitForm" color="primary" :disabled="!isFormValid">회원가입</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, toRaw } from "vue";
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useEmailStore } from "@/stores/email";
import { usePhotoStore } from "@/stores/photo";

import defaultProfileImg from '@/assets/profile.png';

const router = useRouter();
const userStore = useUserStore();
const emailStore = useEmailStore();
const photoStore = usePhotoStore();

const isFormValid = computed(() => {
  return user.value.name &&
          user.value.email &&
          user.value.password &&
          user.value.nn;
})

const user = ref({
  name: "",
  email: "",
  password: "",
  nn: "",
  verificationCode: "",
});

const profile = ref(null); // 서버 전송

const profilePreview = ref(""); // 프로필 사진 미리보기

const sendVerificationCode = async (email) => {
   try {
    const response = await emailStore.sendVerificationCode(email);
    if (response.msg == "success") {
      alert("인증 코드가 이메일로 발송되었습니다.");
    } else {
      alert("이메일 발송 실패: " + email);
    }
   } catch (error) {
    console.error(error);
    alert("이메일 발송 중 문제가 발생했습니다.");
   }
}

const verifyCode = async (email, code) => {
  try {
    const response = await emailStore.verifyCode(email, code);
    if (response.msg == "success") {
      alert("코드 인증 성공");
    } else {
      alert("인증 코드 불일치");
    }
  } catch (error) {
    console.error(error);
    alert("코드 검증 중 문제가 발생했습니다");
  }  
}

const checkEmailDuplication = async (email) => {
  try {
    console.log("email, ", email);
    const response = await userStore.emailCheck(email);

    if (response.msg == "fail2") {
      alert("중복된 이메일입니다. 다른 이메일을 입력해주세요.");
      user.value.email = ''; // 중복된 이메일을 입력 칸에서 지우기
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
      user.value.nn = ''; // 중복된 닉네임을 입력 칸에서 지우기
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
  // alert("회원가입 제출: ", signupUser.value);

  if(!validateObj(user) || !profile.value){
    if(!profile.value){
      alert("프로필 사진을 선택해주세요!");
    }
    return
  }
  // console.log(user.value)

  const formData = new FormData();
  formData.append("user", new Blob([JSON.stringify(toRaw(user.value))],{
    type: "application/json"}));

  formData.append("file", profile.value);

  userStore.signup(formData);

}

const validateObj = (obj) => {
  for (const [key, value] of Object.entries(obj.value)) {
    // 필드 이름을 더 친숙하게 변환
    const displayName = {
      name: "이름",
      email: "이메일",
      password: "비밀번호",
      nn: "닉네임",
      verificationCode: "인증 번호",
    }[key] || key;

    if (value === null || value === "") {
      alert(`${displayName}을(를) 입력해주세요.`);
      return false; // 검증 실패
    }
  }
  return true; // 검증 성공
};

const rules = {
  password: value => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?:]).{8,}$/;
    const forbiddenCharsPattern = /[<>\"/\\{}]/; // 금지된 특수문자
    if (forbiddenCharsPattern.test(value)) {
      return '금지된 특수문자 (< > " / \\ { } ) 를 포함할 수 없습니다.';
    }
    return passwordPattern.test(value) || '8자 이상, 대/소문자, 숫자, 특수기호를 모두 포함하여 작성해주세요.';
  }
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
  if (profilePreview.value) {
    URL.revokeObjectURL(profilePreview.value);
  }
  // 파일이 이미지인 경우에만 처리
  if (selectedFile && selectedFile.type.startsWith('image/')) {
    profile.value = selectedFile;  // 사진 파일 저장
    profilePreview.value = URL.createObjectURL(selectedFile);  // 미리보기 URL 생성
  } else {
    alert('이미지 파일만 업로드 가능합니다.');
    console.error("유효하지 않은 파일:", file);
    profile.value = null;
    profilePreview.value = null;
  }
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
  /* width: 25vw;
  height: 50vh; */
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
