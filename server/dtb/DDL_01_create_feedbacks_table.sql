CREATE DATABASE feedbacks;
USE feedbacks;
CREATE TABLE feedbacks (id INTEGER PRIMARY KEY AUTO_INCREMENT, rating INT4);
CREATE TABLE questions (id INTEGER PRIMARY KEY AUTO_INCREMENT, is_enable BOOLEAN default false, question_type ENUM('short_answer', 'email', 'linear_scale') NOT NULL, question VARCHAR(512), placeholder VARCHAR(512));
CREATE TABLE feedback_details (feedback_id INTEGER REFERENCES feedbacks(feedback_id), question_id INTEGER REFERENCES questions(question_id), feedback VARCHAR(512), PRIMARY KEY (feedback_id, question_id));