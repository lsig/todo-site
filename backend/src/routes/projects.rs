use crate::{
    models::{res_models::ProjectModel, req_models::CreateProject, req_models::UpdateProject}, 
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
        FROM Projects p
        INNER JOIN Users u on p.user_id = u.user_id
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
        FROM Projects p
        NATURAL JOIN Users u 
        WHERE project_id = $1 AND u.user_id = $2
        ", 
        project_id, user_id)
        .fetch_one(&data.0)
        .await {
            Ok(data) => json!(data), 
            Err(sqlx::Error::RowNotFound) => {
                return HttpResponse::NotFound().json(
                    json!({"status": "fail","message": format!("Project with ID: {} not found", project_id)}),
                );
            }
            Err(e) => {
                return HttpResponse::InternalServerError()
                    .json(json!({"status": "error","message": format!("{:?}", e)}));
            }
        };

    return HttpResponse::Ok().json(project);
}

#[post("/api/v1/users/{user_id}/projects")]
pub async fn create_project(path: web::Path<i32>, body: web::Json<CreateProject>, data: web::Data<DbPool>) -> impl Responder {
    let id = path.into_inner();

    let insert_query = 
        sqlx::query_as!(ProjectModel, 
            "INSERT INTO Projects (user_id, project_name) 
             VALUES ($1, $2)
             RETURNING user_id, project_id, project_name",
        id,
        body.project_name)
        .fetch_one(&data.0)
        .await;


    let project = match insert_query {
        Ok(data) => json!(data),
        Err(e) => {
            return HttpResponse::InternalServerError()
                .json(json!({"status": "error","message": format!("{:?}", e)}));
        }
    };

    return HttpResponse::Created().json(project);
}

#[patch("/api/v1/users/{user_id}/projects/{project_id}")]
pub async fn update_project(path: web::Path<Vec<i32>>, body: web::Json<UpdateProject>, data: web::Data<DbPool>) -> impl Responder {
    let ids = path.into_inner();

    let user_id = ids[0];
    let project_id = ids[1];

    let query_result = sqlx::query_as!(ProjectModel,
                "SELECT * FROM Projects 
                 WHERE user_id = $1 AND project_id = $2",
            user_id, 
            project_id)
            .fetch_one(&data.0) 
            .await;

    let project = match query_result {
        Ok(data) => data,
        Err(sqlx::Error::RowNotFound) => {
            return HttpResponse::NotFound().json(
                json!({"status": "fail","message": format!("Project with ID: {} not found", project_id)}),
            );
        }
        Err(e) => {
            return HttpResponse::InternalServerError()
                .json(json!({"status": "error","message": format!("{:?}", e)}));
        }
    };

    let project_name = match &body.project_name {
        Some(name) => name.to_owned(),
        None => project.project_name
    };
        
    let updated_project = sqlx::query_as!(ProjectModel, 
            "
            UPDATE Projects SET project_name = $1
            WHERE user_id = $2 AND project_id = $3
            RETURNING user_id, project_id, project_name
            ",
            project_name,
            user_id,
            project_id)
            .fetch_one(&data.0)
            .await;

    let newly_updated_project = match updated_project {
        Ok(data) => json!(data),
        Err(e) => {
            return HttpResponse::InternalServerError()
                .json(json!({"status": "error","message": format!("{:?}", e)}));
        }
    };

  return HttpResponse::Ok().json(newly_updated_project);
}

#[delete("/api/v1/users/{user_id}/projects/{project_id}")]
pub async fn delete_project(path: web::Path<Vec<i32>>, data: web::Data<DbPool>) -> impl Responder {
    let ids = path.into_inner();
    let user_id = ids[0];
    let project_id = ids[1];

    let query_result = sqlx::query!("DELETE From Projects WHERE user_id = $1 AND project_id = $2",
                user_id,
                project_id)
                .execute(&data.0)    
                .await;

    match query_result {
        Ok(result) => {
            if result.rows_affected() == 0 {
                let message = format!("Project with ID: {} not found", project_id);
                return HttpResponse::NotFound().json(json!({"status": "fail","message": message}));
            } else {
                return HttpResponse::NoContent().finish();
            }
        }
        Err(e) => {
            let message = format!("Internal server error: {}", e);
            return HttpResponse::InternalServerError().json(json!({"status": "error","message": message}));
        }
    }
}

