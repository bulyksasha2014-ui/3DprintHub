# 3D Print Hub

Платформа для управління 3D-друком, замовленнями, проєктуванням, виробництвом та відстеженням статусів у реальному часі.

## Опис проєкту

3D Print Hub — це монорепозиторій для створення повноцінної SaaS-платформи, яка поєднує:

- каталог 3D-моделей;
- оформлення замовлення;
- розрахунок вартості друку;
- проєктування CAD-моделей;
- відстеження виробництва;
- панель оператора/адміністратора;
- Telegram-бота для сповіщень;
- інтеграції з Excel та принтерами;
- фінансову аналітику та аудит.

Мета проєкту — зробити зручну платформу для клієнтів, конструкторів, операторів і менеджерів, схожу за ергономікою на сервіси доставки, але для 3D-виробництва.

## Архітектура

```text
3d-print-hub/
├── apps/
│   ├── web/                  # React + Vite frontend
│   ├── api/                  # FastAPI backend
│   └── telegram-bot/        # Telegram bot (aiogram)
├── packages/
│   └── shared-types/         # Спільні типи та DTO
├── infrastructure/
│   └── docker/               # Docker конфігурації
├── docs/                     # Документація, ADR, схеми
├── scripts/                  # Скрипти для запуску, міграцій та seed
├── tests/                    # Інтеграційні та e2e тести
├── docker-compose.yml        # Локальний Docker стек
├── .env.example              # Приклад змінних середовища
├── README.md                 # Цей файл
└── .gitignore
```

### Доменна структура backend

```text
apps/api/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── catalog/
│   │   ├── orders/
│   │   ├── design_tasks/
│   │   ├── production/
│   │   ├── printers/
│   │   ├── materials/
│   │   ├── pricing/
│   │   ├── tracking/
│   │   ├── notifications/
│   │   ├── integrations/
│   │   └── analytics/
│   ├── core/
│   ├── db/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   └── main.py
```

## Технологічний стек

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack Query
- Zustand
- React Three Fiber / Three.js
- Lucide Icons

### Backend

- Python 3.12+
- FastAPI
- SQLAlchemy 2
- PostgreSQL
- Alembic
- Pydantic
- Redis
- WebSocket
- Celery / background tasks (за потреби)

### Інтеграції

- Telegram Bot API + aiogram
- OpenPyXL для Excel
- OctoPrint / Moonraker (через адаптери)
- MakerWorld каталог через дозволені інтерфейси
- Email provider
- Платіжний провайдер через адаптер

### Infrastructure

- Docker Compose
- GitHub
- Локальний запуск на Windows
- Підготовка до VPS

## Бізнес-функціональність

### Клієнтська частина

- перегляд каталогу моделей;
- пошук і фільтрація моделей;
- завантаження власного STL/OBJ/3MF;
- розрахунок вартості друку;
- оформлення замовлення;
- особистий кабінет;
- відстеження замовлення за токеном/номером;
- історія статусів і подій.

### Проєктування

- створення технічного завдання;
- робота з кресленнями та фото;
- підготовка CAD-версій;
- історія правок і ревізій;
- погодження з клієнтом;
- передача у виробництво.

### Виробництво

- Kanban-дошка замовлень;
- черга друку;
- стан принтерів;
- призначення відповідальних;
- контроль якості;
- post-processing та упаковка;
- фінансовий облік витрат.

### Адміністрування

- ролі та права (RBAC);
- керування користувачами;
- управління каталоги моделей;
- налаштування матеріалів і тарифів;
- аудиторський журнал;
- аналітика та звіти.

## Основні сутності даних

- User
- Role
- Customer
- Model
- ModelFile
- ModelVersion
- DesignTask
- DesignRevision
- Order
- OrderItem
- OrderStatusEvent
- ProductionTask
- Printer
- PrinterTelemetry
- Material
- InventoryTransaction
- PrintJob
- QualityCheck
- PricingEstimate
- Payment
- Notification
- TelegramAccount
- IntegrationEvent
- AuditLog

