use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, sqlx::FromRow)]
pub struct UserModel {
    pub user_id: i32,
    pub username: String,
    pub password: String,
}

#[derive(Debug, Deserialize, Serialize, sqlx::FromRow)]
pub struct ProjectModel {
    pub project_id: i32,
    pub user_id: i32,
    pub project_name: String,
}

#[derive(Debug, Deserialize, Serialize, sqlx::FromRow)]
pub struct TodoModel {
    pub todo_id: i32,
    pub title: String,
    pub description: Option<String>,
    pub priority: i32,
    pub completed: Option<bool>,
    pub due_date: Option<chrono::NaiveDate>,
    pub project_name: String,
    pub project_id: i32,
    pub user_id: i32,
}
