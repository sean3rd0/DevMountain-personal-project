INSERT INTO budr_posts (
    person_id, 
    page_id, 
    post_text,
    date
) VALUES (
    ${personid},
    ${pageid},
    ${body},
    ${date} 
)

returning *; 



-- person_id, 
--     page_id
-- ) values (
--     ${date}, 
--     ${body}, 
--     (select person_id
--         FROM budr_users 
--         WHERE username = ${username}
--     ), 
--     (select page_id 
--         FROM budr_pages 
--         WHERE person_id = (
--             select person_id
--                 FROM budr_users 
--                 WHERE username = ${username}
--         ))
-- ); 

-- SELECT * from budr_posts 
-- WHERE page_id = (
--     select page_id 
--     FROM budr_pages 
--     WHERE person_id = (
--         select person_id
--         FROM budr_users 
--         WHERE username = ${username}
--     )
-- );


-- WHERE page_id = (
--     SELECT page_id
--     FROM budr_pages 
--     WHERE person_id = (
--         SELECT person_id 
--         FROM budr-users 
--         WHERE username = ${username}
--     ) 
--     -- order by page_id ASC
--     --     LIMIT 1
-- ) 

-- returning *; 