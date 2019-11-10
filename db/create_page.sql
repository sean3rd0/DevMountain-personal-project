INSERT INTO budr_pages (
    person_id, 
    page_title
) VALUES (
    ${personId}, 
    ${pageTitle}
); 

SELECT * FROM budr_pages WHERE person_id = ${personId} ORDER BY page_id ASC LIMIT 1;