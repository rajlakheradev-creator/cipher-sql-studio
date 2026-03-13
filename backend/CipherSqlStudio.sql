-- ==========================================
-- DATABASE: CipherSqlStudio
-- ==========================================

-- DROP DATABASE IF EXISTS "CipherSqlStudio";
CREATE DATABASE "CipherSqlStudio"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_India.1252'
    LC_CTYPE = 'English_India.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- ==========================================
-- CONNECT TO THE DATABASE FIRST
-- Run this in psql: \c "CipherSqlStudio"
-- Or select it in pgAdmin before running below
-- ==========================================


-- ==========================================
-- TABLE: assignments
-- ==========================================

CREATE TABLE IF NOT EXISTS assignments (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(255)    NOT NULL,
    description TEXT            NOT NULL,
    difficulty  VARCHAR(50)     NOT NULL
                CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    created_at  TIMESTAMP       DEFAULT NOW()
);


-- ==========================================
-- SAMPLE DATA: assignments
-- ==========================================

INSERT INTO assignments (title, description, difficulty) VALUES
(
    'Select All Employees',
    'Write a SQL query to select all columns and rows from the employees table.',
    'Easy'
),
(
    'Filter by Department',
    'Write a SQL query to fetch all employees who belong to the "Engineering" department.',
    'Easy'
),
(
    'Count Employees per Department',
    'Write a SQL query to count the number of employees in each department. Show department name and count.',
    'Medium'
),
(
    'Top 5 Highest Salaries',
    'Write a SQL query to find the top 5 employees with the highest salaries. Show their name and salary.',
    'Medium'
),
(
    'Employees with No Manager',
    'Write a SQL query to find all employees who do not have a manager assigned (manager_id is NULL).',
    'Easy'
),
(
    'Average Salary by Department',
    'Write a SQL query to calculate the average salary for each department. Only show departments with an average salary greater than 50000.',
    'Hard'
),
(
    'Join Employees and Departments',
    'Write a SQL query to list each employee name along with their department name using a JOIN.',
    'Medium'
),
(
    'Find Duplicate Emails',
    'Write a SQL query to find all email addresses that appear more than once in the users table.',
    'Hard'
);


-- ==========================================
-- PRACTICE TABLES (used in assignments above)
-- ==========================================

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100)    NOT NULL UNIQUE,
    created_at      TIMESTAMP       DEFAULT NOW()
);

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255)    NOT NULL,
    email           VARCHAR(255)    NOT NULL UNIQUE,
    department_id   INT             REFERENCES departments(id) ON DELETE SET NULL,
    manager_id      INT             REFERENCES employees(id)   ON DELETE SET NULL,
    salary          NUMERIC(10, 2)  NOT NULL DEFAULT 0,
    created_at      TIMESTAMP       DEFAULT NOW()
);

-- Users table (for duplicate email assignment)
CREATE TABLE IF NOT EXISTS users (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255)    NOT NULL,
    email       VARCHAR(255)    NOT NULL,
    created_at  TIMESTAMP       DEFAULT NOW()
);


-- ==========================================
-- SAMPLE DATA: departments
-- ==========================================

INSERT INTO departments (name) VALUES
('Engineering'),
('Marketing'),
('Sales'),
('HR'),
('Finance');


-- ==========================================
-- SAMPLE DATA: employees
-- ==========================================

INSERT INTO employees (name, email, department_id, manager_id, salary) VALUES
('Alice Johnson',    'alice@example.com',    1, NULL, 95000),
('Bob Smith',        'bob@example.com',      1,    1, 82000),
('Carol White',      'carol@example.com',    2, NULL, 67000),
('David Brown',      'david@example.com',    2,    3, 54000),
('Eve Davis',        'eve@example.com',      3, NULL, 73000),
('Frank Wilson',     'frank@example.com',    3,    5, 61000),
('Grace Lee',        'grace@example.com',    4, NULL, 58000),
('Henry Taylor',     'henry@example.com',    4,    7, 47000),
('Irene Martin',     'irene@example.com',    5, NULL, 88000),
('Jack Anderson',    'jack@example.com',     5,    9, 76000),
('Karen Thomas',     'karen@example.com',    1,    1, 91000),
('Leo Jackson',      'leo@example.com',      2,    3, 43000),
('Mia Harris',       'mia@example.com',      3,    5, 39000),
('Nathan Clark',     'nathan@example.com',   1,    1, 55000),
('Olivia Lewis',     'olivia@example.com',   5,    9, 62000);


-- ==========================================
-- SAMPLE DATA: users (with intentional duplicates)
-- ==========================================

INSERT INTO users (name, email) VALUES
('Tom',     'tom@example.com'),
('Jerry',   'jerry@example.com'),
('Tom 2',   'tom@example.com'),       -- duplicate
('Alice',   'alice@example.com'),
('Bob',     'bob@example.com'),
('Alice 2', 'alice@example.com'),     -- duplicate
('Charlie', 'charlie@example.com'),
('Jerry 2', 'jerry@example.com');     -- duplicate


-- ==========================================
-- VERIFY EVERYTHING LOADED
-- ==========================================

SELECT 'assignments' AS table_name, COUNT(*) AS row_count FROM assignments
UNION ALL
SELECT 'departments',               COUNT(*)                FROM departments
UNION ALL
SELECT 'employees',                 COUNT(*)                FROM employees
UNION ALL
SELECT 'users',                     COUNT(*)                FROM users;