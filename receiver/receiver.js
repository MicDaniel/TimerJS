let connectionIdx = 0;
let messageIdx = 0;
let elem = document.querySelector(".clock");
function addConnection(connection) {
    connection.connectionId = ++connectionIdx;
    //addMessage('New connection #' + connectionIdx);

    connection.addEventListener('message', function (event) {
        messageIdx++;
        const data = JSON.parse(event.data);
        const logString = 'Message ' + messageIdx + ' from connection #' +
            connection.connectionId + ': ' + data.message;
        //addMessage(logString, data.lang);
        //maybeSetFruit(data.message);
        let details = JSON.parse(data); 
        setTime(details.time, details.isOverTime); 
        connection.send(data);
    });

    connection.addEventListener('close', function (event) {
        addMessage('Connection #' + connection.connectionId + ' closed, reason = ' +
            event.reason + ', message = ' + event.message); 
    });
};


function setTime(time,isOvertime)
{  
    if(isOvertime){
        if (!document.body.classList.contains("animationStart")) {
            document.body.classList.add("animationStart");
        }
    }else{
        if(document.body.classList.contains("animationStart")){
            document.body.classList.remove("animationStart"); 
        }
    }
    elem.innerHTML = time;
}

/* Utils */
/*
function addMessage(content, language) {
    const listItem = document.createElement("li");
    if (language) {
        listItem.lang = language;
    }
    listItem.textContent = content;
    document.querySelector("#message-list").appendChild(listItem);
};
*/


document.addEventListener('DOMContentLoaded', function () {
    if (navigator.presentation.receiver) {
       
        navigator.presentation.receiver.connectionList.then(list => {
            list.connections.map(connection => addConnection(connection));
            list.addEventListener('connectionavailable', function (event) {
                addConnection(event.connection);
            });
        });
    }
});