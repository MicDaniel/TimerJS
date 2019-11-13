
let elem = document.getElementById("timer");
let timeInput = document.querySelector("#timeInput");
console.log(timeInput);
let stopwatch;
let timerUp;
elem.addEventListener("tick", function (event) {
    if (presentationConnection) {
        sentMessage(JSON.stringify(event.detail));
    }
    //elem.innerHTML = event.detail.time;
});

function startTimer(){
    let selectedValue = timeInput.value;
    if(!Number(selectedValue)>0){
        alert("Va rugam sa indroduceti un numar este mai ca 0!");
       return;
    }   
    if(stopwatch){
        stopwatch.stop();
    }

    if(timerUp) {
        timerUp.stop();
    }
        stopwatch = new Stopwatch(selectedValue);

    if(presentationConnection){
    
        presentationConnection.addEventListener('message', function (event) {
            let detail = JSON.parse(event.data);
            let isDangerStyle;
                      
            if (detail.isOverTime){ 
                elem.parentElement.classList.replace("alert-primary", "alert-danger");
            }else{                
                elem.parentElement.classList.replace("alert-danger", "alert-primary");
            } 
            elem.innerHTML = detail.time;
        });
    }else{
        alert("Nu este activata proiectia !");
    }
    
        stopwatch.target = elem;
}

function setUpEvents(presentationConnection){
    presentationConnection.addEventListener('message', function (event) {
        let detail = JSON.parse(event.data);
        let isDangerStyle;

        if (detail.isOverTime) {
            elem.parentElement.classList.replace("alert-primary", "alert-danger");
        } else {
            elem.parentElement.classList.replace("alert-danger", "alert-primary");
        }
        elem.innerHTML = detail.time;
    });
}
function stopTimer(){
    if(stopwatch){
        stopwatch.stop();
        stopwatch = null;
    }

    if(timerUp) {
        timerUp.stop();
        timerUp = null;
    } 
}

function startCountdown() {
    let selectedValue = timeInput.value;
    if(Number(selectedValue) <= 0) {
        alert("Introduceti va rog un numar mai mare ca 0");
        return;
    }

    if(stopwatch) {
        stopwatch.stop();
    }
    if(timerUp) {
        timerUp.stop();
    }

    timerUp = new Timer(selectedValue);

    if(presentationConnection) {
        presentationConnection.addEventListener('message', function(event) {
            let detail = JSON.parse(event.data);
            let isDangerStyle;

            if(detail.isOverTime) {
                elem.parentElement.classList.replace("alert-primary", "alert-danger");
            }
            else {
                elem.parentElement.classList.replace("alert-danger", "alert-primary");
            }
            elem.innerHTML = detail.time;
        });
    }
    else {
        alert("Nu este activa proiectia !");
    }

    timerUp.target = elem;
}