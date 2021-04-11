CREATE DATABASE feedbacks;
USE feedbacks;
CREATE TABLE feedbacks (id INTEGER PRIMARY KEY AUTO_INCREMENT, rating INT4, like_most VARCHAR(512), like_least VARCHAR(512), email VARCHAR(128));