<template>
  <div class="profileDiv">
    <!-- 상단 이미지 div -->
    <div class="profile-header">
      <h1 class="font-weight-black">나의 정보</h1>
    </div>

    <!-- 프로필 정보 표시 -->
    <div class="profile-info">
      <div class="profile-img-container">
        <v-avatar class="profileImg" size="300">
            <v-img
              :src="profileImage ? profileImage : defaultProfileImg"
              alt="프로필 사진"
            />
          </v-avatar>
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
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import defaultProfileImg from '@/assets/profile.png';
import { useUserStore } from '@/stores/user';
import { usePhotoStore } from '@/stores/photo';

const userStore = useUserStore();
const photoStore = usePhotoStore();

const profileData = ref({
  name: '',
  nickname: '',
  email: '',
  profile: '',
});

const profileImage = ref(null);

onMounted(async () => {
  try {
    const userId = sessionStorage.getItem("userId");
    const user = await userStore.getUserByUserId(parseInt(userId));
    if (user) {
      profileData.value = {
        name: user.name || '이름 없음',  // 기본값 처리
        nickname: user.nn || '닉네임 없음',  // 기본값 처리
        email: user.email || '이메일 없음',  // 기본값 처리
        profile: user.profile ? user.profile : defaultProfileImg,  // 프로필 사진 처리
      };

      profileImage.value = await photoStore.loadProfileImage();
    } else {
      console.error("User data is missing or malformed.");
      alert("사용자 데이터를 가져오는 데 실패했습니다.");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    alert("사용자 정보를 가져오는 중 오류가 발생했습니다.");
  }
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
