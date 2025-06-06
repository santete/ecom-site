# Hướng Dẫn Chạy Dự Án ecom-site

Đây là dự án website bán hàng được xây dựng với các công nghệ:

- *Vite*
- *React*
- *Tailwind CSS*
- *Node.js*

## 🧰 Yêu Cầu Hệ Thống

- Node.js >= 14
- npm >= 6

---

## 🚀 Các Bước Chạy Dự Án

### 1. Cài Đặt Thư Viện

```bash
npm install
2. Khởi Chạy Dev Server
bash
Copy
Edit
npm run dev
3. Truy Cập Giao Diện Website
Mở trình duyệt và truy cập địa chỉ:

arduino
Copy
Edit
http://localhost:5173

❗ Lưu Ý Quan Trọng
KHÔNG mở trực tiếp file index.html bằng trình duyệt (dạng file://...), vì sẽ gây lỗi:

pgsql
Copy
Edit
Access to script at 'file:///...' from origin 'null' has been blocked by CORS policy
✅ Luôn sử dụng lệnh npm run dev để khởi chạy server đúng cách thông qua Vite.

📁 Cấu Trúc Thư Mục Chính
index.html – Trang HTML chính

src/ – Chứa mã nguồn React

public/ – Chứa tài nguyên tĩnh

vite.config.js – Cấu hình cho Vite

tailwind.config.js – Cấu hình Tailwind CSS
