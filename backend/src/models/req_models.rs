use chrono::NaiveDate;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct CreateUser {
    pub username: String,
    pub password: String,
}

pub struct CreateProject {
    name: String,
    user_id: i32,
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
