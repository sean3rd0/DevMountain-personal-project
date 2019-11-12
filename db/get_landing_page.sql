SELECT * FROM budr_pages WHERE person_id = (
    SELECT person_id FROM budr_users WHERE username = $1
);