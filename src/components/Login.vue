<template>
  <logoView />
  <div class="loginDiv">
    <!--본문-->
    <v-img
      max-width="900"
      :aspect-ratio="4 / 3"
      :src="loginImg"
    ></v-img> 

    <div class="loginFormDiv">
      <!-- 로그인 폼 내용 -->
      <h1 class="font-weight-black">LOG IN</h1>
      <br>
      <p>이메일과 비밀번호를 입력해주세요.</p>
      <br>

      <div>
        <v-text-field
            width="60%"
            label="email"
            v-model="user.email"
            variant="outlined"
        ></v-text-field>

        <v-text-field
          width="60%"
          label="password"
          v-model="user.password"
          variant="outlined"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          @keydown.enter="goToLogin"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn class="login-btn" @click="goToLogin" outlined>LOG IN</v-btn>
        <div class="divider">
        <v-divider>Or</v-divider>
        계정이 없으신가요? <span class="pink" @click="goToSignUp">회원가입</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import loginImg from '@/assets/login.png';
import logoView from '@/components/Logo.vue';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const visible = ref(false);
const router = useRouter();
const userStore = useUserStore();

const user = ref({
  email: '',
  password: '',
})

const goToSignUp = () =>  {
  router.push('signup')
}

const goToLogin = async () => {
  const response = await userStore.login(user.value);
  if (response.msg == "success") {
    router.push('/')
  } else if (response.remainingAttempts) {
    alert("남은 로그인 횟수: " , response.remainingAttempts);
  } else if (response.msg) {
    alert(response.msg);
  }
}
</script>

<style scoped>
.pink{
  color: #FFB6B9;
  text-decoration: underline;
  cursor: pointer;
}

.divider {
  width: 60%;
  text-align: center;
  text-justify: center;
}

.loginDiv {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center;
  height: 90vh; /* 전체 화면 높이를 차지하도록 설정 */
}
.loginDiv v-img{
  position: absolute;
}
.login-btn{
  background-color: #7FC8F8;
  color: white;
  width: 60%;
  margin-top: 1em;
  margin-bottom: 1em;
}

.loginFormDiv{
  margin-left: 1em;
}

</style>
