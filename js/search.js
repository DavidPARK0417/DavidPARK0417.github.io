/**
 * 검색 기능
 * 클라이언트 사이드 실시간 검색
 */

class SearchManager {
  constructor() {
    this.searchInput = document.getElementById("searchInput");
    this.searchBtn = document.getElementById("searchBtn");
    this.searchResults = document.getElementById("searchResults");
    this.searchResultsList = document.getElementById("searchResultsList");
    this.postsContainer = document.getElementById("postsContainer");
    this.posts = [];
    this.filteredPosts = [];

    this.init();
  }

  /**
   * 초기화
   */
  init() {
    this.setupEventListeners();
    console.log("🔍 검색 매니저가 초기화되었습니다.");
  }

  /**
   * 이벤트 리스너 설정
   */
  setupEventListeners() {
    if (this.searchInput) {
      // 실시간 검색
      this.searchInput.addEventListener("input", (e) => {
        this.handleSearch(e.target.value);
      });

      // 엔터키 검색
      this.searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.handleSearch(e.target.value);
        }
      });
    }

    if (this.searchBtn) {
      this.searchBtn.addEventListener("click", () => {
        this.handleSearch(this.searchInput.value);
      });
    }
  }

  /**
   * 게시글 데이터 설정
   */
  setPosts(posts) {
    this.posts = posts;
    this.filteredPosts = [...posts];
    console.log(
      `📚 ${posts.length}개의 게시글이 검색 대상으로 설정되었습니다.`
    );
  }

  /**
   * 검색 실행
   */
  handleSearch(query) {
    const trimmedQuery = query.trim();

    if (trimmedQuery === "") {
      this.clearSearch();
      return;
    }

    console.log(`🔍 검색 쿼리: "${trimmedQuery}"`);

    const results = this.searchPosts(trimmedQuery);
    this.displaySearchResults(results, trimmedQuery);
  }

  /**
   * 게시글 검색
   */
  searchPosts(query) {
    const lowerQuery = query.toLowerCase();

    return this.posts.filter((post) => {
      // 제목 검색
      const titleMatch = post.title.toLowerCase().includes(lowerQuery);

      // 설명 검색
      const descriptionMatch =
        post.description && post.description.toLowerCase().includes(lowerQuery);

      // 태그 검색
      const tagsMatch =
        post.tags &&
        post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery));

      // 카테고리 검색
      const categoryMatch =
        post.category && post.category.toLowerCase().includes(lowerQuery);

      return titleMatch || descriptionMatch || tagsMatch || categoryMatch;
    });
  }

  /**
   * 검색 결과 표시
   */
  displaySearchResults(results, query) {
    if (results.length === 0) {
      this.showNoResults(query);
      return;
    }

    console.log(`✅ 검색 결과: ${results.length}개 발견`);

    // 검색 결과 섹션 표시
    this.searchResults.style.display = "block";
    this.postsContainer.style.display = "none";

    // 검색 결과 렌더링
    this.searchResultsList.innerHTML = this.renderSearchResults(results, query);
  }

  /**
   * 검색 결과 HTML 생성
   */
  renderSearchResults(results, query) {
    return results
      .map(
        (post) => `
      <div class="post-card" onclick="window.location.href='post.html?file=${
        post.file
      }'">
        <h3 class="post-card-title">${this.highlightText(
          post.title,
          query
        )}</h3>
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
            ? `<p class="post-card-description">${this.highlightText(
                post.description,
                query
              )}</p>`
            : ""
        }
        ${
          post.tags
            ? `
          <div class="post-card-tags">
            ${post.tags
              .map(
                (tag) =>
                  `<span class="post-card-tag">${this.highlightText(
                    tag,
                    query
                  )}</span>`
              )
              .join("")}
          </div>
        `
            : ""
        }
      </div>
    `
      )
      .join("");
  }

  /**
   * 검색어 하이라이트
   */
  highlightText(text, query) {
    if (!query) return text;

    const regex = new RegExp(`(${this.escapeRegExp(query)})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  }

  /**
   * 정규식 특수문자 이스케이프
   */
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /**
   * 결과 없음 표시
   */
  showNoResults(query) {
    this.searchResults.style.display = "block";
    this.postsContainer.style.display = "none";

    this.searchResultsList.innerHTML = `
      <div class="no-results">
        <h3>검색 결과가 없습니다</h3>
        <p>"${query}"에 대한 검색 결과를 찾을 수 없습니다.</p>
        <p>다른 키워드로 검색해보세요.</p>
      </div>
    `;

    console.log(`❌ 검색 결과 없음: "${query}"`);
  }

  /**
   * 검색 초기화
   */
  clearSearch() {
    this.searchResults.style.display = "none";
    this.postsContainer.style.display = "block";
    this.searchInput.value = "";

    console.log("🔄 검색이 초기화되었습니다.");
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
}

// 전역에서 접근 가능하도록 export
window.SearchManager = SearchManager;
