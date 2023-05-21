use crate::{
    models::res_models::TodoModel,
    DbPool,
};

use actix_web::{delete, get, patch, post, web, HttpResponse, Responder};
use serde_json::json;

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
                vec![]
            },
        };

    let res = json!(&project_todos);

    return HttpResponse::Ok().json(res);
}
