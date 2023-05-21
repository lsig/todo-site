use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use dotenvy::dotenv;
use sqlx::{postgres::PgPoolOptions, Pool, Postgres, PgPool};

mod models;
mod routes;

pub struct DbPool(Pool<Postgres>);

#[get("/ping")]
async fn ping() -> impl Responder {
    HttpResponse::Ok().body("Pong!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().expect(".env not found");
    
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = match PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url).await
    {
        Ok(pool) => {
                println!("Connection to database succesful");
                pool
            }
        Err(e) => {
                println!("failed to connect to database {:?}", e);
                std::process::exit(1);
            }
    };


    HttpServer::new(move || {
        App::new()
            .service(ping)
            .service(routes::projects::user_projects)
            .service(routes::projects::user_project)
            .service(routes::todos::project_todos)
            .service(routes::users::users)
            .service(routes::users::user)
            .app_data(web::Data::new(DbPool(pool.clone())))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
