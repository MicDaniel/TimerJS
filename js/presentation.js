
const presentationRequest = new PresentationRequest(['receiver/index.html']); 
const presentationRequest2 = new PresentationRequest(['receiver/index1.html']); 


let presentationConnection;
let presentationConnection2;

// Make this presentation the default one when using the "Cast" browser menu.
navigator.presentation.defaultRequest = presentationRequest;

//document.querySelector("#playBtn");
function startProjection() {
    presentationRequest.start().then(connection => {
        console.log(connection.url + " " + connection.id);
        setUpEvents(presentationRequest);
    }).catch(error => {
        console.log('> ' + error.name + ': ' + error.message);
    });
}

function startSecondProjection(){
    presentationRequest2.start().then(connection => {
        console.log(connection.url + " " + connection.id);
        setUpEvents(presentationRequest2);
    }).catch(error => {
        console.log('> ' + error.name + ': ' + error.message);
    });
}


function closeProjection(){
    presentationConnection.close();
}

function terminateProjection(){
    presentationConnection.terminate();
}

function reconnectProjection(){
    const presentationId = document.querySelector('#presentationId').value.trim();

    presentationRequest.reconnect(presentationId)
        .then(connection => {
            log('Reconnected to ' + connection.id);
        })
        .catch(error => {
            log('Presentation.reconnect() error, ' + error.name + ': ' + error.message);
        });
}


presentationRequest.addEventListener('connectionavailable', function (event) {
    presentationConnection = event.connection;
    presentationConnection.addEventListener('close', function () {
        log('> Connection closed.');
    });
    presentationConnection.addEventListener('terminate', function () {
        log('> Connection terminated.');
    });
    presentationConnection.addEventListener('message', function (event) {
        log('> ' + event.data); 
    });
    presentationConnection.addEventListener('connect', function (event) {
        log('> ' + event.data);
        setUpEvents(presentationConnection);
    });
});
presentationRequest2.addEventListener('connectionavailable', function (event) {
    presentationConnection2 = event.connection;
    presentationConnection2.addEventListener('close', function () {
        log('>2 Connection closed.');
    });
    presentationConnection2.addEventListener('terminate', function () {
        log('>2 Connection terminated.');
    });
    presentationConnection2.addEventListener('message', function (event) {
        log('>2 ' + event.data);
    });
    presentationConnection.addEventListener('connect', function (event) {
        log('> ' + event.data);
        setUpEvents(presentationConnection2);
    });
});

function sentMessage(details) {
    if(presentationConnection && presentationConnection.state === "connected"){
        presentationConnection.send(JSON.stringify(details));
    }
    if (presentationConnection2 && presentationConnection2.state === "connected"){
        presentationConnection2.send(JSON.stringify(details)); 
    }
    
}

presentationRequest.getAvailability()
    .then(availability => {
        log('Available presentation displays: ' + availability.value);
        availability.addEventListener('change', function () {
            log('> Available presentation displays: ' + availability.value);
        });
    })
    .catch(error => {
        log('Presentation availability not supported, ' + error.name + ': ' +
            error.message);
    });

presentationRequest2.getAvailability() 
    .then(availability => {
        log('Available presentation displays: ' + availability.value);
        availability.addEventListener('change', function () {
            log('>2 Available presentation displays: ' + availability.value);
        });
    })
    .catch(error => {
        log('Presentation 2 availability not supported, ' + error.name + ': ' +
            error.message);
    });
function log(args) {
    console.log(args);
}