# CongNghePhanMem_ShopShoe_JS
# Shoe Store Website

## Overview

This project is a web application for a shoe store built using ReactJS for the frontend, Node.js with Express for the backend, and MySQL for the database. The application implements authentication and authorization using JWT (JSON Web Tokens) for secure user access. It also utilizes GitHub for version control and JIRA for project management.

## Features

- User Authentication and Authorization: JWT-based authentication system ensures secure access to the application with role-based permissions.
- Product Management: Allows administrators to add, edit, and delete shoe products.
- Shopping Cart: Users can add products to their cart, update quantities, and proceed to checkout.
- Order Management: Administrators can view and manage customer orders.
- Responsive Design: The website is fully responsive, ensuring a seamless experience across various devices and screen sizes.

## Technologies Used

- Frontend:
  - ReactJS: JavaScript library for building user interfaces.
  - React Router: Declarative routing for React applications.
  - Bootstrap: Frontend framework for responsive design.
  - Template Dashboard: for admin
- Backend:
  - Node.js: JavaScript runtime for building server-side applications.
  - Express: Web application framework for Node.js.
  - MySQL: Relational database management system for storing application data.
  - JWT: JSON Web Tokens for authentication and authorization.
- Version Control and Project Management:
  - GitHub: Version control system for collaboration and code management.
  - JIRA: Project management tool for tracking tasks, issues, and sprints.
- Deploy:
  - Docker: Deploy with Docker hub or docker in linux.
  - Vercel: Deploy in vercel.
## Installation

1. Clone the repository:

   ```
   git clone https://github.com/Minurte1/DA-CongNghePhanMem-Shoes_Backup.git
   ```

2. Install dependencies for frontend and backend:

   ```
   cd DBackendPhucShoe
   npm install

   cd DFrontEndPhucShoe
   npm install
   ```

3. Set up MySQL database:

   - Create a new database named `shoe_store`.
   - Import the database schema from `backend/database/schema.sql`.

4. Configure environment variables:

   - Create a `.env` file in the `backend` directory.
   - Add the following variables:

     ```
     PORT=
     DB_HOST=
     DB_USER=
     DB_PASSWORD=
     DB_NAME=
     JWT_SECRET=
     ```

5. Start the backend server:

   ```
    cd DBackendPhucShoe
   npm start
   ```

6. Start the frontend development server:

   ```
   cd DFrontEndPhucShoe
   npm start
   ```

7. Access the application at `http://localhost:3000` in your web browser.

## Contributors

- [Nguyễn Tín Thành](https://github.com/tinthanhtv2014)
- [Nguyễn Lâm Quốc Bảo](https://github.com/BaoQuocZero)
- [Hồ Hoàng Phúc](https://github.com/Minurte1)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
