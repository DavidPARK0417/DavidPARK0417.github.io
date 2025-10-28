---
title: "블로그 시작하기 - 사용 가이드"
date: 2025-01-25
tags: ["Guide", "Tutorial", "Blog"]
category: "Guide"
description: "이 블로그를 사용하는 방법과 게시글 작성 방법에 대한 상세한 가이드입니다."
---

# 블로그 시작하기 - 사용 가이드

이 가이드에서는 GitHub Pages 블로그를 사용하는 방법과 게시글을 작성하는 방법에 대해 알아보겠습니다.

## 📋 목차

1. [블로그 소개](#블로그-소개)
2. [게시글 작성 방법](#게시글-작성-방법)
3. [마크다운 문법](#마크다운-문법)
4. [로컬 테스트](#로컬-테스트)
5. [배포 과정](#배포-과정)
6. [문제 해결](#문제-해결)

## 블로그 소개

이 블로그는 다음과 같은 특징을 가지고 있습니다:

### ✨ 주요 기능

- **정적 사이트**: GitHub Pages를 사용한 빠른 로딩
- **마크다운 지원**: 간편한 게시글 작성
- **검색 기능**: 실시간 게시글 검색
- **태그 시스템**: 카테고리별 게시글 분류
- **다크모드**: 사용자 선호에 따른 테마 전환
- **댓글 시스템**: Giscus를 통한 댓글 기능
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원

### 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **마크다운**: marked.js
- **코드 하이라이팅**: Prism.js
- **댓글**: Giscus
- **배포**: GitHub Actions + GitHub Pages

## 게시글 작성 방법

### 1. 파일 생성

`pages/` 폴더에 새로운 `.md` 파일을 생성합니다.

```bash
# 예시
pages/my-new-post.md
```

### 2. Front Matter 작성

파일 상단에 메타데이터를 작성합니다.

```markdown
---
title: "게시글 제목"
date: 2025-01-26
tags: ["JavaScript", "Web"]
category: "Development"
description: "게시글에 대한 간단한 설명"
---

# 게시글 내용
```

### 3. 게시글 내용 작성

마크다운 문법을 사용하여 내용을 작성합니다.

### 4. 커밋 및 푸시

```bash
git add pages/my-new-post.md
git commit -m "feat: 새 게시글 추가"
git push origin main
```

## 마크다운 문법

### 기본 문법

````markdown
# 제목 1

## 제목 2

### 제목 3

**굵은 글씨**
_기울임체_
`코드`

- 목록 항목 1
- 목록 항목 2

1. 순서 있는 목록 1
2. 순서 있는 목록 2

[링크](https://example.com)
![이미지](image.jpg)

> 인용문

```코드 블록
console.log('Hello, World!');
```
````

### 고급 문법

```markdown
| 표  | 헤더 |
| --- | ---- |
| 셀  | 셀   |

---

[링크 참조][1]

[1]: https://example.com

<details>
<summary>접을 수 있는 내용</summary>

숨겨진 내용입니다.

</details>
```

## 로컬 테스트

### 방법 1: Python HTTP 서버

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### 방법 2: Node.js HTTP 서버

```bash
# http-server 설치
npm install -g http-server

# 서버 실행
http-server
```

### 방법 3: VS Code Live Server

1. VS Code에서 Live Server 확장 설치
2. `index.html` 우클릭
3. "Open with Live Server" 선택

### 접속

브라우저에서 `http://localhost:8000` 접속

## 배포 과정

### 1. GitHub 저장소 생성

1. GitHub에서 새 저장소 생성
2. 저장소 이름: `{username}.github.io`
3. Public으로 설정

### 2. 코드 업로드

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/{username}/{username}.github.io.git
git push -u origin main
```

### 3. GitHub Pages 설정

1. 저장소 Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: / (root)

### 4. 자동 배포 확인

- GitHub Actions 탭에서 워크플로우 실행 확인
- `posts.json` 파일 자동 생성 확인
- `https://{username}.github.io` 접속 테스트

## 문제 해결

### 자주 발생하는 문제

#### 1. 게시글이 표시되지 않음

**원인**: `posts.json` 파일이 생성되지 않음

**해결방법**:

- GitHub Actions 워크플로우 실행 확인
- `pages/` 폴더에 `.md` 파일이 있는지 확인
- Front Matter 형식이 올바른지 확인

#### 2. 댓글이 표시되지 않음

**원인**: Giscus 설정이 완료되지 않음

**해결방법**:

1. GitHub Discussions 활성화
2. Giscus 앱 설치
3. `js/post-loader.js`에서 설정값 업데이트

#### 3. 다크모드가 작동하지 않음

**원인**: JavaScript 오류 또는 CSS 변수 문제

**해결방법**:

- 브라우저 개발자 도구에서 오류 확인
- `js/theme.js` 파일 로드 확인

#### 4. 검색이 작동하지 않음

**원인**: `posts.json` 파일 로드 실패

**해결방법**:

- 네트워크 탭에서 `posts.json` 요청 확인
- 파일 경로가 올바른지 확인

### 디버깅 팁

1. **브라우저 개발자 도구** 사용

   - Console 탭에서 JavaScript 오류 확인
   - Network 탭에서 파일 로드 상태 확인

2. **로컬 테스트** 먼저 실행

   - 로컬에서 정상 작동 확인 후 배포

3. **GitHub Actions 로그** 확인
   - Actions 탭에서 워크플로우 실행 로그 확인

## 📞 지원

문제가 지속되면 다음 방법으로 도움을 요청하세요:

- **GitHub Issues**: 저장소의 Issues 탭 사용
- **이메일**: [이메일 주소]
- **댓글**: 해당 게시글에 댓글 남기기

---

_이 가이드가 도움이 되었다면 댓글로 알려주세요!_
