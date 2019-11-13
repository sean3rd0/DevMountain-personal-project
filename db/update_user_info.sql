UPDATE budr_users 
SET profile_pic = ${profilePic}, 
    email = ${email}, 
    firstname = ${firstname}, 
    lastname = ${lastname}
WHERE username = ${username} 

returning *; 