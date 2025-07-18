# 🎓 StudyNest

Skillify is an interactive e-learning platform where students can enroll in courses, and teachers can share their knowledge by adding their own classes. It includes role-based dashboards for **Admin**, **Teacher**, and **Student**, and a secure login/registration system.

🌐 **Live Website**: [https://study-next-3a546.web.app/]

🧑‍💼 **Admin Login Info:**
- **Email:** tonmoyhasan@gmail.com
- **Password:** Tonmoy123

---

## 🚀 Key Features:

1. **🔐 Role-Based Authentication & Authorization**  
   Users are assigned roles (admin, teacher, student) with restricted access to dashboards.

2. **📚 Dynamic Course Management**  
   Teachers can add/update/delete classes, and admin approval controls visibility on the platform.

3. **🧑‍🏫 “Teach on Skillify” Page**  
   Students can apply to become teachers. Admins can approve or reject teacher requests.

4. **🎯 Student Dashboard**  
   Students can track their enrolled courses, submit assignments, and give feedback on courses.

5. **🧾 Admin Dashboard**  
   Manage users, approve classes and teacher requests, track all class progress with assignment statistics.

6. **💳 Payment Integration**  
   Students can securely pay for classes. After successful payment, the enrolled class is saved and tracked.

7. **⭐ Real-time Feedback System**  
   Students can rate and review classes. These are displayed in a carousel on the homepage.

8. **📊 Analytics Section**  
   View total users, total classes, and total student enrollments on the homepage.

9. **🔍 Server-side Search & Pagination**  
   Implemented in all tables and user management lists (10 items per page for better performance).

10. **✅ React-Hook-Form + TanStack Query + Mutation**  
    All forms use `react-hook-form` and `tanstack-query` for smooth and efficient data handling.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, DaisyUI, React Router, TanStack Query
- **Backend:** Express.js, MongoDB, JWT,Node.js
- **Authentication:** Firebase Auth
- **Payment:** Stripe
- **Form Management:** React Hook Form

## 🧰 NPM Packages Used

| Package                        | Purpose |
|-------------------------------|---------|
| `@headlessui/react`           | Accessible UI components for dropdowns, modals |
| `@stripe/react-stripe-js`     | Stripe payment integration |
| `@stripe/stripe-js`           | Stripe core JavaScript SDK |
| `@tailwindcss/vite`           | Tailwind integration for Vite |
| `@tanstack/react-query`       | Data fetching, mutations, and caching |
| `aos`                         | Animate on Scroll library for animations |
| `axios`                       | HTTP client for API requests |
| `firebase`                    | Authentication and hosting |
| `react-countup`               | Animated number counter |
| `react-helmet-async`          | Managing document head in React |
| `react-hook-form`             | Form handling and validation |
| `react-icons`                 | Popular icon packs in React |
| `react-intersection-observer`| Lazy loading and scroll-based effects |
| `react-loader-spinner`        | Loaders and spinners |
| `react-rating-stars-component`| Star rating UI component |
| `react-router`                | Client-side routing (v7) |
| `react-star-ratings`          | Alternative star rating component |
| `recharts`                    | Charting and data visualization |
| `sweetalert2`                 | Beautiful modals and alerts |
| `swiper`                      | Sliders for banners and carousels |
