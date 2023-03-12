import express from 'express';
import path from 'path';
import request from 'request'
import https from 'https'
import mailchimp from "@mailchimp/mailchimp_marketing"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// import bodyParser from 'body-parser';


const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/signup.html")

})

mailchimp.setConfig({
    //*****************************ENTER YOUR API KEY HERE******************************
     apiKey: "b1de516e47741ba89b1702c161d8f0e1-us11",
    //*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
     server: "us11"
    });

app.post("/faliure",(req, res) =>{

    res.redirect("/")

})

app.post("/", (req, res) => {

    const firstName = req.body.fname;
    const secondName = req.body.lname;
    const email = req.body.email;
    //*****************************ENTER YOU LIST ID HERE******************************
    const listId = "d612d5a788";
    //Creating an object with the users data
    const subscribingUser = {
        firstName: firstName,
        lastName: secondName,
        email: email
    }; 
    //Uploading the data to the server
    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });
        //If all goes well logging the contact's id
        res.sendFile(__dirname + "/success.html")
        console.log(
            `Successfully added contact as an audience member. The contact's id is ${response.id
            }.`
        );

        // var firstName = req.body.fname
        // var lastName = req.body.lname
        // var email = req.body.email
        // var key = "b1de516e47741ba89b1702c161d8f0e1-us11"
        // var id = "d612d5a788"

        // var url = 

        // var data = {

        //     members: [

        //         {
        //             email_address: email,
        //             status: "subscribed",
        //             merge_fields: {
        //                 FNAME: firstName,
        //                 LNAME: lastName
        //             }

        //         }

        //     ]

        // }

        // var jsonData = JSON.stringify(data)

        // https.request(url, options, (response) => {



        // })
        // console.log(firstName,lastName,email);
        }
        run().catch(e => res.sendFile(__dirname + "/faliure.html"));

})

app.listen(process.env.PORT || 3000, () => {

    console.log("3000");

})