document.getElementById("bodyContainer").style.display = "none";
document.getElementById("EventPageBodyDiv").style.display = "none";
document.getElementById("PageHeader").style.display = "none";
let apiResultsUsers = [];
let apiResultsEvents = [];


// Log Out Button Start Here
let logOutBtn = document.getElementById("logout");
logOutBtn.addEventListener("click", function () {
    currentUser = null;
    document.getElementById("mainEventPageBody").style.display = "none";
    document.getElementById("PageHeader").style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById("bodyContainer").style.display = "none";
});
// Log Out Button End Here

let newUsersArray = [];

// REGISTER NEW USER ON OUR APLICATION START HERE

class CreateProfile {
    constructor(Name, lastName, password, birthDay, email, gender) {
        this.id =
            this.firstName = Name;
        this.lastName = lastName;
        this.password = password;
        this.birthday = birthDay;
        this.email = email,
            this.region = null;
        this.createdID = null;
        this.goingeventID = null;
        this.profilePhoto = null;
        this.gender = GetGender(gender);
    }

}

function GetGender(gender) {
    {
        for (i = 0; i < gender.length; i++) {
            if (gender[i].checked == true) {
                return gender[i].defaultValue;
            }
        }
        return false;
    }
}

// REGISTER NEW USER ON OUR APLICATION END HERE

// LOG IN INFORMATION AND VALIDATION START HERE

let logMail = document.getElementById("LogMail");
let logPass = document.getElementById("LogPassword");
let logInBtn = document.getElementById("LogInBtn");

function userDataApiCall() {
    let response = fetch("https://raw.githubusercontent.com/DonevskiFilip/PublicAPI/master/LetsDoItApi.json")
        .then(x => x.json())
        .then(x => {
            return x
        });
    return response
}

let currentUser; // DO NOT DELETE THIS LINE!!!!*****
let logInUser; // DO NOT DELETE THIS LINE TO !!!!****
function logInValidation(inputEmail, pass, usersData, eventsData) {
    currentUser = usersData.find(x => x.email == inputEmail);
    logInUser = currentUser;
    if (currentUser != undefined && currentUser != null) {
        if (currentUser.password === pass) {
            UserProfile(currentUser, eventsData);
            document.getElementById("PageHeader").style.display = "flex";
            document.getElementById("main").style.display = "none";
            document.getElementById("EventPageBodyDiv").style.display = "flex";
            document.getElementById("mainEventPageBody").style.display = "flex";
            return;
        }
        return console.log("Something is wrong with you Password");
    }
    return console.log("Something is wrong with you email");
}
let apiDataResults;

logInBtn.addEventListener("click", async function () {
    let logMail = document.getElementById("LogEmail").value;
    let logPass = document.getElementById("LogPassword").value;
    resultFromApi = await userDataApiCall();
    resultFromApi.Users.forEach(x => apiResultsUsers.push(x));
    console.log(apiResultsUsers);
    apiResultsEvents = resultFromApi.Events;
    logInValidation(logMail, logPass, apiResultsUsers, apiResultsEvents);

});

// LOG IN INFORMATION AND VALIDATION END HERE

// FILL UP PROFILE PAGE WITH USER INFORMATION SECTION START

// Personal Info Divs
let userNameHeader = document.getElementById("username");
let userProfilePhoto = document.getElementById("profilePhotoImg");
let userProfileName = document.getElementById("userFirstNameID");
let userPrifileRegion = document.getElementById("userRegionID");
let userProfileBirthDay = document.getElementById("userBirthdayID");
let userProfileGender = document.getElementById("userGenderID");
let userProfileEmailAddress = document.getElementById("userEmailAddressID");

// Evenas Info Divs

let userEventName = document.getElementById("eventName");
let userEventLocation = document.getElementById("eventLocation");
let userEventDiscription = document.getElementById("eventDiscription");
let userEventBegining = document.getElementById("eventBeggining");
let userEventEnding = document.getElementById("eventEnding");
let userEventDeparture = document.getElementById("eventDeparture");
let userEventCreator = document.getElementById("eventCreator");
let userEventOpenPostion = document.getElementById("openPosition");

// Function to Fill Up Profile Page with information



