# Я.МЕДИПАЛ — Корпоративный портал (Frontend)

Фронтенд корпоративного портала компании МЕДИПАЛ. React SPA с поддержкой интеграции в Microsoft Teams и standalone web-версии.

## Стек технологий

- **React 19** + **TypeScript** — UI framework
- **Vite** — сборка и dev-сервер
- **MUI (Material UI) v7** — UI-компоненты
- **SCSS Modules** — стилизация
- **React Router v7** — маршрутизация
- **TanStack Query v5** — серверное состояние и кэширование
- **Zustand** — глобальное UI-состояние
- **Axios** — HTTP-клиент
- **React Hook Form + Zod** — формы и валидация
- **Day.js** — работа с датами
- **MSAL React** — Azure AD аутентификация
- **Teams JS SDK** — интеграция с Microsoft Teams

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для продакшена
npm run build

# Проверка линтером
npm run lint

# Форматирование
npm run format
```

## Переменные окружения

Скопируйте `.env.example` в `.env` и заполните значения:

```bash
cp .env.example .env
```

| Переменная               | Описание                            |
| ------------------------ | ----------------------------------- |
| `VITE_API_BASE_URL`      | URL бэкенд API                      |
| `VITE_MSAL_CLIENT_ID`    | Azure AD App Registration Client ID |
| `VITE_MSAL_AUTHORITY`    | Azure AD Authority URL              |
| `VITE_MSAL_REDIRECT_URI` | Redirect URI после авторизации      |
| `VITE_API_SCOPE`         | Scope для доступа к API             |

## Структура проекта

```
src/
  app/              # Точка входа, провайдеры, роутинг, тема
  components/       # Общие переиспользуемые компоненты
    layout/         # Header, MainLayout, QuickLinks, Sidebar
    shared/         # SectionHeader, PagePlaceholder
    ui/             # Кастомные обёртки над MUI
  features/         # Feature-модули (news, team, live, ideas, etc.)
  hooks/            # Общие хуки
  lib/              # Утилиты (api, auth, teams, constants, logger)
  stores/           # Zustand stores
  styles/           # SCSS переменные, миксины, глобальные стили
  types/            # Глобальные TypeScript типы
```

## Скрипты

| Команда                | Описание                                |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Запуск dev-сервера (порт 3000)          |
| `npm run build`        | TypeScript проверка + production сборка |
| `npm run preview`      | Просмотр production сборки              |
| `npm run lint`         | Проверка ESLint                         |
| `npm run lint:fix`     | Автофикс ESLint                         |
| `npm run format`       | Форматирование Prettier                 |
| `npm run format:check` | Проверка форматирования                 |

## Деплой

Фронтенд деплоится на **Azure Static Web Apps** через GitHub Actions.

Бэкенд находится в отдельном репозитории `portal_Backend`.
