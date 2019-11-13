DELETE FROM budr_pages 
WHERE person_id = (
    SELECT person_id 
    FROM budr_users 
    WHERE username = ${username}
); 

DELETE FROM budr_users 
WHERE username = ${username};