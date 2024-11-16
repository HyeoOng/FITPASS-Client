<template>
    <div class="admin-container">
        <div class="admin-content">
            <!-- 관리자 목록 -->
            <div class="admin-list">
                <h3>현재 관리자 목록</h3>
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>이메일</th>
                            <th>이름</th>
                            <th>닉네임</th>
                            <th>작업</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(admin, index) in admins" :key="index">
                            <td>{{ admin.email }}</td>
                            <td>{{ admin.name }}</td>
                            <td>{{ admin.nickname }}</td>
                            <td>
                                <button class="delete-btn" @click="deleteAdmin(index)">삭제</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- 관리자 추가 구역 -->
            <div class="admin-add">
                <h3>유저 검색 및 관리자 추가</h3>
                <div class="user-search">
                    <input
                        type="text"
                        class="search-input"
                        placeholder="유저 이메일 또는 이름 검색"
                        v-model="searchQuery"
                        @input="searchUsers"
                    />
                    <ul class="user-results">
                        <li v-for="user in filteredUsers" :key="user.email" class="user-item">
                            <div class="user-info">
                                <span>{{ user.name }} ({{ user.email }})</span>
                            </div>
                            <button class="add-btn" @click="addAdmin(user)">추가</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

// 관리자 목록
const admins = ref([
    { email: "admin1@example.com", name: "관리자1", nickname: "admin1" },
    { email: "admin2@example.com", name: "관리자2", nickname: "admin2" },
]);

// 유저 데이터 (예제 데이터)
const users = ref([
    { email: "user1@example.com", name: "유저1", nickname: "user1" },
    { email: "user2@example.com", name: "유저2", nickname: "user2" },
    { email: "user3@example.com", name: "유저3", nickname: "user3" },
    { email: "user4@example.com", name: "유저4", nickname: "user4" },
]);

// 검색 상태
const searchQuery = ref("");
const filteredUsers = ref([]);

// 유저 검색 함수
const searchUsers = () => {
    const query = searchQuery.value.toLowerCase();
    filteredUsers.value = users.value.filter(
        (user) =>
            (user.email.toLowerCase().includes(query) ||
                user.name.toLowerCase().includes(query)) &&
            !admins.value.some((admin) => admin.email === user.email) // 이미 관리자인 유저 제외
    );
};

// 관리자 추가 함수
const addAdmin = (user) => {
    admins.value.push(user); // 관리자로 추가
    filteredUsers.value = []; // 검색 결과 초기화
    searchQuery.value = ""; // 입력 초기화
};

// 관리자 삭제 함수
const deleteAdmin = (index) => {
    admins.value.splice(index, 1); // 특정 인덱스의 항목 삭제
};
</script>

<style lang="scss" scoped>
.admin-container {
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    font-family: Arial, sans-serif;
}

.admin-content {
    display: flex;
    gap: 40px;
    flex-wrap: wrap; /* 화면 크기에 따라 두 구역이 아래로 쌓이게 설정 */
}

.admin-list,
.admin-add {
    flex: 1;
    min-width: 300px; /* 최소 너비를 설정하여 구역이 좁아지지 않도록 함 */
}

h3 {
    margin-bottom: 20px;
    color: #333;
    text-align: left;
    font-size: 1.5rem;
}

.admin-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}

.admin-table thead {
    background-color: #f8f9fa;
}

.admin-table th,
.admin-table td {
    padding: 16px;
    text-align: left;
    font-size: 14px;
}

.admin-table th {
    font-weight: bold;
    color: #495057;
    border-bottom: 2px solid #dee2e6;
}

.admin-table tbody tr {
    background-color: #ffffff;
    border-bottom: 1px solid #e9ecef;
    transition: background-color 0.2s ease-in-out;
}

.admin-table tbody tr:hover {
    background-color: #f1f3f5;
}

.delete-btn,
.add-btn {
    background-color: #e63946;
    color: white;
    border: none;
    padding: 10px 16px;
    cursor: pointer;
    border-radius: 8px;
    font-size: 14px;
    transition: background-color 0.3s ease;
}

.add-btn {
    background-color: #4caf50;
}

.delete-btn:hover {
    background-color: #d62839;
}

.add-btn:hover {
    background-color: #3e8e41;
}

.search-input {
    width: 100%;
    padding: 12px;
    font-size: 14px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    margin-bottom: 20px;
}

.user-results {
    list-style: none;
    padding: 0;
    margin: 0;
}

.user-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #e9ecef;
}

.user-item:hover {
    background-color: #f1f3f5;
}

.user-info {
    font-size: 14px;
}
</style>
