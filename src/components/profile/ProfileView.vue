<template>
  <div class="profileDiv">
    <!-- 상단 이미지 div -->
    <div class="profile-header">
      <h1 class="font-weight-black">나의 정보</h1>
    </div>

    <!-- 프로필 정보 표시 -->
    <div class="profile-info">
      <div class="profile-img-container">
        <img
          :src="profileData.profilePicture ? profileData.profilePicture : defaultProfileImg"
          alt="프로필 사진"
          class="profileImg"
        />
      </div>

      <div class="profile-details">
        <p><strong>이름:</strong> {{ profileData.name }}</p>
        <p><strong>닉네임:</strong> {{ profileData.nickname }}</p>
        <p><strong>이메일:</strong> {{ profileData.email }}</p>
      </div>
    </div>

    <v-btn color="primary" @click="goToEditProfile">프로필 수정</v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import defaultProfileImg from '@/assets/profile.png';

const profileData = ref({
  profilePicture: null,
  name: '나혜원',
  nickname: '혜옹',
  email: 'heyhey@example.com',
});

const router = useRouter();

function goToEditProfile() {
  router.push('/profile/edit');
}
</script>

<style scoped>
.profileDiv {
  margin-top: 75px;
  text-align: center;
  min-height: 100vh; /* 화면 전체 높이 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.profile-header {
  margin-bottom: 30px;
}

.profile-img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.profileImg {
  width: 25vw;
  border-radius: 50%;
  border: 2px solid #ccc;
}

.profile-info {
  margin-bottom: 20px;
}

.profile-details p {
  font-size: 1.2em;
  margin: 10px 0;
}

v-btn {
  margin-top: 20px;
}
</style>
