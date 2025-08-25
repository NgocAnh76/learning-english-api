## Task list cho dự án

### 1. Setup project

#### 1.1. Backend

- [ ] Cài đặt code base với NestJS
- [ ] Thiết kế database với prisma

#### 1.2. Frontend

- [ ] Cài đặt code base với NextJS / TailwindCSS
- [ ] Thêm các dependencies cần thiết

### 2. Authentication

- [ ] Thực hiện trang login
- [ ] Thực hiện trang register
- [ ] Thực hiện trang forgot password
- [ ] Thực hiện trang reset password
- [ ] Thực hiện trang verify email

### 3. Course

- [ ] Tính năng lọc nâng cao ở trang chủ bao gồm
  - [ ] Topic
  - [ ] Time (bao gồm giờ và các ngày trong tuần)
  - [ ] Tag
  - [ ] Other (bao gồm giới tính, quốc gia, chứng chỉ)

- [ ] Trang chi tiết khoá học bao gồm
  - [ ] Thông tin khoá học
  - [ ] Các bài học của khoá học
  - [ ] Thời gian có thể học
  - [ ] Thông tin giáo viên
  - [ ] Số lượng học viên (bao gồm chứng chỉ)
  - [ ] Thông tin đánh giá

### 4. Teacher

- [ ] Trang danh sách giáo viên bao gồm
  - [ ] Hiển thị danh sách giáo viên có phân trang và bộ lọc
  - [ ] Trang chi tiết giáo viên
    - [ ] Thông tin giáo viên
    - [ ] Các khoá học của giáo viên
    - [ ] Thời gian có thể học
    - [ ] Các chứng chỉ của giáo viên
    - [ ] Thông tin học viên
    - [ ] Thông tin đánh giá

### 5. Đăng ký khoá học

Work flow:

- User vào trang chủ tìm kiếm khoá học theo nhu cầu
- User chọn khoá học và đăng ký học thử và chọn thời gian có thể học dựa trên khung giờ có sẵn trong khoá học
- Giáo viên sẽ xác nhận thời gian học
- Sau khi học xong trạng thái sẽ cập nhật là đã kết thúc học thử
- User sẽ chọn mua khoá học hoặc không mua khoá học
- Nếu mua khoá học thì sẽ thanh toán và đăng ký thành công

Yêu cầu:

- Khi có user đang học sẽ không thể đăng ký khoá học
- Giáo viên có thể xác nhận thời gian học

Task list:

- [ ] Form đăng ký học thử
- [ ] Trang quản lý đăng ký học thử
- [ ] Trang học giữa giáo viên và học sinh (có trạng thái sẵn sàng hay chưa, giáo viên có thể bật trạng thái sẵn sàng và thêm liên kết như zoom, google meet, ...)
- [ ] Form yêu cầu thanh toán

### 6. Dashboard

- [ ] Trang dashboard cho user
  - [ ] Hiển thị lịch học nếu có
  - [ ] Danh sách các khoá học đã đăng ký
  - [ ] Trang chi tiết khoá học
  - [ ] Trang lịch sử học tập

- [ ] Trang dashboard cho giáo viên
  - [ ] Hiển thị lịch giảng dạy nếu có
  - [ ] Danh sách các khoá học
  - [ ] Tạo khoá học mới
  - [ ] Quản lý đánh giá

- [ ] Trang dashboard cho admin
  - [ ] Quản lý khoá học (xem, chỉnh sửa, phê duyệt)
  - [ ] Quản lý user (bao gồm giáo viên và học viên xác định dựa vào user type)
  - [ ] Quản lý đánh giá (xem, chỉnh sửa, phê duyệt)
  - [ ] Quản lý đơn hàng (xem, chỉnh sửa, phê duyệt)
  - [ ] Quản lý topic
  - [ ] Quản lý tag
  - [ ] Quản lý chứng chỉ
  - [ ] Thống kê

### 9. Các trang thông tin

- [ ] Trang thông tin về công ty
- [ ] Trang điều khoản và chính sách
- [ ] Trang liên hệ
- [ ] Trang FAQ

## Các tính năng cần phát triển

- [ ]
