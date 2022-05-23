DROP SCHEMA IF EXISTS Tasks_Manager;
CREATE SCHEMA IF NOT EXISTS Tasks_Manager;

CREATE TABLE Tasks_Manager.Tasks (
    id INTEGER PRIMARY KEY AUTO_INCREMENT ,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0
);

INSERT INTO
    Tasks_Manager.Tasks (title, description, completed)
VALUES
    ('Ler o Course', 'Ver o Bloco 20.4', 0),
    ('Trabalhar', 'Summer', 1),
    ('Testes do Store Manager', 'Fazer os testes unitários', 0),
    ('Fazer o deploy', 'Fazer o deploy do projeto no Heroku', 1);
