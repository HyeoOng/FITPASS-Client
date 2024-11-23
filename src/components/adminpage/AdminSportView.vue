<template>
    <div class="container">
        <div class="table-container">
            <h3>운동 목록</h3>
            <table class="sport-table">
                <thead>
                    <tr>
                        <th>운동</th>
                        <th>작업</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(sport, index) in sports" :key="sport.sportCode">
                        <td>{{ sport.sportName }}</td>
                        <td>
                            <button class="update-btn" @click="openUpdateModal(index)">수정</button>
                            <button class="delete-btn" @click="deleteSport(sport.sportCode, index)">삭제</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="form-container">
            <h3>운동 등록</h3>
            <form @submit.prevent="addSport">
                <label for="sportName">운동 이름:</label>
                <input type="text" id="sportName" v-model="newSportName" required/>
                <button type="submit" class="submit-btn">등록</button>
            </form>
        </div>
    </div>

    <!-- 운동 수정 모달 -->
    <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal-content">
            <h3>운동 수정</h3>
            <label for="updatedSportName">새 운동 이름:</label>
            <input type="text" id="updatedSportName" v-model="updatedSportName" required />
            <button @click="saveUpdatedSport" class="submit-btn">저장</button>
            <button @click="closeModal" class="cancel-btn">취소</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, toRaw } from "vue";
import { useSportStore } from "@/stores/sport";

const sportStore = useSportStore();

// 운동 목록
const sports = ref([]);

onMounted(async () => {
    try {
        const response = await sportStore.getAllSports();
        if (Array.isArray(response)) {
            sports.value = toRaw(response);
        } else {
            console.error("운동 목록을 가져오는 데 실패했습니다.");
        }
    } catch (error) {
        console.error("운동 목록을 불러오는 중 오류 발생");
        alert("운동 데이터를 가져 오는 데 실패했습니다.");
    }
})

// 새 운동 이름
const newSportName = ref("");

// 수정할 운동 관련 상태
const isModalOpen = ref(false);
const updatedSportName = ref("");
const sportToUpdateIndex = ref(null);

// 운동 추가 함수
const addSport = async () => {
    if (newSportName.value.trim()) {
        const newSport = { sportName: newSportName.value.trim() }; // sport 객체 생성
        try {
            const createdSport = await sportStore.createSport(newSport); // 새로운 운동 생성
            // sports.value.push(createdSport); // 반환된 데이터를 로컬 배열에 추가
            alert("운동이 성공적으로 등록되었습니다.");
            newSportName.value = ""; // 입력 초기화
            await sportStore.getSportsArr(); // 운동 목록 다시 로드
            sports.value = sportStore.sports;
        } catch (error) {
            console.error("운동 등록 중 오류 발생: ", error);
            alert("운동 등록에 실패했습니다.");
        }
    } else {
        alert("운동 이름을 입력하세요.");
    }
};

// 운동 수정 함수 (모달 열기)
const openUpdateModal = (index) => {
    const sport = sports.value[index];
    updatedSportName.value = sport.sportName;
    sportToUpdateIndex.value = index;
    isModalOpen.value = true; // 모달 열기
};

// 수정된 운동 이름 저장
const saveUpdatedSport = async () => {
    if (updatedSportName.value.trim()) {
        const sportCode = sports.value[sportToUpdateIndex.value].sportCode;
        const updatedSport = {
            sportCode,
            sportName: updatedSportName.value.trim(),
        };

        try {
            const response = await sportStore.updateSport(updatedSport);
            if (response.msg === "success") {
                alert("운동 이름이 성공적으로 수정되었습니다.");
                sports.value[sportToUpdateIndex.value].sportName = updatedSportName.value.trim(); // 로컬 데이터 업데이트
                closeModal(); // 모달 닫기
            } else {
                alert("운동 이름 수정에 실패했습니다.");
            }
        } catch (error) {
            console.error("운동 이름 수정 중 오류 발생: ", error);
            alert("운동 이름 수정에 실패했습니다.");
        }
    }
};


// 모달 닫기
const closeModal = () => {
    isModalOpen.value = false;
    updatedSportName.value = ""; // 입력 초기화
};

// 운동 삭제 함수
const deleteSport = async (sportCode, index) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
        try {
            const response = await sportStore.deleteSport(sportCode);
            if (response.msg == "success") {
                alert("성공적으로 삭제했습니다.");
                sports.value.splice(index, 1);
            } else {
                alert("운동을 삭제하지 못했습니다.");
            }
        } catch {
            console.error("운동 삭제 중 오류 발생: ", error);
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    gap: 20px; /* Space between the table and form */
    justify-content: flex-start; /* Align the items at the start */
    padding: 0 20px; /* Horizontal padding */
}

.table-container {
    flex: 1; /* This will take up the remaining space */
    margin-left: 50px;
}

.form-container {
    flex: 0 0 400px; /* Fixed width for the form */
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h3 {
    margin-bottom: 20px;
    color: #333;
    font-size: 1.5rem;
}

.sport-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    table-layout: fixed; /* 고정된 열 너비 */
}

.sport-table th,
.sport-table td {
    padding: 8px 12px;
    text-align: center;
    font-size: 14px;
    border-bottom: 1px solid #e2e2e2;
}

.sport-table th {
    background-color: #f8f9fa;
    color: #333;
    font-weight: bold;
}

.sport-table tbody tr {
    background-color: white;
    transition: background-color 0.2s ease-in-out;
}

.sport-table tbody tr:hover {
    background-color: #e6f7ff;
}

.update-btn,
.delete-btn,
.submit-btn,
.cancel-btn {
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-right: 8px;
}

.update-btn {
    background-color: #28a745;
    color: white;
}

.delete-btn {
    background-color: #dc3545;
    color: white;
}

.submit-btn {
    background-color: #007bff;
    color: white;
}

.cancel-btn {
    background-color: #6c757d;
    color: white;
}

.update-btn:hover {
    background-color: #218838;
}

.delete-btn:hover {
    background-color: #c82333;
}

.submit-btn:hover {
    background-color: #0056b3;
}

.cancel-btn:hover {
    background-color: #5a6268;
}

/* 모달 스타일 */
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
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
}

.modal-content h3 {
    margin-bottom: 20px;
}

.modal-content input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.modal-content button {
    width: 48%;
    padding: 10px;
    margin: 0 1%;
}
</style>
