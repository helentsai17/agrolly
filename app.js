//jshint esversion:6

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https');
const { response } = require('express');



const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');

app.get('/',function(req,res){
    // res.render("index")
    res.sendFile(__dirname+ "/index.html")
})

app.get('/about',function(req,res){
    res.sendFile(__dirname+ "/about.html")
})

app.get('/media',function(req,res){
    res.sendFile(__dirname+ "/media.html")
})

app.get('/tech',function(req,res){
    res.sendFile(__dirname+ "/technology.html")
})

app.get('/research',function(req,res){
    res.sendFile(__dirname+ "/research.html")
})

app.post('/',function(req, res){

    const name = req.body.yourname;
    const email = req.body.youremail;

    console.log(name, email)

    const data = {
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME:name
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/fa5929e66c"

    const option = {
        method: "POST",
        auth:"helentsai:816457cd722a71e1eef2aa62a5267d2b-us10"
    }

    const request = https.request(url,option,function(response){
        if(response.statusCode ===200){
            res.sendFile(__dirname+ "/success.html")
        }else{
            res.sendFile(__dirname+ "/failure.html")
        }


        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData);
    request.end();

})


app.post("/failure", function(req,res){
    res.redirect("/")
})

app.post("/success", function(req,res){
    res.redirect("/")
})

app.listen(3400 ,function(){
    console.log("server is running on port 3400");
    
})