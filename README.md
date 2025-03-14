# Oddiy E-Commerce API (NestJS)

Ushbu loyiha NestJS yordamida yaratilgan oddiy e-commerce platformasi uchun RESTful API hisoblanadi.

## 1. Texnik Talablar

### 1.1 Texnologiyalar To‘plami
- **Backend:** NestJS (TypeScript)
- **Ma’lumotlar bazasi:** PostgreSQL + TypeORM
- **Autentifikatsiya:** JWT (Access & Refresh tokenlar)
- **Role-based access:** Admin va Foydalanuvchi

### 1.2 Umumiy Talablar
- Global Interceptor-lardan foydalanish orqali javob formatini to‘g‘ri shakllantirish.
- Xatoliklarni to‘g‘ri boshqarish.
- Swagger yordamida API testing tizimini o‘rnatish.

## 2. Funksional Imkoniyatlar

### 2.1 Autentifikatsiya Moduli
**Endpointlar:**
- `POST /auth/register` → Yangi foydalanuvchi ro‘yxatdan o‘tishi *(public route)*
- `POST /auth/login` → Access & refresh tokenlarni olish *(public route)*
- `POST /auth/refresh` → Refresh token orqali yangi access token olish *(public route)*

### 2.2 Foydalanuvchi Moduli
**Endpointlar:**
- `GET /users` → Barcha foydalanuvchilarni olish *(Admin only)*
- `GET /users/:id` → ID orqali foydalanuvchini olish *(Admin only)*
- `GET /users/self-info` → O‘z profil ma’lumotlarini olish *(User only)*
- `PATCH /users/:id` → Profilni yangilash *(User only)*
- `DELETE /users/:id` → Foydalanuvchini o‘chirish *(Admin only)*
- `DELETE /users/self-delete` → O‘z profilini o‘chirish *(User only)*

### 2.3 Kategoriya Moduli
**Endpointlar:**
- `POST /categories` → Yangi kategoriya yaratish *(Admin only)*
- `GET /categories` → Barcha kategoriyalarni olish *(public route)*
- `GET /categories/:id` → ID orqali kategoriya olish *(public route)*
- `PATCH /categories/:id` → Kategoriyani yangilash *(Admin only)*
- `DELETE /categories/:id` → Kategoriyani o‘chirish *(Admin only)*

### 2.4 Mahsulot Moduli
**Endpointlar:**
- `POST /products` → Yangi mahsulot yaratish *(Admin only)*
- `GET /products` → Barcha mahsulotlarni olish *(public route)*
- `GET /products/:id` → ID orqali mahsulotni olish *(public route)*
- `PATCH /products/:id` → Mahsulotni yangilash *(Admin only)*
- `DELETE /products/:id` → Mahsulotni o‘chirish *(Admin only)*

### 2.5 Savatcha Moduli
**Endpointlar:**
- `POST /baskets/add` → Savatchaga mahsulot qo‘shish *(User only)*
- `GET /baskets` → Foydalanuvchining savatchasini olish *(User only)*
- `PATCH /baskets/update/:id` → Savatchadagi mahsulot miqdorini o‘zgartirish *(User only)*
- `DELETE /baskets/remove/:id` → Savatchadan mahsulotni olib tashlash *(User only)*
- `DELETE /baskets/clear` → Savatchani tozalash *(User only)*

### 2.6 Buyurtma Moduli
**Endpointlar:**
- `POST /orders` → Yangi buyurtma yaratish *(User only)*
- `GET /orders` → Barcha buyurtmalarni olish *(Admin only)*
- `GET /self-orders` → Foydalanuvchining buyurtmalarini olish *(User only)*
- `GET /orders/:id` → ID orqali buyurtmani olish

## 3. Loyihani Ishga Tushirish

### 3.1 Talablar
Quyidagi dasturlar o‘rnatilgan bo‘lishi kerak:
- Node.js (v16 yoki undan yuqori)
- PostgreSQL

### 3.2 O‘rnatish
1. Repodan nusxa oling:
   ```sh
   git clone  https://github.com/Ibodullayev-Hasan/e-commerce-api.git 
   cd your-repo
   ```
2. Kerakli kutubxonalarni o‘rnatish:
   ```sh
   npm install
   ```
3. `.env` faylini yaratib, kerakli konfiguratsiyani sozlang (`.env.example` dan nusxa olib foydalaning).

4. Ishga tushirish:
   ```sh
   npm run start:dev
   ```

## 4. API Hujjatlari
Loyiha ishga tushirilgandan so‘ng Swagger UI’ga quyidagi manzil orqali kirishingiz mumkin:
```
http://localhost:3331/api/docs
```
Bu interfeys yordamida API endpointlarini sinab ko‘rish mumkin.

## 5. Muhit O‘zgaruvchilari
`.env.example` faylidan nusxa olib, kerakli qiymatlarni almashtiring.


