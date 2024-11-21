<template>
  <div class="main-div mt-10 ml-25 mr-25">
    <h2>Me</h2>
    <v-container class="friends-container profile">
      <v-row class="d-flex align-center">
        <v-col cols="3">
          <v-avatar :image="imgSrc" size="50"></v-avatar>
        </v-col>
        <v-col cols="9">
          <h3 class="font-weight-black">{{ nickname }}</h3>
          <p class="my-2">친구 수: {{ friendList.length }}명</p>
        </v-col>
      </v-row>
    </v-container>
    
    <h2>My Friends </h2>
    <v-container class="friends-container friend-list">
      <p v-if="friendList.length==0">친구가 없습니다.. <br>아래에서 친구를 탐색해보세요.</p>
      <v-container v-for="(friend, idx) in friendList" :key="friend.id" class="friend-container friend-profile">
        <v-row class="d-flex align-center">
          <v-col cols="3">
            <v-avatar :image="imgSrc" size="40"></v-avatar>
          </v-col>
          <v-col cols="5">
            <h3 class="font-weight-bold">{{ friend.nn }}</h3>
            <p class="my-1">프로필</p>
          </v-col>
          <v-col cols="2">
            <v-btn variant="plain" @click="removeFriend(friend)">삭제</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <h2> 받은 친구 요청 </h2>
    <v-container class="friends-container friend-list">
      <p v-if="requestList.length==0">요청이 없습니다.</p>
      <v-container v-for="(friend, idx) in requestList" :key="friend.id" class="friend-container friend-profile">
        <v-row class="d-flex align-center">
          <v-col cols="3">
            <v-avatar :image="imgSrc" size="40"></v-avatar>
          </v-col>
          <v-col cols="5">
            <h3 class="font-weight-bold">{{ friend.nn }}</h3>
            <p class="my-1">프로필</p>
          </v-col>
           <v-col cols="2">
            <v-btn variant="plain" @click="acceptFriendRequest(friend)">수락</v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn variant="plain" @click="removeFriendRequest(friend, idx)">삭제</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <h2>Search </h2>
    <v-container class="friends-container">
      <v-row class="py-1 px-1 pl-3">
          <v-text-field 
          variant="outlined" density="compact" @keydown.enter="searchFriends(searchNickName)" v-model="searchNickName" placeholder="친구를 검색해보세요."
          ></v-text-field>
          <v-btn variant="plain" @click="searchFriends(searchNickName)">검색</v-btn>
      </v-row>
      <v-row class="search-list" v-if="searchRes">
        <v-container v-for="(res, idx) in searchFriendList" :key="res.id" class="friend-container friend-profile">
          <v-row class="d-flex align-center">
            <v-col cols="3">
              <v-avatar :image="imgSrc" size="40"></v-avatar>
            </v-col>
            <v-col cols="5">
              <h3 class="font-weight-bold">{{ res.nn }}</h3>
              <p class="my-1">프로필</p>
            </v-col>
            <v-col cols="2">
              <v-btn variant="plain" @click="addFriend(res)">추가</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
    </v-container>

  </div>
</template>

<script setup>
import { ref, toRaw, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useFriendStore } from '@/stores/friend';
import imgSrc from '@/assets/profile.png';

const userStore = useUserStore();
const friendStore = useFriendStore();

const searchRes = ref(false); // 검색 버튼을 눌렀을 때, 검색 결과를 보여줄 변수
const nickname = ref(sessionStorage.getItem("nickname"));
const searchNickName = ref("");
const friendList = ref([]); // 친구 리스트 상태
const requestList = ref([]); // 요청 받은 목록 
const searchFriendList = ref([]); // 검색된 친구 리스트 상태

// 친구 목록 갱신 함수
const updateFriendList = async () => {
  try {
    const userId = sessionStorage.getItem("userId");
    const response = await friendStore.getFriends(userId); // 친구 목록 불러오기
    if (Array.isArray(response)) {
      friendList.value = toRaw(response); // 친구 리스트 업데이트
    } else {
      console.error('친구 목록을 가져오는 데 실패했습니다.');
    }
  } catch (error) {
    console.error('친구 목록 갱신 중 오류 발생:', error);
  }
};

// 친구 삭제 함수
const removeFriend = async (friend) => {
  // friendList.value.splice(index, 1); // 배열에서 해당 index의 친구 삭제
  if (confirm("정말로 삭제하시겠습니까?") == true) {
    try {
    const response = await friendStore.deleteFriend(sessionStorage.getItem("userId"), friend.userId);
    if (response.msg == "success") {
      console.log("성공적으로 친구를 삭제했습니다.");
    } else {
      console.log("친구를 삭제하지 못했습니다.");
    }
  } catch (error) {
    console.log("친구 삭제 중 오류 발생: ", error);
  }
  await updateFriendList(); // 친구 목록 갱신
  }
};

