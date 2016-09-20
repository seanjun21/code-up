create table if not exists users (
    id serial primary key,
    username text not null,
);

create table if not exists questions (
    id serial primary key,
    question text not null,
    whenasked timestamp not null,
    anwered boolean not null
    /* FOREIGN KEY ref users_id */
);

create table if not exists messages (
    id serial primary key,
    message text not null
    whensent timestamp not null
    /* FOREIGN KEY ref questions_id */

);

create table if not exists tags (
    id serial primary key,
    tag text not null
    /* FOREIGN KEY ref questions_id */
);
