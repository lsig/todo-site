use std::fmt::Debug;

use crate::{
    models::{ProjectModel, TodoModel, UserModel},
    requestSchema::{CreateProject, CreateTodo, CreateUser},
    DbPool,
};
use actix_web::{delete, get, patch, post, web, HttpResponse, Responder};
use serde_json::json;

#[get("/api/v1/users/{user_id}/projects")]
pub async fn user_projects(path: web::Path<i32>, data: web::Data<DbPool>) -> impl Responder {
    let id = path.into_inner();
    let user_projects = match sqlx::query_as!(ProjectModel, 
        "
        SELECT p.project_id, p.project_name
        FROM projects p
        INNER JOIN users u on p.user_id = u.user_id
        WHERE u.user_id = $1 
        ", 
        id)
        .fetch_all(&data.0)
        .await {
            Ok(data) => data, 
            Err(_) => {
                eprint!("Database Error!");
                vec![]
            },
        };

    let res = json!(&user_projects);

    return HttpResponse::Ok().json(res);
}

#[get("/api/v1/projects/{project_id}/todos")]
pub async fn project_todos(path: web::Path<i32>, data: web::Data<DbPool>) -> impl Responder {
    let id = path.into_inner();
    let project_todos = match sqlx::query_as!(TodoModel, 
        "
        SELECT *
        FROM todos t
        NATURAL JOIN projects p
        WHERE p.project_id = $1 
        ", 
        id)
        .fetch_all(&data.0)
        .await {
            Ok(data) => data, 
            Err(_) => {
                eprint!("Database Error!");
                vec![]
            },
        };

    let res = json!(&project_todos);

    return HttpResponse::Ok().json(res);
}
