INSERT INTO questions (is_enable, question_type, question, placeholder, is_required)
VALUE 
(true, 'short_answer', 'What did you like most?', 'Tell us your experience', false),
(true, 'short_answer', 'What did you like least?', 'Let us know how to improve', false),
(true, 'email', 'Your email', 'Your email address', false),
(true, 'linear_scale', 'How would you rate our UI design?', '', false);
