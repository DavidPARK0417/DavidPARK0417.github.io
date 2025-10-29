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
      category: "General",
      categoryId: "DIC_kwDOQKfvVc4CxMbS",
      // 각 포스트가 querystring(예: ?slug=)으로 구분되므로 pathname 대신 url 매핑 사용
      mapping: "url",
      strict: "0",
      reactionsEnabled: "1",
      emitMetadata: "1",
      inputPosition: "bottom",
      lang: "ko",
      crossorigin: "anonymous",
    };

    console.log("🔧 Giscus 설정:", this.giscusConfig);
    this.loggingAttached = false;
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
    console.log("🔗 현재 페이지 URL (매핑 기준):", window.location.href);
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
   * giscus 메시지 이벤트 로깅 및 에러 안내 표시
   */
  attachGiscusEventLogging() {
    if (this.loggingAttached) return;

    window.addEventListener("message", (event) => {
      if (event.origin !== "https://giscus.app") return;
      const payload = event.data && event.data.giscus;
      if (!payload) return;

      console.log("📨 giscus 메시지:", payload);

      // 에러 처리
      if (payload.error) {
        console.error("❌ Giscus 에러:", payload.error);
        const message =
          typeof payload.error === "string"
            ? payload.error
            : payload.error.message || "Unknown error";
        // 화면 경고는 표시하지 않고 콘솔 로그만 유지
      }

      // Discussion 생성/탐색 관련 힌트
      if (payload.discussion) {
        console.log("🧵 연결된 Discussion:", payload.discussion);
      }
      if (payload.resize && payload.resize.height) {
        console.log("📏 giscus 높이 변경:", payload.resize.height);
      }
    });

    this.loggingAttached = true;
    console.log("🛰️ giscus 이벤트 로깅이 활성화되었습니다.");
  }

  /**
   * 에러 배너 표시
   */
  showGiscusWarning(mainText, checklist) {
    if (!this.container) return;

    // 기존 경고 제거
    const prev = this.container.querySelector(".giscus-warning");
    if (prev) prev.remove();

    const wrapper = document.createElement("div");
    wrapper.className = "giscus-warning";
    wrapper.setAttribute(
      "style",
      "border:1px solid #f0a500;padding:12px;border-radius:8px;background:#fff7e6;color:#663c00;margin-bottom:12px;font-size:14px;"
    );

    const title = document.createElement("div");
    title.textContent = mainText;
    title.style.fontWeight = "600";
    title.style.marginBottom = "6px";
    wrapper.appendChild(title);

    if (Array.isArray(checklist) && checklist.length) {
      const ul = document.createElement("ul");
      ul.setAttribute("style", "margin:0;padding-left:18px");
      checklist.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      });
      wrapper.appendChild(ul);
    }

    this.container.prepend(wrapper);
  }

  /**
   * 초기화
   */
  init() {
    // 기존 경고 배너가 있다면 제거
    const prev =
      this.container && this.container.querySelector(".giscus-warning");
    if (prev) prev.remove();

    // Giscus 로드
    this.loadGiscus();

    // iframe 로드 감지
    this.observeGiscusIframe();

    // 이벤트 로깅 활성화
    this.attachGiscusEventLogging();

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
