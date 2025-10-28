/**
 * 테마 토글 기능
 * 다크/라이트 모드 전환 및 localStorage 저장
 */

class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("themeToggle");
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();

    this.init();
  }

  /**
   * 시스템 테마 감지
   */
  getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  /**
   * localStorage에서 저장된 테마 가져오기
   */
  getStoredTheme() {
    return localStorage.getItem("theme");
  }

  /**
   * 테마 저장
   */
  setStoredTheme(theme) {
    localStorage.setItem("theme", theme);
  }

  /**
   * 테마 적용
   */
  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    this.currentTheme = theme;
    this.setStoredTheme(theme);

    // 로그 출력
    console.log(`🎨 테마가 ${theme} 모드로 변경되었습니다.`);
  }

  /**
   * 테마 토글
   */
  toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light";
    this.applyTheme(newTheme);
  }

  /**
   * 테마 토글 버튼 이벤트 리스너
   */
  setupThemeToggle() {
    if (this.themeToggle) {
      this.themeToggle.addEventListener("click", () => {
        this.toggleTheme();
      });
    }
  }

  /**
   * 시스템 테마 변경 감지
   */
  setupSystemThemeListener() {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    mediaQuery.addEventListener("change", (e) => {
      // 저장된 테마가 없을 때만 시스템 테마 변경에 따라 업데이트
      if (!this.getStoredTheme()) {
        const newTheme = e.matches ? "dark" : "light";
        this.applyTheme(newTheme);
      }
    });
  }

  /**
   * 초기화
   */
  init() {
    // 초기 테마 적용
    this.applyTheme(this.currentTheme);

    // 이벤트 리스너 설정
    this.setupThemeToggle();
    this.setupSystemThemeListener();

    console.log("🎨 테마 매니저가 초기화되었습니다.");
  }
}

// DOM이 로드되면 테마 매니저 초기화
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();
});

// 전역에서 접근 가능하도록 export
window.ThemeManager = ThemeManager;