// 친구 검색 함수
const searchFriends = async (nn) => {
  try {
    const resp = await userStore.getUsersByNn(nn); // 백엔드로부터 응답을 받음
    if (Array.isArray(resp.value) && resp.value.length > 0) {
      searchFriendList.value = toRaw(resp.value); // 검색된 친구 리스트 업데이트
      console.log('Search Friend List:', searchFriendList.value); // 데이터 확인
      searchRes.value = true;
    } else {
      searchFriendList.value = []; // 검색 결과가 없으면 리스트 초기화
      searchRes.value = false;
    }
    searchRes.value = searchFriendList.value.length > 0;
  } catch (error) {
    console.error('검색 결과를 가져오는 중 오류 발생:', error);
    searchFriendList.value = [];
    searchRes.value = false;
  }
};

// 친구 요청 보내는 함수
const addFriend = async (toUser) => {
  try {
    const response = await friendStore.sendFriendRequest(sessionStorage.getItem("userId"), toUser.userId); // 백엔드로부터 응답 받기
    if (response.msg === "success") {
      alert("친구 요청을 성공적으로 보냈습니다");

      // 친구 요청을 보낸 유저를 searchFriendList에서 제거
      const index = searchFriendList.value.findIndex(friend => friend.userId === toUser.userId);
      if (index !== -1) {
        searchFriendList.value.splice(index, 1); // 해당 유저 제거
      }

      await updateFriendList(); // 친구 목록 갱신
    } else {
      alert("친구 요청을 보낼 수 없습니다.");
    }
  } catch (error) {
    console.error('친구 요청 중 오류 발생:', error);
  }
};

// 친구 요청 받은 목록 확인하는 함수
const getFriendRequest = async () => {
  try {
    const response = await friendStore.getFriendRequests(sessionStorage.getItem("userId"));
    if (Array.isArray(response)) {
      requestList.value = toRaw(response); // 친구 요청 목록 업데이트
    } else {
      console.error('친구 요청 목록을 가져오는 데 실패했습니다.');
    }
  } catch (error) {
    console.error('친구 요청 목록 갱신 중 오류 발생:', error);
  }
}
// 초기 친구 목록 로드
updateFriendList();

// 처음 페이지 로드될 때 친구 요청 목록 불러오기 
onMounted(() => {
  getFriendRequest();
});

// 친구 요청 수락하는 함수 
const acceptFriendRequest = async (toUser) => {
  try {
    const response = await friendStore.sendFriendRequest(sessionStorage.getItem("userId"), toUser.userId);
    if (response.msg === "success") {
      alert("친구 요청을 수락했습니다.");

      // 친구 요청 목록에서 해당 유저 제거
      const index = requestList.value.findIndex(friend => friend.userId === toUser.userId);
      if (index !== -1) {
        requestList.value.splice(index, 1); // 유저를 배열에서 삭제
      }

      await updateFriendList(); // 친구 목록 갱신
    } else {
      alert("친구 요청을 수락할 수 없습니다.");
    }
  } catch (error) {
    console.log('친구 수락 요청 중 오류 발생: ', error);
  }
}

const removeFriendRequest = async (requestUser, index) => {
  if (confirm("정말로 삭제하시겠습니까?")) {
    try {
      const response = await friendStore.deleteFriendRequest(requestUser.userId, sessionStorage.getItem("userId"));
      if (response.msg == "success") {
        alert("친구 요청을 삭제했습니다.");
        requestList.value.splice(index, 1);
      } else {
        alert("친구 요청 삭제를 수행할 수 없습니다.");
      }
    } catch (error) {
      console.log("친구 요청 삭제 중 오류 발생", error);
    }
  }
}
</script>



<style scoped>
.main-div {
  /* padding-left: 5vw; */
  padding-right: 5vw;
}

.friend-list{
  display: inline-table;
  max-height: 500px; /* 고정 높이 */
  overflow-y: auto; /* 세로 스크롤 추가 */
  padding: 10px;
}

.friends-container {
  justify-content: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);  /* 4px 아래로, 8px 흐림, 10% 투명도 */
  margin-bottom: 4vh;
}

.profile{
  align-content: center;
  border-radius: 10px;
  background-color: rgba(138, 182, 225, 0.08);
}

.friend-profile{
  align-content: center;
  border-radius: 10px;
  background-color: rgba(138, 182, 225, 0.05);
  max-height: 60px;
  padding: 0px;
  padding-left: 1.5em;
  width: 90%;
}

.friend-container{
  justify-content: center;
  /* border: 1px solid #000; */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);  /* 4px 아래로, 8px 흐림, 10% 투명도 */
  margin-bottom: 1vh;
}

.search-list{
  /* display: inline-table; */
  max-height: 400px; /* 고정 높이 */
  overflow-y: auto; /* 세로 스크롤 추가 */
  padding: 10px;
}
</style>