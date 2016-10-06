# codeUp ### beta
codeUp is a platform that provides answers to your programming questions in real-time by your peers and experts in 1-on-1 chat rooms that are seamlessly integrated with a reactive, collaborative Firepad code editor.

To initilize the app, create a user account and log in/authenticate with your GitHub credentials. Ask your question, add relevant tags by topic, then see your question appear in a real-time lobby queue. Another user then picks up your question and invites you into a 1-on-1 chat room to discuss and pair program solutions to your programming dilemma.

The backend is built with Node.js and Socket.io and frontend built with React and Redux and Firepad.io. PostgreSQL database used for storing users, questions, topic tags, and chat messages so an expert can review chat log to continue helping a user with their question from where another expert left off.

## Screenshots

![codeUP beta screenshot](./img/chatroom.png "codeUp")


## Live Deployment

Live demo can be seen at: https://officehours.herokuapp.com/#/?_k=3sm66a

## Local Setup

Steps below for setting up Code Roulette locally.

### BACKEND:
--Setting up the database and backend server.

	1. Install postgreSQL using homebrew:
			$ brew install postgresql

	2. Install postgreSQL node-module using NPM:
			$ npm install --save pg

	3. Launch postgreSQL using homebrew:
			$ brew services start postgresql

	4. In project directory, create new db:
			$ createdb *INSERT_DB_NAME*

	5. Connect model tables (schema.sql) db:
			$ psql -d *INSERT_DB_NAME* < *INSERT_SCHEMA.SQL_PATH*

	6. Access database:
			$ psql -d *INSERT_DB_NAME*

	* `createdb chat`
	* `psql -d chat < backend/database/schema.sql`
	* `psql -d chat`
	* `insert into users (user_name) values ('Alex');`
	* `insert into questions (user_id, question_text, when_asked, is_answered) values (1, 'this is the questions text', '1999-01-08 04:05:06', false);`

--Queries for accessing the SQL database directly.

	Query examples:
		-CREATE:
			$ insert into *INSERT_TABLE* (*INSERT_COLUMN_1*, *INSERT_COLUMN_2*) values ('*INSERT_VALUE_1*', '*INSERT_VALUE_2*');
			'1999-01-08 04:05:06' (format timestamp like this)
		-READ:
			$ select * from *INSERT_TABLE*;
			$ select *INSERT_VALUE from *INSERT_TABLE*;
			$ select *INSERT_COLUMN_1*, *INSERT_COLUMN_2* from *INSERT_TABLE* where *INSERT_COLUMN_1*='*INSERT_VALUE_1*';
		-UPDATE:
			$ update *INSERT_TABLE* set *INSERT_COLUMN_1*='*INSERT_VALUE_1*' where *INSERT_VALUE_2*='*INSERT_COLUMN_2*';
		-DELETE:
			$ delete from *INSERT_TABLE* where *INSERT_COLUMN_1*='*INSERT_VALUE_1*';

## Authors

* [Ben Young](https://github.com/URL) - *Project Manager*

* [Alex Bang](https://github.com/URL) - *Front-End and Designer*

* [Sean Jun](https://github.com/URL) - *Co-Product Manager + CI/Testing*

* [Joe Seago](https://github.com/URL) - *Co-Product Manager + DevOps*

Also see the list of [contributors](https://github.com/seanjun21/code-roulette/contributors) for their specific commits to this project.

## Acknowledgments

* [Socket.io](http://socket.io)
* [Firepad.io](https://firepad.io)