function UserProfile(user, events) {

    userNameHeader.innerHTML = `${user.firstName} ${user.lastName}`
    userProfilePhoto.setAttribute("src", user.profilePhoto.toString());
    userProfileName.innerText = user.firstName +" " + user.lastName;
    userPrifileRegion.innerText = user.region;
    userProfileBirthDay.innerText = user.birthday;
    userProfileGender.innerText = user.gender;
    userProfileEmailAddress.innerText = user.email;

    if (user.createdID === null) {
        document.getElementById("showUserEvents").style.display = "none";
    }

    for (let i = 0; i < events.length; i++) {

        if (user.createdID === events[i].eventID) {
            displayEventsPP(events[i])
        }
    }

}

function displayEventsPP(event) {
    userEventName.innerText = event.eventName;
    userEventLocation.innerText = event.eventLocation;
    userEventDiscription.innerText = event.eventDescription;
    userEventBegining.innerText = event.startDate;
    userEventEnding.innerText = event.endDate;
    userEventDeparture.innerText = event.departureLocation;
    userEventCreator.innerText = eventCreator(event.eventID);
    userEventOpenPostion.innerText = event.eventSpots;
}

// Find Event Creator Function Start
function eventCreator(event) {
    let publisher = apiResultsUsers.find(x => x.createdID === event);
    if (publisher != null) {
        return `${publisher.firstName} ${publisher.lastName}`;
    }
    return "Creator Unknown"
}
// Find Event Creator Function End

// FILL UP PROFILE PAGE WITH USER INFORMATION SECTION END

function displayUserGoingEvents(user, events) {

    let eventInfo = events.find(x => x.eventID === user.goingeventID);
    if (eventInfo != undefined) {


        userEventName.innerText = eventInfo.eventName;
        userEventLocation.innerText = eventInfo.eventLocation;
        userEventDiscription.innerText = eventInfo.eventDescription;
        userEventBegining.innerText = eventInfo.startDate;
        userEventEnding.innerText = eventInfo.endDate;
        userEventDeparture.innerText = eventInfo.departureLocation;
        userEventCreator.innerText = eventCreator(eventInfo.eventID);
        userEventOpenPostion.innerText = eventInfo.eventSpots;

        document.getElementById("showUserEvents").style.display = "flex";
    } else {
        document.getElementById("showUserEvents").style.display = "none";
    }
};

function displayUserCreatedEvents(user, events) {

    let eventInfo = events.find(x => x.eventID === user.createdID);
    if (eventInfo != undefined) {


        userEventName.innerText = eventInfo.eventName;
        userEventLocation.innerText = eventInfo.eventLocation;
        userEventDiscription.innerText = eventInfo.eventDescription;
        userEventBegining.innerText = eventInfo.startDate;
        userEventEnding.innerText = eventInfo.endDate;
        userEventDeparture.innerText = eventInfo.departureLocation;
        userEventCreator.innerText = eventCreator(eventInfo.eventID);
        userEventOpenPostion.innerText = eventInfo.eventSpots;

        document.getElementById("showUserEvents").style.display = "flex";
    } else {
        document.getElementById("showUserEvents").style.display = "none";
    }
};


// EVENT LISTENERS FOR DISPLAY GOING AND CREATED EVENTS START HERE

let userGoingToEvents = document.getElementById("userGoingToEvents");
let userCreatedEvents = document.getElementById("userCreatedEvents");

userGoingToEvents.addEventListener("click", function () {

    if (currentUser.goingeventID != null) {
        let apiResultsForEvents = notSortedArray;
        let infoDivSender = "going";
        document.getElementById("showUserEvents").style.display = "flex";
        document.getElementById("someExtraInfoDiv").innerHTML = "";
        displayUserGoingEvents(currentUser, apiResultsForEvents);
        extraInfoDiv(currentUser, infoDivSender);
    } else {
        document.getElementById("showUserEvents").style.display = "none";
        console.log(`${currentUser.firstName} did't Going any event`);
    }
});

userCreatedEvents.addEventListener("click", function () {

    if (currentUser.createdID != null) {
        let apiResultsForEvents = notSortedArray;
        let infoDivSender = "created";
        document.getElementById("showUserEvents").style.display = "flex";
        document.getElementById("someExtraInfoDiv").innerHTML = "";
        displayUserCreatedEvents(currentUser, apiResultsForEvents);
        extraInfoDiv(currentUser, infoDivSender);
    } else {
        document.getElementById("showUserEvents").style.display = "none";
        console.log(`${currentUser.firstName} didn't created any event`);
    }
});
// EVENT LISTENERS FOR DISPLAY GOING AND CREATED EVENTS END




