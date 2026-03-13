let lastLat = null
let lastLon = null
let stopTimer = null
let autoSOS = null

window.onload = function () {
  document.getElementById("popup").style.display = "block"
  loadContacts()
}

function closePopup() {
  document.getElementById("popup").style.display = "none"
}

function getLocation(callback) {
  navigator.geolocation.getCurrentPosition((pos) => {
    callback(pos.coords.latitude, pos.coords.longitude)
  })
}

/* START TRAVEL + START TRACKING */
function startTravel(){

closePopup()

navigator.geolocation.getCurrentPosition((pos)=>{

const lat = pos.coords.latitude
const lon = pos.coords.longitude

fetch("/travel-start",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({lat,lon})
})
.then(res=>res.text())
.then(data=>{
alert("Travel started and location stored")
})

})

setTimeout(function(){

document.getElementById("safetyBox").style.display="block"

/* AUTO SOS AFTER 5 SECONDS IF NO RESPONSE */
autoSOS = setTimeout(function(){
sendSOS()
},5000)

},20000)
}

/* AFTER 10 SECONDS SHOW SAFETY CHECK */
setTimeout(function(){

document.getElementById("safetyBox").style.display="block"

},10000)



/* SHARE GPS BUTTON (also checks stop) */
function shareLocation(){

navigator.geolocation.getCurrentPosition((pos)=>{

const lat = pos.coords.latitude
const lon = pos.coords.longitude

fetch("/share-location",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({lat,lon})
})
.then(res=>res.text())
.then(data=>{
alert("Location sent successfully")
})

})

}


/* SOS */
function sendSOS() {

  getLocation((lat, lon) => {

    fetch("/sos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lat, lon })
    })

    alert("SOS sent")

  })
}

/* SAFETY POPUP BUTTONS */


function sendAlert(){

clearTimeout(autoSOS)

document.getElementById("safetyBox").style.display="none"

sendSOS()

}

/* CONTACTS */
function addContact() {

  const number = prompt("Enter emergency contact number")

  fetch("/save-contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ number })
  })
    .then(res => res.text())
    .then(data => {

      if (data === "exists") {
        alert("Contact already present")
      } else {
        alert("Contact saved successfully")
        loadContacts()
      }

    })
}

function loadContacts() {

  fetch("/get-contacts")
    .then(res => res.json())
    .then(data => {

      const list = document.getElementById("contactList")
      list.innerHTML = ""

      data.forEach(c => {
        const div = document.createElement("div")
        div.innerText = c.number
        list.appendChild(div)
      })

    })
}

/* LOGIN / SIGNUP */
function openLogin() {
  document.getElementById("loginPopup").classList.remove("hidden")
}

function closeLogin() {
  document.getElementById("loginPopup").classList.add("hidden")
}

function openSignup() {
  document.getElementById("signupPopup").classList.remove("hidden")
}

function closeSignup() {
  document.getElementById("signupPopup").classList.add("hidden")
}

app.post("/signup",(req,res)=>{

const {email,password}=req.body

let users = JSON.parse(fs.readFileSync(USER_FILE,"utf8") || "[]")

const exists = users.find(u => u.email === email)

if(exists){
return res.send("exists")
}

users.push({email,password})

fs.writeFileSync(USER_FILE,JSON.stringify(users,null,2))

res.send("signup success")

})

function login() {

  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.text())
    .then(data => {

      if (data === "login success") {
        alert("Login successful")
      } else {
        alert("Invalid login")
      }

    })
}
function generateRisk(){

let risk = Math.floor(Math.random()*60)+20

document.getElementById("riskPercent").innerText = risk + "%"

}

function staySafe(){

clearTimeout(autoSOS)

document.getElementById("safetyBox").style.display="none"

generateRisk()

}
function saveRiskMessage(){

let msg = document.getElementById("riskMessage").value

if(msg===""){
alert("Please enter a message")
return
}

fetch("/save-risk",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({message:msg})
})
.then(res=>res.text())
.then(data=>{
alert("Message saved successfully")
})

document.getElementById("riskMessage").value=""

}