# Интернет-магазин на React + Node.js + MongoDB

## 📦 Описание проекта

Это веб-приложение — прототип интернет-магазина, реализованный в рамках дипломной работы. Система позволяет:

- просматривать каталог товаров,
- регистрироваться и входить в систему,
- добавлять товары в корзину и оформлять заказы,
- различать роли пользователей (обычный пользователь и администратор),
- просматривать историю заказов,
- управлять товарами через API (для администратора),
- работать с базой данных и кэшем.

Технологии: **React**, **Tailwind CSS**, **Node.js**, **Express**, **MongoDB**, **Redis**, **Docker Compose**.

---

## 🚀 Как запустить

Требуется установленный **Docker** и **Docker Compose**.

1. **Клонируйте репозиторий**:

```bash
git clone https://github.com/ram3es92/diplom_test.git
cd diplom_test
```
2. Запустите всё приложение:
```
docker compose up --build
```
3. Заполните базу данных товарами
```
   3.1 Откройте терминал (второе окно)

   3.2 cd ecommerce-backend         #зайдите в папку с исходным кодом серверной части

   3.3 docker compose run --rm backend npm run seed    # наполните базу товаров командой
```
Будут запущены:

    frontend на http://localhost:5173

    backend на http://localhost:3001

    mongo-express на http://localhost:8081

    mongodb (внутренне) на порту 27017

    redis (внутренне) на порту 6379

## Доступ к интерфейсу

    Клиентская часть (React SPA): http://localhost:5173

    MongoDB админка (Mongo Express): http://localhost:8081

    🔐 По умолчанию логин: admin, пароль: admin
    (можно изменить в .env и docker-compose.yml)

## Заполняем базу данных товарами

👉 Backend
```
cd ecommerce-backend
docker compose run --rm backend npm run seed    # наполнить базу товаров
```


 Пример пользователей

    Обычный пользователь
    Email: user123@example.com
    Пароль: password123

    Администратор
    Email: user@example.com
    Пароль: password123
    (создаётся вручную в БД или через API)

## Структура проекта
```
ecommerce-app/
├── ecommerce-frontend/       # Клиентская часть (React + Vite)
├── ecommerce-backend/        # Сервер (Node.js + Express)
├── docker-compose.yml        # Инфраструктура
└── .env                      # Переменные окружения (MONGO_URL, REDIS_URL, JWT_SECRET)
```

## Возможности
```
Регистрация и вход через JWT

Защищённые маршруты и разграничение прав

Создание и просмотр заказов

REST API для работы с товарами

Кэширование каталога через Redis

Административная панель Mongo Express
```
## Примечания

    Все данные сбрасываются при docker compose down -v

    Mongo Express можно использовать для ручной правки данных

    Проект легко расширяется под платёжные модули, систему рекомендаций и аналитику
