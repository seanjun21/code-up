create table if not exists users (
    id serial primary key,
    user_name text not null unique
);

create table if not exists questions (
    id serial primary key,
    user_id integer not null references users,
    question_text text not null,
    when_asked timestamp not null,
    -- '1999-01-08 04:05:06'
    is_answered boolean
);

create table if not exists messages (
    id serial primary key,
    question_id integer not null references questions,
    message_text text not null,
    user_name text not null,
    when_sent timestamp not null
);

create table if not exists tags (
    id serial primary key,
    tag text not null unique
);

create table if not exists questions_tags (
    question_id integer references questions,
    tag_id integer references tags,
    primary key (question_id, tag_id)
);

