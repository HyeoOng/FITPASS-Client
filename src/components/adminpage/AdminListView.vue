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
                        <tr v-for="(admin, index) in adminList" :key="index">
                            <td>{{ admin.email }}</td>
                            <td>{{ admin.name }}</td>
                            <td>{{ admin.nn }}</td>
                            <td>
                                <button class="delete-btn" @click="deleteAdmin(admin.userId, index)">삭제</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- 관리자 추가 구역 -->
            <div class="admin-add">
                <h3>유저 검색 및 관리자 추가</h3>
                <div class="user-search">
                    <div class="search-input-container">
                        <input
                            type="text"
                            class="search-input"
                            placeholder="유저 이메일 또는 이름 검색"
                            v-model="nn"
                            @keydown.enter="searchUsers(nn)"
                        />
                        <button class="search-btn" @click="searchUsers(nn)">검색</button>
                    </div>

                    <!-- 검색 결과 -->
                    <div class="search-list" v-if="searchRes && searchUserList.length">
                        <div v-for="(res, idx) in searchUserList" :key="res.id" class="friend-container friend-profile">
                            <div class="d-flex align-center">
                                <div class="col-3">
                                    <img :src="res.imgSrc" alt="Profile Image" class="avatar">
                                </div>
                                <div class="col-5">
                                    <h3 class="font-weight-bold">{{ res.nn }}</h3>
                                    <p class="my-1">프로필</p>
                                </div>
                                <div class="col-2">
                                    <button @click="addAdmin(res.userId, res)" class="add-btn">추가</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 검색 결과가 없을 때 -->
                    <div v-if="!searchRes && searchQuery" class="no-results">
                        <p>검색 결과가 없습니다.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, toRaw } from "vue";
import { useAdminStore } from "@/stores/admin";
import { useUserStore } from "@/stores/user";

const adminStore = useAdminStore();
const userStore = useUserStore();

// 관리자 목록
const adminList = ref([]);

onMounted(async () => {
    try {
        const response = await adminStore.getAllAdmin();
        if (Array.isArray(response)) {
            adminList.value = toRaw(response);
        } else {
            console.error("관리자 목록을 가져오는 데 실패했습니다.");
        }
    } catch (error) {
        console.error("관리자 데이터를 불러오는 중 오류 발생");
        alert("관리자 데이터를 가져 오는 데 실패했습니다.");
    }
});

// 검색 상태
const searchQuery = ref(""); // 검색어
const searchRes = ref(false); // 검색 결과 상태
const searchUserList = ref([]); // 검색된 유저 목록

// 유저 검색 함수
const searchUsers = async (nn) => {
    try {
        const response = await userStore.getUsersByNn(nn); // 닉네임으로 유저 검색
        if (Array.isArray(response.value) && response.value.length > 0) {
            searchUserList.value = toRaw(response.value); // 검색된 결과 저장
            console.log(searchUserList.value);
            searchRes.value = true;
        } else {
            searchUserList.value = [];
            searchRes.value = false;
        }
    } catch (error) {
        console.error("유저 불러오는 중 오류 발생: ", error);
        searchUserList.value = [];
        searchRes.value = false;
    }
};

// 관리자 추가 함수
const addAdmin = async (userId, user) => {
    try {
        const response = await adminStore.addAdmin(userId); // 관리자로 추가
        console.log("admin: ", response.msg);
        if (response.flag) {
            alert("성공적으로 추가했습니다.");
            searchQuery.value = ""; // 입력 필드 초기화
            searchRes.value = false;
            adminList.value.push(user);
        } else {
            alert("관리자로 추가하지 못했습니다.");
        }
    } catch (error) {
        console.error("관리자를 추가하는 중 오류 발생: ", error);
        
    }
};

// 관리자 삭제 함수
const deleteAdmin = async (userId, index) => {
    if (confirm("정말로 삭제하시겠습니까?") == true) {
        try {
        const response = await adminStore.deleteAdmin(userId); // 관리자를 삭제
        if (response.flag) {
            alert("성공적으로 삭제했습니다.");
            adminList.value.splice(index, 1);
        } else {
            alert("관리자를 삭제하지 못했습니다.");
        }
        } catch (error) {
            console.log("관리자 삭제 중 오류 발생: ", error);
        }
    }
};
</script>

<style scoped>
/* 컨테이너 스타일 */
.admin-container {
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
    background: linear-gradient(135deg, #fdfbfb, #ebedee);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    font-family: 'Roboto', sans-serif;
}

/* 콘텐츠 정렬 */
.admin-content {
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
}

/* 각 섹션 */
.admin-list,
.admin-add {
    flex: 1;
    min-width: 300px;
    padding: 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

/* 헤더 */
h3 {
    margin-bottom: 20px;
    color: #444;
    text-align: left;
    font-size: 1.6rem;
    border-bottom: 2px solid #e9ecef;
    padding-bottom: 8px;
}

/* 테이블 */
.admin-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 14px;
}

.admin-table thead {
    background-color: #f5f6f7;
}

.admin-table th,
.admin-table td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid #e9ecef;
}

.admin-table th {
    font-weight: 600;
    color: #6c757d;
}

.admin-table tbody tr:hover {
    background-color: #f9fbfc;
    cursor: pointer;
}

/* 버튼 스타일 */
.delete-btn,
.add-btn {
    background-color: #6c63ff;
    color: white;
    border: none;
    padding: 10px 16px;
    cursor: pointer;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.3s ease;
}

.delete-btn {
    background-color: #ff5252;
}

.add-btn:hover {
    background-color: #5548c8;
}

.delete-btn:hover {
    background-color: #ff3333;
}

/* 검색 입력 */
.search-input-container {
    display: flex;
    gap: 10px;
    align-items: center;
}

.search-input {
    flex: 1;
    padding: 12px;
    font-size: 14px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    transition: border-color 0.3s ease;
}

.search-input:focus {
    outline: none;
    border-color: #6c63ff;
    box-shadow: 0 0 5px rgba(108, 99, 255, 0.3);
}

.search-btn {
    background-color: #6c63ff;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.search-btn:hover {
    background-color: #5548c8;
}

/* 검색 결과 */
.search-list {
    margin-top: 20px;
    padding: 10px 0;
    border-top: 1px solid #e9ecef;
}

.friend-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 10px;
    background-color: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.friend-container:hover {
    background-color: #f1f3f5;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.friend-container img.avatar {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    object-fit: cover;
}

.friend-container .add-btn {
    margin-left: 10px;
}

/* "검색 결과 없음" 메시지 */
.no-results {
    margin-top: 20px;
    color: #888;
    text-align: center;
    font-size: 14px;
    font-style: italic;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
    .admin-content {
        flex-direction: column;
    }

    .search-input-container {
        flex-direction: column;
        gap: 5px;
    }
}
</style>
