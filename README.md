## TO-DO

1. Add hash map to socket storage for separating sockets by different rooms.
2. Authentication endpoint for post messages/post questions
3. Separate options on question feed for viewing a question and answering a question
4. Have feed refresh to show all questions from filtered questions when remove filter
5. Need separate function for joining a room to store the room's question details as state; need to add dispatches for get-messages.js and add to reducer/server.js
6. Make sure questionText and questionID is only emitted to your own reducer on postQuestionSuccess.
7. On post question success emit only the newly posted question to be appended onto others' questionFeed rather than emitting the entire questionFeed (and interfering with people using filters, etc.)
8. Add 'users online' section to landing-page and add 'users in room' section to a question room.
9. Add static content to routes (header/nav bar/footer, etc.)
10. Add styling
11. Add archived questions section for answered questions.
12. Add the screenhero integration.
13. Possibly change users primary key to user_name so you can click on them in the lobby to see their asked/answered questions.
14. Add some more stats/attributes/rankings for users.
15. Implement some kind of credits system for posting/answering questions. Adjust how many credits an answer is worth based on how long its gone unanswered. Maybe start users off with 5 credits for their first 5 questions.
16. Make rules and guidlines section about how to use site and behaviorial policy.
17. Make some kind of dropdown or input for adding tags when you post a new question and write function for this.
18. Figure out way to manage sockets arrays/room arrays when people enter/leave room/lobby. (maybe another schema for rooms - everytime a new question is posted, a new room is also added to the db - and a many-to-many relationship for rooms_users? )
19. Check inner join query in filter-questions function for accuracy now that we have questions_tags table.