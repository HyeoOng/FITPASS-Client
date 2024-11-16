<template>
  <v-card class="pa-5 pt-7 pr-6 pl-6 card">
    <v-card-title class="font-weigh-black"><h2>피드백 및 개선 요청</h2></v-card-title>
    <v-card-text>
      서비스 개선을 위해 사용 중 겪은 불편 사항이나 <br>개선을 원하는 부분 등 소중한 피드백을 보내주세요.<br>
      더 나은 서비스를 위해 노력하겠습니다. 감사합니다.
    </v-card-text>
    <v-text-field
    label="제목"
    variant="outlined" />
    <v-textarea
      label="소중한 피드백을 남겨주세요."
      variant="outlined"
      rows="10"
      shaped
    ></v-textarea>
    <v-row class="card-btns">
      <v-btn text="취소" class="mr-3 ml-5" @click="$emit('closeDialog')"></v-btn>
      <v-btn text="전달" class="mr-5 ml-3" @click="$emit('closeDialog')"></v-btn>
    </v-row>
  </v-card>
</template>

<script setup>

</script>

<style scoped>
.card-btns{
  justify-content: end;
  margin-bottom: 1vh;
  margin-top: 1vh;
}
</style>