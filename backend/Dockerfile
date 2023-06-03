FROM rust:1.70.0-slim-buster as builder

WORKDIR /usr/src/todo-app

RUN mkdir src 

RUN echo "fn main() {}" > ./src/main.rs

# Copy only the Cargo.toml and Cargo.lock files first
COPY Cargo.toml Cargo.lock ./

# # Build the dependencies separately to leverage Docker's caching mechanism
RUN cargo build --release --locked

# Copy the rest of the source code
RUN rm -rf ./src
COPY . .

# The last modified attribute of main.rs needs to be updated manually,
# otherwise cargo won't rebuild it.
RUN touch -a -m ./src/main.rs

# Build the application
RUN cargo build --release --locked

FROM debian:bullseye-slim

RUN apt-get update && rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/src/todo-app/target/release/todo-app /usr/local/bin/todo-app
COPY --from=builder /usr/src/todo-app/.env ./

EXPOSE 8080

CMD ["todo-app"]
