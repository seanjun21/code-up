create table if not exists users (
    user_id serial primary key,
    username text not null,
);

create table if not exists questions (
    question_id serial primary key,
    question_text text not null,
    whenasked timestamp not null,
    anwered boolean not null
    /* FOREIGN KEY ref users_id */
);

create table if not exists messages (
    message_id serial primary key,
    message_text text not null
    whensent timestamp not null
    /* FOREIGN KEY ref questions_id */
);

create table if not exists tags (
    tag_id serial primary key,
    tag text not null
    /* FOREIGN KEY ref questions_id */
);
