<template>
  <div class="map-container mt-5 ml-25 mr-25">
    <v-row>
      <v-col cols="4">
        <br />
        <br />
        <h2 class="text-center font-weight-bold">최근 방문 장소</h2>
        <v-table v-if="myPlaces.length > 0">
          <thead>
            <tr>
              <th class="text-left"></th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, idx) in myPlaces.slice(0, 5)" :key="p.name" @click="clickPlace(p)" style="cursor: pointer">
              <td>{{ idx + 1 }}</td>
              <td>{{ p.placeName }}</td>
            </tr>
          </tbody>
        </v-table>
        <div v-else>
          <p>글을 등록해보세요!</p>
        </div>
      </v-col>
      <v-col cols="8">
        <KakaoMap
          :lat="coordinate.lat"
          :lng="coordinate.lng"
          :draggable="true"
          class="kakao-map"
          width="100%"
        >
          <KakaoMapMarker
            v-for="(p, idx) in allMyPlaces"
            :key="p.placeId"
            :lat="p.latitude"
            :lng="p.longitude"
          ></KakaoMapMarker>
        </KakaoMap>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";

const props = defineProps({
  places: {
    type: Array,
    default: () => [], // 빈 객체
  },
});

const coordinate = ref({
  lat: 37.566826,
  lng: 126.9786567,
});

const myPlaces = ref([
  { no: 1, name: "스타벅스 잠실새내점" },
  { no: 2, name: "멀티캠퍼스 역삼" },
  { no: 3, name: "멀티캠퍼스 역삼" },
  { no: 4, name: "멀티캠퍼스 역삼" },
  { no: 5, name: "멀티캠퍼스 역삼" },
]);

const allMyPlaces = ref([]);

const watchPlaces = watch(
  () => props.places, // post를 감시
  async (newValue) => {
    if (
      Array.isArray(newValue.value) &&
      newValue.value !== undefined &&
      newValue !== null
    ) {

      allMyPlaces.value = newValue.value;
      // 순서를 먼저 뒤집고, 그 후에 중복을 제거하기
      const reversedPlaces = newValue.value.reverse(); // 순서 뒤집기

      const uniquePlaces = Array.from(
        new Set(reversedPlaces.map((place) => place.placeId))
      ).map((placeId) =>
        reversedPlaces.find((place) => place.placeId === placeId)
      );

      myPlaces.value = uniquePlaces; // 중복 제거 후 반영
      console.log("myPlace: ", myPlaces.value);
      coordinate.value.lat = myPlaces.value[0].latitude;
      coordinate.value.lng = myPlaces.value[0].longitude;
    }
  },
  { immediate: true } // 컴포넌트 초기화 시에도 즉시 실행
);

const clickPlace = (place) => {
  coordinate.value.lat = place.latitude;
  coordinate.value.lng = place.longitude;
}
</script>

<style scoped>
.map-container {
  padding-left: 5vw;
  padding-right: 5vw;
}

.kakao-map {
  height: 16vh;
  width: 80%;
  border-radius: 15px;
  justify-content: end;
}

/* .map-container {
  display: flex;
  justify-content: right;
  align-items: center;
  height: 200px;
  margin-top: 20px;
  padding-right: 30px;
} */

/* KakaoMap {
  width: 500px;
  height: 300px;
} */
</style>
