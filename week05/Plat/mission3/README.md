## README

### 🔐 Google OAuth Redirect 처리

OAuth를 통해 Google 로그인 성공 후 리다이렉트 페이지를 구현했습니다.

---

### 📌 구현 목적

* Google OAuth 로그인 결과 처리
* 로그인 상태 유지 및 자동 이동 처리

---

### ⚙️ 동작 방식

1. Google 로그인 성공 후 `/google/callback`으로 리다이렉트
2. URL Query에서 토큰 추출
3. LocalStorage에 토큰 저장
4. `/my` 페이지로 이동

---

### 🛠 주요 구현 코드

```ts
const urlParams = new URLSearchParams(window.location.search);

const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

if (accessToken) {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
  window.location.href = "/my";
}
```

---