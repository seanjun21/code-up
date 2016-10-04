create table if not exists users ( 
    id serial primary key,
    user_name text not null unique
);

create table if not exists questions (
    id serial primary key,
    user_id integer not null references users,
    question_text text not null,
    when_asked timestamp not null default now(),
    is_answered boolean
);

create table if not exists messages (
    id serial primary key,
    question_id integer not null references questions,
    message_text text not null,
    user_name text not null,
    when_sent timestamp not null default now()
);

create table if not exists tags (
    id serial primary key,
    tag text not null,
    question_id integer references questions
);