// REGISTRATION VALIDATION START HERE
function fullNameVerification(firstName, lastname) {
    var letters = /^[A-Za-z]+$/;
    if (firstName.match(letters)) {
        if (lastname.match(letters))
            return true;
    } else {
        alert('Username must have alphabet characters only');
        return false;
    }
}

function ageVerification(userday, usermounth, useryear) {
    let currnetYear = new Date().getFullYear();
    let currnetMonth = new Date().getMonth() + 1;

    let userDay = parseInt(userday, 10);
    let userMonth = parseInt(usermounth, 10);
    let userYear = parseInt(useryear, 10);

    let aboveAge = (currnetYear - userYear) * 12 + userMonth
    if (isNaN(userDay) || isNaN(userMonth) || isNaN(userYear)) {
        return false;
    } else if (aboveAge >= 192) {
        return true;
    }

};


// IMA API CALL
async function newUserMailVerification(userEmail) {
    let UserEmailFromDataBase = await userDataApiCall();

    let allMailsFromDataBase = UserEmailFromDataBase.Users.map(x => x.email);

    let userMailValidate = true;

    let i = 0;
    while (i <= allMailsFromDataBase.length) {
        if (allMailsFromDataBase[i] === userEmail) {
            console.log("We have mail like this");
            userMailValidate = false;
            i++
            break;
        }
        i++
    }


    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (userEmail.match(mailformat)) {
        userMailValidate = true;
        console.log("This format is OK");
        return userMailValidate;
    } else {
        alert("You have entered an invalid email address!");
        return userMailValidate = false;
    }

}

function userPasswordVerification(userPass, min, max) {
    var userPassLenght = userPass.length;
    if (userPassLenght == 0 || userPassLenght >= max || userPassLenght < min) {
        alert("Password should not be empty / length be between " + min + " to " + max);
        return false;
    }
    return true;
}

function userConfirmePassword(userPass, confPass) {
    if (userPass === confPass) {
        return true;
    } else {
        return false;
    }
}

function validSex(gender) {

    for (i = 0; i < gender.length; i++) {
        if (gender[i].checked == true) {
            return true;
        }
    }
    return false;
}


async function newUserRegistrationValidation(name, lastName, email, pass, day, month, year, confPass, gender) {

    if (await fullNameVerification(name, lastName) === true &&
        await ageVerification(day, month, year) === true &&
        await newUserMailVerification(email) === true &&
        await userPasswordVerification(pass) === true &&
        await userConfirmePassword(pass, confPass) === true &&
        await validSex(gender) === true) {
        let userYear = `${day}.${month}.${year}`
        let NewProf = await new CreateProfile(name, lastName, pass, userYear, email, gender);

        apiResultsUsers.push(NewProf);
        console.log(apiResultsUsers)

    } else {
        console.log("SOMETHING IS WRONG");


        return false;
    }
}
// REGISTRATION VALIDATION END HERE


// REGISTRATION FUNCTION START HERE


let regBtn = document.getElementById("regUserBtn");
regBtn.addEventListener("click", async function () {
    var newUserFirstName = document.getElementById("FirstName").value;
    var newUserLastname = document.getElementById("LastName").value;
    var newUserEmail = document.getElementById("Mail").value;
    var newUserpassword = document.getElementById("password").value;
    let newUserConfirmePass = document.getElementById("ConfPass").value;
    var newUserBirthDay = document.getElementById("dobDay").value;
    let newUserBirthMonth = document.getElementById("dobmouth").value;
    let newUserBirthYear = document.getElementById("dobyear").value;
    var newUserGender = document.getElementsByName("gender");

    if (newUserRegistrationValidation(newUserFirstName, newUserLastname, newUserEmail, newUserpassword, newUserBirthDay, newUserBirthMonth, newUserBirthYear, newUserConfirmePass, newUserGender) == true) {
        let userBday = `${newUserBirthDay}.${newUserBirthMonth}.${newUserBirthYear}`;
        let NewUser = new CreateProfile(newUserFirstName, newUserLastname, newUserpassword, userBday, newUserEmail, newUserGender)

        console.log(NewUser);


        console.log(newUsersArray)

    }
})

