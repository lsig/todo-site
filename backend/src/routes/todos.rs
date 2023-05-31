use crate::{
    models::{res_models::TodoModel, req_models::{CreateTodo, UpdateTodo}},
    DbPool,
};

use actix_web::{delete, get, patch, post, web, HttpResponse, Responder, http::StatusCode};
use serde_json::json;

#[get("/api/v1/users/{user_id}/projects/{project_id}/todos")]
pub async fn get_project_todos(path: web::Path<Vec<i32>>, data: web::Data<DbPool>) -> impl Responder {
    let ids: Vec<i32> = path.into_inner();
    let user_id = ids[0];
    let project_id = ids[1];
    let project_todos = match sqlx::query_as!(TodoModel, 
        "
        SELECT user_id, project_id, todo_id, title, description, priority, completed, due_date
        FROM Todos t
        NATURAL JOIN Projects p
        WHERE user_id = $1 AND project_id = $2
        ", 
        user_id, project_id)
        .fetch_all(&data.0)
        .await {
            Ok(data) => data, 
            Err(_) => {
                vec![]
            },
        };

    let res = json!(&project_todos);

    return HttpResponse::Ok().json(res);
}

#[get("/api/v1/users/{user_id}/projects/{project_id}/todos/{todo_id}")]
pub async fn get_todo(path: web::Path<Vec<i32>>, data: web::Data<DbPool>) -> impl Responder {
    let ids: Vec<i32> = path.into_inner();
    let user_id = ids[0];
    let project_id = ids[1];
    let todo_id = ids[2];

    let todo = match sqlx::query_as!(TodoModel, 
        "
        SELECT user_id, project_id, todo_id, title, description, priority, completed, due_date
        FROM Todos t
        NATURAL JOIN Projects p
        WHERE user_id = $1 AND project_id = $2 AND todo_id = $3
        ", 
        user_id, project_id, todo_id)
        .fetch_one(&data.0)
        .await {
            Ok(data) => json!(data), 
            Err(_) => {
                json!({ "message": "todo or project id wrong or not found"})
            },
        };

    return HttpResponse::Ok().json(todo);
}

#[post("/api/v1/users/{user_id}/projects/{project_id}/todos")]
pub async fn post_todo(path: web::Path<Vec<i32>>, body: web::Json<CreateTodo>, data: web::Data<DbPool>) -> impl Responder {
    let ids = path.into_inner();

    let user_id = ids[0];
    let project_id = ids[1];

    let insert_query = 
        sqlx::query_as!(TodoModel, 
            "INSERT INTO todos (title, description, priority, completed, due_date, project_id, user_id) 
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING todo_id, title, description, priority, completed, due_date, project_id, user_id",
        body.title,
        body.description,
        body.priority,
        body.completed,
        body.due_date,
        project_id,
        user_id)
        .fetch_one(&data.0)
        .await;


    let todo = match insert_query {
        Ok(data) => json!(data),
        Err(e) => {
            return HttpResponse::InternalServerError()
                .json(json!({"status": "error","message": format!("{:?}", e)}));
        }
    };

    return HttpResponse::Created().json(todo);
}

#[patch("/api/v1/users/{user_id}/projects/{project_id}/todos/{todo_id}")]
pub async fn update_todo(path: web::Path<Vec<i32>>, body: web::Json<UpdateTodo>, data: web::Data<DbPool>) -> impl Responder {
    let ids = path.into_inner();

    let user_id = ids[0];
    let project_id = ids[1];
    let todo_id = ids[2];

    let query_result = sqlx::query_as!(TodoModel,
                "SELECT * FROM Todos 
                 WHERE user_id = $1 AND project_id = $2 AND todo_id = $3",
            user_id, 
            project_id, 
            todo_id)
            .fetch_one(&data.0) 
            .await;

    let todo = match query_result {
        Ok(note) => note,
        Err(sqlx::Error::RowNotFound) => {
            return HttpResponse::NotFound().json(
                json!({"status": "fail","message": format!("Todo with ID: {} not found", todo_id)}),
            );
        }
        Err(e) => {
            return HttpResponse::InternalServerError()
                .json(json!({"status": "error","message": format!("{:?}", e)}));
        }
    };

    let todo_title = match &body.title {
        Some(title) => title.to_owned(),
        None => todo.title
    };

    let todo_desc = match &body.description {
        Some(desc) => Some(desc.to_owned()),
        None => todo.description
    };

    let todo_prior = match &body.priority {
        Some(prior) => prior.to_owned(),
        None => todo.priority
    };

    let todo_completed = match &body.completed {
        Some(completed) => Some(completed.to_owned()),
        None => todo.completed
    };

    let todo_due_date = match &body.due_date {
        Some(date) => Some(date.to_owned()),
        None => todo.due_date
    };
    
    let updated_todo = sqlx::query_as!(TodoModel, 
            "
            UPDATE Todos SET title = $1, description = $2, priority = $3, completed = $4, due_date = $5
            WHERE user_id = $6 AND project_id = $7 AND todo_id = $8
            RETURNING todo_id, title, description, priority, completed, due_date, project_id, user_id
            ",
            todo_title,
            todo_desc,
            todo_prior,
            todo_completed,
            todo_due_date,
            user_id,
            project_id,
            todo_id
            )
            .fetch_one(&data.0)
            .await;

    let newly_updated_todo = match updated_todo {
        Ok(data) => json!(data),
        Err(e) => {
            return HttpResponse::InternalServerError()
                .json(json!({"status": "error","message": format!("{:?}", e)}));
        }
    };

  return HttpResponse::Ok().json(newly_updated_todo);
}


