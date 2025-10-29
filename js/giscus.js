/**
 * Giscus 댓글 시스템 관리
 * 다크/라이트 모드와 연동하여 테마 자동 전환
 */

class GiscusManager {
  constructor() {
    this.container = document.getElementById("giscus-container");
    this.giscusConfig = {
      repo: "DavidPARK0417/DavidPARK0417.github.io",
      repoId: "R_kgDOQKfvVQ",
      category: "Announcements", // General → Announcements로 변경
      categoryId: "DIC_kwDOQKfvVc4CxMbS",
      mapping: "pathname",
      strict: "0",
      reactionsEnabled: "1",
      emitMetadata: "0",
      inputPosition: "bottom",
      lang: "ko",
      crossorigin: "anonymous",
    };

    console.log("🔧 Giscus 설정:", this.giscusConfig);
    this.init();
  }

  /**
   * 현재 테마 가져오기
   */
  getCurrentTheme() {
    const dataTheme = document.documentElement.getAttribute("data-theme");
    console.log(`🎨 현재 테마: ${dataTheme}`);
    return dataTheme === "dark" ? "dark" : "light";
  }

  /**
   * Giscus 스크립트 로드
   */
  loadGiscus() {
    if (!this.container) {
      console.error("❌ Giscus 컨테이너를 찾을 수 없습니다.");
      return;
    }

    console.log("🔄 Giscus 로딩 시작...");

    // 기존 스크립트 제거 (테마 변경 시 재로드를 위해)
    const existingScript = this.container.querySelector("script");
    if (existingScript) {
      console.log("🗑️ 기존 Giscus 스크립트 제거");
      existingScript.remove();
    }

    // 기존 iframe 제거
    const existingFrame = this.container.querySelector("iframe.giscus-frame");
    if (existingFrame) {
      console.log("🗑️ 기존 Giscus iframe 제거");
      existingFrame.remove();
    }

    const theme = this.getCurrentTheme();
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", this.giscusConfig.repo);
    script.setAttribute("data-repo-id", this.giscusConfig.repoId);
    script.setAttribute("data-category", this.giscusConfig.category);
    script.setAttribute("data-category-id", this.giscusConfig.categoryId);
    script.setAttribute("data-mapping", this.giscusConfig.mapping);
    script.setAttribute("data-strict", this.giscusConfig.strict);
    script.setAttribute(
      "data-reactions-enabled",
      this.giscusConfig.reactionsEnabled
    );
    script.setAttribute("data-emit-metadata", this.giscusConfig.emitMetadata);
    script.setAttribute("data-input-position", this.giscusConfig.inputPosition);
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-lang", this.giscusConfig.lang);
    script.setAttribute("crossorigin", this.giscusConfig.crossorigin);
    script.async = true;

    // 스크립트 로드 성공/실패 이벤트 추가
    script.onload = () => {
      console.log("✅ Giscus 스크립트 로드 성공");
    };
    script.onerror = (error) => {
      console.error("❌ Giscus 스크립트 로드 실패:", error);
    };

    this.container.appendChild(script);

    console.log(`💬 Giscus 댓글 설정 완료 (테마: ${theme})`);
    console.log("📋 현재 페이지 경로 (mapping):", window.location.pathname);
  }

  /**
   * Giscus 테마 변경 (iframe 메시지 전송)
   */
  changeGiscusTheme(theme) {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (iframe) {
      const message = {
        setConfig: {
          theme: theme,
        },
      };
      iframe.contentWindow.postMessage(
        { giscus: message },
        "https://giscus.app"
      );
      console.log(`💬 Giscus 테마가 ${theme}로 변경되었습니다.`);
    }
  }

  /**
   * 테마 변경 감지 및 Giscus 테마 업데이트
   */
  setupThemeObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          const newTheme = this.getCurrentTheme();
          this.changeGiscusTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    console.log("👀 테마 변경 감지가 시작되었습니다.");
  }

  /**
   * Giscus iframe 로드 감지
   */
  observeGiscusIframe() {
    const observer = new MutationObserver((mutations) => {
      const iframe = document.querySelector("iframe.giscus-frame");
      if (iframe) {
        console.log("✅ Giscus iframe이 로드되었습니다!");
        console.log("📍 iframe src:", iframe.src);

        // iframe 로드 완료 감지
        iframe.addEventListener("load", () => {
          console.log("✅ Giscus iframe 로드 완료!");
        });

        observer.disconnect(); // iframe을 찾았으므로 관찰 중단
      }
    });

    observer.observe(this.container, {
      childList: true,
      subtree: true,
    });

    // 10초 후에도 iframe이 없으면 경고
    setTimeout(() => {
      const iframe = document.querySelector("iframe.giscus-frame");
      if (!iframe) {
        console.error("❌ Giscus iframe이 10초 안에 로드되지 않았습니다.");
        console.error("💡 확인사항:");
        console.error("  1. GitHub Discussion이 활성화되어 있나요?");
        console.error("  2. Giscus 앱이 저장소에 설치되어 있나요?");
        console.error("  3. 저장소가 Public인가요?");
        console.error("  4. Network 탭에서 giscus.app 관련 요청을 확인하세요");
      }
    }, 10000);
  }

  /**
   * 초기화
   */
  init() {
    // Giscus 로드
    this.loadGiscus();

    // iframe 로드 감지
    this.observeGiscusIframe();

    // 테마 변경 감지 설정
    this.setupThemeObserver();

    console.log("💬 Giscus 매니저가 초기화되었습니다.");
  }
}

// DOM이 로드되면 Giscus 매니저 초기화
document.addEventListener("DOMContentLoaded", () => {
  new GiscusManager();
});

// 전역에서 접근 가능하도록 export
window.GiscusManager = GiscusManager;
