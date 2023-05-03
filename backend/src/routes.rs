use std::fmt::Debug;

use crate::{
    models::{ProjectModel, TodoModel, UserModel},
    requestSchema::{CreateProject, CreateTodo, CreateUser},
    DbPool,
};
use actix_web::{delete, get, patch, post, web, HttpResponse, Responder};
use serde_json::json;

#[get("/api/v1/projects/{user_id}")]
pub async fn user_todos(path: web::Path<i32>, data: web::Data<DbPool>) -> impl Responder {
    let id = path.into_inner();
    let user_projects = match sqlx::query_as!(ProjectModel, 
        "
        SELECT p.project_id, p.name
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

    let json = json!(&user_projects);

    return HttpResponse::Ok().json(json);
}
