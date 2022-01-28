const express = require('express');
const bodyParser = require('body-parser')

const app = express()
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


const users = [
    {
        name:"Ganesh",
        profileUrl : "https://cdn.dribbble.com/users/2878951/screenshots/14013747/media/603f0b853c409547dfa51cba996f375c.png?compress=1&resize=1200x900",
        status:"notviewed",
        userId:1
    },
    {
        name:"Vighnesh",
        profileUrl : "https://cdn.dribbble.com/users/2878951/screenshots/14013747/media/603f0b853c409547dfa51cba996f375c.png?compress=1&resize=1200x900",
        status:"notviewed",
        userId:2
    },
    {
        name:"Harsha",
        profileUrl : "https://cdn.dribbble.com/users/2878951/screenshots/14013747/media/603f0b853c409547dfa51cba996f375c.png?compress=1&resize=1200x900",
        status:"notviewed",
        userId:3
    }
]


app.get("/",function(req,res){
    res.render("home",{usersList:users});
})

app.get("/user/:userId",function(req,res){
    const userId  = req.params.userId;
    for(var i=0; i< users.length;i++){
        if(userId ==users[i].userId){
            res.render("user",{userDetails:users[i]});
        }
    }
})


app.post("/search",function(req,res){
    const userName = req.body.searchedName;
    const filteredUsers = [];
    for(var i=0; i< users.length;i++){
        if(users[i].name.includes(userName)){
            filteredUsers.push(users[i]);
        }
    }
    res.render("home",{usersList:filteredUsers});
})


app.get("/change/:userId/:option",function(req,res){
    const option = req.params.option;
    const userId = req.params.userId;
    for(var i=0; i< users.length;i++){
        if(userId ==users[i].userId){
            users[i].status = option;
            res.render("user",{userDetails:users[i]});
        }
    }  
})


app.get("/list/:option",function(req,res){
    const option = req.params.option;
    const arr = [];
    for(var i=0; i< users.length;i++){
        if(option ==users[i].status){
            arr.push(users[i]);
        }
    }  
    res.render("home",{usersList:arr});
})

app.get("/adduser",function(req,res){
    res.render("adduser");

})
app.post("/adduser",function(req,res){
    var newuser = {
        name : req.body.name,
        profileUrl : req.body.link,
        userId :(users.length+1),
        status :"notviewed"
    }
    users.push(newuser);
    res.redirect("/")

})





app.listen(3000,function() {console.log("Server is running.")})