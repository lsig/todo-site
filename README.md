# Todo-Site

## Intro

Hi, welcome to todo-site. This is a revolutionary todo site tailored for the future you. On todo-site, you are able to log in, create projects, and within them create todos. Todo-site is created and maintained by:

- Logi Sigurðarson - Github [/lsig](https://github.com/lsig)
- Kristófer Fannar Björnsson - Github [/kristoferfannar](https://github.com/kristoferfannar)

## Tech-stack

Our Todo app consists of a frontend, backend and database. We decided against choosing the default tech-stack (flask), and instead wanted to get a bit more creative, as we enjoy learning new technologies and making our app our own.

## E\R Diagram
![project1](https://github.com/lsig/todo-site/assets/89947902/a397b8d3-6c22-44b6-bb38-2fabb79c0519)


### Frontend

For our frontend, we decided to choose the popular [reactjs](https://react.dev/) framework built on [javascript](https://developer.mozilla.org/en-US/docs/Glossary/JavaScript), which we run with [vitejs](https://vitejs.dev/). However, instead of using regular javascript, we chose to go with [typescript](https://www.typescriptlang.org/), as it provides a much better developer experience with more robust code.

For styling, we went with [tailwindcss](https://tailwindcss.com/), as it offers layers on top of css which makes styling much more user friendly, easier to manage, more consistant and removes redundancy.

### Backend

For our backend, we went with the revolutionary [rust](https://www.rust-lang.org/) programming language, which is set to take over the world soon enough. Our backend framework for building an http api in rust was [actix-web](https://actix.rs/), and to connect to our database we used [sqlx](https://github.com/launchbadge/sqlx). To run our backend, we dockerized it.

### Database

For our database we used a [Postgresql](https://www.postgresql.org/) Docker image, which we set up on port 6432 and created a volume for persisting data.

## Setting up

To run our database and backend, you are required to have docker set up and running on your system. If you are reading this, you likely have docker already setup, but in case you don't, here is [the official docker website](https://www.docker.com/get-started/). Try it out, it's really cool.

When you have docker setup and running, simply go to this directory and type in a terminal `docker-compose up`. This command will run the _docker-compose.yaml_ file in the same directory, which will boot up the entire backend + database for you.

To load up the frontend, you are required to have [node](https://nodejs.org/en) and [npm](https://www.npmjs.com/), node's package manager. Go into the _/frontend_ directory and run in a terminal `npm install`, which will install all necessary packages for the frontend to run. Afterwards, you can run `npm run dev`, which will run the todo-site in development mode, or you can run `npm run build && npm run preview` to preview the todo-site in production mode. They should be identical.

Now you can go ahead and try todoing, just don't get lost in the fun!

## Backend Endpoints

All our backend endpoints start with the prefix _/api_, as is common in backend development. The backend's version is then added as the next route, which is _/v1_ here.

The port used for the backend is _8080_

### Users

Get all users:

    GET :8080/api/v1/users

<br>

Get user by id:

    GET :8080/api/v1/users/{user_id}

<br>

Create new user

    POST :8080/api/v1/users
    body : {
        username: str
        password: str
    }

<br>

Login user

    POST :8080/api/v1/login
    body : {
        username: str
        password: str
    }

<br>

### Projects

View all projects for a specific user

    GET /api/v1/users/{user_id}/projects

<br>

View project by id for a specific user

    GET /api/v1/users/{user_id}/projects/{project_id}

<br>

Create project for specific user

    POST /api/v1/users/{user_id}/projects
    body : {
        project_name: str
    }

<br>

Update project by id for a specific user

    PATCH /api/v1/users/{user_id}/projects/{project_id}
    body : {
        ?project_name: str
    }

<br>

Delete project by id for a specific user

    DELETE /api/v1/users/{user_id}/projects/{project_id}

<br>

### Todos

Get all todos in a specific project for a specific user

    GET /api/v1/users/{user_id}/projects/{project_id}/todos

<br>

Get todo by id in a specific project for a specific user

    GET /api/v1/users/{user_id}/projects/{project_id}/todos/{todo_id}

<br>

Create todo in a specific project for a specific user

    POST /api/v1/users/{user_id}/projects/{project_id}/todos
    body : {
        title: str,
        ?description: str,
        priority: int,
        ?completed: bool,
        ?due_date: date,
    }

<br>

Update todo by id in a specific project for a specific user

    PATCH /api/v1/users/{user_id}/projects/{project_id}/todos/{todo_id}
    body : {
        ?title: str,
        ?description: str,
        ?priority: int,
        ?completed: bool,
        ?due_date: date,
    }

<br>

Delete todo by id in a specific project for a specific user

    DELETE /api/v1/users/{user_id}/projects/{project_id}/todos/{todo_id}

<br>

## Database queries

For creating our database tables, we have a migration script inside of _./backend/migrations/_. In that script, all tables are created with relationships and some initial data.

All database queries are kept inside _./backend/src/routes/{projects,todos,users}.rs_. There, we have implemented various CRUD queries used by our application.

## More

This project is group 90's submission for Kobenhavns Universitet's _Databases and Information Systems_ course for the spring 2023 semester. Course information can be found [here](https://kurser.ku.dk/course/ndab21010u).
