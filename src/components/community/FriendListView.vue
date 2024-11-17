<template>
  <div class="main-div mt-10 ml-25 mr-25">
    <h2 class="font-weight-black">Friend</h2>
    <v-container class="friends-container">

    </v-container>

  </div>
</template>

<script setup>

</script>

<style scoped>
.main-div {
  padding-left: 5vw;
  padding-right: 5vw;
}

.friends-container {
  justify-content: center;
  /* border: 1px solid #000; */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);  /* 4px 아래로, 8px 흐림, 10% 투명도 */
  padding-top: 1vh;
  padding-bottom: 2vh;
  margin-bottom: 4vh;
}
</style>