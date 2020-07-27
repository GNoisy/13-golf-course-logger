CREATE DATABASE golf_courses_db;

USE golf_courses_db;

CREATE TABLE golf_courses
(
	id int NOT NULL AUTO_INCREMENT,
	courseName varchar(255) NOT NULL,
	played BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);