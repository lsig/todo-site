use crate::{
    models::res_models::ProjectModel, 
    DbPool,
};
use actix_web::{delete, get, patch, post, web, HttpResponse, Responder};
use serde_json::json;

#[get("/api/v1/users/{user_id}/projects")]
pub async fn user_projects(path: web::Path<i32>, data: web::Data<DbPool>) -> impl Responder {
    let id = path.into_inner();
    let user_projects = match sqlx::query_as!(ProjectModel, 
        "
        SELECT p.project_id, p.project_name, u.user_id
        FROM projects p
        INNER JOIN users u on p.user_id = u.user_id
        WHERE u.user_id = $1 
        ", 
        id)
        .fetch_all(&data.0)
        .await {
            Ok(data) => data, 
            Err(_) => {
                vec![]
            },
        };
    let res = json!(&user_projects);

    return HttpResponse::Ok().json(res);
}

#[get("/api/v1/users/{user_id}/projects/{project_id}")]
pub async fn user_project(path: web::Path<Vec<i32>>, data: web::Data<DbPool>) -> impl Responder {
    let ids: Vec<i32> = path.into_inner();
    let user_id = ids[0];
    let project_id = ids[1];

    let project = match sqlx::query_as!(ProjectModel, 
        "
        SELECT p.project_id, p.project_name, u.user_id
        FROM projects p
        NATURAL JOIN users u 
        WHERE project_id = $1 AND u.user_id = $2
        ", 
        project_id, user_id)
        .fetch_one(&data.0)
        .await {
            Ok(data) => json!(data), 
            Err(_) => {
                json!({ "message": "user or project id wrong or not found"})
            },
        };

    return HttpResponse::Ok().json(project);
}

