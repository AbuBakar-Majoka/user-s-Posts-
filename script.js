const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 3000;

app.use(express.json());

let users = [];
let posts = [];

function fetchData() {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(d => {
            users = d;
        });

        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(d => {
            posts = d;
        });
}
fetchData();

// console.log(users);

function getUser(userEmail){
    let foundUser;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == userEmail) {
            foundUser = users[i];
            break;
        }
    }
    return foundUser;
}

function getPosts(postOwnerId) {
    let userAllPosts = [];
    for (let i = 0; i < posts.length; i++) {
        if (postOwnerId == posts[i].userId) {
            userAllPosts.push(posts[i]);
        }
    }
    return userAllPosts;
}

app.post("/", (req, res) => {
    let userEmail = req.body.email;

    let user = getUser(userEmail);

    if(!user){
        return res.status(400).json({
            message : "user nor found"
        });
    }

    let userPosts = getPosts(user.id);
    
    return res.status(200).json({
        msg : "succes",
        posts : userPosts
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

