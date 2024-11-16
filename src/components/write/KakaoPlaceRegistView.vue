<template>
  <div>
    <h4 class="font-weight-medium pb-5" style="color: gray;">장소 검색</h4>
    <v-row class="searchForm pb-0">
      <v-col cols="11" class="pa-0">
        <v-text-field
          variant="outlined"
          class="pa-0"
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn variant="plain">검색</v-btn>
      </v-col>
    </v-row>
    <KakaoMap :lat="latLng[0]" :lng="latLng[1]" :draggable="true" class="kakao-map" width="100%">
      <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
    </KakaoMap>
    
  </div>
</template>

<script setup>
import {ref} from 'vue';
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';

const searchKeyword = ref(""); // 검색 단어
const latLng = ref([37.566826, 126.9786567])
const markers = ref([]); // 장소 검색 후 나오는 장소들에 대한 정보를 담는 배열(=> 마커로 찍을 예정)


</script>

<style scoped>
.searchForm{
  margin: 0px; 
  align-items: flex-start;
}
</style>