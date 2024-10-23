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


app.post("/", (req, res) => {
    let userEmail = req.body.email;

    let foundUser = false;
    let myUser;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == userEmail) {
            myUser = users[i];
            foundUser = true;
            break;
        }
    }

    if(!foundUser){
        return res.status(400).json({
            message : "user nor found"
        });
    }

    let userAllPosts = [];
    for (let i = 0; i < posts.length; i++) {
        if (myUser.id == posts[i].userId) {
            userAllPosts.push(posts[i]);
        }
    }
    
    return res.status(200).json({
        msg : "succes",
        posts : userAllPosts
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