// REGISTRATION FUNCTION END HERE

// Create EXTRA INFO DIV IN javaScript 
function extraInfoDiv(user, eventStatus) {

    if (eventStatus === "created") {
        arrOfUsers = apiResultsUsers.filter(x => x.goingeventID == user.createdID);
        createExtraInfoDiv(arrOfUsers);
    } else if (eventStatus === "going") {
        arrOfUsers = apiResultsUsers.filter(x => x.goingeventID == user.goingeventID);
        createExtraInfoDiv(arrOfUsers);
    }
}

function createExtraInfoDiv(arrUsers) {
    var i = 0;
    while (i < arrUsers.length) {
        var newDiv = document.createElement("div");
        newDiv.className = "eventUserList";
        newDiv.innerHTML += `<div id="listOfUsers"> 
        <div id="UserListId" value='${arrUsers[i].userId}'>${arrUsers[i].firstName} ${arrUsers[i].lastName}</div>
        </div>`

        document.getElementById("someExtraInfo").appendChild(newDiv);
        i++
    }

}

let InfoDivUsers = document.getElementById("someExtraInfo");


// Put FIND FUNCTION HERE
InfoDivUsers.addEventListener("click", function (e) {
    let userValueId = e.target.getAttribute("value");

    let goToThisProfile = apiResultsUsers.find(x => x.userId === userValueId);
    currentUser = goToThisProfile;
    UserProfile(goToThisProfile, notSortedArray);


});


// Button Go To Current User Profile Page START HERE

let goToCurrentUserProfile = document.getElementById("username");

goToCurrentUserProfile.addEventListener("click", function () {
    currentUser = logInUser;
    UserProfile(currentUser, apiResultsEvents);
    document.getElementById("bodyContainer").style.display = "flex";
    document.getElementById("EventPageBodyDiv").style.display = "none";
});
// Button Go To Current User Profile Page END HERE

// Button To Create EVENT From Profil Page  START HERE

let btnCreatePage = document.getElementById("CreateEventBtn");
let changeValue =document.getElementById("CreateEventBtn");
changeValue.value= "false";
btnCreatePage.addEventListener("click", function () {
    if (changeValue.value !== "true") {
        let createNewEvent = document.createElement('div');
        createNewEvent.id = "ppNewEvent";
        createNewEvent.innerHTML = `<div class='EventNameDiv'>
    <input type='text' id='EventName' placeholder='Event Name' >
    <input type='text' id='EventSpots' placeholder='Spots:'>
    <button type="submit" id='ppPublishButton'>Publish</button>
</div>
<div class='Adress'>
    <input type="text" class='AdressInput' id='LocationOfEvent' placeholder="Location of the Event:" maxlength="50" >
    <input type="text" class='AdressInput' id='AdressDeparture' placeholder="Adress of Departure:" maxlength="50" >
</div>

<div class='DescribeDatePublish'>
    <textarea maxlength="180" placeholder="Describe your event in 180 characters..." id='EventDescribe' ></textarea>
    <div id='dates'>
        <div id='date1'>
            <p class='fromTill'>From:</p>
            <input type='date' id='EventDate1' max='2019-12-31' ></input>
        </div>
        <div id='date2'>
            <p class='fromTill'>Untill:</p>
            <input type="date" id='EventDate2' max="2019-12-31" ></input>
        </div>
    </div>
</div>`
        document.getElementById("bodyContainer").appendChild(createNewEvent);
        let ppNewEventStyle = document.getElementById("ppNewEvent");
        ppNewEventStyle.style.position = "absolute";
        ppNewEventStyle.style.alignSelf = "center";
        ppNewEventStyle.style.marginTop = "17%";
        ppNewEventStyle.style.backgroundColor = "rgba(192,192,192,0.9)";

        let ppPublishEvent = document.getElementById("ppPublishButton");

        ppPublishEvent.addEventListener("click", function () {

            let eventName = document.getElementById('EventName');
            let startDate = document.getElementById('EventDate1');
            let endDate = document.getElementById('EventDate2');
            let eventLocation = document.getElementById('LocationOfEvent');
            let departureLocation = document.getElementById('AdressDeparture');
            let eventDescription = document.getElementById('EventDescribe');
            let eventSpots = document.getElementById('EventSpots');
            let eventPublishBtn = document.getElementById('PublishButton');

            if (VerifyData(eventName, eventSpots, eventLocation, departureLocation, eventDescription, eventSpots, eventPublishBtn) == true) {
                ClearFields();
                let dateOfCreation = dateNow;
                let timeOFCreation = time;
                let Creator = currentUser.firstName + currentUser.lastName;
                let MyEvent = new CreateEvent(eventName.value, startDate.value, endDate.value, eventLocation.value, departureLocation.value, eventDescription.value, eventSpots.value, dateOfCreation, timeOFCreation, Creator);
                document.getElementById("bodyContainer").removeChild(createNewEvent);
                console.log(MyEvent);
                currentUser.createdID = MyEvent.eventID;
                console.log(currentUser);
                document.getElementById("showUserEvents").style.display = "flex";
                displayEventsPP(MyEvent);
                changeValue.value = "";
                return notSortedArray.push(MyEvent);
            }
        });
        changeValue.value = "true";
    }
});

