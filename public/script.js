window.onload = function(){

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


// Travel start
function startTravel(){

getLocation((lat,lon)=>{

fetch("/travel-start",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({lat,lon})

})

})

closePopup()

}


// Share GPS
function shareLocation(){

getLocation((lat,lon)=>{

fetch("/share-location",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({lat,lon})

})

alert("Location shared")

})

}


// SOS
function sendSOS(){

getLocation((lat,lon)=>{

fetch("/sos",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({lat,lon})

})

alert("SOS sent")

})

}


// Add contact
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

alert("Contact already saved")

}else{

alert("Contact saved")

loadContacts()

}

})

}


// Load contacts
function loadContacts(){

fetch("/get-contacts")

.then(res=>res.json())

.then(data=>{

const list = document.getElementById("contactList")

list.innerHTML=""

data.forEach(c=>{

const div=document.createElement("div")

div.innerText=c.number

list.appendChild(div)

})

})

}