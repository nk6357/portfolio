import './styles/main.css';
import { initCookieNotice } from './components/cookie-notice';

const fontFaceStyle = document.createElement('style');
fontFaceStyle.textContent = `@font-face {
  font-family: 'Lemon Milk Pro';
  src: url('${import.meta.env.BASE_URL}fonts/lemon-milk-pro-variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}`;
document.head.append(fontFaceStyle);

document.querySelectorAll<HTMLAnchorElement>('[data-current-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const canonical = document.createElement('link');
canonical.rel = 'canonical';
canonical.href = new URL(window.location.pathname, window.location.origin).href;
document.head.append(canonical);

initCookieNotice();
