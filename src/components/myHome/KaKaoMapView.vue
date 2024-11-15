<template>
  <div class="map-container mt-5 ml-25  mr-25">
    <v-row>
      <v-col cols="4">
        <br>
        <br>  
        <h2 class="text-center font-weight-bold">최근 방문 장소</h2>
        <v-table>
    <thead>
      <tr>
        <th class="text-left">
          
        </th>
        <th class="text-left">
        
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="p in places"
        :key="p.name"
      >
        <td>{{ p.no }}</td>
        <td>{{ p.name }}</td>
      </tr>
    </tbody>
  </v-table>
      </v-col>
      <v-col cols="8">
        <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true" class="kakao-map" width="100%">
          <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
        </KakaoMap>
      </v-col>
      
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';

const coordinate = {
  lat: 37.566826,
  lng: 126.9786567
};

const places = ref([
  {no: 1, name: "스타벅스 잠실새내점"},
  {no: 2, name: "멀티캠퍼스 역삼"},
  {no: 3, name: "멀티캠퍼스 역삼"},
  {no: 4, name: "멀티캠퍼스 역삼"},
  {no: 5, name: "멀티캠퍼스 역삼"},
])

</script>

<style scoped>
.map-container{
  padding-left: 5vw;
  padding-right: 5vw;
}

.kakao-map{
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