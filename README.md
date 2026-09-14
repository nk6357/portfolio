# nk6357 — портфолио

Готовое статическое портфолио на Vite, TypeScript и Tailwind CSS. Проекты управляются текстовыми файлами в `/projects`: после push GitHub Actions автоматически генерирует данные, собирает сайт и публикует его на GitHub Pages.

## Технологии

- семантический HTML5;
- строгий TypeScript без frontend-фреймворка;
- Tailwind CSS и небольшая система CSS-переменных;
- Vite с multi-page build;
- Node.js build-time генератор;
- официальный GitHub Pages Actions workflow.

## Локальный запуск

Требуется Node.js 22 или новее.

```bash
npm install
npm run dev
```

Для production-сборки:

```bash
npm run build
npm run preview
```

`npm run build` автоматически запускает `prebuild`, поэтому отдельно вызывать генератор не требуется. Результат находится в `dist/`.

## Управление проектами

Для проекта №15 создайте:

```text
projects/nazv15.txt  — название, обязательно
projects/link15.txt  — HTTPS-ссылка, обязательно
projects/opis15.txt  — описание, необязательно
```

Описание может быть многострочным и отображается как обычный безопасный текст, не как HTML. Проект без `opis15.txt` будет показан без пустого блока. ID сортируются численно по убыванию: 100, 25, 10, 2, 1.

Чтобы изменить проект, отредактируйте его txt-файлы. Чтобы удалить — удалите все файлы с соответствующим ID. Сиротские или неполные записи пропускаются с понятным build warning, не ломая остальные проекты. Исходные файлы в `/projects` генератор никогда не изменяет.

```bash
git add .
git commit -m "Add project 15"
git push
```

Подробная короткая памятка есть в `projects/README.md`.

## GitHub Pages

1. Создайте GitHub-репозиторий и загрузите проект в ветку `main`.
2. Откройте **Settings → Pages**.
3. В **Build and deployment → Source** выберите **GitHub Actions**.
4. Сделайте push или вручную запустите workflow **Deploy portfolio to GitHub Pages** во вкладке Actions.

Workflow использует стандартный `GITHUB_TOKEN`; PAT и секреты не нужны. `actions/configure-pages` передаёт корректный base path, поэтому сайт работает и на `username.github.io`, и на `username.github.io/repository/`.

При локальной проверке project-site base можно задать так:

```powershell
$env:VITE_BASE_PATH='/repository/'
npm run build
```

## Изменение контента

- Telegram: замените два вхождения `https://t.me/nk6357` в `index.html` и по одному в HTML юридических страниц.
- Учебное заведение и программа: блок `.education` в `index.html`.
- Цвета: переменные в начале `src/styles/main.css`.
- Юридические тексты: `privacy/index.html`, `cookies/index.html`, `legal/index.html`.

Перед публикацией замените заметные placeholders `[ФИО владельца сайта]` и `[контактный email]` в privacy/legal страницах. Тексты являются базовыми информационными шаблонами, а не гарантией соответствия законодательству любой страны.

## Lemon Milk Pro

Lemon Milk Pro — premium retail font Marsnev и распространяется по отдельной лицензии. Поэтому шрифт не включён в репозиторий. Инфраструктура `@font-face` уже готова и учитывает GitHub Pages base path; инструкция находится в `public/fonts/README.md`. До добавления лицензированного WOFF2 используется близкий системный fallback.

## Логотип НИУ ВШЭ

В репозитории оставлен честный placeholder, поскольку правила публичного перераспространения конкретного asset не были подтверждены. Получите разрешённый официальный файл, назовите его `hse-logo.svg` и положите в `public/images/`. Полная инструкция и ссылка на брендбук находятся в `public/images/README.md`.

## SEO и домен

Title, description, Open Graph, Twitter metadata, favicon и `robots.txt` настроены. Canonical URL корректируется на фактический адрес страницы в браузере. После получения постоянного адреса добавьте абсолютную строку `Sitemap:` в `public/robots.txt`; при желании также создайте `public/sitemap.xml` с этим адресом.

## Privacy

Сайт не подключает аналитику, рекламу, сторонние шрифты или трекеры. Cookie-banner сохраняет только локальную отметку о закрытии в `localStorage`. Её назначение описано на странице cookies; уведомление можно снова открыть из footer.
