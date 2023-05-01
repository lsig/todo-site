
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
mod database;


#[get("/ping")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Pong!")
}
//
// #[get("/api/v1/projects/{user_id}")]
// async fn todos() -> impl Responder {
//     HttpResponse::Ok().body("Hello");
// }

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let pool = database::db_pool();

    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(echo)
            .app_data(web::Data::new(pool.clone()))
            .route("/hey", web::get().to(manual_hello))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
