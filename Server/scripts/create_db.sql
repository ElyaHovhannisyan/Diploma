CREATE DATABASE IF NOT EXISTS LIBRARY;

use LIBRARY;

create table if not exists Students(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(100) NOT NULL,
   surname VARCHAR(100) NOT NULL,
   class VARCHAR(100) NOT NULL,
   email VARCHAR(200) NOT NULL Unique,
   PRIMARY KEY ( id )
);

INSERT INTO Students (name, surname, class, email)
VALUES ('Էլյա','Հովհաննիսյան','ՏՏ919', 'elyanora.hovhannisyan@polytechnic.am'); 
INSERT INTO Students (name, surname, class, email)
VALUES ('Ադա','Միրզոյան','ՏՏ919', 'ada.mirzoyan@polytechnic.am');
INSERT INTO Students (name, surname, class, email)
VALUES ('Քնարիկ','Ստեփանյան','ՏՏ919', 'qnarik.stepanyan@polytechnic.am');

create table if not exists Subjects(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(100) NOT NULL,
   PRIMARY KEY ( id )
);

INSERT INTO Subjects(name)
VALUES ("C#"), ("QA"), ("Java");

create table if not exists Books(
   id INT NOT NULL AUTO_INCREMENT,
   title VARCHAR(200) NOT NULL,
   author_name VARCHAR(100) NOT NULL,
   author_surname VARCHAR(100) NOT NULL,
   sub_id INT NOT NULL,
   link VARCHAR(200) NOT NULL Unique,
   description VARCHAR(300) NOT NULL,
   number VARCHAR(200) NOT NULL Unique,
   PRIMARY KEY ( id ),
   FOREIGN KEY (sub_id) REFERENCES Subjects(id)
);

create table if not exists Lecturers(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(100) NOT NULL,
   surname VARCHAR(100) NOT NULL,
   email VARCHAR(200) NOT NULL Unique,
   PRIMARY KEY ( id )
);

create table if not exists Lecturer_infos(
   id INT NOT NULL AUTO_INCREMENT,
   sub_id INT NOT NULL,
   lect_id INT NOT NULL,
   PRIMARY KEY ( id ),
   FOREIGN KEY (sub_id) REFERENCES Subjects(id),
   FOREIGN KEY (lect_id) REFERENCES Lecturers(id)
);

create table if not exists Lessons(
   id INT NOT NULL AUTO_INCREMENT,
   sub_id INT NOT NULL,
   class VARCHAR(100) NOT NULL,
   semester INT NOT NULL,
   PRIMARY KEY ( id ),
   FOREIGN KEY (sub_id) REFERENCES Subjects(id)
)