// Button Go On HOME PAGE START HERE
let goHome = document.getElementById("home");
goHome.addEventListener("click", function () {
    currentUser = logInUser;
    document.getElementById("bodyContainer").style.display = "none";
    document.getElementById("EventPageBodyDiv").style.display = "flex";
    let removeChild = document.getElementsByClassName("EventDiv");
    document.getElementById("fuck").innerHTML = "";
    PublishDivs();
})
// Button Go on HOME PAGE END HERE


// Button To Create EVENT From Profil Page  END HERE

// EVENT PAGE javaScript START HERE

let eventName = document.getElementById('EventName');
let startDate = document.getElementById('EventDate1');
let endDate = document.getElementById('EventDate2');
let eventLocation = document.getElementById('LocationOfEvent');
let departureLocation = document.getElementById('AdressDeparture');
let eventDescription = document.getElementById('EventDescribe');
let eventSpots = document.getElementById('EventSpots');
let eventPublishBtn = document.getElementById('PublishButton');
let eventsDiv = document.getElementsByClassName('Events');
let cancelEvent = document.getElementById("CancelEvent");
let removeElements = (elms) => elms.forEach(el => el.remove());
let dateNow = '';
let time = new Date();
let notSortedArray = [];
eventsArray = [];



eventsFromApi();
let dateOFCreation = dateNow;
let timeOFCreation = time;
console.log(time);

// Cancel Event

cancelEvent.addEventListener("click", function () {
    if (HaveICreatedEvent() === true) {
        IHaveCreatedEvent();
        currentUser.createdID = null;
        document.getElementById("showUserEvents").style.display = "none";
        removeElements(document.querySelectorAll(".EventDiv"));
        PublishDivs();
    }

})

function HaveICreatedEvent() {

    if (currentUser.createdID === null) {
        alert("You can't cancel what you haven't created.");
        return false
    } else {
        return true;
    }
}

function IHaveCreatedEvent() {
    if (currentUser.createdID !== null) {
        let eventFiltered = eventsArray.find(x => x.eventID == currentUser.createdID);
        var index = notSortedArray.indexOf(eventFiltered);
        console.log(index);
        if (index > -1) {
            eventsArray.splice(index,index);
            notSortedArray.splice(index, index);
            alert("You have canceled your event" + eventFiltered.eventName);
        }
    }
}

// Verify and publish ///////////////////////////////////////////
eventPublishBtn.addEventListener("click", function () {
    if (VerifyData(eventName, eventSpots, eventLocation, departureLocation, eventDescription) == true) {
        removeElements(document.querySelectorAll(".EventDiv"));
        EventCreation();
        PublishDivs();
        console.log(eventsArray)
        ClearFields();
    }

})

class CreateEvent {
    constructor(Name, Begining, Ending, Departure, Discription, location, openSpots, date, time, Creator) {
        this.eventName = Name;
        this.eventSpots = openSpots;
        this.eventLocation = location;
        this.departureLocation = Departure;
        this.eventDescription = Discription;
        this.startDate = Begining;
        this.endDate = Ending;
        this.dateOfCreation = date;
        this.timeOFCreation = time;
        this.eventID = generateEventID();
        this.eventCreator = Creator;
    }
}

