import router from "@/router";

import { useUserStore } from "@/stores/user";

export function errorHandler() {

  const error = {
    "UAL0001" : "이메일 또는 비밀번호를 확인해 주세요.",
    "UAL0002" : "로그인 시도 횟수를 초과하였습니다. \n 5분 뒤 다시 시도해주세요.",
    "UAL0003" : null,
    "UAL0004" : "중복된 정보가 존재합니다.",
    "UAL0005" : "비난, 혐오, 욕설이 포함된 글은 작성할 수 없습니다.",
    "UAL0006" : "잘못된 시도입니다.",
    "UAL0007" : "잘못된 시도입니다.",
    "UAL0008" : "이메일 인증 먼저 해주세요.",
    "DAL0001" : "오류가 발생했습니다. \n 잠시 후에 다시 시도해주세요.",
    "SAL0001" : "오류가 발생했습니다. \n 잠시 후에 다시 시도해주세요.",
    "SAL0002" : "오류가 발생했습니다. \n 잠시 후에 다시 시도해주세요.",
    "SPL0001" : "로그인을 다시 해주세요.",
    "SPL0002" : "접근이 제한되었습니다.",
    "JAL0001" : "오류가 발생했습니다. \n 잠시 후에 다시 시도해주세요.",
  }


  const showError = (code, ...message) => {
    const userStore = useUserStore();

    const msg = error[code] || "알 수 없는 오류가 발생했습니다.";
    // UAL0003의 경우 동적으로 메시지 설정
    if (code === "UAL0003" && message[0]) {
      msg = message[0];
    }

    alert(msg);
    if(code.includes("PL")){
      userStore.logout();
      router.push('/login');
    }
  }

  return {showError}
}