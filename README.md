# API Project

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Mô tả

Dự án API được xây dựng bởi **Ngoc Anh** sử dụng NestJS framework để tạo ra một hệ thống quản lý khóa học và người dùng hiệu quả.

## Tính năng chính

- 🔐 **Xác thực & Phân quyền**: Hệ thống đăng nhập, đăng ký với JWT
- 👥 **Quản lý người dùng**: Học viên, giáo viên với vai trò khác nhau
- 📚 **Quản lý khóa học**: Tạo, cập nhật, xóa khóa học
- 🏷️ **Hệ thống tag & topic**: Phân loại khóa học theo chủ đề
- ⏰ **Quản lý thời gian**: Lịch học và thời gian có sẵn
- 📝 **Đánh giá & Review**: Hệ thống review khóa học
- 🎓 **Chứng chỉ**: Quản lý chứng chỉ của người dùng

## Công nghệ sử dụng

- **Backend**: NestJS, TypeScript
- **Database**: PostgreSQL với Prisma ORM
- **Authentication**: JWT, bcrypt
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI

## Cài đặt

```bash
# Cài đặt dependencies
$ npm install

# Tạo file .env từ .env.example
$ cp .env.example .env

# Cài đặt Prisma
$ npx prisma generate
$ npx prisma db push

# Chạy database (Docker)
$ docker-compose up -d
```

## Chạy dự án

```bash
# Development mode
$ npm run start:dev

# Production mode
$ npm run start:prod

# Build project
$ npm run build
```

## API Endpoints

- **Auth**: `/auth/login`, `/auth/register`
- **Users**: `/users` (CRUD operations)
- **Courses**: `/courses` (CRUD operations)
- **Topics**: `/topics` (CRUD operations)
- **Tags**: `/tags` (CRUD operations)
- **Lessons**: `/lessons` (CRUD operations)
- **Reviews**: `/reviews` (CRUD operations)
- **Available Times**: `/available-times` (CRUD operations)
- **Certifications**: `/certifications` (CRUD operations)
- **Enrolls**: `/enrolls` (CRUD operations)

## Cấu trúc dự án

```
src/
├── modules/           # Các module chính
│   ├── auth/         # Xác thực & phân quyền
│   ├── user/         # Quản lý người dùng
│   ├── courses/      # Quản lý khóa học
│   ├── topics/       # Quản lý chủ đề
│   ├── tags/         # Quản lý tag
│   ├── lessons/      # Quản lý bài học
│   ├── reviews/      # Quản lý đánh giá
│   ├── available-time/ # Quản lý thời gian
│   ├── certifications/ # Quản lý chứng chỉ
│   └── enrolls/      # Quản lý đăng ký
├── common/            # Shared utilities
├── prisma/            # Database schema & service
└── types/             # Type definitions
```

## Tác giả

**Ngoc Anh** - Full-stack Developer

## License

Dự án này được phát hành dưới MIT License.
