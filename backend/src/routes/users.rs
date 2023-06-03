use crate::{
    models::{res_models::{UserModel, LoginModel}, req_models::CreateUser}, 
    DbPool,
};
use actix_web::{get, post, web, HttpResponse, Responder};
use serde_json::json;

#[get("/api/v1/users")]
pub async fn get_users(data: web::Data<DbPool>) -> impl Responder {
    let users = match sqlx::query_as!(UserModel, 
        "
        SELECT * 
        FROM Users
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
pub async fn get_user(path: web::Path<i32>, data: web::Data<DbPool>) -> impl Responder {
    let id = path.into_inner();
    let user = match sqlx::query_as!(UserModel, 
        "
        SELECT * 
        FROM Users
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

#[post("/api/v1/users")]
pub async fn create_user(body: web::Json<CreateUser>, data: web::Data<DbPool>) -> impl Responder {

    let insert_query = 
        sqlx::query_as!(UserModel, 
            "INSERT INTO Users (username, password) 
             VALUES ($1, $2)
             RETURNING user_id, username, password",
        body.username,
        body.password
        )
        .fetch_one(&data.0)
        .await;


    let new_user = match insert_query {
        Ok(data) => json!(data),
        Err(e) => {
            return HttpResponse::InternalServerError()
                .json(json!({"status": "error","message": format!("{:?}", e)}));
        }
    };

    return HttpResponse::Created().json(new_user);
}

#[post("/api/v1/login")]
pub async fn login_user(body: web::Json<CreateUser>, data: web::Data<DbPool>) -> impl Responder {

    let insert_query = 
        sqlx::query_as!(LoginModel, 
            "
            SELECT user_id FROM Users 
            WHERE username = $1 AND password = $2
             ",
        body.username,
        body.password
        )
        .fetch_one(&data.0)
        .await;


    let new_user = match insert_query {
        Ok(data) => json!(data),
        Err(sqlx::Error::RowNotFound) => {
                return HttpResponse::NotFound().json(
                    json!({"status": "fail","message": format!("Username or password wrong")}),
                );
        },
        Err(e) => {
            return HttpResponse::InternalServerError()
                .json(json!({"status": "error","message": format!("{:?}", e)}));
        }
    };

    return HttpResponse::Ok().json(new_user);
}

