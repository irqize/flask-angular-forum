PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE categories (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    desc TEXT NOT NULL
);
CREATE TABLE posts(
    id INTEGER NOT NULL PRIMARY KEY,
    thread_id INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    time_created INTEGER NOT NULL,
    FOREIGN KEY(thread_id) REFERENCES threads(id),
    FOREIGN KEY(author_id) REFERENCES accounts(id)
);
CREATE TABLE subcategories (
    id INTEGER NOT NULL PRIMARY KEY,
    cat_id INTEGER NOT NULL,
    name VARCHAR(30) NOT NULL,
    desc TEXT NOT NULL,
    FOREIGN KEY(cat_id) REFERENCES categories(id)
);
CREATE TABLE threads(
    id INTEGER NOT NULL PRIMARY KEY,
    sub_cat_id INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    title VARCHAR(30) NOT NULL,
    time_created INTEGER NOT NULL, content NOT NULL,
    FOREIGN KEY(author_id) REFERENCES accounts(id),
    FOREIGN KEY(sub_cat_id) REFERENCES subcategories(id)
);
CREATE TABLE accounts (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    mail VARCHAR(50) NOT NULL,
    avatar_url VARCHAR(12),
    time_created INTEGER NOT NULL, 
    password TEXT NOT NULL, 
    is_admin INTEGER
);