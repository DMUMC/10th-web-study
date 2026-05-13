## README

### 🔐 Refresh Token 적용

이번 작업에서는 기존 인증 구조에 **Refresh Token 기반 재발급 로직**을 추가하여,
Access Token 만료 시 자동으로 토큰을 갱신할 수 있도록 구현했습니다.

---

### 📌 구현 목적

* Access Token 만료 시 사용자 로그아웃 방지
* 인증 상태 유지 (UX 개선)
* 보안성과 편의성 균형 확보

---

### ⚙️ 동작 방식

1. Access Token이 만료된 요청 발생 (401 Unauthorized)
2. 인터셉터에서 Refresh Token으로 재발급 요청
3. 새로운 Access Token 발급
4. 기존 요청 재시도

---

### 🔄 토큰 흐름

* Access Token: API 요청 시 사용
* Refresh Token: Access Token 재발급 용도

---

### 🛠 주요 구현

* Axios Interceptor 기반 자동 재요청 처리
* Refresh 요청 중복 방지 (`Promise` 활용)
* LocalStorage에 토큰 저장 및 갱신
* Refresh 실패 시 로그아웃 처리

---

### ⚠️ 이슈 및 해결

* **문제**: 새로고침 2회 시 로그아웃 발생
* **원인**: Refresh Token 저장 경로 오류
* **해결**: 응답 구조에 맞게 `refreshToken` 정상 저장

---

### 📎 참고

* 인증 방식: JWT (Access + Refresh Token)
* 저장 방식: LocalStorage

---