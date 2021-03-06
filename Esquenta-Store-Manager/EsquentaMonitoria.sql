DROP DATABASE IF EXISTS EsquentaMonitoria;

CREATE DATABASE EsquentaMonitoria;

USE EsquentaMonitoria;

CREATE TABLE talkers (
    id_talker INT NOT NULL auto_increment,
    name_talker VARCHAR(30) NOT NULL,
    age_talker INT NOT NULL,
    email_talker VARCHAR(80) NOT NULL,
    PRIMARY KEY(id_talker)
) ENGINE=INNODB;

CREATE TABLE talk (
    id INT NOT NULL auto_increment PRIMARY KEY,
    id_talker INT NOT NULL,
    watched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    rate INTEGER NOT NULL,
    FOREIGN KEY (id_talker)
        REFERENCES talkers (id_talker)
        ON DELETE CASCADE
) ENGINE=INNODB;
SET SQL_SAFE_UPDATES = 0;

INSERT INTO EsquentaMonitoria.talkers (name_talker, age_talker, email_talker) VALUES
    ("Henrique Albuquerque", 62, 'henrique.albuquerque10@gmail.com'),
    ("Heloísa Albuquerque", 67, 'heloisa.albuquerque10@gmail.com'),
    ("Ricardo Xavier Filho", 33, 'ricardo.xavier10@gmail.com'),
    ("Marcos Costa", 24, 'marcos.costa2022@gmail.com');

INSERT INTO EsquentaMonitoria.talk (id_talker, watched_at, rate) VALUES
    (1, NOW(), 5),
    (2, NOW(), 5),
    (3, NOW(), 5),
    (4, NOW(), 5);
