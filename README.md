# SalesMap Mini CRM

세일즈맵 스타일의 미니 CRM 데모 앱입니다.

## 🚀 Cloud Run 배포 방법

### 사전 준비

1. [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) 설치
2. GCP 프로젝트 생성 및 결제 계정 연결

### 배포 (한 줄!)

```bash
# 1. 프로젝트 설정
gcloud config set project YOUR_PROJECT_ID

# 2. 배포 (빌드 + 배포 자동)
gcloud run deploy salesmap-crm \
  --source . \
  --region asia-northeast3 \
  --platform managed \
  --allow-unauthenticated
```

> 첫 배포 시 Cloud Build API, Artifact Registry API 활성화 묻는 메시지가 나오면 'Y' 입력

### 배포 완료!

배포 완료되면 URL이 출력됩니다:
```
Service URL: https://salesmap-crm-xxxxx-du.a.run.app
```

---

## 💻 로컬 개발

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000 접속
```

---

## 📁 프로젝트 구조

```
salesmap-crm/
├── src/
│   ├── App.jsx       # 메인 CRM 컴포넌트
│   ├── main.jsx      # React 엔트리
│   └── index.css     # Tailwind CSS
├── Dockerfile        # Cloud Run 배포용
├── nginx.conf        # Nginx 설정
├── package.json
└── vite.config.js
```

---

## ✨ 기능

- **대시보드**: 리드/딜 통계, 파이프라인 현황
- **리드 관리**: 리드 추가, 목록 조회, 고객 전환
- **딜 파이프라인**: 칸반 보드, 드래그 앤 드롭

---

## 🔧 문제 해결

### 권한 오류 발생 시

```bash
# 서비스 계정에 필요한 권한 추가
PROJECT_NUMBER=$(gcloud projects describe YOUR_PROJECT_ID --format='value(projectNumber)')

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/cloudbuild.builds.builder"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/storage.objectViewer"
```

### Cloud Build 설정 확인

GCP Console → Cloud Build → Settings에서 서비스 계정 권한 확인

---

Made with ❤️ for SalesMap
