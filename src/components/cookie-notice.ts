const STORAGE_KEY = 'nk6357-cookie-notice-v1';

function setHidden(banner: HTMLElement, hidden: boolean): void {
  banner.hidden = hidden;
  if (!hidden) banner.querySelector<HTMLElement>('button')?.focus();
}

export function initCookieNotice(): void {
  const banner = document.querySelector<HTMLElement>('[data-cookie-banner]');
  if (!banner) return;

  let acknowledged = false;
  try {
    acknowledged = localStorage.getItem(STORAGE_KEY) === 'acknowledged';
  } catch {
    // The notice remains visible when storage is unavailable.
  }
  banner.hidden = acknowledged;

  banner.querySelector('[data-cookie-accept]')?.addEventListener('click', () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'acknowledged');
    } catch {
      // Dismissing still works for the current page view.
    }
    setHidden(banner, true);
  });

  document.querySelectorAll('[data-cookie-open]').forEach((button) => {
    button.addEventListener('click', () => setHidden(banner, false));
  });
}
