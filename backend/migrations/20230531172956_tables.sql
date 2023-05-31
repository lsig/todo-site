-- Add migration script here
DROP TABLE IF EXISTS Users CASCADE;

CREATE TABLE
  Users (
    user_id SERIAL,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    PRIMARY KEY (user_id)
  );

DROP TABLE IF EXISTS Projects CASCADE;

CREATE TABLE
  Projects (
    project_id SERIAL,
    project_name VARCHAR(20) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (user_id, project_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
  );

DROP TABLE IF EXISTS Todos CASCADE;

CREATE TABLE
  Todos (
    todo_id SERIAL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(100),
    priority INT NOT NULL,
    CHECK (priority BETWEEN 1 AND 5),
    completed BOOLEAN DEFAULT false,
    due_date DATE,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (user_id, project_id, todo_id),
    FOREIGN KEY (user_id, project_id) REFERENCES projects (user_id, project_id) ON DELETE CASCADE
  );

-- Create the users
INSERT INTO
  Users (username, password)
VALUES
  ('john.doe', 'password123'),
  ('jane.smith', 'secret456');

-- Create the projects 
INSERT INTO
  Projects (project_name, user_id)
VALUES
  ('Project A', 1),
  ('Project B', 1),
  ('Project C', 2);

-- Create the todos
INSERT INTO
  Todos (
    title,
    description,
    priority,
    completed,
    due_date,
    project_id,
    user_id
  )
VALUES
  (
    'Task 1',
    'Complete task 1',
    3,
    false,
    '2023-06-01',
    1,
    1
  ),
  (
    'Task 2',
    'Complete task 2',
    2,
    true,
    '2023-06-03',
    1,
    1
  ),
  (
    'Task 3',
    'Complete task 3',
    4,
    false,
    '2023-06-05',
    2,
    1
  ),
  (
    'Task 4',
    'Complete task 4',
    1,
    false,
    '2023-06-02',
    3,
    2
  ),
  (
    'Task 5',
    'Complete task 5',
    3,
    true,
    '2023-06-04',
    3,
    2
  );
