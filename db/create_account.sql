INSERT INTO budr_users (
    username, 
    password
) VALUES (
    ${username}, 
    ${password}
)

returning *;