## Ролі

- Клієнт
- Конструктор
- Оператор
- Технолог
- Адміністратор
- Власник

## Розробка за етапами

### Етап 1 — фундамент

- створення структури монорепозиторію;
- фронтенд на React;
- backend на FastAPI;
- база даних PostgreSQL;
- Docker Compose;
- міграції Alembic;
- авторизація;
- базові UI-компоненти.

### Етап 2 — клієнтська частина

- головна сторінка;
- каталог моделей;
- сторінка моделі;
- завантаження файлів;
- оформлення замовлення;
- особистий кабінет.

### Етап 3 — проєктування

- технічні завдання;
- робоче місце конструктора;
- перегляд 3D-моделей;
- версії моделей;
- узгодження та правки.

### Етап 4 — виробництво

- панель оператора;
- список принтерів;
- черга виробництва;
- статуси задач;
- контроль якості.

### Етап 5 — відстеження

- історія подій;
- WebSocket;
- шкала виробництва;
- сторінка відстеження;
- сповіщення.

### Етап 6 — інтеграції

- Excel;
- Telegram;
- каталог MakerWorld;
- адаптери принтерів.

### Етап 7 — завершення

- калькулятор вартості;
- аналітика;
- тести;
- документація;
- підготовка до розгортання.

## Вимоги до локального запуску

### Необхідні інструменти

- Git
- Python 3.12+
- Node.js 20+
- npm або pnpm
- Docker Desktop
- PostgreSQL (або запуск через Docker)

## Швидкий старт

### 1. Клонувати репозиторій

```powershell
git clone https://github.com/your-org/3d-print-hub.git
cd 3d-print-hub
```

### 2. Скопіювати змінні середовища

```powershell
copy .env.example .env
```

### 3. Запустити інфраструктуру

```powershell
docker compose up -d
```

### 4. Запустити backend

```powershell
cd apps/api
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

### 5. Запустити frontend

```powershell
cd apps/web
npm install
npm run dev
```

### 6. Запустити Telegram-бота

```powershell
cd apps/telegram-bot
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python main.py
```

## Основні команди

### Frontend

```powershell
cd apps/web
npm install
npm run dev
npm run build
npm run preview
```

### Backend

```powershell
cd apps/api
vpython -m venv .ven
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
alembic revision --autogenerate -m "message"
alembic upgrade head
```

### Docker

```powershell
docker compose up --build
docker compose down
```

## Конфігурація середовища

Файл `.env.example` містить шаблон змінних для:

- DATABASE_URL
- SECRET_KEY
- JWT settings
- Redis URL
- Telegram bot token
- Email credentials
- payment provider keys
- storage paths

Ніколи не зберігайте реальні секрети у репозиторії.

## Тести

Планується запускати:

- unit-тести для сервісів;
- integration-тести для API;
- e2e тестування UI;
- перевірки моделей даних;
- тести для вартості та статусів замовлень.

Приклад команд:

```powershell
pytest
npm run test
```

## Розробницький стандарт

- чистий і типізований код;
- модульність по доменах;
- обмеження відповідальності;
- відсутність заглушок там, де потрібна реальна логіка;
- валідація даних на сервері;
- захист API та RBAC;
- документація для нових модулів.

## Поточний статус

Репозиторій знаходиться на стадії початкового налаштування та реалізації фундаменту проєкту. У плані:

- створити структуру монорепозиторію;
- налаштувати frontend/backend;
- розробити демонстраційний каталог;
- реалізувати оформлення замовлення;
- зберегти замовлення в базі даних;
- створити сторінку відстеження;
- додати початкову адміністративну панель.

## Ліцензія

Проєкт розробляється як внутрішній/комерційний продукт. Деталі ліцензії будуть уточнені в окремому файлі або у документації проекту.

## Контакти

Для питань щодо архітектури, розробки, запуску або продуктового бачення звертайтеся до команди проєкту через GitHub або внутрішні канали комунікації.
