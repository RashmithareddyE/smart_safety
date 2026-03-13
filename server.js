const express = require("express")
const fs = require("fs")

const app = express()

app.use(express.json())
app.use(express.static("public"))

const CONTACT_FILE="./data/contacts.json"
const TRAVEL_FILE="./data/travel.json"
const USER_FILE="./data/users.json"


function getTimeData(event,lat,lon){

const now=new Date()

return{

event:event,
date:now.toLocaleDateString(),
day:now.toLocaleString("en-US",{weekday:"long"}),
time:now.toLocaleTimeString(),
lat:lat,
lon:lon

}

}


app.post("/travel-start",(req,res)=>{

const {lat,lon}=req.body

const travel=JSON.parse(fs.readFileSync(TRAVEL_FILE))

travel.push(getTimeData("TRAVEL_START",lat,lon))

fs.writeFileSync(TRAVEL_FILE,JSON.stringify(travel,null,2))

res.send("travel stored")

})


app.post("/share-location",(req,res)=>{

const {lat,lon}=req.body

const travel=JSON.parse(fs.readFileSync(TRAVEL_FILE))

travel.push(getTimeData("GPS_SHARED",lat,lon))

fs.writeFileSync(TRAVEL_FILE,JSON.stringify(travel,null,2))

res.send("gps stored")

})


app.post("/sos",(req,res)=>{

const {lat,lon}=req.body

const travel=JSON.parse(fs.readFileSync(TRAVEL_FILE))

travel.push(getTimeData("SOS_ALERT",lat,lon))

fs.writeFileSync(TRAVEL_FILE,JSON.stringify(travel,null,2))

res.send("sos stored")

})


// save contact
app.post("/save-contact",(req,res)=>{

const {number} = req.body

let contacts = JSON.parse(fs.readFileSync(CONTACT_FILE))

// check duplicate
const exists = contacts.some(c => c.number === number)

if(exists){

return res.send("exists")

}

contacts.push({number:number})

fs.writeFileSync(CONTACT_FILE,JSON.stringify(contacts,null,2))

res.send("saved")

})


// get contacts
app.get("/get-contacts",(req,res)=>{

const contacts = JSON.parse(fs.readFileSync(CONTACT_FILE))

res.json(contacts)

})


app.post("/signup",(req,res)=>{

const {email,password} = req.body

let users = JSON.parse(fs.readFileSync(USER_FILE))

const exists = users.find(u => u.email === email)

if(exists){
    return res.send("exists")
}

users.push({email,password})

fs.writeFileSync(USER_FILE,JSON.stringify(users,null,2))

res.send("signup_success")

})


app.post("/login",(req,res)=>{

const {email,password} = req.body

let users = JSON.parse(fs.readFileSync(USER_FILE))

const user = users.find(u => u.email === email)

if(!user){
    return res.send("no_user")
}

if(user.password !== password){
    return res.send("wrong_password")
}

res.send("login_success")

})


app.listen(3000,()=>{

console.log("Server running at http://localhost:3000")

})