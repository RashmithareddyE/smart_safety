window.onload=function(){

document.getElementById("popup").style.display="block"

loadContacts()

}

function closePopup(){

document.getElementById("popup").style.display="none"

}

function getLocation(callback){

navigator.geolocation.getCurrentPosition((pos)=>{

callback(pos.coords.latitude,pos.coords.longitude)

})

}

function startTravel(){

getLocation((lat,lon)=>{

fetch("/travel-start",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({lat,lon})

})

})

closePopup()

}

function shareLocation(){

getLocation((lat,lon)=>{

fetch("/share-location",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({lat,lon})

})

alert("Location shared")

})

}

function sendSOS(){

getLocation((lat,lon)=>{

fetch("/sos",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({lat,lon})

})

alert("SOS sent")

})

}

function addContact(){

const number = prompt("Enter emergency contact number")

fetch("/save-contact",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({number})

})

.then(res=>res.text())

.then(data=>{

if(data === "exists"){

alert("Contact already present")

}else{

alert("Contact saved successfully")
loadContacts()

}

})

}

function openLogin(){

document.getElementById("loginPopup").classList.remove("hidden")

}

function closeLogin(){

document.getElementById("loginPopup").classList.add("hidden")

}

function openSignup(){

document.getElementById("signupPopup").classList.remove("hidden")

}

function closeSignup(){

document.getElementById("signupPopup").classList.add("hidden")

}

function signup(){

const email=document.getElementById("signupEmail").value
const password=document.getElementById("signupPassword").value

fetch("/signup",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({email,password})

})

.then(res=>res.text())

.then(data=>{

if(data==="exists"){

alert("Email already exists. Please login.")

}else{

alert("Signup successful")

}

})

}

function login(){

const email=document.getElementById("loginEmail").value
const password=document.getElementById("loginPassword").value

fetch("/login",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({email,password})

})

.then(res=>res.text())

.then(data=>{

if(data==="login success"){

alert("Login successful")

}else{

alert("Invalid login")

}

})

}