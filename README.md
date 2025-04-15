<h1 align="center">Employee Creator Management System</h1>

[![React/TS Frontend Tests](https://github.com/James-Nemeth/Employee-Creator-Management-System/actions/workflows/ci-frontend.yml/badge.svg)](https://github.com/James-Nemeth/Employee-Creator-Management-System/actions/workflows/ci-frontend.yml) <br>
[![Spring/Java Backend Tests](https://github.com/James-Nemeth/Employee-Creator-Management-System/actions/workflows/ci-backend.yml/badge.svg)](https://github.com/James-Nemeth/Employee-Creator-Management-System/actions/workflows/ci-backend.yml)

---

## MVP

When writing your code, please be mindful of the following:

- Your code should be production ready.
- Your code should be understandable and maintainable by other developers.
- Your code should be robust and handle error situations.
- Your code should be bug free, compile and work. Please include instructions to compile and run the
  API and the Web app in localhost. Hosting (Heroku, AWS, Azure, etc.) is required.
- If your code includes unit tests you may use a unit test framework of your choice.

We need a web application to create, list, modify and delete employees. The application should consist of a spring
RESTful API and a React Typescript frontend. The schema for
the employee is left to the criteria of the candidate.

The list can be a local database, CSV, TXT file or even in memory
Implementing an API logging strategy.
Implementing error handling strategy.
At least 3 endpoints are required:

- To create an employee
- To get a list of existing employees
- To edit existing employees
- To delete an employee

---

## Build Steps

### Prerequisites

1. **Install Node.js**: Make sure you have [Node.js](https://nodejs.org/) installed.
2. **Install Java**: Ensure you have [Java JDK](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) installed.
3. **Install Maven**: [Maven](https://maven.apache.org/install.html) is required to build the Spring Boot backend.
4. **Install MySQL**: You need [MySQL](https://dev.mysql.com/downloads/mysql/) for the database.

### Setting Up the Database

1. Go to MySQL Worksbench and create a new database called `employee_db`.
   ```bash
   CREATE DATABASE employee_db;
   ```
2. In Visual Studio Code, create a `.env` file in the root directory of your project and add the following:
   ```plaintext
   DB_NAME=employee_db
   DB_USER=root
   ```
3. **IF ON WINDOWS ADD (apple users can ignore this step)**
   ```plaintext
   DB_PASSWORD={your_password}
   ```

### Backend (Spring Boot/Java)

1. Build the project using Maven:
   ```bash
   ./mvnw clean install
   ```
2. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend (React/TypeScript)

1. Navigate to the frontend directory:
   ```bash
   cd Employee-Frontend/
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Run the Application

- Open a browser and navigate to `http://localhost:5173/` to see the frontend.
- The backend API will be running at `http://localhost:8080`.

---

## Design Goals / Approach

- The primary goal of this project is to develop a web application for managing employees with a **Spring Boot RESTful API** and a **React TypeScript frontend**.
- The app should allow users to **create, list, modify, and delete employees** while maintaining a smooth and responsive user experience.
- The backend should be **robust, production-ready, and secure**, with proper **error handling and logging** to ensure reliability.
- The frontend should be built with **React TypeScript**, utilizing **React Redux, React Hooks, and React Query** for state and API management.
- **Form validation and error handling** should be implemented to prevent incorrect or incomplete data entry.
- The project should follow best practices for **code readability, maintainability, and scalability**, making it easy for other developers to understand and extend.
- The API should be designed with **at least three key endpoints** for employee management, with flexible data storage options.
- The web application should be **fully responsive**, ensuring an optimal experience across different screen sizes and devices.
- The project should include **unit tests** to validate core functionalities and maintain a high level of reliability.
- Deployment to a cloud provider (Heroku, AWS, Azure, etc.) is required for accessibility and real-world usability.

---

## Features

- The app **lists all employees** stored in the database, providing a clear overview of available records.
- Each employee's **contract type** is displayed, and if they are on a contract, the app will show **how many years they have left**.
- Users can **view employee details**, which includes all associated values retrieved from the database.
- Employees can be **edited** through a pre-filled form, making updates easier and more efficient.
- Employees can be **deleted**, permanently removing them from the database.
- The app has a slick and professional looking UI, based around the colours Blue, Gold and White.

---

## Future Goals

- Allow for a Login system that will allow users to change details for their profile.
- Have a Admin role that can edit and adjust an employee details and status.

---

## What did you struggle with

- Setting up the filter system through the backend instead of the frontend, mostly because l haven't done it before but made be learn some new concepts that l wouldn't have know otherwise.
- This was my first time using Redux. Has been good to learn and very helpful managing code blocks and state, just took so studying and reading excatly what it does and how l can use it in my project.

---
