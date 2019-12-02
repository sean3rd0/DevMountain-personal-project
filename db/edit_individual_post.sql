UPDATE budr_posts
SET post_text = ${body}, 
    date = ${date}
WHERE post_id = ${postid}; 

SELECT * FROM budr_posts
WHERE page_id = ${pageId}
ORDER BY post_id DESC;