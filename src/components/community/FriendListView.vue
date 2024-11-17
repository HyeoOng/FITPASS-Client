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
            <h3 class="font-weight-bold">{{ friend.nickname }}</h3>
            <p class="my-1">프로필</p>
          </v-col>
          <v-col cols="2">
            <v-btn variant="plain" @click="removeFriend(idx)">삭제</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <h2>Search </h2>
    <v-container class="friends-container">
      <v-row class="py-1 px-1 pl-3">
          <v-text-field 
          variant="outlined" density="compact" v-model="searchNickName" placeholder="친구를 검색해보세요."
          ></v-text-field>
          <v-btn variant="plain" @click="searchFriends">검색</v-btn>
      </v-row>
      <v-row class="search-list" v-if="searchRes">
        <v-container v-for="(res, idx) in searchFriendList" :key="res.id" class="friend-container friend-profile">
          <v-row class="d-flex align-center">
            <v-col cols="3">
              <v-avatar :image="imgSrc" size="40"></v-avatar>
            </v-col>
            <v-col cols="5">
              <h3 class="font-weight-bold">{{ res.nickname }}</h3>
              <p class="my-1">프로필</p>
            </v-col>
            <v-col cols="2">
              <v-btn variant="plain" @click="removeFriend(idx)">추가</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
    </v-container>

  </div>
</template>

<script setup>
import {ref} from 'vue';

import imgSrc from '@/assets/profile.png';

const searchRes = ref(false); // 검색 버튼을 눌렀을 때, 검색 결과를 보여줄 변수
const nickname = ref("혜옹")
const searchNickName = ref("");
const friendList = ref([
  {id:1, nickname: "지윤", userId: 1},
  {id:2, nickname: "다히", userId: 2},
  {id:3, nickname: "혜원", userId: 3},
])
const searchFriendList = ref([
  {id:1, nickname: "지윤", userId: 1},
  {id:2, nickname: "다히", userId: 2},
  {id:3, nickname: "혜원", userId: 3},
  {id:4, nickname: "지윤1", userId: 1},
  {id:5, nickname: "다히2", userId: 2},
  {id:6, nickname: "혜원3", userId: 3},
])


// 친구 삭제 함수
const removeFriend = (index) => {
  friendList.value.splice(index, 1); // 배열에서 해당 index의 친구 삭제
};

const searchFriends = () => {
  // 친구 검색 결과 가지고 오기..
  if(searchFriendList.value.length > 0){
    searchRes.value = true;
  }else{
    searchRes.value = false;
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