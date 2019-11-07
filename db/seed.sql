-- db WHAT DO I NEED INFORMATION ABOUT? https://www.digitaldoughnut.com/articles/2018/may/social-media-databases-the-best-practices

-- https://www.socialmediatoday.com/social-networks/how-create-and-manage-best-database-social-networking-sites
		
	-- All registered users (individual profiles or can one user have multiple profiles?)
	CREATE TABLE users (
		person_id SERIAL PRIMARY KEY,
		email VARCHAR(100), 
		username VARCHAR(50), 
		firstname VARCHAR(20), 
		lastname VARCHAR(40), 
		password VARCHAR(250), 
		profile_pic INTEGER REFERENCES amazon_location (file_id) 
		-- //VARCHAR(MAX)???	
	); 
-- https://www.quora.com/How-does-Facebook-maintain-a-list-of-friends-for-each-user-Does-it-maintain-a-separate-table-for-each-user
	-- CREATE TABLE friendships (
	-- 	friendship_id SERIAL PRIMARY KEY, 
	-- 	person_id1 INTEGER REFERENCES users (person_id), 
	-- 	person_id2 INTEGER REFERENCES users (person_id), 
	-- 	friendship_startdate
	-- );
-- https://stackoverflow.com/questions/19734154/followers-following-database-structure
	CREATE TABLE followers (
		id SERIAL PRIMARY KEY, 
		person_id INTEGER REFERENCES users (person_id),  
		follower_id INTEGER REFERENCES users (person_id)
	);
	CREATE TABLE posts???(
	-- 	post_id SERIAL PRIMARY KEY, 
	-- 	user_id INTEGER REFERENCES users (person_id), 
	-- 	post_body VARCHAR (5000), 
	-- 	post_photo VARCHAR(MAX)???, 
	-- 	post_video VARCHAR(MAX)???
	-- 	MULTIPLE PHOTOS AND VIDEOS???
	-- );
-- https://www.quora.com/How-can-I-store-photos-in-a-database-like-Facebook-Twitter-and-other-social-netwoks-do READ ALL REPLIES. 
	CREATE TABLE amazon_location (
		-- FOR STORING LOCATION OF PHOTOS AND VIDEOS AND SOUND FILES ON AMAZON S3)
		file_id SERIAL PRIMARY KEY, 
		person_id INTEGER REFERENCES users (person_id)
		-- , 
		-- file_title VARCHAR(50), 
		-- file_text VARCHAR(250)
	);
	CREATE TABLE pages (
		page_id SERIAL PRIMARY KEY, 
		person_id INTEGER REFERENCES users (person_id),
		page_title VARCHAR(50)
	);
	CREATE TABLE posts (
		post_id SERIAL PRIMARY KEY, 
		person_id INTEGER REFERENCES users (person_id), 
		page_id INTEGER REFERENCES pages (page_id),
		post_text VARCHAR(2500), 
		photo_1_id INTEGER REFERENCES amazon_location (file_id),
		video_1_id INTEGER REFERENCES amazon_location (file_id),
		sound_1_id INTEGER REFERENCES amazon_location (file_id)
	);