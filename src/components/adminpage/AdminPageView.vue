<template>
  <div class="main-div">
    <h1 class="page-title">Admin Page</h1>
    <nav class="admin-navbar">
      <RouterLink 
        to="/admin/list" 
        class="nav-link" 
        active-class="active-link"
      >
        관리자 관리
      </RouterLink>
      <RouterLink 
        to="/admin/sport" 
        class="nav-link" 
        active-class="active-link"
      >
        운동 코드 관리
      </RouterLink>
      <RouterLink 
        to="/admin/request" 
        class="nav-link" 
        active-class="active-link"
      >
        요청 관리
      </RouterLink>
    </nav>
    <RouterView/>
  </div>
</template>

<script setup>
</script>

<style scoped>
.main-div {
  margin-top: 64px;
}

.page-title {
  text-align: center;
}

.admin-navbar {
  display: flex;
  gap: 10px;
  justify-content: center; /* 가운데 정렬 */
  margin-top: 16px;
}

.nav-link {
  text-decoration: none;
  color: black; /* 기본 글자색 */
}

.nav-link.active-link {
  color: rgb(24, 125, 225); /* 활성화된 상태에서의 글자색 */
  font-weight: bold; /* 선택된 링크 강조 */
}
</style>
