<template>
  <div class="map-container">
    <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true">
      <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
    </KakaoMap>
  </div>
</template>

<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';

const coordinate = {
  lat: 37.566826,
  lng: 126.9786567
};
</script>

<style scoped>
.map-container {
  display: flex;
  justify-content: right;
  align-items: center;
  height: 200px;
  margin-top: 20px;
  padding-right: 30px;
}

KakaoMap {
  width: 500px;
  height: 300px;
}
</style>