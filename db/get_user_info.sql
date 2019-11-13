SELECT 
    u.person_id, 
    u.email, 
    u.username, 
    u.firstname, 
    u.lastname, 
    u.password, 
    u.profile_pic, 
    pa.person_id,
    pa.page_id, 
    pa.page_title
FROM 
    budr_users u 
JOIN 
    budr_pages pa 
ON u.person_id = pa.person_id 
WHERE u.username = ${username};

-- SELECT * FROM budr_users WHERE username = $1;