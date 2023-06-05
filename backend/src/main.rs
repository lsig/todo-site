use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};
use dotenvy::dotenv;
use sqlx::{postgres::PgPoolOptions, Pool, Postgres};

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

    println!("Starting up...");
    std::thread::sleep(std::time::Duration::from_secs(4));
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

    println!("Migrating...");
    let _migration = match sqlx::migrate!("./migrations").run(&pool).await{
        Ok(_mig) => println!("Migration succesful"),
        Err(_) => println!("Migration failed")
    }; 

    std::thread::sleep(std::time::Duration::from_secs(2));

    println!("...Server started");
    HttpServer::new(move || {
        App::new()
            .service(ping)
            .service(routes::users::login_user)
            .service(routes::users::get_users)
            .service(routes::users::get_user)
            .service(routes::users::create_user)
            .service(routes::projects::user_projects)
            .service(routes::projects::user_project)
            .service(routes::projects::create_project)
            .service(routes::projects::update_project)
            .service(routes::projects::delete_project)
            .service(routes::todos::get_project_todos)
            .service(routes::todos::get_todo)
            .service(routes::todos::post_todo)
            .service(routes::todos::update_todo)
            .service(routes::todos::delete_todo)
            .app_data(web::Data::new(DbPool(pool.clone())))
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
