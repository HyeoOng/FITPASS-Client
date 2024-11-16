<template>
    <div class="request-content">
        <div class="request-list">
            <table class="request-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>요청자</th>
                        <th>제목</th>
                        <th>작업</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(request, index) in requests" :key="request.requestId">
                        <td>{{ request.requestId }}</td>
                        <td>{{ request.name }}</td>
                        <td>{{ request.title }}</td>
                        <td>
                            <button class="deleteBtn" @click="confirmDelete(index)">삭제</button>
                            <button class="view-btn" @click="openModal(request)">상세 보기</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- 요청 상세 보기 모달 -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <h4>요청 상세</h4>
            <p><strong>요청자:</strong> {{ selectedRequest.name }}</p>
            <p><strong>제목:</strong> {{ selectedRequest.title }}</p>
            <p><strong>내용:</strong> {{ selectedRequest.content }}</p>
            <button class="close-btn" @click="closeModal">닫기</button>
        </div>
    </div>

    <!-- 삭제 확인 모달 -->
    <div v-if="isDeleteModalOpen" class="modal-overlay" @click="closeDeleteModal">
        <div class="modal-content" @click.stop>
            <h4>삭제 확인</h4>
            <p>정말로 이 요청을 삭제하시겠습니까?</p>
            <button class="confirm-btn" @click="deleteRequest">삭제</button>
            <button class="cancel-btn" @click="closeDeleteModal">취소</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

// 요청 목록
const requests = ref([
    { requestId: 1, name: "유저1", title: "운동 종목 추가해주세요", content: "운동 종목에 추가되어야 할 새로운 항목이 있습니다." },
    { requestId: 2, name: "유저2", title: "운동 종목 추가해주세요2", content: "운동 종목에 추가되어야 할 항목에 대한 설명입니다." },
]);

// 모달 상태
const isModalOpen = ref(false); // 상세 보기 모달
const isDeleteModalOpen = ref(false); // 삭제 확인 모달
const selectedRequest = ref({}); // 선택된 요청 데이터
const deleteIndex = ref(null); // 삭제할 요청의 인덱스

// 요청 클릭 시 상세 보기 모달 열기
const openModal = (request) => {
    selectedRequest.value = request; // 선택된 요청 데이터 설정
    isModalOpen.value = true; // 상세 보기 모달 열기
};

// 상세 보기 모달 닫기
const closeModal = () => {
    isModalOpen.value = false; // 상세 보기 모달 닫기
};

// 삭제 확인 모달 열기
const confirmDelete = (index) => {
    deleteIndex.value = index; // 삭제할 요청의 인덱스 저장
    isDeleteModalOpen.value = true; // 삭제 확인 모달 열기
};

// 삭제 확인 모달 닫기
const closeDeleteModal = () => {
    isDeleteModalOpen.value = false; // 삭제 확인 모달 닫기
};

// 요청 삭제 함수
const deleteRequest = () => {
    if (deleteIndex.value !== null) {
        requests.value.splice(deleteIndex.value, 1); // 해당 요청 삭제
        closeDeleteModal(); // 삭제 후 모달 닫기
    }
};
</script>

<style lang="scss" scoped>
.request-list {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

h3 {
    color: #333;
    font-size: 1.5rem;
    margin-bottom: 20px;
}

.request-table {
    width: 80%;
    border-collapse: collapse;
    margin-top: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.request-table th,
.request-table td {
    padding: 12px;
    text-align: center;
    font-size: 16px;
    border-bottom: 1px solid #e2e2e2;
}

.request-table th {
    background-color: #f8f9fa;
    color: #333;
    font-weight: bold;
}

.request-table tbody tr {
    background-color: white;
    transition: background-color 0.2s ease-in-out;
}

.request-table tbody tr:hover {
    background-color: #e6f7ff;
}

/* 버튼 스타일 */
.request-table td button {
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    margin-right: 10px; /* 버튼 간격 띄우기 */
}

/* 상세 보기 버튼 */
.view-btn {
    background-color: #28a745;
    color: white;
    transition: background-color 0.3s ease;
}

.view-btn:hover {
    background-color: #218838;
}

/* 삭제 버튼 */
.deleteBtn {
    background-color: #dc3545;
    color: white;
    transition: background-color 0.3s ease;
}

.deleteBtn:hover {
    background-color: #c82333;
}

/* 상세 보기 모달 스타일 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-content h4 {
    margin-bottom: 10px;
    color: #333;
    font-size: 1.2rem;
}

.modal-content p {
    font-size: 14px;
    margin: 8px 0;
}

.modal-content .close-btn {
    padding: 8px 16px;
    border-radius: 4px;
    background-color: #dc3545;
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 20px;
}

.modal-content .close-btn:hover {
    background-color: #c82333;
}

/* 삭제 확인 모달 스타일 */
.modal-content .confirm-btn,
.modal-content .cancel-btn {
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    margin-top: 10px;
}

.modal-content .confirm-btn {
    background-color: #dc3545;
    color: white;
}

.modal-content .confirm-btn:hover {
    background-color: #c82333;
}

.modal-content .cancel-btn {
    background-color: #6c757d;
    color: white;
}

.modal-content .cancel-btn:hover {
    background-color: #5a6268;
}
</style>
