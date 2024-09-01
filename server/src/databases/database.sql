CREATE DATABASE teknikstockop;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255),
    number_of_taken VARCHAR(255),
    number_of_loan VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE items(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    specification VARCHAR(255),
    merk VARCHAR(255),
    unit VARCHAR(255),
    init_amount INTEGER,
    total_recent INTEGER,
    number_of_taken INTEGER,
    number_of_loan INTEGER,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE login(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    created_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- CREATE TABLE logout(
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER,
--     created_at TIMESTAMP WITH TIME ZONE,
--     CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

CREATE TABLE user_update(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    username VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- CREATE TABLE notifications(
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER,
--     item_id INTEGER,
--     created_at TIMESTAMP WITH TIME ZONE,
--     CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
--     CONSTRAINT fk_item FOREIGN KEY(item_id) REFERENCES items(id) ON DELETE CASCADE
-- );

CREATE TABLE takens(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    item_id INTEGER,
    amount INTEGER,
    amount_recent INTEGER,
    unit VARCHAR(255),
    location VARCHAR(255),
    return_amount INTEGER,
    taken_time TIMESTAMP WITH TIME ZONE,
    return_time TIMESTAMP WITH TIME ZONE,
    status_user BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_item FOREIGN KEY(item_id) REFERENCES items(id) ON DELETE CASCADE
);

CREATE TABLE taken_item(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    item_id INTEGER,
    taken_amount INTEGER,
    unit VARCHAR(255),
    location VARCHAR(255),
    total_taken INTEGER,
    status VARCHAR(255),
    taken_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_item FOREIGN KEY(item_id) REFERENCES items(id) ON DELETE CASCADE
);

CREATE TABLE return_taken_item(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    item_id INTEGER,
    return_amount INTEGER,
    unit VARCHAR(255),
    location VARCHAR(255),
    total_return_amount INTEGER,
    status VARCHAR(255),
    taken_time TIMESTAMP WITH TIME ZONE,
    return_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_item FOREIGN KEY(item_id) REFERENCES items(id) ON DELETE CASCADE
);

CREATE TABLE finished_taken_item(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    item_id INTEGER,
    unit VARCHAR(255),
    location VARCHAR(255),
    total_taken INTEGER,
    finished_status VARCHAR(255),
    taken_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_item FOREIGN KEY(item_id) REFERENCES items(id) ON DELETE CASCADE
);

CREATE TABLE finished_taken_item(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255),
    item_name VARCHAR(255),
    merk VARCHAR(255),
    specification VARCHAR(255),
    total_taken INTEGER,
    unit VARCHAR(255),
    location VARCHAR(255),
    taken_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE loans(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    item_id INTEGER,
    amount INTEGER,
    amount_recent INTEGER,
    unit VARCHAR(255),
    location VARCHAR(255),
    return_amount INTEGER,
    loan_time TIMESTAMP WITH TIME ZONE,
    return_time TIMESTAMP WITH TIME ZONE,
    status_user BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_item FOREIGN KEY(item_id) REFERENCES items(id) ON DELETE CASCADE
);

CREATE TABLE loan_item(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    item_id INTEGER,
    loan_amount INTEGER,
    unit VARCHAR(255),
    location VARCHAR(255),
    total_loan INTEGER,
    status VARCHAR(255),
    loan_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_item FOREIGN KEY(item_id) REFERENCES items(id) ON DELETE CASCADE
);

CREATE TABLE return_loan_item(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    item_id INTEGER,
    return_amount INTEGER,
    unit VARCHAR(255),
    location VARCHAR(255),
    total_return_amount INTEGER,
    status VARCHAR(255),
    loan_time TIMESTAMP WITH TIME ZONE,
    return_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_item FOREIGN KEY(item_id) REFERENCES items(id) ON DELETE CASCADE
);

CREATE TABLE finished_loan_item(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255),
    item_name VARCHAR(255),
    specification VARCHAR(255),
    amount INTEGER,
    unit VARCHAR(255),
    location VARCHAR(255),
    return_amount INTEGER,
    loan_time TIMESTAMP WITH TIME ZONE,
    return_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE item_update(
    id SERIAL PRIMARY KEY,
    item_id INTEGER,
    name VARCHAR(255),
    specification VARCHAR(255),
    merk VARCHAR(255),
    unit VARCHAR(255),
    total_recent INTEGER,
    created_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_item FOREIGN KEY(item_id) REFERENCES items(id) ON DELETE CASCADE
);

