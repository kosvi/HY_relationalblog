CREATE TABLE blogs (id SERIAL PRIMARY KEY, author TEXT, url TEXT NOT NULL, title TEXT NOT NULL, likes INTEGER DEFAULT 0);
INSERT INTO blogs (author, url, title) values ('Pekka Paka', 'http://testblog.codecache.eu', 'TestBlog');
INSERT INTO blogs (url, title, likes) values ('http://blog2.codecache.eu', 'Blog2', 10);
