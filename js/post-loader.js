/**
 * 게시글 로더
 * 마크다운 파일 로드, 파싱, Giscus 댓글 통합
 */

class PostLoader {
  constructor() {
    this.postContent = document.getElementById("postContent");
    this.pageTitle = document.getElementById("pageTitle");
    this.pageDescription = document.getElementById("pageDescription");
    this.giscusContainer = document.getElementById("giscus-container");

    this.init();
  }

  /**
   * 초기화
   */
  async init() {
    console.log("📖 게시글 로더가 시작됩니다...");

    try {
      const fileName = this.getFileNameFromURL();
      if (!fileName) {
        this.showError("게시글 파일명을 찾을 수 없습니다.");
        return;
      }

      console.log(`📄 게시글 로드 중: ${fileName}`);

      const postData = await this.loadPost(fileName);
      this.renderPost(postData);
      this.updatePageMeta(postData);
      this.loadGiscus();

      console.log("✅ 게시글이 성공적으로 로드되었습니다.");
    } catch (error) {
      console.error("❌ 게시글 로드 실패:", error);
      this.showError("게시글을 불러오는 중 오류가 발생했습니다.");
    }
  }

  /**
   * URL에서 파일명 추출
   */
  getFileNameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("file");
  }

  /**
   * 게시글 로드
   */
  async loadPost(fileName) {
    try {
      console.log(`📚 마크다운 파일 로드 중: pages/${fileName}`);

      const response = await fetch(`pages/${fileName}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const markdown = await response.text();
      console.log("✅ 마크다운 파일 로드 완료");

      return this.parseMarkdown(markdown);
    } catch (error) {
      console.error("❌ 마크다운 파일 로드 실패:", error);
      throw error;
    }
  }

  /**
   * 마크다운 파싱
   */
  parseMarkdown(markdown) {
    console.log("🔍 Front Matter 파싱 중...");

    // Front Matter 추출
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdown.match(frontMatterRegex);

    let frontMatter = {};
    let content = markdown;

    if (match) {
      const frontMatterText = match[1];
      content = match[2];

      // YAML 파싱 (간단한 버전)
      frontMatter = this.parseYAML(frontMatterText);
      console.log("✅ Front Matter 파싱 완료:", frontMatter);
    }

    // 마크다운을 HTML로 변환
    console.log("🔄 마크다운을 HTML로 변환 중...");
    const html = marked.parse(content);
    console.log("✅ HTML 변환 완료");

    return {
      ...frontMatter,
      content: html,
    };
  }

  /**
   * 간단한 YAML 파싱
   */
  parseYAML(yamlText) {
    const result = {};
    const lines = yamlText.split("\n");

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith("#")) continue;

      const colonIndex = trimmedLine.indexOf(":");
      if (colonIndex === -1) continue;

      const key = trimmedLine.substring(0, colonIndex).trim();
      let value = trimmedLine.substring(colonIndex + 1).trim();

      // 따옴표 제거
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      // 배열 파싱
      if (value.startsWith("[") && value.endsWith("]")) {
        const arrayContent = value.slice(1, -1);
        result[key] = arrayContent
          .split(",")
          .map((item) => item.trim().replace(/^['"]|['"]$/g, ""));
      } else {
        result[key] = value;
      }
    }

    return result;
  }

  /**
   * 게시글 렌더링
   */
  renderPost(postData) {
    if (!this.postContent) return;

    const { title, date, tags, category, content } = postData;

    const postHTML = `
      <header class="post-header">
        <h1 class="post-title">${title || "제목 없음"}</h1>
        <div class="post-meta">
          ${
            date
              ? `
            <span class="post-date">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              ${this.formatDate(date)}
            </span>
          `
              : ""
          }
          ${category ? `<span class="post-category">${category}</span>` : ""}
        </div>
        ${
          tags
            ? `
          <div class="post-tags">
            ${tags
              .map((tag) => `<span class="post-tag">${tag}</span>`)
              .join("")}
          </div>
        `
            : ""
        }
      </header>
      <div class="post-body">
        ${content}
      </div>
    `;

    this.postContent.innerHTML = postHTML;

    // 코드 하이라이팅 적용
    this.highlightCode();

    console.log("✅ 게시글 렌더링 완료");
  }

  /**
   * 코드 하이라이팅 적용
   */
  highlightCode() {
    if (window.Prism) {
      console.log("🎨 코드 하이라이팅 적용 중...");
      Prism.highlightAll();
      console.log("✅ 코드 하이라이팅 완료");
    }
  }

  /**
   * 페이지 메타데이터 업데이트
   */
  updatePageMeta(postData) {
    const { title, description } = postData;

    if (title && this.pageTitle) {
      this.pageTitle.textContent = `${title} - DavidPARK0417의 블로그`;
    }

    if (description && this.pageDescription) {
      this.pageDescription.setAttribute("content", description);
    }

    console.log("✅ 페이지 메타데이터 업데이트 완료");
  }

  /**
   * Giscus 댓글 로드
   */
  loadGiscus() {
    if (!this.giscusContainer) {
      console.log("⚠️ Giscus 컨테이너를 찾을 수 없습니다.");
      return;
    }

    console.log("💬 Giscus 댓글 시스템 로드 중...");

    // 기존 Giscus 스크립트 제거
    const existingScript = document.querySelector('script[src*="giscus"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Giscus 스크립트 생성
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "DavidPARK0417/DavidPARK0417.github.io");
    script.setAttribute("data-repo-id", "YOUR_REPO_ID"); // 실제 값으로 교체 필요
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "YOUR_CATEGORY_ID"); // 실제 값으로 교체 필요
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "1");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "ko");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;

    this.giscusContainer.appendChild(script);

    console.log("✅ Giscus 댓글 시스템 로드 완료");
  }

  /**
   * 날짜 포맷팅
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  /**
   * 오류 메시지 표시
   */
  showError(message) {
    if (this.postContent) {
      this.postContent.innerHTML = `
        <div class="error">
          <h2>오류가 발생했습니다</h2>
          <p>${message}</p>
          <button onclick="window.location.href='/'" class="retry-btn">홈으로 돌아가기</button>
        </div>
      `;
    }
  }
}

// DOM이 로드되면 게시글 로더 시작
document.addEventListener("DOMContentLoaded", () => {
  new PostLoader();
});

// 전역에서 접근 가능하도록 export
window.PostLoader = PostLoader;
