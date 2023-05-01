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
    pub name: String,
    pub user_id: i32,
}

pub struct TodoModel {
    pub todo_id: i32,
    pub title: String,
    pub description: Option<String>,
    pub priority: i32,
    pub completed: bool,
    pub due_date: Option<chrono::DateTime<chrono::Utc>>,
    pub project_id: i32,
}
