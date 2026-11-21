import { useEffect, useState } from "react";

const KEY = "poster-card-theme";

// 처음 들어오면 기기 설정(다크/라이트)을 따르고, 한 번 바꾸면 그 선택을 기억한다
function initialTheme() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    // 저장소를 못 쓰는 환경이면 기기 설정만 따른다
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      // 무시
    }
  }, [theme]);

  const dark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-pressed={dark}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      <span aria-hidden="true">{dark ? "☀️" : "🌙"}</span>
      {dark ? "라이트 모드" : "다크 모드"}
    </button>
  );
}
