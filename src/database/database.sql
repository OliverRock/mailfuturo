CREATE DATABASE mailfuturo

CREATE TABLE message(
    pk SERIAL PRIMARY KEY,
    email_address varchar(128) NOT NULL,
    message_text varchar(128) NOT NULL,
    delivery_date DATE NOT NULL,
    created_timestamp timestamp NOT NULL default current_timestamp,
    isValidated bool NOT NULL
);