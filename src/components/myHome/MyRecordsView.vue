<template>
  <div class="main-parent-content">
    <!-- Main Content Section -->
    <v-container class="main-content">
      <v-row justify="center" align="center">
        <v-col v-for="(feature, index) in features" :key="index" cols="12" md="3" class="text-center">
          <v-card class="feature-card rounded-lg">
            <v-card-title>
              <v-icon color="primary" size="50">{{ feature.icon }}</v-icon>
            </v-card-title>
            <h3 class="text-h6 font-weight-bold mt-1">{{ feature.title }}</h3>
            <p v-html="feature.description" class="mb-2"></p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, watch } from 'vue';
import { useUserStore } from '@/stores/user';

const props = defineProps({
  posts: {
    type: Array,
    default: () => ([]), // 빈 객체
  },
  places: {
    type: Array,
    default: () => ([]), // 빈 객체
  },
});

const userStore = useUserStore();

const features = ref([
  { icon: 'mdi-map', title: '방문 지역', description: '4' },
  { icon: 'mdi-clock', title: '운동한 시간', description: '23시간' },
  { icon: 'mdi-calendar', title: '가입 일수', description: '53일' },
  { icon: 'mdi-robot', title: '최다 방문 지역', description: '6개' }
]);





const watchPosts = watch(
  () => props.posts, // post를 감시
  async (newValue) => {

    console.log("새로 감지 in records: ", newValue)

    if((Array.isArray(newValue.value) && newValue.value !== undefined && newValue !== null)){
      features.value[0].description = computed(() => {
        return newValue.value.length;
      })

      // posts 배열의 exerciseDuration 합산 계산
      const totalExerciseDuration = computed(() => {
        return newValue.value.reduce((sum, post) => sum + (post.exerciseDuration || 0), 0) + ' 분';
      });
      // 2. 총 운동 시간 계산하기 
      features.value[1].description = totalExerciseDuration.value;
      
      // 3. 가입 일수 계산하기
      features.value[2].description = Math.ceil(userStore.userRegDate / (1000 * 60 * 60 * 24)+1) + '일'
    }

    
  },
  { immediate: true } // 컴포넌트 초기화 시에도 즉시 실행
);

const watchPlaces = watch(
  () => props.places, // post를 감시
  async (newValue) => {

    if(newValue !== null && (Array.isArray(newValue.value) && newValue.value !== undefined && newValue !== null)){
      // 4. 가장 많이 방문한 지역 찾기
      const locationCount = {};

      // places에서 주소를 기준으로 지역 추출 및 카운트
      newValue.value.forEach(place => {
        const placeAddress = place.placeAddress;
        if (placeAddress) {
          const region = placeAddress.split(' ')[0]; // 공백 기준 첫 번째 값 (서울, 대전 등)
          if (region) {
            locationCount[region] = (locationCount[region] || 0) + 1;
          }
        }
      });

      // 가장 많이 방문한 지역 찾기
      const mostVisitedRegion = Object.keys(locationCount).reduce((a, b) => locationCount[a] > locationCount[b] ? a : b);
      // console.log("가장 많이 방문한 지역: ", mostVisitedRegion)

      // 5. 결과를 features의 마지막 description에 설정
      features.value[3].description = mostVisitedRegion || '지역 없음';
    }
  },
  { immediate: true } // 컴포넌트 초기화 시에도 즉시 실행
);


</script>

<style scoped>
/* v-card의 스타일을 추가로 커스터마이징 */
.feature-card {
  background-color: rgba(255, 255, 255, 1); /* 카드의 배경을 반투명하게 설정 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 카드에 그림자 추가 */
  border: 2px solid rgba(138, 182, 225, 0.1); /* 테두리 색을 파란색(#1976D2)으로 설정, 두께는 2px */
}

.main-parent-content{
  position: relative;
  justify-content: center;
  height: 8vh;
  width: 100%;
}

.main-content{
  max-width: 100%;
  padding-left: 5vw;
  padding-right: 5vw;
  position: absolute;
  z-index: 1;
  top: -100px;
}
</style>