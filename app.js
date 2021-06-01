const express = require("express");
const request = require("request");
const app = express();

const https = require("https");

app.use(express.static("public"));

const bodyparser = require("body-parser");


app.use(bodyparser.urlencoded({extended:true}));



app.get("/" , function(req,res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/" , function(req,res) {

    const Firstname = req.body.fname;
    const LastName = req.body.lname;
    const email = req.body.mail;

    const data = {
      
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: Firstname,
                    LNAME: LastName,
                }
            }
        ]
    };
     const jsonData =JSON.stringify(data);

      const url = "https://us6.api.mailchimp.com/3.0/lists/04b5bef61d";
      
      const options = {
          method: "POST",
          auth: "Praveen:d72b850eb68a3f719c1d8dca92d0b1cc-us6",

      }

     const request =  https.request(url , options , function(response) {

     if(response.statusCode===200)
     res.sendFile(__dirname + "/success.html");
     else
     res.sendFile(__dirname + "/failure.html");
     

      response.on("data" , function(data) {
          console.log(JSON.parse(data));
      })

      })

      request.write(jsonData);
      request.end();
})


// api Key
// d72b850eb68a3f719c1d8dca92d0b1cc-us6

// unique id
// 04b5bef61d





app.post("/failure" , function(req,res) {
    res.redirect("/");
})






app.listen(process.env.PORT || 3000 , function(){
    console.log("Server started!");
});