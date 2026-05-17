const express = require("express")
const connectDB = require("./config/db")
const fs = require("fs")
const authRoutes = require("./routes/authRoutes")
const contactRoutes = require("./routes/contactRoutes")
const travelRoutes = require("./routes/travelRoutes")
const riskRoutes = require("./routes/riskRoutes")

const app = express()
connectDB()

app.use(express.json())
app.use(express.static("public"))
app.use(authRoutes)
app.use(contactRoutes)
app.use(travelRoutes)
app.use(riskRoutes)
const CONTACT_FILE = "./data/contacts.json"
const TRAVEL_FILE = "./data/travel.json"
const USER_FILE = "./data/user.json"
const RISK_FILE = "./data/risk.json"

function getTimeData(event, lat, lon) {

const now = new Date()

return {

event: event,
date: now.toLocaleDateString(),
day: now.toLocaleString("en-US", { weekday: "long" }),
time: now.toLocaleTimeString(),
lat: lat,
lon: lon

}

}

/* SERVER */
app.listen(3000, () => {

console.log("Server running at http://localhost:3000")

})