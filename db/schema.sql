CREATE DATABASE golf_courses_db;

USE golf_courses_db;

CREATE TABLE golf_courses
(
	id int NOT NULL AUTO_INCREMENT,
	course_name varchar(255) NOT NULL,
	played BOOLEAN,
	PRIMARY KEY (id)
);