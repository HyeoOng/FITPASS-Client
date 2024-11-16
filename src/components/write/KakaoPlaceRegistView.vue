<template>
  <div>
    <h4 class="font-weight-medium pb-5" style="color: gray">장소 검색</h4>
    <v-row class="searchForm pb-0">
      <v-col cols="11" class="pa-0">
        <v-text-field variant="outlined" class="pa-0"></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn variant="plain" class="text-primary">검색</v-btn>
      </v-col>
    </v-row>

    <v-row class="search-result-div">
      <v-col cols="4">
        <h3 class="font-weight-bold pl-3 pb-4">검색 결과</h3>
        <v-virtual-scroll :items="searchResults" height="420">
          <template v-slot:default="{ item }">
            <v-list-item class="py-3">
              <template v-slot:prepend>
                <v-avatar color="#7FC8F8" class="text-white" size="40">
                  {{ item.idx }}
                </v-avatar>
              </template>

              <v-list-item-title>{{ item.placeName }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.address }}</v-list-item-subtitle>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-col>
      <v-col cols="8">
        <KakaoMap
          :lat="latLng[0]"
          :lng="latLng[1]"
          :draggable="true"
          class="kakao-map"
          width="100%"
        >
          <!-- <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker> -->
        </KakaoMap>
      </v-col>
    </v-row>
    <v-text-field variant="outlined" model-value="역삼 멀티캠퍼스" readonly />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";

const searchKeyword = ref(""); // 검색 단어
const latLng = ref([37.566826, 126.9786567]);
const markers = ref([]); // 장소 검색 후 나오는 장소들에 대한 정보를 담는 배열(=> 마커로 찍을 예정)

const searchResults = ref([
  {idx: 1, placeName: "역삼 멀티캠퍼스", address: "역삼동"},
  {idx: 2, placeName: "역삼 멀티캠퍼스", address: "역삼동"},
  {idx: 3, placeName: "역삼 멀티캠퍼스", address: "역삼동"},
  {idx: 4, placeName: "역삼 멀티캠퍼스", address: "역삼동"},
  {idx: 5, placeName: "역삼 멀티캠퍼스", address: "역삼동"},
  {idx: 5, placeName: "역삼 멀티캠퍼스", address: "역삼동"},
  {idx: 5, placeName: "역삼 멀티캠퍼스", address: "역삼동"},
  {idx: 5, placeName: "역삼 멀티캠퍼스", address: "역삼동"},
  {idx: 5, placeName: "역삼 멀티캠퍼스", address: "역삼동"},
  {idx: 5, placeName: "역삼 멀티캠퍼스", address: "역삼동"},
  {idx: 5, placeName: "역삼 멀티캠퍼스", address: "역삼동"},
  {idx: 5, placeName: "역삼 멀티캠퍼스", address: "역삼동"},
  {idx: 5, placeName: "역삼 멀티캠퍼스", address: "역삼동"},
  {idx: 5, placeName: "역삼 멀티캠퍼스", address: "역삼동"},
  {idx: 5, placeName: "역삼 멀티캠퍼스", address: "역삼동"},
  {idx: 5, placeName: "역삼 멀티캠퍼스", address: "역삼동"},  
])
</script>

<style scoped>
.searchForm {
  margin: 0px;
  align-items: flex-start;
}

.kakao-map {
  margin-bottom: 1em;
  /* position: inherit; */
}

.search-result-div{
  align-items: center;
}
</style>