function generateEventID() {
    let lenghtOfID = 4;
    let newID = "";
    let charToUse = "1234567890qwertyuiopasdfghjklzxcvbnm";

    for (i = 0; i < lenghtOfID; i++) {
        let x = charToUse.length;
        newID += charToUse.charAt(Math.floor(Math.random() * x));
    }
    return newID;
};

// Getting events from Api and Publishing them
async function eventsFromApi() {
    let resultFromApi = await userDataApiCall();
    console.log(resultFromApi);
    let events = resultFromApi.Events;
    events.forEach(x => {
        notSortedArray.push(x)
    });
    PublishDivs();
    console.log(eventsArray);
}


//Publishing Sorted divs
function PublishDivs() {
    Sorting();
    eventsArray.forEach(element => {
        divCreation(element);
    });
}

// Sorting the div by Creation Date
function Sorting() {
    eventsArray = notSortedArray.sort(function (a1, b1) {
        if (a1.dateOfCreation > b1.dateOfCreation) {
            return -1;
        } else {
            return 1;
        }
    })
}

// After successfull verification

function EventCreation() {
    let eventName = document.getElementById('EventName').value;
    let startDate = document.getElementById('EventDate1').value;
    let endDate = document.getElementById('EventDate2').value;
    let eventLocation = document.getElementById('LocationOfEvent').value;
    let departureLocation = document.getElementById('AdressDeparture').value;
    let eventDescription = document.getElementById('EventDescribe').value;
    let eventSpots = document.getElementById('EventSpots').value;
    let dateOfCreation = dateNow;
    let timeOFCreation = time;
    let Creator = currentUser.firstName + currentUser.lastName;

    let MyEvent = new CreateEvent(eventName, startDate, endDate, eventLocation, departureLocation, eventDescription, eventSpots, dateOfCreation, timeOFCreation, Creator)
    currentUser.createdID = MyEvent.eventID;
    return notSortedArray.push(MyEvent);

}



// Creating Div in html
function divCreation(obj) {

    var div = document.createElement('div');

    // add time and date of the published event, down at Creator Name
    div.className = 'EventDiv';
    div.id = obj.eventName;
    div.innerHTML =
        '<div id="firstRow"/>\
                <div id="nameEvent">' + obj.eventName + '</div/>\
                <div id="dateEvent">From:<div id="beginDate">' + obj.startDate + '</div> / Until:<div id="endDate">' + obj.endDate + '</div></div/>\
                <div id="leftSpots">Spots Left:<div id="numberSpots">' + obj.eventSpots + '</div></div/>\
            </div/>\
            <div id="secondRow"/>\
                <div id="divDescription">' + obj.eventDescription + '</div/>\
            </div/>\
            <div id="thirdRow"/>\
                <div id="locationEvent">' + obj.eventLocation + '</div/>\
                <div id="departureEvent">' + obj.departureLocation + '</div/>\
            </div/>\
            <div id="forthRow"/>\
                <div id="nameCreator">Creator:</br>' + obj.eventCreator + '</div/>\
                <div id="timeCreated">Created at:</br>' + obj.timeOFCreation + ' ' + '/' + ' ' + obj.dateOfCreation + '</div/>\
                <div id="emptyDiv"></div/>\
                <div class="joinBtn"/>\
                    <button id="join' + obj.eventID + '" value=' + obj.eventID + ' > JOIN </button/>\
                </div/>\
            </div/>\ ';

    document.getElementById("fuck").appendChild(div);

    let joinButton = document.getElementById("join" + obj.eventID);

    joinButton.addEventListener("click", function (e) {
        let eventIdValue = e.target.getAttribute("value");
        let eventFiltered = eventsArray.find(x => x.eventID == eventIdValue);
        JoinEvent(eventFiltered);
    })



}

function JoinEvent(event) {
    if (FinalCheckJoin(event) === true) {
        removeElements(document.querySelectorAll(".EventDiv"));
        PublishDivs();
        return alert("You have joined " + event.eventName);
    }
};

function FinalCheckJoin(event) {
    if (CheckOpenPositions(event) === true &&
        JoinYourEvent(event) === true &&
        CheckUserIfGoingToEvents(event) === true) {
        return true;
    } else {
        return false;
    }
}

