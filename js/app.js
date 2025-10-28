/**
 * 메인 애플리케이션 로직
 * 게시글 목록, 태그 필터링, 검색 통합
 */

class BlogApp {
  constructor() {
    this.posts = [];
    this.filteredPosts = [];
    this.currentTag = "all";
    this.searchManager = null;

    this.init();
  }

  /**
   * 초기화
   */
  async init() {
    console.log("🚀 블로그 앱이 시작됩니다...");

    try {
      await this.loadPosts();
      this.setupSearchManager();
      this.setupTagFilter();
      this.renderPosts();

      console.log("✅ 블로그 앱이 성공적으로 초기화되었습니다.");
    } catch (error) {
      console.error("❌ 블로그 앱 초기화 중 오류 발생:", error);
      this.showError("게시글을 불러오는 중 오류가 발생했습니다.");
    }
  }

  /**
   * 게시글 데이터 로드
   */
  async loadPosts() {
    try {
      console.log("📚 posts.json을 로드하는 중...");

      const response = await fetch("posts.json");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      this.posts = data.posts || [];
      this.filteredPosts = [...this.posts];

      console.log(`✅ ${this.posts.length}개의 게시글을 로드했습니다.`);
    } catch (error) {
      console.error("❌ 게시글 로드 실패:", error);

      // posts.json이 없을 때 예시 데이터 사용
      this.posts = this.getExamplePosts();
      this.filteredPosts = [...this.posts];

      console.log("📝 예시 게시글을 사용합니다.");
    }
  }

  /**
   * 예시 게시글 데이터
   */
  getExamplePosts() {
    return [
      {
        file: "example.md",
        title: "첫 번째 게시글",
        date: "2025-01-26",
        description: "GitHub Pages 블로그의 첫 번째 게시글입니다.",
        tags: ["JavaScript", "Web", "Blog"],
        category: "Development",
      },
      {
        file: "getting-started.md",
        title: "블로그 시작하기",
        date: "2025-01-25",
        description: "이 블로그를 사용하는 방법에 대해 알아봅시다.",
        tags: ["Guide", "Tutorial"],
        category: "Guide",
      },
    ];
  }

  /**
   * 검색 매니저 설정
   */
  setupSearchManager() {
    if (window.SearchManager) {
      this.searchManager = new SearchManager();
      this.searchManager.setPosts(this.posts);
    }
  }

  /**
   * 태그 필터 설정
   */
  setupTagFilter() {
    const tagContainer = document.getElementById("tagContainer");
    if (!tagContainer) return;

    // 모든 태그 수집
    const allTags = new Set();
    this.posts.forEach((post) => {
      if (post.tags) {
        post.tags.forEach((tag) => allTags.add(tag));
      }
    });

    // 태그 버튼 생성
    const tagButtons = Array.from(allTags)
      .map((tag) => `<button class="tag-btn" data-tag="${tag}">${tag}</button>`)
      .join("");

    tagContainer.innerHTML = `<button class="tag-btn active" data-tag="all">전체</button>${tagButtons}`;

    // 태그 클릭 이벤트
    tagContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("tag-btn")) {
        const tag = e.target.dataset.tag;
        this.filterByTag(tag);
        this.updateActiveTag(e.target);
      }
    });

    console.log(`🏷️ ${allTags.size}개의 태그 필터가 설정되었습니다.`);
  }

  /**
   * 태그별 필터링
   */
  filterByTag(tag) {
    console.log(`🏷️ 태그 필터링: ${tag}`);

    this.currentTag = tag;

    if (tag === "all") {
      this.filteredPosts = [...this.posts];
    } else {
      this.filteredPosts = this.posts.filter(
        (post) => post.tags && post.tags.includes(tag)
      );
    }

    this.renderPosts();
    console.log(
      `✅ ${this.filteredPosts.length}개의 게시글이 필터링되었습니다.`
    );
  }

  /**
   * 활성 태그 업데이트
   */
  updateActiveTag(clickedButton) {
    const tagContainer = document.getElementById("tagContainer");
    const allButtons = tagContainer.querySelectorAll(".tag-btn");

    allButtons.forEach((btn) => btn.classList.remove("active"));
    clickedButton.classList.add("active");
  }

  /**
   * 게시글 목록 렌더링
   */
  renderPosts() {
    const postsContainer = document.getElementById("postsContainer");
    if (!postsContainer) return;

    if (this.filteredPosts.length === 0) {
      postsContainer.innerHTML = `
        <div class="no-posts">
          <h3>게시글이 없습니다</h3>
          <p>선택한 태그에 해당하는 게시글이 없습니다.</p>
        </div>
      `;
      return;
    }

    postsContainer.innerHTML = this.filteredPosts
      .map((post) => this.renderPostCard(post))
      .join("");
  }

  /**
   * 게시글 카드 렌더링
   */
  renderPostCard(post) {
    return `
      <div class="post-card" onclick="window.location.href='post.html?file=${
        post.file
      }'">
        <h3 class="post-card-title">${post.title}</h3>
        <div class="post-card-meta">
          <span class="post-card-date">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            ${this.formatDate(post.date)}
          </span>
          ${
            post.category
              ? `<span class="post-card-category">${post.category}</span>`
              : ""
          }
        </div>
        ${
          post.description
            ? `<p class="post-card-description">${post.description}</p>`
            : ""
        }
        ${
          post.tags
            ? `
          <div class="post-card-tags">
            ${post.tags
              .map((tag) => `<span class="post-card-tag">${tag}</span>`)
              .join("")}
          </div>
        `
            : ""
        }
      </div>
    `;
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
    const postsContainer = document.getElementById("postsContainer");
    if (postsContainer) {
      postsContainer.innerHTML = `
        <div class="error">
          <h3>오류가 발생했습니다</h3>
          <p>${message}</p>
          <button onclick="location.reload()" class="retry-btn">다시 시도</button>
        </div>
      `;
    }
  }
}

// DOM이 로드되면 블로그 앱 시작
document.addEventListener("DOMContentLoaded", () => {
  new BlogApp();
});

// 전역에서 접근 가능하도록 export
window.BlogApp = BlogApp;
