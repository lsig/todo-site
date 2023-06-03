use chrono::NaiveDate;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct CreateUser {
    pub username: String,
    pub password: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct CreateProject {
    pub project_name: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UpdateProject {
    pub project_name: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct CreateTodo {
    pub title: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
    pub priority: i32,
    pub completed: Option<bool>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub due_date: Option<chrono::NaiveDate>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UpdateTodo {
    pub title: Option<String>,
    pub description: Option<String>,
    pub priority: Option<i32>,
    pub completed: Option<bool>,
    pub due_date: Option<chrono::NaiveDate>,
}
