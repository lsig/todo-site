CREATE TABLE
  users (
    user_id SERIAL,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    PRIMARY KEY (user_id)
  );

CREATE TABLE
  projects (
    project_id SERIAL,
    project_name VARCHAR(20) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (project_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
  );

CREATE TABLE
  todos (
    todo_id SERIAL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(100),
    priority INT NOT NULL,
    CHECK (priority BETWEEN 1 AND 5),
    completed BOOLEAN DEFAULT false,
    due_date DATE,
    project_id INT NOT NULL,
    PRIMARY KEY (todo_id),
    FOREIGN KEY (project_id) REFERENCES projects (project_id)
  );

-- Create the users
INSERT INTO
  users (username, password)
VALUES
  ('user1', 'password1'),
  ('user2', 'password2'),
  ('user3', 'password3');

-- Create the projects for user 1
INSERT INTO
  projects (project_name, user_id)
VALUES
  ('Project 1', 1),
  ('Project 2', 1),
  ('Project 3', 1);

-- Create the projects for user 2
INSERT INTO
  projects (project_name, user_id)
VALUES
  ('Project 1', 2),
  ('Project 2', 2),
  ('Project 3', 2);

-- Create the projects for user 3
INSERT INTO
  projects (project_name, user_id)
VALUES
  ('Project 1', 3),
  ('Project 2', 3),
  ('Project 3', 3);

-- Create the todos for user 1, project 1
INSERT INTO
  todos (
    title,
    description,
    priority,
    completed,
    due_date,
    project_id
  )
VALUES
  (
    'Todo 1',
    'Description 1',
    1,
    false,
    '2023-05-05',
    1
  ),
  (
    'Todo 2',
    'Description 2',
    2,
    false,
    '2023-05-10',
    1
  ),
  (
    'Todo 3',
    'Description 3',
    3,
    false,
    '2023-05-15',
    1
  ),
  (
    'Todo 4',
    'Description 4',
    4,
    false,
    '2023-05-20',
    1
  ),
  (
    'Todo 5',
    'Description 5',
    5,
    false,
    '2023-05-25',
    1
  );

-- Create the todos for user 1, project 2
INSERT INTO
  todos (
    title,
    description,
    priority,
    completed,
    due_date,
    project_id
  )
VALUES
  (
    'Todo 1',
    'Description 1',
    1,
    false,
    '2023-05-05',
    2
  ),
  (
    'Todo 2',
    'Description 2',
    2,
    false,
    '2023-05-10',
    2
  ),
  (
    'Todo 3',
    'Description 3',
    3,
    false,
    '2023-05-15',
    2
  ),
  (
    'Todo 4',
    'Description 4',
    4,
    false,
    '2023-05-20',
    2
  ),
  (
    'Todo 5',
    'Description 5',
    5,
    false,
    '2023-05-25',
    2
  );

-- Create the todos for user 1, project 3
INSERT INTO
  todos (
    title,
    description,
    priority,
    completed,
    due_date,
    project_id
  )
VALUES
  (
    'Todo 1',
    'Description 1',
    1,
    false,
    '2023-05-05',
    3
  ),
  (
    'Todo 2',
    'Description 2',
    2,
    false,
    '2023-05-10',
    3
  ),
  (
    'Todo 3',
    'Description 3',
    3,
    false,
    '2023-05-15',
    3
  ),
  (
    'Todo 4',
    'Description 4',
    4,
    false,
    '2023-05-20',
    3
  ),
  (
    'Todo 5',
    'Description 5',
    5,
    false,
    '2023-05-25',
    3
  );

-- User 2 Todos --
INSERT INTO
  todos (
    title,
    description,
    priority,
    completed,
    due_date,
    project_id
  )
VALUES
  (
    'Complete project 1',
    'Finish all tasks for project 1',
    5,
    false,
    '2023-05-05',
    4
  ),
  (
    'Buy groceries',
    'Get bread, milk, and eggs',
    3,
    false,
    '2023-05-07',
    4
  ),
  (
    'Exercise',
    'Go for a 30-minute jog',
    2,
    false,
    '2023-05-02',
    5
  ),
  (
    'Finish book',
    'Read the final 2 chapters of "The Great Gatsby"',
    4,
    false,
    '2023-05-06',
    5
  ),
  (
    'Call mom',
    'Catch up with mom on the phone',
    1,
    false,
    '2023-05-08',
    5
  ),
  (
    'Plan vacation',
    'Research destinations and make plans',
    5,
    false,
    '2023-05-10',
    6
  ),
  (
    'Attend meeting',
    'Prepare for and attend company meeting',
    4,
    false,
    '2023-05-03',
    6
  ),
  (
    'Clean house',
    'Sweep, mop, and dust the entire house',
    3,
    false,
    '2023-05-09',
    4
  ),
  (
    'Finish report',
    'Complete final report for work project',
    5,
    false,
    '2023-05-12',
    5
  ),
  (
    'Water plants',
    'Give all indoor and outdoor plants a thorough watering',
    2,
    false,
    '2023-05-04',
    5
  );

-- User 3 Todos --
INSERT INTO
  todos (
    title,
    description,
    priority,
    completed,
    due_date,
    project_id
  )
VALUES
  (
    'Finish project 3',
    'Complete all tasks for project 3',
    5,
    false,
    '2023-05-13',
    8
  ),
  (
    'Pay bills',
    'Pay rent, utilities, and credit card bill',
    4,
    false,
    '2023-05-15',
    8
  ),
  (
    'Walk the dog',
    'Take the dog for a 20-minute walk',
    2,
    false,
    '2023-05-02',
    9
  ),
  (
    'Book flight',
    'Purchase tickets for upcoming trip',
    3,
    false,
    '2023-05-16',
    9
  ),
  (
    'Organize closet',
    'Clean and organize bedroom closet',
    3,
    false,
    '2023-05-07',
    9
  ),
  (
    'Buy birthday gift',
    'Purchase a gift for a friend''s birthday',
    1,
    false,
    '2023-05-11',
    7
  ),
  (
    'Write blog post',
    'Research and write a blog post on a topic of interest',
    4,
    false,
    '2023-05-10',
    8
  ),
  (
    'Finish painting',
    'Complete painting project for living room',
    5,
    false,
    '2023-05-14',
    9
  ),
  (
    'Plan party',
    'Make plans for upcoming party',
    5,
    false,
    '2023-05-18',
    9
  ),
  (
    'Study for exam',
    'Review notes and prepare for upcoming exam',
    4,
    false,
    '2023-05-21',
    9
  );
