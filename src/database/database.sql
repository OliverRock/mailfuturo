CREATE DATABASE mailfuturo

CREATE TABLE message(
    pk SERIAL PRIMARY KEY,
    email_address varchar(128),
    message varchar(128),
    isValidated bool
);