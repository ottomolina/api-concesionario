create database db_app;

create user 'app'@'localhost' identified by 'app_123$';

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, ALTER, TRIGGER
    ON db_app.*
    TO 'app'@'localhost';

flush privileges;

