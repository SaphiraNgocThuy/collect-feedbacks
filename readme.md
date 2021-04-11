# COLLECT FEEDBACKS WIDGET



## 1. Installation

### Clone

- Clone this repo to your local machine using `https://github.com/SaphiraNgocThuy/collect-feedbacks.git`

### Setup

#### a. Frontend:
> Navigate to client folder
```shell
cd client
```

> Install dependencies
```shell
yarn install
```

> Run Frontend server
```shell
yarn start
```

#### b. Backend:
> Navigate to client folder
```shell
cd server
```

> Install dependencies
```shell
yarn install
```

> Run Backend server
```shell
yarn start
```

#### c. Setup Database:
> Create tables
```shell
CREATE DATABASE feedbacks;
USE feedbacks;
CREATE TABLE feedbacks (id INTEGER PRIMARY KEY AUTO_INCREMENT, rating INT4);
CREATE TABLE questions (id INTEGER PRIMARY KEY AUTO_INCREMENT, is_enable BOOLEAN default false, question_type ENUM('short_answer', 'email', 'linear_scale') NOT NULL, question VARCHAR(512), placeholder VARCHAR(512));
CREATE TABLE feedback_details (feedback_id INTEGER REFERENCES feedbacks(feedback_id), question_id INTEGER REFERENCES questions(question_id), feedback VARCHAR(512), PRIMARY KEY (feedback_id, question_id));
```

> Create initial questions
```shell
INSERT INTO questions (is_enable, question_type, question, placeholder, is_required)
VALUE 
(true, 'short_answer', 'What did you like most?', 'Tell us your experience', false),
(true, 'short_answer', 'What did you like least?', 'Let us know how to improve', false),
(true, 'email', 'Your email', 'Your email address', false);
(true, 'linear_scale', 'How would you rate our UI design?', '', false)

```

## 2. Demo
<img src="demo.gif" alt="demo" width="300"/>

## 3. Built With

  - [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
  - [Node.js®](https://nodejs.org/en/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
  - [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
  - [MySQL](https://www.mysql.com/) - The world's most popular open source database.