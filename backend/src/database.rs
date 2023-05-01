use sqlx::{postgres::PgPoolOptions, Pool, Postgres};

#[derive(Clone)]
struct DbPool(Pool<Postgres>);

#[actix_web::main]
pub async fn db_pool() -> Result<DbPool, sqlx::Error> {
    let pool = DbPool(PgPoolOptions::new()
        .max_connections(5)
        .connect("postgres://postgres:root@localhost:5432/todo_database").await?);

    Ok(pool)
}
