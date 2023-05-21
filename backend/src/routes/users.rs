use crate::{
    models::res_models::UserModel, 
    DbPool,
};
use actix_web::{delete, get, patch, post, web, HttpResponse, Responder};
use serde_json::json;

#[get("/api/v1/users")]
pub async fn users(data: web::Data<DbPool>) -> impl Responder {
    let users = match sqlx::query_as!(UserModel, 
        "
        SELECT * 
        FROM users
        " 
        )
        .fetch_all(&data.0)
        .await {
            Ok(data) => data, 
            Err(_) => {
                vec![]
            },
        };
    let res = json!(&users);

    return HttpResponse::Ok().json(res);
}

#[get("/api/v1/users/{user_id}")]
pub async fn user(path: web::Path<i32>, data: web::Data<DbPool>) -> impl Responder {
    let id = path.into_inner();
    let user = match sqlx::query_as!(UserModel, 
        "
        SELECT * 
        FROM users
        WHERE user_id = $1
        ", 
        id)
        .fetch_one(&data.0)
        .await {
            Ok(data) => json!(data), 
            Err(_) => {
                json!({ "message": "user_id does not exist"})
            },
        };

    return HttpResponse::Ok().json(user);
}

