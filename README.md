# DavidPARK0417의 블로그

GitHub Pages를 사용한 정적 블로그입니다.

## 🚀 기능

- 📝 마크다운 기반 게시글 작성
- 🔍 실시간 검색 기능
- 🏷️ 태그 기반 필터링
- 🌙 다크/라이트 모드
- 💬 Giscus 댓글 시스템
- 📱 반응형 디자인

## 📝 게시글 작성 방법

1. `pages/` 폴더에 새로운 `.md` 파일 생성
2. Front Matter 형식으로 메타데이터 작성:

```markdown
---
title: '게시글 제목'
date: 2025-01-26
tags: ['JavaScript', 'Web']
category: 'Development'
description: '게시글 설명'
---

# 제목

게시글 내용...
```

3. 변경사항을 커밋하고 푸시
4. GitHub Actions가 자동으로 `posts.json`을 생성하고 배포

## 🛠️ 로컬 테스트

1. 로컬 웹 서버 실행:
```bash
# Python 3
python -m http.server 8000

# Node.js (http-server 설치 필요)
npx http-server

# VS Code Live Server 확장 사용
```

2. 브라우저에서 `http://localhost:8000` 접속

## 💬 Giscus 댓글 설정

### 1. GitHub Discussions 활성화
- 저장소 Settings > General > Features > Discussions 활성화

### 2. Giscus 앱 설치
- https://github.com/apps/giscus 접속
- DavidPARK0417/DavidPARK0417.github.io 저장소에 설치

### 3. Giscus 설정
- https://giscus.app/ko 접속
- 저장소: `DavidPARK0417/DavidPARK0417.github.io`
- 매핑: `pathname`
- 카테고리: `General`
- 테마: `preferred_color_scheme`

## 📁 프로젝트 구조

```
/
├── index.html          # 메인 페이지
├── post.html           # 게시글 상세 페이지
├── css/
│   ├── style.css       # 메인 스타일
│   └── prism.css       # 코드 하이라이팅
├── js/
│   ├── app.js          # 메인 애플리케이션
│   ├── post-loader.js  # 마크다운 로더
│   ├── search.js       # 검색 기능
│   └── theme.js        # 테마 토글
├── pages/              # 마크다운 게시글
└── .github/workflows/  # GitHub Actions
```

## 🔧 기술 스택

- HTML5, CSS3, Vanilla JavaScript
- marked.js (마크다운 파싱)
- Prism.js (코드 하이라이팅)
- Giscus (댓글 시스템)
- GitHub Actions (자동 배포)

## 📄 라이선스

MIT License
