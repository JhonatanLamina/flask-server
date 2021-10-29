//BTN1 Function
function btn1() {
  console.log("Sent: ON");
  message = new Paho.MQTT.Message("ON");
  message.destinationName = "web.jhonatanlamina@gmail.com/t1";
  client.send(message);
}
//BTN2 Function
function btn2() {
  console.log("Sent: OFF");
  message = new Paho.MQTT.Message("OFF");
  message.destinationName = "web.jhonatanlamina@gmail.com/t1";
  client.send(message);
}
//Create a client instance
client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));
//Set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
var options = {
  useSSL: false,
  userName: "web.jhonatanlamina@gmail.com",
  password: "jhonatanlamina",
  onSuccess:onConnect,
  onFailure:doFail
}
//Connect the client
client.connect(options);
//Called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("Successful Connection");
  document.getElementById("state").innerHTML="Successful Connection";
  client.subscribe("web.jhonatanlamina@gmail.com/t2");
  message = new Paho.MQTT.Message("Connected from remote");
  message.destinationName = "web.jhonatanlamina@gmail.com/t1";
  client.send(message);
}
//If there is an error in the connection
function doFail(e){
  alert("A connection error has occurred. Try again later.")
  console.log(e);
  document.getElementById("image").src="/static/images/error.png";
  document.getElementById("state").innerHTML="Failed Connection";
  document.getElementById("t4").remove();
  document.getElementById("myline1").remove();
  document.getElementById("myline2").remove();
  document.getElementById("sensor1").remove();
  document.getElementById("sensor2").remove();
  document.getElementById("btn1").remove();
  document.getElementById("btn2").remove();
}
//Called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}
//Called when a message arrives
function onMessageArrived(message) {
  console.log("New data received: "+message.payloadString);
  //document.getElementById("sensor").innerHTML=message.payloadString;
  var data = message.payloadString.split("|")
  if (data[0] != 'none'){
    document.getElementById("sensor1").innerHTML=data[0];
  }
  if (data[1] != 'none'){
    document.getElementById("sensor2").innerHTML=data[1];
  }
}