function CheckOpenPositions(event) {
    if (event.eventSpots > 0) {
        event.eventSpots -= 1;
        return true;
    } else {
        alert("This event is already full");
        return false;
    }
}

function CheckUserIfGoingToEvents(event) {
    if (currentUser.goingeventID === null) {
        currentUser.goingeventID = event.eventID;
        return true;
    } else {
        alert("You are already going to attending some event!");
        return false;
    }
}

function JoinYourEvent(event) {
    if (currentUser.createdID === event.eventID) {
        alert("You created this event, so you are already joined.");
        return false;
    } else {
        return true;
    }
}


// validation of the data entered in Creating event
function VerifyData(eveName, eveSpot, eveLocation, evedeparture, eveDesc) {
    if (VerifyIfAlreadyCreatedEvent() === true &&
        IdVerification(eveName) === true &&
        eventNameVerification(eveName) === true &&
        eventSpotsVerification(eveSpot) === true &&
        eventLocationVerification(eveLocation) === true &&
        departureLocationVerification(evedeparture) === true &&
        eventDescriptionVerification(eveDesc) === true) {
        return true;
    } else {
        return false;
    }
}

function VerifyIfAlreadyCreatedEvent() {
    if (currentUser.createdID !== null) {
        alert("You can create only one event.");
        ClearFields();
        return false;
    } else {
        return true;
    }
}

// Event Name ID Verification of Div
function IdVerification(eventName) {
    for (i = 0; i <= eventsArray.length; i++) {
        if (eventsArray[i].eventName != eventName.value) {
            return true;
        } else {
            alert('The Event Name already exists. Try another one.')
            return eventName.value = null;
        }
    }
}

//Event Name input Verification
function eventNameVerification(eventName) { // Event Verification
    var letters = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
    if (eventName.value.match(letters) && eventName.value.length > 1) {
        return true;
    } else {
        alert('Use letters from A-Z / a-z and be more descriptive with the name');
        return eventName = null;
    }
}
// Event Description input verification
function eventDescriptionVerification(eventDescription) {
    if (eventDescription.value.length <= 5) {
        alert('Describe your event please and be more descriptive about it.');
        return eventDescription.value = null;
    } else {
        return true;
    }
}
// Spots input Verification
function eventSpotsVerification(eventSpots) {
    var numbers = /^[0-9]+$/;
    if (eventSpots.value.match(numbers) && eventSpots.value > 0) {
        return true;
    } else {
        alert('You don\'t need event if you are going alone, or You can write the available spots you have.');
        return eventSpots.value = null;
    }
}
// Event Location input Verification
function eventLocationVerification(eventLocation) {
    if (eventLocation.value.length <= 5) {
        alert('Be more precise about the location');
        return eventLocation.value = null;
    } else {
        return true;
    }
}
// Departure input verification Location
function departureLocationVerification(departureLocation) {
    if (departureLocation.value.length <= 1) {
        alert('Enter departure location please');
        departureLocation.value = null;
    } else {
        return true;
    }
}

// Clears the fields after successfull publish
function ClearFields() {
    eventName.value = '';
    eventLocation.value = '';
    departureLocation.value = '';
    eventDescription.value = '';
    eventSpots.value = '';
    startDate.value = dateNow;
    endDate.value = dateNow;
}

// Autocalling SetTime 
(function () {
    function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }

    function startTime() {
        var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());
        time = h + ":" + m + ":" + s;
        t = setTimeout(function () {
            startTime()
        }, 500);
    }
    startTime();
})();


// Autocalling SetDate
(function () {
    function checkDate(i) {
        return (i < 10) ? "0" + i : i;
    }

    function setDateToday() { // Sets dates from today
        let date = new Date();
        day = checkDate(date.getDate()),
            month = checkDate(date.getMonth() + 1),
            year = date.getFullYear();

        dateNow = year + '-' + month + '-' + day;

        document.getElementById("EventDate1").setAttribute("min", dateNow),
            document.getElementById("EventDate1").setAttribute("value", dateNow),
            document.getElementById("EventDate2").setAttribute("min", dateNow),
            document.getElementById("EventDate2").setAttribute("value", dateNow);


        t = setTimeout(function () {
            setDateToday()
        }, 60000);
    }
    setDateToday();


})();

// EVENT PAGE javaScript END HERE