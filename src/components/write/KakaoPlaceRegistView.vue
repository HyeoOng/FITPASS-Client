<template>
  <div>
    <h4 class="font-weight-medium pb-5" style="color: gray">장소 검색</h4>
    <v-row class="searchForm pb-0">
      <v-col cols="11" class="pa-0">
        <v-text-field variant="outlined" class="pa-0" 
        v-model="searchKeyword"
        @keydown.enter="searchPlace"
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn variant="plain" class="text-primary" @click="searchPlace">검색</v-btn>
      </v-col>
    </v-row>

    <v-row class="search-result-div" v-if="showMap">
      <v-col cols="4">
        <h3 class="font-weight-bold pl-3 pb-4">검색 결과</h3>
        해당하는 지역의 이름을 클릭해주세요.
        <v-virtual-scroll :items="searchResults" height="420">
          <template v-slot:default="{ item, index }">
            <v-list-item class="py-3" @click="selectPlace(item)">
              <template v-slot:prepend>
                <v-avatar color="#7FC8F8" class="text-white" size="30">
                  {{ index + 1 }}
                </v-avatar>
              </template>

              <v-list-item-title>{{ item.placeName }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.placeAddress }}</v-list-item-subtitle>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-col>
      <v-col cols="8">
        <KakaoMap
          :lat="mapCenter.lat"
          :lng="mapCenter.lng"
          :draggable="true"
          class="kakao-map"
          width="100%"
        >
          <KakaoMapMarker v-for="(searchResult, index) in searchResults" 
          :key="searchResult.id" :lat="searchResult.latitude" :lng="searchResult.longitude" :order="index+1"></KakaoMapMarker>
        </KakaoMap>
      </v-col>
    </v-row>
    <v-text-field v-if="showResultPlaceName" variant="outlined" v-model="resultPlace.placeName" readonly />
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { usePlaceStore } from "@/stores/place";

const emit = defineEmits();
const placeStore = usePlaceStore();

const searchKeyword = ref(""); // 검색 단어
const showMap = ref(false); // 검색 후 searchResults가 존재하는 경우에만 true로 한다.
const showResultPlaceName = ref(false); // 지역을 선택하면 text-field로 선택한 장소를 보여준다.
const resultPlace = ref({}); // 서버로 보내기 위한 장소 정보를 저장

const searchResults = ref([])
// 초기 맵 중심 위치 (첫 번째 검색 결과를 기준으로 설정)
const mapCenter = ref({
  lat: 129.13294933150723,
  lng: 35.166935598455666,
});

const searchPlace = async () => { // 검색 버튼 클릭 시 실행
  const results = await placeStore.getSearchResults(searchKeyword.value);
  searchResults.value = results;

  if(searchResults.value.length > 0){
    mapCenter.value.lat = searchResults.value[0].latitude;
    mapCenter.value.lng = searchResults.value[0].longitude;
    showMap.value = true;
  } else {
    alert('해당하는 장소가 존재하지 않습니다.');
    showMap.value = false;
  }
}

const selectPlace = (place) => { // 장소 선택
  resultPlace.value = place;
  mapCenter.value.lat = place.latitude;
  mapCenter.value.lng = place.longitude;
  showResultPlaceName.value = true;

  // 부모에게 선택한 장소 정보를 전달
  emit("select-place", resultPlace.value);
}
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
