---
title: "GitHub Pages 블로그 첫 번째 게시글"
date: 2025-01-26
tags: ["JavaScript", "Web", "Blog", "GitHub Pages"]
category: "Development"
description: "GitHub Pages를 사용한 정적 블로그의 첫 번째 게시글입니다. 마크다운 문법과 다양한 기능들을 소개합니다."
---

# GitHub Pages 블로그 첫 번째 게시글

안녕하세요! DavidPARK0417의 블로그에 오신 것을 환영합니다. 이 블로그는 **GitHub Pages**를 사용하여 구축된 정적 블로그입니다.

## 🚀 주요 기능

이 블로그는 다음과 같은 기능들을 제공합니다:

- 📝 **마크다운 기반 게시글 작성**
- 🔍 **실시간 검색 기능**
- 🏷️ **태그 기반 필터링**
- 🌙 **다크/라이트 모드**
- 💬 **Giscus 댓글 시스템**
- 📱 **반응형 디자인**

## 💻 기술 스택

이 블로그는 다음과 같은 기술들로 구축되었습니다:

- **HTML5, CSS3, Vanilla JavaScript**
- **marked.js** (마크다운 파싱)
- **Prism.js** (코드 하이라이팅)
- **Giscus** (댓글 시스템)
- **GitHub Actions** (자동 배포)

## 📝 마크다운 문법 예시

### 제목

마크다운에서는 `#`을 사용하여 제목을 만들 수 있습니다.

### 텍스트 스타일

- **굵은 글씨**: `**굵은 글씨**`
- _기울임체_: `*기울임체*`
- ~~취소선~~: `~~취소선~~`
- `인라인 코드`: `` `인라인 코드` ``

### 목록

#### 순서 없는 목록

- 첫 번째 항목
- 두 번째 항목
  - 중첩된 항목
  - 또 다른 중첩된 항목

#### 순서 있는 목록

1. 첫 번째 항목
2. 두 번째 항목
3. 세 번째 항목

### 링크와 이미지

- [GitHub](https://github.com)
- [DavidPARK0417의 GitHub](https://github.com/DavidPARK0417)

### 인용문

> 이것은 인용문입니다.
>
> 여러 줄에 걸친 인용문도 가능합니다.

### 코드 블록

#### JavaScript 예시

```javascript
// 함수 정의
function greet(name) {
  console.log(`안녕하세요, ${name}님!`);
}

// 화살표 함수
const add = (a, b) => a + b;

// 클래스 정의
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `안녕하세요, 저는 ${this.name}입니다.`;
  }
}

// 사용 예시
const person = new Person("David");
console.log(person.greet());
```

#### CSS 예시

```css
/* CSS 변수 정의 */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

/* 클래스 선택자 */
.button {
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button:hover {
  background-color: #0056b3;
  transform: translateY(-1px);
}

/* 미디어 쿼리 */
@media (max-width: 768px) {
  .button {
    width: 100%;
    margin-bottom: 1rem;
  }
}
```

#### HTML 예시

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>예시 페이지</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <header>
      <h1>웹사이트 제목</h1>
      <nav>
        <ul>
          <li><a href="#home">홈</a></li>
          <li><a href="#about">소개</a></li>
          <li><a href="#contact">연락처</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section id="home">
        <h2>홈 섹션</h2>
        <p>환영합니다!</p>
      </section>
    </main>

    <footer>
      <p>&copy; 2025 DavidPARK0417. All rights reserved.</p>
    </footer>

    <script src="script.js"></script>
  </body>
</html>
```

### 표

| 기능      | 설명                  | 상태       |
| --------- | --------------------- | ---------- |
| 검색      | 실시간 게시글 검색    | ✅ 완료    |
| 태그 필터 | 태그별 게시글 필터링  | ✅ 완료    |
| 다크모드  | 다크/라이트 테마 전환 | ✅ 완료    |
| 댓글      | Giscus 댓글 시스템    | 🔄 진행 중 |

### 수평선

---

## 🎯 앞으로의 계획

앞으로 이 블로그에서는 다음과 같은 내용들을 다룰 예정입니다:

1. **웹 개발** 관련 글
2. **JavaScript** 팁과 트릭
3. **CSS** 스타일링 기법
4. **Git** 사용법
5. **개발 도구** 소개

## 💬 댓글

이 게시글에 대한 의견이나 질문이 있으시면 아래 댓글란에 남겨주세요!

---

_이 블로그는 GitHub Pages와 마크다운을 사용하여 구축되었습니다._
